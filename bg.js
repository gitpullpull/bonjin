/* THE BONJIN — bg.js
   背景の作品「九十度」を受け持つ（全ページ共通）。
   - WebGL2が無い／動きを減らす設定なら、インク動画に差し替える
   - ページのスクロール位置を作品に送り、墨を回す（正面＝凡人、真横＝THE Bonjin） */
(function () {
  "use strict";
  var f = document.getElementById("bg-frame"), v = document.getElementById("bg-video");
  if (!f) return;
  var gl2 = false;
  try { gl2 = !!document.createElement("canvas").getContext("webgl2"); } catch (e) {}
  var calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (!gl2 || calm) {
    f.hidden = true;
    if (v) { v.hidden = false; if (calm) { v.removeAttribute("autoplay"); v.pause && v.pause(); } }
    return;
  }
  var ticking = false;
  function send() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    try { f.contentWindow.postMessage({ type: "bonjin-scroll", p: p }, "*"); } catch (e) {}
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(send); }
  }, { passive: true });
  window.addEventListener("resize", send);
  f.addEventListener("load", send);
  send();
})();
