// ── HR Zones Lottie animation ─────────────────────────────────────────────
function initHRZonesLottie() {
  var container = document.getElementById("hrzonesLottie");
  if (!container || typeof lottie === "undefined") return;
  if (container._lottieInit) return;
  container._lottieInit = true;
  var anim = lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/hrzones-lottie.json"
  });
  // Crop SVG viewBox to the card background rect bounds (canvas: 400×200)
  // Card rect center ~[200, 91], size [346×100], roundness 10 — crop with 4px padding
  anim.addEventListener("DOMLoaded", function () {
    var svg = container.querySelector("svg");
    if (!svg) return;
    // Card rect: x=26.5–372.8, y=41.2–141.2. Add 14px padding on all sides for rounded corners.
    svg.setAttribute("viewBox", "12 27 376 128");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.cssText = "width:100%;height:100%;display:block;";
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHRZonesLottie);
} else {
  initHRZonesLottie();
}

// ── Hero video: pause for reduced-motion preference ──────────────────────
(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var video = document.querySelector(".hero__video");
  if (!video) return;
  video.pause();
  video.removeAttribute("autoplay");
})();

/* ==========================================================================
   Morpheus — interactions
   - Hero: cycling headline text
   - Carousel: prev/next buttons, progress bar fill, native scroll support
   (FAQ accordion works natively via <details>; no JS needed.)
   ========================================================================== */

// ── Mobile menu (m-header hamburger) ─────────────────────────────────────
(function () {
  var btn     = document.getElementById("mHamburger");
  var menu    = document.getElementById("mMenu");
  var closeBtn = document.getElementById("mMenuClose");
  if (!btn || !menu || !closeBtn) return;

  function open() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    document.body.classList.add("m-menu-open");
    btn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  }
  function close() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("m-menu-open");
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  }

  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) close();
  });
})();

// ── Hero cycling text: "Perform Better." ↔ "Recover Faster." ────────────
(function () {
  const el = document.getElementById("hero-cycle");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const phrases = ["Perform Better.", "Recover Faster."];
  let i = 0;

  setInterval(function () {
    el.style.opacity = "0";
    setTimeout(function () {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = "1";
    }, 500);
  }, 3000);
})();

(function () {
  "use strict";

  // ----- Carousel -----
  const viewport = document.getElementById("carouselViewport");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const barFill = document.getElementById("carouselBarFill");

  if (!viewport || !prevBtn || !nextBtn || !barFill) return;

  const track = viewport.querySelector(".carousel__track");
  if (!track) return;

  function getStepSize() {
    const slide = track.querySelector(".carousel__slide");
    if (!slide) return viewport.clientWidth * 0.8;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "20") || 20;
    return slide.getBoundingClientRect().width + gap;
  }

  function updateBar() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) {
      barFill.style.width = "100%";
      return;
    }
    const ratio = Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll));
    // Start at 33% when at the very beginning (matches Figma), up to 100%.
    const pct = 33 + ratio * 67;
    barFill.style.width = pct + "%";
    prevBtn.disabled = viewport.scrollLeft <= 1;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll - 1;
  }

  prevBtn.addEventListener("click", function () {
    viewport.scrollBy({ left: -getStepSize(), behavior: "smooth" });
  });
  nextBtn.addEventListener("click", function () {
    viewport.scrollBy({ left: getStepSize(), behavior: "smooth" });
  });

  viewport.addEventListener("scroll", function () {
    window.requestAnimationFrame(updateBar);
  });
  window.addEventListener("resize", updateBar);

  // Initialise once layout settles.
  updateBar();
  window.requestAnimationFrame(updateBar);
})();

// ── Scroll reveal — fade-up for section titles and subtitles ─────────────
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(function (el) { observer.observe(el); });
})();

// Intensity scale-in removed — section now uses product video instead of static image.
