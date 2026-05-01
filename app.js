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

// ── Hero cycling text ─────────────────────────────────────────────────────
(function () {
  const el = document.getElementById("hero-cycle");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const phrases = ["Perform Better.", "Recover Faster."];
  let i = 0;

  el.style.transition = "opacity 500ms ease-in-out";

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
