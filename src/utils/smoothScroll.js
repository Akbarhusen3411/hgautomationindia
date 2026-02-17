/**
 * Custom smooth scroll with easeInOutCubic easing
 * Replaces native scroll-behavior: smooth for consistent cross-browser results
 */

const easeInOutCubic = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const smoothScrollTo = (targetY, duration = 900) => {
  const startY = window.scrollY;
  const diff = targetY - startY;

  if (Math.abs(diff) < 1) return;

  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export const scrollToElement = (elementId, offset = 80) => {
  const el = document.getElementById(elementId);
  if (el) {
    const targetY = el.offsetTop - offset;
    smoothScrollTo(targetY);
  }
};
