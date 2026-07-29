/* mehmetaytugyuruk.github.io — main.js
   Theme toggle · animated canvas background (soft drifting blobs)
   ---------------------------------------------------------------- */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ──────────────────────────────────────────────────────────────
     Theme
  ────────────────────────────────────────────────────────────── */

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(t) {
    root.dataset.theme = t;
    var m = document.getElementById('meta-theme-color');
    if (m) m.setAttribute('content', t === 'dark' ? '#1B1A18' : '#F7F6F2');
    try { localStorage.setItem('theme', t); } catch (e) {}
  }

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  /* ──────────────────────────────────────────────────────────────
     Animated Canvas Background
     Three large, very transparent radial gradient blobs that
     drift slowly around the viewport using sin/cos functions.
  ────────────────────────────────────────────────────────────── */

  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var raf = null;
  var running = false;
  var tick = 0;

  /* Blob parameters (fractional viewport coords) */
  var BLOBS = [
    { ox: 0.16, oy: 0.24, r: 0.58, phase: 0.00,     ax: 0.11, ay: 0.07, spd: 0.00022 },
    { ox: 0.82, oy: 0.77, r: 0.50, phase: Math.PI,  ax: 0.09, ay: 0.12, spd: 0.00031 },
    { ox: 0.54, oy: 0.43, r: 0.63, phase: 1.57,     ax: 0.06, ay: 0.08, spd: 0.00017 },
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function blobColor(alpha) {
    /* Indigo tone: dark mode uses lighter indigo, light mode uses deep indigo */
    return currentTheme() === 'dark'
      ? 'rgba(147,160,224,' + alpha + ')'
      : 'rgba(46,58,140,'   + alpha + ')';
  }

  function frame() {
    if (!running) return;
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var maxA = currentTheme() === 'dark' ? 0.062 : 0.052;

    for (var i = 0; i < BLOBS.length; i++) {
      var b = BLOBS[i];
      var x = (b.ox + b.ax * Math.sin(tick * b.spd + b.phase)) * w;
      var y = (b.oy + b.ay * Math.cos(tick * b.spd * 1.41 + b.phase + 0.9)) * h;
      var r = b.r * Math.min(w, h);

      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,   blobColor(maxA));
      g.addColorStop(0.4, blobColor(maxA * 0.32));
      g.addColorStop(1,   blobColor(0));

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.2832);
      ctx.fill();
    }

    tick += 16;
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    frame();
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  /* Pause animation when tab is hidden (saves CPU) */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stop(); } else { start(); }
  });

  /* Debounced resize */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  /* Initialise */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize();

  if (!reduceMotion) {
    /* Small delay so first paint completes before animation starts */
    setTimeout(function () {
      canvas.classList.add('visible');
      start();
    }, 250);
  }

})();
