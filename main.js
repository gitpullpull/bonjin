/* THE BONJIN — main.js
   content.js の SITE を描画する。2026-11-25 リデザイン（宮崎・セピア・シンプル）。
   JSが失敗しても本文が読めるよう、初期状態はCSSで隠さない（progressive enhancement）。 */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;
  var $ = function (sel) { return document.querySelector(sel); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  var ext = function (u) { return /^https?:/.test(u); };
  var aTag = function (url, text) {
    return '<a href="' + esc(url) + '"' + (ext(url) ? ' target="_blank" rel="noopener"' : "") + ">" + text + "</a>";
  };
  var paras = function (list) { return list.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); };
  var lines = function (list) { return list.map(esc).join("<br>"); };
  var set = function (sel, html) { var el = $(sel); if (el) el.innerHTML = html; };

  /* ---------- meta ---------- */
  document.title = S.meta.title;
  set("#f-vol", esc(S.meta.vol + " / UPDATED " + S.meta.updated));
  set("#f-colophon", esc(S.footer.colophon));

  /* ---------- hero ---------- */
  if (S.hero) {
    set("#hero-place", esc(S.hero.place));
    set("#hero-copy", S.hero.copy.map(esc).join(""));
  }

  /* ---------- about (宮崎で) ---------- */
  if (S.intro) {
    set("#intro-label", esc(S.intro.label));
    set("#intro-heading", lines(S.intro.heading));
    set("#intro-body", paras(S.intro.body));
  }
  set("#stats", S.stats.map(function (st) {
    return '<div class="stat"><div class="v">' + esc(st.value) +
      (st.unit ? '<span class="u">' + esc(st.unit) + "</span>" : "") +
      '</div><div class="l">' + esc(st.label) + "</div></div>";
  }).join(""));

  /* ---------- services (事業) ---------- */
  var SV = S.services;
  if (SV) {
    set("#svc-list", SV.items.map(function (it) {
      var works = it.works.length ? it.works.map(function (w) {
        var name = w[1] ? aTag(w[1], esc(w[0])) : esc(w[0]);
        return "<li>" + name + (w[2] ? '<span class="w-note">' + esc(w[2]) + "</span>" : "") + "</li>";
      }).join("") : '<li class="w-none">これから。最初の実績は、ここに載ります。</li>';
      var list = function (title, items, cls) {
        return '<div><h4>' + title + '</h4><ul class="' + cls + '">' +
          items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
      };
      return '<article class="svc" id="svc-' + esc(it.no) + '">' +
        '<header class="svc-head">' +
        '<span class="svc-no en">' + esc(it.no) + "</span>" +
        '<div><p class="svc-en en">' + esc(it.en) + "</p>" +
        '<h3 class="svc-name">' + esc(it.name) + "</h3></div>" +
        '<span class="chip' + (it.status === "受付中" ? "" : " ghost") + '">' + esc(it.status) + "</span>" +
        "</header>" +
        '<p class="svc-body">' + esc(it.body) + "</p>" +
        (it.lp ? '<p class="svc-lp"><a href="' + esc(it.lp) + '">' + esc(it.lpLabel || "専用ページを見る →") + "</a>" +
          (it.student ? '<a href="' + esc(it.student) + '">学生はこちら（学割） →</a>' : "") + "</p>" : "") +
        '<details class="svc-more"><summary>くわしく</summary><div class="svc-cols">' +
        (it.points ? list("できること", it.points, "svc-pt") : "") +
        '<div><h4>実績</h4><ul class="svc-works">' + works + "</ul></div>" +
        "</div></details></article>";
    }).join(""));
    set("#svc-flow", SV.flow.map(function (f, i) {
      return '<li><span class="en">0' + (i + 1) + "</span>" + esc(f) + "</li>";
    }).join(""));
    set("#svc-contact", "<p>" + esc(SV.contact.text) + '</p><div class="contact-links">' +
      SV.contact.links.map(function (l) {
        return '<a class="btn" href="' + esc(l[1]) + '">' + esc(l[0]) + "　" + esc(l[2]) + "</a>";
      }).join("") + "</div>");
  }

  /* ---------- message ---------- */
  if (S.message) {
    set("#msg-label", esc(S.message.label));
    set("#msg-heading", esc(S.message.heading));
    set("#msg-body", paras(S.message.body));
  }

  /* ---------- members ---------- */
  set("#about-body", paras(S.about.body));
  var ledger = $("#ledger");
  if (ledger) {
    ledger.innerHTML = S.members.map(function (m, i) {
      var detail;
      if (m.bio) {
        detail = '<div class="row-detail"><p>' + esc(m.bio) + "</p>" +
          (m.facts.length ? '<ul class="facts">' + m.facts.map(function (f) {
            return '<li><span class="k">' + esc(f[0]) + "</span><span>" + esc(f[1]) + "</span></li>";
          }).join("") + "</ul>" : "") +
          (m.links.length ? '<div class="links">' + m.links.map(function (l) {
            return aTag(l[1], esc(l[0]) + "：" + esc(l[2]));
          }).join("") + "</div>" : "") +
          (m.page ? '<p class="more"><a href="' + esc(m.page) + '">紹介ページ →</a></p>' : "") +
          "</div>";
      } else {
        detail = '<div class="row-detail"><p class="soon en">Coming soon</p></div>';
      }
      return '<div class="row">' +
        '<button class="row-main" type="button" aria-expanded="false">' +
        '<span class="row-no en">' + esc(m.no) + "</span>" +
        '<span class="row-name">' + esc(m.name) +
        '<span class="reading">' + esc([m.reading, m.tags.join(" / ")].filter(Boolean).join(" — ")) + "</span></span>" +
        '<span class="row-role">' + esc(m.role) + "</span>" +
        '<span class="plus" aria-hidden="true"></span>' +
        "</button>" + detail + "</div>";
    }).join("");
    ledger.addEventListener("click", function (e) {
      var btn = e.target.closest(".row-main");
      if (!btn) return;
      var row = btn.closest(".row");
      var wasOpen = row.classList.contains("open");
      ledger.querySelectorAll(".row").forEach(function (r) {
        r.classList.remove("open");
        r.querySelector(".row-main").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) { row.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- products ---------- */
  set("#products-list", S.products.map(function (p) {
    var title = p.url ? aTag(p.url, esc(p.title)) : esc(p.title);
    return '<div class="p-row"><span class="chip' + (p.status === "公開中" ? "" : " ghost") + '">' + esc(p.status) + "</span>" +
      '<div><p class="p-title">' + title + "</p>" +
      '<p class="p-meta">' + esc(p.meta) + "</p></div></div>";
  }).join(""));

  /* ---------- company ---------- */
  if (S.company) {
    set("#co-label", esc(S.company.label));
    set("#co-heading", esc(S.company.heading));
    set("#co-table", S.company.rows.map(function (r) {
      return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>";
    }).join(""));
  }

  /* ---------- footer ---------- */
  set("#f-credits", S.footer.credits.map(function (c) {
    return "<li>" + esc(c[0]) + "：" + esc(c[1]) + "</li>";
  }).join(""));
  set("#f-links", S.footer.links.map(function (l) {
    return "<li>" + aTag(l[1], esc(l[0])) + "</li>";
  }).join(""));

  /* ---------- header shadow on scroll ---------- */
  var head = $(".site-head");
  if (head) {
    var onScroll = function () { head.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- quiet fade-in ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".sec-title, .sec-body, .svc, .dark .wrap, #contact .wrap");
    targets.forEach(function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
