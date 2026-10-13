/**
 * ============================================================================
 * COLOR-MANAGER.JS - Dynamic Accent Color Architecture
 * Real-time CSS Custom Property derivation, Hex-to-RGB, Luminance & Contrast
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_color_scheme';
  const STORAGE_CUSTOM_KEY = 'portfolio_custom_hex';

  const ColorManager = {
    activeSchemeId: 'violet',
    activeHex: '#8B5CF6',

    /**
     * Parse hex color into RGB triplet {r, g, b}
     */
    hexToRgb(hex) {
      let cleanHex = hex.replace('#', '');
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(c => c + c).join('');
      }
      const num = parseInt(cleanHex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    },

    /**
     * Calculate relative luminance (WCAG formula)
     */
    getLuminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },

    /**
     * Determine optimal foreground text color (pure white or deep obsidian) for contrast
     */
    getContrastColor(hex) {
      const rgb = this.hexToRgb(hex);
      const luminance = this.getLuminance(rgb.r, rgb.g, rgb.b);
      return luminance > 0.45 ? '#090A10' : '#FFFFFF';
    },

    /**
     * Lighten or darken hex color by percentage
     */
    adjustBrightness(hex, percent) {
      const { r, g, b } = this.hexToRgb(hex);
      const adjust = (val) => {
        const adjusted = Math.round(val + (val * (percent / 100)));
        return Math.min(255, Math.max(0, adjusted));
      };
      const toHex = (n) => n.toString(16).padStart(2, '0');
      return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
    },

    /**
     * Apply color to CSS custom properties on <html> element
     */
    applyColor(hex, schemeId = 'custom', persist = true) {
      if (!hex || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        // Fallback to default violet if invalid hex
        hex = '#8B5CF6';
      }

      this.activeHex = hex;
      this.activeSchemeId = schemeId;

      const rgb = this.hexToRgb(hex);
      const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      const hoverHex = this.adjustBrightness(hex, -12);
      const lightHex = this.adjustBrightness(hex, 18);
      const darkHex = this.adjustBrightness(hex, -22);
      const contrastText = this.getContrastColor(hex);

      const root = document.documentElement;
      root.style.setProperty('--color-primary', hex);
      root.style.setProperty('--color-primary-rgb', rgbStr);
      root.style.setProperty('--color-primary-hover', hoverHex);
      root.style.setProperty('--color-primary-light', lightHex);
      root.style.setProperty('--color-primary-dark', darkHex);
      root.style.setProperty('--color-primary-glow', `rgba(${rgbStr}, 0.35)`);
      root.style.setProperty('--color-primary-text-contrast', contrastText);

      if (persist) {
        localStorage.setItem(STORAGE_KEY, schemeId);
        if (schemeId === 'custom') {
          localStorage.setItem(STORAGE_CUSTOM_KEY, hex);
        } else {
          localStorage.removeItem(STORAGE_CUSTOM_KEY);
        }
      }

      this.updateUIState();

      window.dispatchEvent(new CustomEvent('portfolio:color-changed', {
        detail: { schemeId, hex }
      }));
    },

    /**
     * Set color by preset ID
     */
    setPreset(presetId) {
      const presets = window.PORTFOLIO_CONFIG?.colorPresets || [];
      const preset = presets.find(p => p.id === presetId);
      if (preset) {
        this.applyColor(preset.hex, preset.id, true);
      }
    },

    /**
     * Reset to default config color scheme
     */
    resetToDefault() {
      const defaultScheme = window.PORTFOLIO_CONFIG?.appearance?.defaultColorScheme || 'violet';
      this.setPreset(defaultScheme);
    },

    /**
     * Initialize color scheme from localStorage or default config
     */
    initEarly() {
      const savedScheme = localStorage.getItem(STORAGE_KEY);
      const savedCustomHex = localStorage.getItem(STORAGE_CUSTOM_KEY);

      if (savedScheme === 'custom' && savedCustomHex) {
        this.applyColor(savedCustomHex, 'custom', false);
      } else if (savedScheme) {
        const presets = window.PORTFOLIO_CONFIG?.colorPresets || [];
        const preset = presets.find(p => p.id === savedScheme);
        if (preset) {
          this.applyColor(preset.hex, preset.id, false);
        } else {
          this.resetToDefault();
        }
      } else {
        this.resetToDefault();
      }
    },

    /**
     * Sync UI swatches and color picker inputs
     */
    updateUIState() {
      // Update swatch active classes
      const swatches = document.querySelectorAll('.color-swatch-btn');
      swatches.forEach(swatch => {
        const swatchId = swatch.getAttribute('data-preset-id');
        if (swatchId === this.activeSchemeId) {
          swatch.classList.add('active');
          swatch.setAttribute('aria-pressed', 'true');
        } else {
          swatch.classList.remove('active');
          swatch.setAttribute('aria-pressed', 'false');
        }
      });

      // Update color picker input value
      const colorPicker = document.querySelector('#custom-color-picker');
      if (colorPicker) {
        colorPicker.value = this.activeHex;
      }

      const hexValueLabel = document.querySelector('#custom-color-hex-label');
      if (hexValueLabel) {
        hexValueLabel.textContent = this.activeHex.toUpperCase();
      }
    },

    init() {
      this.initEarly();
      this.updateUIState();
    }
  };

  // Run early
  ColorManager.initEarly();

  window.ColorManager = ColorManager;
})();
