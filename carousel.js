(() => {
  const carousel = document.querySelector('[data-work-carousel]');

  if (!carousel) {
    return;
  }

  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const controls = carousel.querySelector('[data-carousel-controls]');
  const previous = carousel.querySelector('[data-carousel-previous]');
  const next = carousel.querySelector('[data-carousel-next]');
  const cards = Array.from(carousel.querySelectorAll('.work-card-shell'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 4000;

  if (!viewport || !controls || !previous || !next || cards.length < 2) {
    return;
  }

  let direction = 1;
  let timer = null;
  let hovering = false;
  let focused = false;

  const stepSize = () => cards[1].offsetLeft - cards[0].offsetLeft;
  const maximumScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  const goTo = (left, behavior = 'smooth') => {
    viewport.scrollTo({
      left: Math.max(0, Math.min(left, maximumScroll())),
      behavior,
    });
  };

  const stop = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const advance = () => {
    const current = viewport.scrollLeft;
    const maximum = maximumScroll();

    if (current >= maximum - 2) {
      direction = -1;
    } else if (current <= 2) {
      direction = 1;
    }

    goTo(current + (stepSize() * direction));
  };

  const start = () => {
    stop();
    if (!reducedMotion.matches && !document.hidden && !hovering && !focused) {
      timer = window.setInterval(advance, interval);
    }
  };

  const moveManually = (step) => {
    direction = step;
    const current = viewport.scrollLeft;
    const maximum = maximumScroll();

    if (step > 0 && current >= maximum - 2) {
      goTo(0);
    } else if (step < 0 && current <= 2) {
      goTo(maximum);
    } else {
      goTo(current + (stepSize() * step));
    }

    start();
  };

  controls.hidden = false;

  previous.addEventListener('click', () => moveManually(-1));
  next.addEventListener('click', () => moveManually(1));

  carousel.addEventListener('mouseenter', () => {
    hovering = true;
    stop();
  });
  carousel.addEventListener('mouseleave', () => {
    hovering = false;
    start();
  });
  carousel.addEventListener('focusin', () => {
    focused = true;
    stop();
  });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      focused = false;
      start();
    }
  });
  viewport.addEventListener('pointerdown', stop);
  viewport.addEventListener('pointerup', start);
  viewport.addEventListener('pointercancel', start);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  reducedMotion.addEventListener('change', start);

  start();
})();
