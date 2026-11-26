/* THE BONJIN — lp.js（web.html：ホームページ・名刺のLP）
   - 見出しの影、見本名刺のQR模様、ふわっと出す */
(function () {
  "use strict";

  /* header shadow */
  var head = document.querySelector(".site-head");
  if (head) {
    var onScroll = function () { head.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 見本名刺のQR（飾り。読み取れる本物ではない） */
  document.querySelectorAll(".mk-qr").forEach(function (cv) {
    var n = cv.width, ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#3A2E24";
    var seed = 7;
    var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var inFinder = function (x, y) {
      return (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
    };
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      if (!inFinder(x, y) && rnd() < 0.48) ctx.fillRect(x, y, 1, 1);
    }
    [[0, 0], [n - 7, 0], [0, n - 7]].forEach(function (p) {
      ctx.fillRect(p[0], p[1], 7, 7);
      ctx.clearRect(p[0] + 1, p[1] + 1, 5, 5);
      ctx.fillRect(p[0] + 2, p[1] + 2, 3, 3);
    });
  });

  /* ---------- スクロールで文字が浮かび上がる ----------
     - 見出しは一文字ずつ、墨がにじむように下から浮かぶ
     - 本文・リストは一行ずつ、少しずつ遅れて出る
     - 価格は 0 から数え上がる
     JSが無い／動きを減らす設定なら、最初から全部見えている */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  var root = document.documentElement;
  root.classList.add("motion");

  // 1) 見出しを一文字ずつに分ける（<br> などの要素はそのまま残す）
  var split = function (el) {
    var n = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          Array.from(c.textContent).forEach(function (ch) {
            if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); return; }
            var sp = document.createElement("span");
            sp.className = "ch"; sp.textContent = ch;
            sp.style.setProperty("--i", n++);
            frag.appendChild(sp);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1 && c.tagName !== "BR") { walk(c); }
      });
    };
    walk(el);
    el.classList.add("split");
    el.setAttribute("aria-label", el.textContent);
  };
  document.querySelectorAll(".lp-title, .sec-title h2, .lp-end, .lp-reasons h3, .lp-price-name").forEach(split);

  // 2) 一行ずつ出すもの：親に .stagger、子に順番 --d
  var groups = ".lp-hero-in, .lp-worry, .lp-plan ul, .cmp ul, .lp-reasons, .lp-scenes, .lp-steps, .lp-works, .lp-flow, .lp-faq, .lp-price ul";
  document.querySelectorAll(groups).forEach(function (g) {
    g.classList.add("stagger");
    var k = 0;
    Array.prototype.forEach.call(g.children, function (c) { c.style.setProperty("--d", k++); });
  });

  // 3) ひとかたまりで浮かぶもの
  var blocks = ".sec-title .label, .sec-note, .more, .lp-plan, .cmp, .lp-price, .lp-mock, .lp-student, .lp-end-note, .lp-end-hint, #contact .btn, .lp-plan-lead, .cmp-h";
  document.querySelectorAll(blocks).forEach(function (el) { el.classList.add("rise"); });
  document.querySelectorAll(".cmp-a").forEach(function (el) { el.classList.add("from-l"); });
  document.querySelectorAll(".cmp-b").forEach(function (el) { el.classList.add("from-r"); });

  // 4) 価格の数え上げ
  var countUp = function (b) {
    var to = parseInt(b.textContent.replace(/[^\d]/g, ""), 10);
    if (!to) return;
    var t0 = null, dur = 1200;
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      b.textContent = Math.round(to * e).toLocaleString("ja-JP");
      if (p < 1) requestAnimationFrame(step);
    };
    b.textContent = "0";
    requestAnimationFrame(step);
  };

  var targets = document.querySelectorAll(".split, .stagger, .rise, .lp-price-tag b");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.matches(".lp-price-tag b")) countUp(el); else el.classList.add("in");
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  targets.forEach(function (el) { io.observe(el); });

  // 5) 見出しは、スクロールに合わせて少しだけ遅れてついてくる
  var heads = Array.prototype.slice.call(document.querySelectorAll(".sec-title"));
  var ticking = false;
  var drift = function () {
    ticking = false;
    var vh = window.innerHeight;
    heads.forEach(function (h) {
      var r = h.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh; // 画面中央で 0
      h.style.setProperty("--drift", (p * 28).toFixed(1) + "px");
    });
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
  drift();
})();
