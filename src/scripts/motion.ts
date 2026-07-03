/**
 * BeeCooLabs — motion & interaction layer (direction 1c: quiet, premium).
 * Progressive enhancement only: without JS the page is fully visible and usable.
 *
 *  1. Staggered scroll reveal (IntersectionObserver)
 *  2. Gentle parallax on hero backdrop shapes (desktop, rAF-throttled)
 *  3. Nav shadow once scrolled
 *  4. Idea form — client-side confirmation (no storage, no network today)
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* 1 — scroll reveal                                                   */
/* ------------------------------------------------------------------ */

const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (prefersReducedMotion) {
  // CSS already forces everything visible; just drop the reveal hooks.
  revealables.forEach((el) => el.removeAttribute('data-reveal'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-revealed');
        revealObserver.unobserve(el);

        // Once the reveal transition finishes, remove the hooks entirely so
        // card hover transforms/transitions behave normally afterwards.
        const delay = parseFloat(getComputedStyle(el).transitionDelay || '0') * 1000;
        window.setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.classList.remove('is-revealed');
        }, 750 + delay);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
  );

  revealables.forEach((el) => revealObserver.observe(el));
}

/* ------------------------------------------------------------------ */
/* 2 — gentle parallax (desktop pointers only, rAF-throttled)          */
/* ------------------------------------------------------------------ */

const isDesktop = window.matchMedia('(min-width: 901px) and (hover: hover)').matches;
const parallaxLayers = document.querySelectorAll<HTMLElement>('[data-parallax]');

if (!prefersReducedMotion && isDesktop && parallaxLayers.length > 0) {
  let ticking = false;

  const applyParallax = () => {
    const y = window.scrollY;
    // only meaningful within the first viewport (hero); cheap early exit after
    if (y < window.innerHeight * 1.2) {
      parallaxLayers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax ?? '0');
        layer.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    },
    { passive: true },
  );
}

/* ------------------------------------------------------------------ */
/* 3 — nav shadow once scrolled                                        */
/* ------------------------------------------------------------------ */

const nav = document.querySelector('[data-nav]');
if (nav) {
  const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ------------------------------------------------------------------ */
/* 4 — idea form: confirmation only (nothing stored or sent today)     */
/* ------------------------------------------------------------------ */

const form = document.querySelector<HTMLFormElement>('[data-idea-form]');
const status = document.querySelector<HTMLElement>('[data-form-status]');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in the idea title and short message.';
      status.classList.add('is-error');
      return;
    }

    // FUTURE BACKEND HOOK — replace the two lines below with e.g.:
    //   await fetch('/api/ideas', { method: 'POST', body: new FormData(form) });
    // Nothing is stored or transmitted in this static version.
    form.reset();
    status.classList.remove('is-error');
    status.textContent = 'Thanks — idea capture will be connected soon.';
  });
}
