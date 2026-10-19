/**
 * ============================================================================
 * ROMANTIC-GALLERY.JS
 * Our Little Universe — Interactive Couple Photo Gallery Engine
 * Smooth transitions, touch swipe gestures, dynamic particle canvas & audio-free magic
 * ============================================================================
 */

(function () {
  'use strict';

  /**
   * --------------------------------------------------------------------------
   * 1. PERSONAL COUPLE PHOTO CONFIGURATION
   * --------------------------------------------------------------------------
   * Personalize this gallery easily by replacing these paths with your photos!
   * Recommended location: assets/images/romantic/couple-1.jpg, couple-2.jpg, etc.
   * Supported formats: .jpg, .jpeg, .png, .webp
   * If any image is not yet on disk, a beautiful romantic fallback card is shown automatically.
   */
  const couplePhotos = [
    {
      src: "assets/images/romantic/love-img-1.jpeg",
      alt: "Our special memory together",
      caption: "In a world full of people, my heart chose you. ❤️",
      position: "center 20%"
    },
    {
      src: "assets/images/romantic/love-img-2.jpeg",
      alt: "Our sanctuary of peace and love",
      caption: "You are my favorite place to go when my mind searches for peace.",
      position: "center 20%"
    },
    {
      src: "assets/images/romantic/love-img-3.jpeg",
      alt: "A golden chapter of our love story",
      caption: "Every love story is beautiful, but ours is my favorite.",
      position: "center 25%"
    },
    {
      src: "assets/images/romantic/love-img-4.jpeg",
      alt: "Choosing you in every lifetime",
      caption: "If I could choose again, I would still choose you.",
      position: "center 20%"
    },
    {
      src: "assets/images/romantic/love-img-5.jpeg",
      alt: "Your radiant and magical smile",
      caption: "Your smile makes even my ordinary days feel magical.",
      position: "center 25%"
    },
    {
      src: "assets/images/romantic/love-img-6.jpeg",
      alt: "Finding home in your embrace",
      caption: "Some moments become memories; some people become home.",
      position: "center 25%"
    },
    {
      src: "assets/images/romantic/love-img-7.jpeg",
      alt: "Peaceful quiet moments with you",
      caption: "With you, even silence feels beautiful.",
      position: "center 20%"
    }
  ];

  // Expose to global window scope for external access and console personalization
  window.COUPLE_PHOTOS = couplePhotos;
  if (window.PORTFOLIO_DATA) {
    window.PORTFOLIO_DATA.couplePhotos = couplePhotos;
  }

  /**
   * --------------------------------------------------------------------------
   * 2. STATE & CONFIGURATION CONSTANTS
   * --------------------------------------------------------------------------
   */
  const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds per slide
  let currentIndex = 0;
  let autoplayTimer = null;
  let progressAnimationId = null;
  let progressStartTime = 0;
  let isAutoplayActive = true;
  let isUserInteracting = false;
  let isSectionInView = true;

  // Touch Swipe State
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 45; // Minimum horizontal px to register swipe

  // DOM Elements cache
  let sectionEl = null;
  let cardEl = null;
  let mediaWrapperEl = null;
  let fallbackDisplayEl = null;
  let fallbackTitleEl = null;
  let fallbackPathEl = null;
  let captionQuoteEl = null;
  let counterCurrentEl = null;
  let counterTotalEl = null;
  let progressBarEl = null;
  let paginationContainerEl = null;
  let prevBtnEl = null;
  let nextBtnEl = null;
  let playPauseBtnEl = null;

  // Image Elements Cache
  const imgElements = [];
  const imageLoadedStatus = {}; // { [index]: boolean }

  /**
   * --------------------------------------------------------------------------
   * 3. INITIALIZATION
   * --------------------------------------------------------------------------
   */
  function init() {
    sectionEl = document.getElementById('romantic-universe');
    if (!sectionEl) return;

    cardEl = sectionEl.querySelector('.romantic-card');
    mediaWrapperEl = sectionEl.querySelector('.romantic-media-wrapper');
    fallbackDisplayEl = sectionEl.querySelector('.romantic-fallback-display');
    fallbackTitleEl = sectionEl.querySelector('.romantic-fallback-title');
    fallbackPathEl = sectionEl.querySelector('.romantic-fallback-path');
    captionQuoteEl = sectionEl.querySelector('.romantic-caption-quote');
    counterCurrentEl = sectionEl.querySelector('#romantic-counter-current');
    counterTotalEl = sectionEl.querySelector('#romantic-counter-total');
    progressBarEl = sectionEl.querySelector('.romantic-progress-bar');
    paginationContainerEl = sectionEl.querySelector('.romantic-pagination');
    prevBtnEl = sectionEl.querySelector('#romantic-prev-btn');
    nextBtnEl = sectionEl.querySelector('#romantic-next-btn');
    playPauseBtnEl = sectionEl.querySelector('#romantic-play-pause-btn');

    if (counterTotalEl) {
      counterTotalEl.textContent = String(couplePhotos.length).padStart(2, '0');
    }

    buildPagination();
    preloadAndSetupImages();
    setupEventListeners();
    initStarfieldCanvas();
    initVisibilityObserver();

    // Render initial slide
    renderSlide(0, false);
    startAutoplay();
  }

  /**
   * --------------------------------------------------------------------------
   * 4. IMAGE PRELOADING & DOM MOUNTING
   * --------------------------------------------------------------------------
   */
  function preloadAndSetupImages() {
    if (!mediaWrapperEl) return;

    couplePhotos.forEach((photo, idx) => {
      const img = document.createElement('img');
      img.className = 'romantic-photo';
      img.alt = photo.alt || `Couple Memory ${idx + 1}`;
      img.style.objectPosition = photo.position || 'center';
      img.loading = idx < 2 ? 'eager' : 'lazy';
      img.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');

      img.onload = () => {
        imageLoadedStatus[idx] = true;
        img.style.display = 'block';
        if (currentIndex === idx && fallbackDisplayEl) {
          fallbackDisplayEl.style.display = 'none';
        }
      };

      img.onerror = () => {
        imageLoadedStatus[idx] = false;
        img.style.display = 'none';
        if (currentIndex === idx) {
          showFallbackForSlide(idx);
        }
      };

      img.src = photo.src;
      if (img.complete && img.naturalWidth > 0) {
        imageLoadedStatus[idx] = true;
        img.style.display = 'block';
        if (currentIndex === idx && fallbackDisplayEl) {
          fallbackDisplayEl.style.display = 'none';
        }
      }

      mediaWrapperEl.appendChild(img);
      imgElements.push(img);
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 5. SLIDE RENDERING & TRANSITIONS
   * --------------------------------------------------------------------------
   */
  function renderSlide(index, animate = true) {
    if (index < 0) index = couplePhotos.length - 1;
    if (index >= couplePhotos.length) index = 0;

    const previousIndex = currentIndex;
    currentIndex = index;

    const photoData = couplePhotos[index];

    // 1. Update Photos visibility & classes
    imgElements.forEach((img, idx) => {
      if (idx === index) {
        img.classList.remove('is-leaving');
        img.classList.add('is-active');
        img.setAttribute('aria-hidden', 'false');

        // Check if image is loaded or failed
        if (imageLoadedStatus[idx] === false) {
          img.style.display = 'none';
          showFallbackForSlide(idx);
        } else if (imageLoadedStatus[idx] === true || (img.complete && img.naturalWidth > 0)) {
          imageLoadedStatus[idx] = true;
          img.style.display = 'block';
          if (fallbackDisplayEl) fallbackDisplayEl.style.display = 'none';
        } else {
          // Still loading: show fallback temporarily until onload fires
          showFallbackForSlide(idx);
        }
      } else {
        if (idx === previousIndex && animate) {
          img.classList.add('is-leaving');
          img.classList.remove('is-active');
          img.setAttribute('aria-hidden', 'true');
          setTimeout(() => {
            img.classList.remove('is-leaving');
          }, 850);
        } else {
          img.classList.remove('is-active', 'is-leaving');
          img.setAttribute('aria-hidden', 'true');
        }
      }
    });

    // 2. Update Romantic Caption with graceful upward slide
    if (captionQuoteEl) {
      captionQuoteEl.classList.remove('is-active');
      setTimeout(() => {
        captionQuoteEl.textContent = photoData.caption;
        captionQuoteEl.classList.add('is-active');
      }, animate ? 150 : 0);
    }

    // 3. Update Photo Counter (e.g. 01 / 10)
    if (counterCurrentEl) {
      counterCurrentEl.textContent = String(index + 1).padStart(2, '0');
    }

    // 4. Update Pagination Dots
    updatePaginationDots(index);

    // 5. Reset Autoplay progress animation
    resetProgress();
  }

  function showFallbackForSlide(idx) {
    if (!fallbackDisplayEl) return;
    fallbackDisplayEl.style.display = 'flex';
    if (fallbackTitleEl) {
      fallbackTitleEl.textContent = `Memory #${idx + 1} • Sacred Moment`;
    }
    if (fallbackPathEl) {
      fallbackPathEl.textContent = couplePhotos[idx].src;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 6. PAGINATION DOTS
   * --------------------------------------------------------------------------
   */
  function buildPagination() {
    if (!paginationContainerEl) return;
    paginationContainerEl.innerHTML = '';

    couplePhotos.forEach((photo, idx) => {
      const dot = document.createElement('button');
      dot.className = `romantic-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to couple memory ${idx + 1}`);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });

      paginationContainerEl.appendChild(dot);
    });
  }

  function updatePaginationDots(activeIndex) {
    if (!paginationContainerEl) return;
    const dots = paginationContainerEl.querySelectorAll('.romantic-dot');
    dots.forEach((dot, idx) => {
      const isActive = idx === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 7. NAVIGATION CONTROLS (Next, Prev, Jump)
   * --------------------------------------------------------------------------
   */
  function next() {
    renderSlide(currentIndex + 1);
  }

  function prev() {
    renderSlide(currentIndex - 1);
  }

  function goToSlide(index) {
    if (index === currentIndex) return;
    renderSlide(index);
  }

  /**
   * --------------------------------------------------------------------------
   * 8. AUTOPLAY & PROGRESS BAR SYSTEM
   * --------------------------------------------------------------------------
   */
  function startAutoplay() {
    if (!isAutoplayActive) return;
    clearAutoplay();

    progressStartTime = performance.now();
    animateProgress();

    autoplayTimer = setTimeout(() => {
      if (isAutoplayActive && !isUserInteracting && isSectionInView) {
        next();
        startAutoplay();
      }
    }, AUTOPLAY_INTERVAL);
  }

  function clearAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
    if (progressAnimationId) {
      cancelAnimationFrame(progressAnimationId);
      progressAnimationId = null;
    }
  }

  function resetProgress() {
    clearAutoplay();
    if (progressBarEl) {
      progressBarEl.style.width = '0%';
    }
    if (isAutoplayActive && !isUserInteracting && isSectionInView) {
      startAutoplay();
    }
  }

  function animateProgress() {
    if (!progressBarEl || !isAutoplayActive || isUserInteracting || !isSectionInView) {
      return;
    }

    const elapsed = performance.now() - progressStartTime;
    const percentage = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
    progressBarEl.style.width = `${percentage}%`;

    if (percentage < 100) {
      progressAnimationId = requestAnimationFrame(animateProgress);
    }
  }

  function toggleAutoplay() {
    isAutoplayActive = !isAutoplayActive;
    updatePlayPauseButtonUI();

    if (isAutoplayActive) {
      startAutoplay();
    } else {
      clearAutoplay();
      if (progressBarEl) {
        progressBarEl.style.width = '0%';
      }
    }
  }

  function updatePlayPauseButtonUI() {
    if (!playPauseBtnEl) return;
    playPauseBtnEl.setAttribute('aria-label', isAutoplayActive ? 'Pause slideshow' : 'Play slideshow');
    playPauseBtnEl.title = isAutoplayActive ? 'Pause Slideshow' : 'Play Slideshow';

    if (isAutoplayActive) {
      // Pause icon
      playPauseBtnEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        </svg>
      `;
    } else {
      // Play icon
      playPauseBtnEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 9. EVENT LISTENERS & TOUCH GESTURES
   * --------------------------------------------------------------------------
   */
  function setupEventListeners() {
    // Next / Prev button clicks
    if (nextBtnEl) {
      nextBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        next();
      });
    }

    if (prevBtnEl) {
      prevBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        prev();
      });
    }

    // Play / Pause button
    if (playPauseBtnEl) {
      playPauseBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAutoplay();
      });
    }

    // Pause on Mouse Enter, Resume on Mouse Leave
    if (cardEl) {
      cardEl.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        clearAutoplay();
      });

      cardEl.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        if (isAutoplayActive && isSectionInView) {
          startAutoplay();
        }
      });

      // Touch Events for Mobile Swipe
      cardEl.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isUserInteracting = true;
        clearAutoplay();
      }, { passive: true });

      cardEl.addEventListener('touchmove', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }, { passive: true });

      cardEl.addEventListener('touchend', () => {
        handleSwipeGesture();
        isUserInteracting = false;
        if (isAutoplayActive && isSectionInView) {
          startAutoplay();
        }
      });
    }

    // Keyboard Navigation (Left / Right Arrow Keys)
    window.addEventListener('keydown', (e) => {
      // Only trigger if section is in viewport
      if (!isSectionInView) return;

      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === ' ' && document.activeElement === cardEl) {
        e.preventDefault();
        toggleAutoplay();
      }
    });
  }

  function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Check if horizontal swipe dominates vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX < 0) {
        // Swiped Left -> Next Image
        next();
      } else {
        // Swiped Right -> Previous Image
        prev();
      }
    }

    // Reset touch coordinates
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
  }

  /**
   * --------------------------------------------------------------------------
   * 10. VISIBILITY OBSERVER (Conserve CPU & Pause Offscreen)
   * --------------------------------------------------------------------------
   */
  function initVisibilityObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSectionInView = entry.isIntersecting;
        if (isSectionInView) {
          if (isAutoplayActive && !isUserInteracting) {
            startAutoplay();
          }
        } else {
          clearAutoplay();
        }
      });
    }, { threshold: 0.2 });

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearAutoplay();
      } else if (isSectionInView && isAutoplayActive) {
        startAutoplay();
      }
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 11. STARFIELD & FLOATING HEART PARTICLES CANVAS
   * --------------------------------------------------------------------------
   */
  function initStarfieldCanvas() {
    const canvas = document.getElementById('romantic-stars-canvas');
    if (!canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let width = 0;
    let height = 0;

    function resize() {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    resize();
    window.addEventListener('resize', resize);

    // Particle Classes
    const stars = [];
    const NUM_STARS = Math.min(Math.floor(window.innerWidth / 18), 50);

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? 'rgba(255, 230, 240,' : 'rgba(255, 180, 200,'
      });
    }

    const floatingHearts = [];
    const NUM_HEARTS = 12;

    for (let i = 0; i < NUM_HEARTS; i++) {
      floatingHearts.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        size: Math.random() * 7 + 6,
        speedY: Math.random() * 0.35 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.4 + 0.15,
        pulse: Math.random() * Math.PI,
        color: Math.random() > 0.5 ? '#ff4d79' : '#fb7185'
      });
    }

    function drawHeart(x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + (size + topCurveHeight) / 1.4,
        x, y + size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 1.4,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function renderCanvas() {
      if (!isSectionInView) {
        animationFrameId = requestAnimationFrame(renderCanvas);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach(star => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.fillStyle = `${star.color} ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Floating Hearts
      floatingHearts.forEach(heart => {
        heart.y -= heart.speedY;
        heart.x += heart.speedX;
        heart.pulse += 0.03;

        // Wrap around top to bottom
        if (heart.y < -30) {
          heart.y = height + 20;
          heart.x = Math.random() * width;
        }
        if (heart.x < -30) heart.x = width + 20;
        if (heart.x > width + 30) heart.x = -20;

        const currentAlpha = heart.alpha + Math.sin(heart.pulse) * 0.08;
        drawHeart(heart.x, heart.y, heart.size, heart.color, Math.max(0.05, currentAlpha));
      });

      animationFrameId = requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }

  /**
   * --------------------------------------------------------------------------
   * 12. EXPORT & AUTO-INITIALIZATION
   * --------------------------------------------------------------------------
   */
  window.RomanticGallery = {
    init,
    next,
    prev,
    goToSlide,
    toggleAutoplay,
    photos: couplePhotos
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
