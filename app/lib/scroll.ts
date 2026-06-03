/** Height of the sticky landing nav (matches `LandingNav` / `scroll-padding-top`). */
export const LANDING_HEADER_OFFSET = 72;

/** Soft scroll bounds — eases in and out gently (not abrupt). */
const MIN_DURATION_MS = 520;
const MAX_DURATION_MS = 880;
const MS_PER_PX = 0.45;

let activeScroll: number | null = null;

/** Smooth start + smooth stop (feels fluid, not “hard”). */
function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
}

function getTargetTop(el: HTMLElement) {
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - LANDING_HEADER_OFFSET);
}

function getDuration(distancePx: number) {
  return Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, Math.abs(distancePx) * MS_PER_PX));
}

export function scrollToSection(href: string) {
  const id = href.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return;

  const targetTop = getTargetTop(el);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (activeScroll !== null) cancelAnimationFrame(activeScroll);
    activeScroll = null;
    window.scrollTo(0, targetTop);
    return;
  }

  if (activeScroll !== null) cancelAnimationFrame(activeScroll);

  const startTop = window.scrollY;
  const distance = targetTop - startTop;

  if (Math.abs(distance) < 2) return;

  const duration = getDuration(distance);
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuart(progress);

    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      activeScroll = requestAnimationFrame(tick);
    } else {
      activeScroll = null;
    }
  };

  activeScroll = requestAnimationFrame(tick);
}
