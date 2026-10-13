/**
 * ============================================================================
 * ANIMATIONS.JS - Motion Architecture & Interactive Micro-Effects
 * IntersectionObserver reveals, custom cursor physics, magnetic buttons & counters
 * ============================================================================
 */

(function () {
  'use strict';

  const Animations = {
    observer: null,

    /**
     * Initialize IntersectionObserver for scroll reveals
     */
    initScrollReveals() {
      // Check for reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
          el.classList.add('is-visible');
        });
        return;
      }

      const options = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
      };

      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      this.observeElements();
    },

    observeElements() {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      elements.forEach(el => {
        if (!el.classList.contains('is-visible')) {
          this.observer?.observe(el);
        }
      });
    },

    /**
     * Smooth interactive custom cursor tracking
     */
    initCustomCursor() {
      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');
      if (!dot || !ring) return;

      // Disable on touch devices
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        return;
      }

      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }, { passive: true });

      // Animate trailing ring with requestAnimationFrame interpolation
      const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
      };
      requestAnimationFrame(renderCursor);

      // Expand ring on interactive elements
      const interactiveSelector = 'a, button, input, select, textarea, .card, .clickable';
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.add('cursor-hover');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.remove('cursor-hover');
        }
      });
    },

    /**
     * Animate numeric counters when scrolled into view
     */
    initStatCounters() {
      const counterElements = document.querySelectorAll('.stat-counter');
      if (!counterElements.length) return;

      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1400;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const easeProgress = 1 - (1 - progress) * (1 - progress);
              const current = Math.floor(easeProgress * target);

              el.textContent = current;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                el.textContent = target;
              }
            };

            requestAnimationFrame(updateCount);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counterElements.forEach(el => counterObserver.observe(el));
    },

    /**
     * Subtle 3D Card tilt effect on hover
     */
    initCardTilts() {
      if (window.matchMedia('(hover: none)').matches) return;

      const cards = document.querySelectorAll('.hero-portrait-card, .tilt-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    },

    init() {
      this.initScrollReveals();
      this.initCustomCursor();
      this.initStatCounters();
      this.initCardTilts();
    }
  };

  window.Animations = Animations;
})();
