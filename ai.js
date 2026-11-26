/* THE BONJIN — ai.js（ai.html：AI業務改善支援のLP）
   - 費用対効果の試算、ふわっと出す */
(function () {
  "use strict";

  /* 費用対効果の試算 */
  var FEE = 44000;
  var $ = function (id) { return document.getElementById(id); };
  var num = function (id) { var v = parseFloat($(id).value); return isFinite(v) && v > 0 ? v : 0; };
  var yen = function (v) { return (v < 0 ? "−" : "") + Math.round(Math.abs(v)).toLocaleString("ja-JP") + "円"; };

  function calc() {
    var n = num("c-n"), m = num("c-m"), w = num("c-w"), t = num("c-t");
    var hours = n * m / 60;
    var value = hours * w;
    var cost = FEE + t;
    var diff = value - cost;
    var perItem = m / 60 * w;
    $("o-h").textContent = (Math.round(hours * 10) / 10).toLocaleString("ja-JP") + "時間";
    $("o-v").textContent = yen(value);
    $("o-c").textContent = yen(cost);
    $("o-d").textContent = (diff > 0 ? "＋" : "") + yen(diff);
    $("o-d").parentNode.classList.toggle("is-minus", diff < 0);
    $("o-b").textContent = perItem > 0 ? "月 約" + Math.ceil(cost / perItem).toLocaleString("ja-JP") + "件" : "—";
  }
  ["c-n", "c-m", "c-w", "c-t"].forEach(function (id) { $(id).addEventListener("input", calc); });
  calc();

  /* quiet fade-in（lp.js の対象に、このページの部品を足す） */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".ai-case, .ai-sample, .ai-flow li, .ai-two, .ai-compare-wrap, .ai-plan, .ai-calc");
    targets.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
