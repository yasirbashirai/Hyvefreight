/* ============================================================
   HYVE FREIGHT SERVICES — site behavior
   Header collapse, quote modal, scroll journey, reveals, forms
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* ?noanim — used for QA screenshots / motion-free preview */
  if (location.search.indexOf('noanim') !== -1) {
    document.documentElement.classList.add('no-anim');
    reduceMotion = true;
  }

  /* ---------- header: full lockup -> hex-only on scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  /* ---------- quote modal ---------- */
  var overlay = document.getElementById('quoteModal');
  function openModal(e) {
    if (e) e.preventDefault();
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-quote]').forEach(function (el) {
    el.addEventListener('click', openModal);
  });
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  /* ---------- forms: compose a mail to sales@ until SMTP is wired ---------- */
  document.querySelectorAll('form[data-mailform]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var subject = form.getAttribute('data-subject') || 'Website Inquiry - hyvedelivers.com';
      var lines = [];
      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        if (f.name && f.value) lines.push(f.name + ': ' + f.value);
      });
      window.location.href = 'mailto:sales@hyvedelivers.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Your email app should open with the details filled in, just hit send. Or email us directly at sales@hyvedelivers.com.';
    });
  });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- services accordion ---------- */
  var strip = document.querySelector('.services-strip');
  if (strip) {
    var cards = strip.querySelectorAll('.svc');
    cards.forEach(function (card) {
      ['click', 'mouseenter'].forEach(function (evt) {
        card.addEventListener(evt, function () {
          cards.forEach(function (c) { c.classList.remove('open'); });
          card.classList.add('open');
        });
      });
    });
  }

  /* ---------- stat count-up ---------- */
  var statIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      statIo.unobserve(en.target);
      var el = en.target, target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { statIo.observe(el); });

  /* ---------- GSAP-driven motion (homepage) ---------- */
  if (window.gsap && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    /* hero strike-through draws itself, then "Partners" sweeps in */
    var strike = document.querySelector('.strike-line path');
    if (strike) {
      var len = strike.getTotalLength();
      gsap.set(strike, { strokeDasharray: len, strokeDashoffset: len });
      var tl = gsap.timeline({ delay: 0.55 });
      tl.to(strike, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' })
        .from('.hero-partners', { opacity: 0, y: 26, rotate: -10, duration: 0.7, ease: 'back.out(1.6)' }, '-=0.15')
        .from('.hero-tag', { opacity: 0, y: 18, duration: 0.5 }, '-=0.3')
        .from('.hero-ctas .btn', { opacity: 0, y: 16, stagger: 0.12, duration: 0.45 }, '-=0.25');
      var uline = document.querySelector('.hero-partners .underline path');
      if (uline) {
        var ul = uline.getTotalLength();
        gsap.set(uline, { strokeDasharray: ul, strokeDashoffset: ul });
        tl.to(uline, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, '-=0.6');
      }
    }

    /* parallax on any element tagged data-speed */
    document.querySelectorAll('[data-speed]').forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-speed'));
      gsap.to(el, {
        yPercent: speed * 9,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* hex standard connector dashes draw across */
    var connector = document.querySelector('.hex-connector line');
    if (connector) {
      gsap.from(connector, {
        attr: { x2: 0 },
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hex-grid', start: 'top 70%' }
      });
    }
  }

  /* ---------- journey rail: truck rides the route as you scroll ---------- */
  var rail = document.querySelector('.journey-rail');
  if (rail) {
    var truck = rail.querySelector('.rail-truck');
    var fill = rail.querySelector('.rail-fill');
    var waypoints = rail.querySelectorAll('.waypoint');
    var sections = document.querySelectorAll('[data-journey]');

    /* place a waypoint hex per journey section, spread along the rail */
    function railUpdate() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      truck.style.top = (p * 100) + '%';
      fill.style.height = (p * 100) + '%';
      waypoints.forEach(function (w) {
        w.classList.toggle('lit', p >= parseFloat(w.getAttribute('data-at')));
      });
      rail.classList.toggle('on', window.scrollY > window.innerHeight * 0.4 && p < 0.985);
    }
    /* evenly distribute waypoints by their target sections' positions */
    function railLayout() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      sections.forEach(function (sec, i) {
        if (!waypoints[i]) return;
        var at = max > 0 ? Math.min(Math.max(sec.offsetTop / max, 0.02), 0.98) : 0;
        waypoints[i].style.top = (at * 100) + '%';
        waypoints[i].setAttribute('data-at', at.toFixed(3));
      });
    }
    railLayout();
    window.addEventListener('resize', railLayout);
    window.addEventListener('scroll', railUpdate, { passive: true });
    railUpdate();
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* temporary debug: ?debugw reports widest elements in the title */
if (location.search.indexOf('debugw') !== -1) {
  window.addEventListener('load', function () {
    var doc = document.documentElement;
    var out = 'sw=' + doc.scrollWidth + ' vw=' + window.innerWidth;
    var offenders = [];
    document.querySelectorAll('*').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.right > window.innerWidth + 2 || r.left < -2) {
        offenders.push(el.tagName + '.' + (el.className && el.className.baseVal ? el.className.baseVal : el.className || '').toString().split(' ')[0] + ':' + Math.round(r.left) + '-' + Math.round(r.right));
      }
    });
    document.title = out + ' | ' + offenders.slice(0, 12).join(' | ');
  });
}
