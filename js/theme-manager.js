/**
 * ============================================================================
 * THEME-MANAGER.JS - Theme Architecture (Dark / Light Mode)
 * Zero-FOUC initialization, localStorage persistence, OS preference fallback
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_theme';

  const ThemeManager = {
    currentTheme: 'dark',

    /**
     * Initializes theme immediately to prevent Flash of Unstyled Content (FOUC).
     * Can be invoked synchronously in the <head> of any page.
     */
    initEarly() {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.currentTheme = savedTheme;
      } else {
        // Fall back to system preference or config default
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = prefersDark ? 'dark' : (window.PORTFOLIO_CONFIG?.appearance?.defaultTheme || 'dark');
      }
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    },

    /**
     * Set up interactive event listeners and sync buttons once DOM is loaded
     */
    init() {
      this.initEarly();
      this.updateToggles();

      // Listen for OS system preference changes if user hasn't explicitly saved a choice
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem(STORAGE_KEY)) {
            this.setTheme(e.matches ? 'dark' : 'light', false);
          }
        });
      }
    },

    /**
     * Set a specific theme ('dark' or 'light')
     * @param {string} theme 
     * @param {boolean} persist 
     */
    setTheme(theme, persist = true) {
      if (theme !== 'dark' && theme !== 'light') return;

      // Enable smooth transition class temporarily
      document.documentElement.classList.add('theme-transitioning');

      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);

      if (persist) {
        localStorage.setItem(STORAGE_KEY, theme);
      }

      this.updateToggles();

      // Notify other managers and components
      window.dispatchEvent(new CustomEvent('portfolio:theme-changed', {
        detail: { theme: this.currentTheme }
      }));

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 400);
    },

    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
      const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(nextTheme, true);
    },

    /**
     * Synchronize all theme toggle buttons across header, mobile drawer, and customization panel
     */
    updateToggles() {
      const isDark = this.currentTheme === 'dark';
      const toggles = document.querySelectorAll('.theme-toggle-btn');

      toggles.forEach((btn) => {
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        
        // Update SVG icon inside button
        btn.innerHTML = isDark
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>`;
      });

      // Update any theme radios in settings drawer
      const themeRadios = document.querySelectorAll('input[name="theme-setting"]');
      themeRadios.forEach((radio) => {
        radio.checked = radio.value === this.currentTheme;
      });
    }
  };

  // Run early immediately
  ThemeManager.initEarly();

  // Expose to window
  window.ThemeManager = ThemeManager;
})();
