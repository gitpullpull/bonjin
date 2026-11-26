/* THE BONJIN — form.js（LPの申し込み・相談フォーム）
   - フォームの内容を FormSubmit（https://formsubmit.co）経由で、そのままメールで届ける
   - 届くメールは「項目｜内容」の表になり、件名に【種別】とお名前が入る
   - 宛先は itwoshiyou+thebonjin@gmail.com（Gmail のフィルタで振り分けられる）
   - 送信できなかったときは、同じ内容を入れたメールの下書き（mailto）を出す

   使い方：<form class="lp-form" data-kind="学割申込" data-name-field="お名前"> の中に
   name="項目名（日本語）" の入力欄を並べる。name がそのままメールの表の見出しになる。
   メールアドレスの欄は name="email"（返信先になる）。 */
(function () {
  "use strict";

  var TO = "itwoshiyou+thebonjin@gmail.com";
  var ENDPOINT = "https://formsubmit.co/ajax/" + TO;
  var MAILTO = "itwoshiyou@gmail.com";

  var stamp = function () {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "/" + p(d.getMonth() + 1) + "/" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  };

  document.querySelectorAll("form.lp-form").forEach(function (form) {
    var kind = form.getAttribute("data-kind") || "お問い合わせ";
    var nameField = form.getAttribute("data-name-field") || "お名前";
    var btn = form.querySelector("button[type=submit]");
    var status = form.querySelector(".lp-form-status");
    var label = btn ? btn.textContent : "";

    var setStatus = function (cls, html) {
      if (!status) return;
      status.className = "lp-form-status " + cls;
      status.innerHTML = html;
    };

    // 入力内容を [見出し, 値] の並びにする（空欄は「—」）
    var rows = function () {
      var out = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.name.charAt(0) === "_" || el.type === "submit") return;
        var v = (el.value || "").trim();
        out.push([el.name === "email" ? "メールアドレス" : el.name, v || "—"]);
      });
      return out;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form._sending) return;
      if (form.querySelector("[name=_honey]") && form.querySelector("[name=_honey]").value) return;

      var who = ((form.elements[nameField] || {}).value || "").trim() || "お名前なし";
      var subject = "【" + kind + "】" + who + " さま｜THE BONJIN";
      var data = {};
      data["種別"] = kind;
      rows().forEach(function (r) { data[r[0]] = r[1]; });
      data["送信日時"] = stamp();
      data["送信元ページ"] = location.href.split("#")[0];
      data._subject = subject;
      data._template = "table";
      data._captcha = "false";
      var email = form.elements.email && form.elements.email.value.trim();
      if (email) data._replyto = email;

      form._sending = true;
      if (btn) { btn.disabled = true; btn.textContent = "送信しています…"; }
      setStatus("", "");

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (j) {
          if (!res.ok || String(j.success) === "false") throw new Error(j.message || res.status);
        });
      }).then(function () {
        form.classList.add("is-sent");
        setStatus("ok",
          "<b>送信しました。</b>ありがとうございます。<br>" +
          "内容を確認して、" + (email ? "<br class=\"sp\">" + email.replace(/[<>&"]/g, "") + " へ" : "") +
          "折り返しご連絡します。");
        if (status) status.focus();
      }).catch(function () {
        // 送れなかったとき：同じ内容をメールの下書きにする
        var body = rows().map(function (r) { return "【" + r[0] + "】\n" + r[1]; }).join("\n\n");
        var href = "mailto:" + MAILTO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body + "\n");
        setStatus("ng",
          "うまく送信できませんでした。<br>お手数ですが、<a href=\"" + href + "\">入力した内容をメールで送る</a>か、" +
          "時間をおいてもう一度お試しください。");
        if (btn) { btn.disabled = false; btn.textContent = label; }
      }).then(function () { form._sending = false; });
    });
  });
})();
