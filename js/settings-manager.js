/**
 * ============================================================================
 * SETTINGS-MANAGER.JS - One-Page Customization Dashboard & Drawer Engine
 * Live preview, typography, layout scaling, effects toggle, JSON import/export
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_SETTINGS_KEY = 'portfolio_user_preferences';

  const defaultPreferences = {
    theme: 'dark',
    colorScheme: 'violet',
    customHex: '#8B5CF6',
    fontPairing: 'syne',
    baseFontSize: 16,
    headingWeight: 700,
    cardRadius: 'medium', // 'sharp' (8px) | 'medium' (18px) | 'rounded' (28px) | 'pill' (38px)
    spacingMode: 'comfortable', // 'compact' | 'comfortable' | 'spacious'
    containerWidth: '1440px',
    animationIntensity: 'normal', // 'subtle' | 'normal' | 'energetic' | 'off'
    enableCursor: true,
    enableBackgroundEffects: true,
    enableSmoothScroll: true
  };

  const SettingsManager = {
    prefs: { ...defaultPreferences },
    isOpen: false,

    /**
     * Load persisted preferences from localStorage
     */
    loadPreferences() {
      try {
        const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.prefs = { ...defaultPreferences, ...parsed };
        }
      } catch (e) {
        console.warn('Unable to load preferences, using defaults:', e);
        this.prefs = { ...defaultPreferences };
      }
    },

    /**
     * Save active preferences to localStorage
     */
    savePreferences() {
      try {
        localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(this.prefs));
        if (window.Components?.showToast) {
          window.Components.showToast('Preferences saved successfully!');
        }
      } catch (e) {
        console.error('Failed to save preferences:', e);
      }
    },

    /**
     * Apply active preferences immediately to the DOM and CSS variables
     */
    applyPreferences() {
      const root = document.documentElement;

      // 1. Theme
      if (window.ThemeManager) {
        window.ThemeManager.setTheme(this.prefs.theme, false);
      }

      // 2. Color Scheme
      if (window.ColorManager) {
        if (this.prefs.colorScheme === 'custom') {
          window.ColorManager.applyColor(this.prefs.customHex, 'custom', false);
        } else {
          window.ColorManager.setPreset(this.prefs.colorScheme);
        }
      }

      // 3. Typography
      const fontMap = {
        syne: { heading: "'Syne', sans-serif", body: "'Plus Jakarta Sans', sans-serif" },
        outfit: { heading: "'Outfit', sans-serif", body: "'Inter', sans-serif" },
        jakarta: { heading: "'Plus Jakarta Sans', sans-serif", body: "'Inter', sans-serif" },
        space: { heading: "'Space Grotesk', sans-serif", body: "'Outfit', sans-serif" }
      };

      const selectedFonts = fontMap[this.prefs.fontPairing] || fontMap.syne;
      root.style.setProperty('--font-heading', selectedFonts.heading);
      root.style.setProperty('--font-body', selectedFonts.body);
      root.style.setProperty('--font-size-base', `${this.prefs.baseFontSize}px`);
      root.style.setProperty('--font-weight-bold', this.prefs.headingWeight);

      // 4. Layout: Card Radius
      const radiusMap = {
        sharp: '8px',
        medium: '18px',
        rounded: '26px',
        pill: '36px'
      };
      root.style.setProperty('--card-radius', radiusMap[this.prefs.cardRadius] || '18px');

      // 5. Layout: Spacing
      const spacingMap = {
        compact: 'clamp(3.5rem, 6vw, 5rem)',
        comfortable: 'clamp(4.5rem, 8vw, 7.5rem)',
        spacious: 'clamp(6rem, 10vw, 10rem)'
      };
      root.style.setProperty('--section-spacing', spacingMap[this.prefs.spacingMode] || spacingMap.comfortable);
      root.style.setProperty('--container-width', this.prefs.containerWidth);

      // 6. Effects: Animation Intensity
      root.setAttribute('data-anim-intensity', this.prefs.animationIntensity);
      root.setAttribute('data-animations', this.prefs.animationIntensity === 'off' ? 'false' : 'true');

      // 7. Background Effects
      const bgWrappers = document.querySelectorAll('.site-bg-wrapper');
      bgWrappers.forEach(bg => {
        bg.style.display = this.prefs.enableBackgroundEffects ? 'block' : 'none';
      });

      // 8. Custom Cursor
      const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-ring');
      cursorElements.forEach(el => {
        el.style.display = this.prefs.enableCursor ? 'block' : 'none';
      });

      // 9. Smooth Scroll
      root.style.scrollBehavior = this.prefs.enableSmoothScroll ? 'smooth' : 'auto';

      this.syncControlsUI();
    },

    /**
     * Synchronize control values in the drawer DOM
     */
    syncControlsUI() {
      // Font size slider & label
      const fontSizeInput = document.querySelector('#pref-font-size');
      const fontSizeVal = document.querySelector('#pref-font-size-val');
      if (fontSizeInput && fontSizeVal) {
        fontSizeInput.value = this.prefs.baseFontSize;
        fontSizeVal.textContent = `${this.prefs.baseFontSize}px`;
      }

      // Heading weight
      const weightSelect = document.querySelector('#pref-heading-weight');
      if (weightSelect) weightSelect.value = this.prefs.headingWeight;

      // Font pairing
      const fontSelect = document.querySelector('#pref-font-pairing');
      if (fontSelect) fontSelect.value = this.prefs.fontPairing;

      // Spacing
      const spacingSelect = document.querySelector('#pref-spacing-mode');
      if (spacingSelect) spacingSelect.value = this.prefs.spacingMode;

      // Card Radius
      const radiusSelect = document.querySelector('#pref-card-radius');
      if (radiusSelect) radiusSelect.value = this.prefs.cardRadius;

      // Container Width
      const containerSelect = document.querySelector('#pref-container-width');
      if (containerSelect) containerSelect.value = this.prefs.containerWidth;

      // Animation Intensity
      const animSelect = document.querySelector('#pref-anim-intensity');
      if (animSelect) animSelect.value = this.prefs.animationIntensity;

      // Toggles
      const cursorToggle = document.querySelector('#pref-enable-cursor');
      if (cursorToggle) cursorToggle.checked = this.prefs.enableCursor;

      const bgToggle = document.querySelector('#pref-enable-bg');
      if (bgToggle) bgToggle.checked = this.prefs.enableBackgroundEffects;

      const scrollToggle = document.querySelector('#pref-enable-scroll');
      if (scrollToggle) scrollToggle.checked = this.prefs.enableSmoothScroll;
    },

    /**
     * Toggle settings drawer open/close
     */
    toggleDrawer() {
      this.isOpen ? this.closeDrawer() : this.openDrawer();
    },

    openDrawer() {
      this.isOpen = true;
      const drawer = document.querySelector('.settings-drawer');
      const backdrop = document.querySelector('.drawer-backdrop');
      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeDrawer() {
      this.isOpen = false;
      const drawer = document.querySelector('.settings-drawer');
      const backdrop = document.querySelector('.drawer-backdrop');
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    },

    /**
     * Reset all settings to defaults with explicit confirmation
     */
    resetPreferences() {
      if (confirm('Are you sure you want to restore default design system settings?')) {
        this.prefs = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_SETTINGS_KEY);
        localStorage.removeItem('portfolio_theme');
        localStorage.removeItem('portfolio_color_scheme');
        localStorage.removeItem('portfolio_custom_hex');

        this.applyPreferences();
        if (window.ThemeManager) window.ThemeManager.setTheme('dark', true);
        if (window.ColorManager) window.ColorManager.resetToDefault();

        if (window.Components?.showToast) {
          window.Components.showToast('Design system restored to defaults.');
        }
      }
    },

    /**
     * Export active configuration as JSON file
     */
    exportSettingsJSON() {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.prefs, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'portfolio-design-preferences.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      if (window.Components?.showToast) {
        window.Components.showToast('Exported preferences as JSON!');
      }
    },

    /**
     * Import configuration from uploaded JSON file
     */
    importSettingsJSON(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          this.prefs = { ...defaultPreferences, ...imported };
          this.savePreferences();
          this.applyPreferences();
          if (window.Components?.showToast) {
            window.Components.showToast('Custom preferences imported successfully!');
          }
        } catch (err) {
          alert('Invalid JSON file format. Please check the file and try again.');
        }
      };
      reader.readAsText(file);
    },

    init() {
      this.loadPreferences();
      this.applyPreferences();

      // Listen for drawer tab switches
      document.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.drawer-tab-btn');
        if (tabBtn) {
          const targetTab = tabBtn.getAttribute('data-tab');
          document.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.drawer-tab-pane').forEach(p => p.classList.remove('active'));

          tabBtn.classList.add('active');
          const targetPane = document.querySelector(`.drawer-tab-pane[data-pane="${targetTab}"]`);
          if (targetPane) targetPane.classList.add('active');
        }

        // Close drawer on backdrop click
        if (e.target.matches('.drawer-backdrop') || e.target.closest('.drawer-close-btn')) {
          this.closeDrawer();
        }

        // Open drawer on FAB click or nav customize trigger
        if (e.target.closest('.settings-fab') || e.target.closest('.nav-customize-trigger')) {
          this.toggleDrawer();
        }
      });

      // Escape key closes drawer
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });
    }
  };

  window.SettingsManager = SettingsManager;
})();
