/* ============================================
   NAVIGATION — Scroll Spy & Smooth Scroll
   ============================================ */

(function() {
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinksContainer = document.querySelector('.nav__links');

  // ── Smooth Scroll on click ──
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Only smooth scroll for internal section anchors
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        navLinksContainer.classList.remove('open');
      }
    });
  });

  // ── Hamburger toggle ──
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // ── Scroll Spy with IntersectionObserver ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

  // ── Reveal on scroll ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();
