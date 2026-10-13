/**
 * ============================================================================
 * COMPONENTS.JS - Shared Reusable Component Engine
 * Header, Mobile Menu, Footer, Customization Drawer, Project Cards, Modals
 * ============================================================================
 */

(function () {
  'use strict';

  const Components = {
    /**
     * Render the unified site header into the element with ID #site-header
     */
    renderHeader() {
      const headerContainer = document.getElementById('site-header');
      if (!headerContainer) return;

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const config = window.PORTFOLIO_CONFIG || (typeof PORTFOLIO_CONFIG !== 'undefined' ? PORTFOLIO_CONFIG : null);
      if (!config || !config.navigation) return;
      const assets = window.PORTFOLIO_ASSETS || (typeof PORTFOLIO_ASSETS !== 'undefined' ? PORTFOLIO_ASSETS : null);
      const logoUrl = (assets && assets.branding) ? assets.branding.logo : 'assets/images/logo.svg';

      const navLinksHtml = config.navigation.map(item => {
        const isActive = currentPath === item.path || (currentPath === '' && item.path === 'index.html');
        return `
          <a href="${item.path}" class="nav-link ${isActive ? 'active' : ''}" data-path="${item.path}">
            ${item.label}
          </a>
        `;
      }).join('');

      headerContainer.className = 'site-header';
      headerContainer.innerHTML = `
        <div class="container header-inner">
          <a href="index.html" class="brand-link" aria-label="Alex Rivera Portfolio Home">
            <img src="${logoUrl}" alt="Alex Rivera Monogram Logo" class="logo-img" width="140" height="36" />
          </a>

          <nav class="nav-links" aria-label="Main Navigation">
            ${navLinksHtml}
          </nav>

          <div class="nav-actions">
            <!-- Theme Toggle -->
            <button class="icon-btn theme-toggle-btn" aria-label="Toggle Dark/Light Mode" id="header-theme-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
              </svg>
            </button>

            <!-- Customization Panel Trigger -->
            <button class="icon-btn nav-customize-trigger" aria-label="Open Design System Customizer" title="Customize Design System">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>

            <!-- Let's Talk CTA -->
            <a href="contact.html" class="btn btn-primary btn-sm" style="display: none; @media(min-width: 640px){display:inline-flex;}">
              <span>Let's Talk</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button class="icon-btn mobile-menu-toggle" aria-label="Open Navigation Menu" id="mobile-toggle-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      `;

      // Header scroll shrink effect
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
          headerContainer.classList.add('scrolled');
        } else {
          headerContainer.classList.remove('scrolled');
        }
      }, { passive: true });
    },

    /**
     * Render the mobile menu drawer into #mobile-nav-container
     */
    renderMobileDrawer() {
      const container = document.getElementById('mobile-nav-container');
      if (!container) return;

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const config = window.PORTFOLIO_CONFIG || (typeof PORTFOLIO_CONFIG !== 'undefined' ? PORTFOLIO_CONFIG : null);
      if (!config || !config.navigation) return;
      const assets = window.PORTFOLIO_ASSETS || (typeof PORTFOLIO_ASSETS !== 'undefined' ? PORTFOLIO_ASSETS : null);
      const logoUrl = (assets && assets.branding) ? assets.branding.logo : 'assets/images/logo.svg';

      const mobileLinks = config.navigation.map(item => {
        const isActive = currentPath === item.path || (currentPath === '' && item.path === 'index.html');
        return `
          <a href="${item.path}" class="mobile-nav-link ${isActive ? 'active' : ''}">
            <span>${item.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        `;
      }).join('');

      container.innerHTML = `
        <div class="mobile-nav-backdrop" id="mobile-backdrop"></div>
        <div class="mobile-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div class="mobile-drawer-header">
            <a href="index.html" class="brand-link">
              <img src="${logoUrl}" alt="Alex Rivera Logo" height="32" />
            </a>
            <button class="icon-btn" id="mobile-close-btn" aria-label="Close Navigation Menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="mobile-nav-links">
            ${mobileLinks}
          </div>
          <div style="margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="contact.html" class="btn btn-primary" style="width: 100%;">Get in Touch</a>
            <button class="btn btn-secondary nav-customize-trigger" style="width: 100%;">Customize Design</button>
          </div>
        </div>
      `;

      // Event listeners for mobile menu open/close
      const toggleBtn = document.getElementById('mobile-toggle-btn');
      const closeBtn = document.getElementById('mobile-close-btn');
      const backdrop = document.getElementById('mobile-backdrop');
      const drawer = document.getElementById('mobile-drawer');

      const openMobileMenu = () => {
        backdrop.classList.add('open');
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      const closeMobileMenu = () => {
        backdrop.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      };

      if (toggleBtn) toggleBtn.addEventListener('click', openMobileMenu);
      if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
      if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
    },

    /**
     * Render the unified site footer into #site-footer
     */
    renderFooter() {
      const footerContainer = document.getElementById('site-footer');
      if (!footerContainer) return;

      const config = window.PORTFOLIO_CONFIG || (typeof PORTFOLIO_CONFIG !== 'undefined' ? PORTFOLIO_CONFIG : null);
      if (!config || !config.profile) return;
      const assets = window.PORTFOLIO_ASSETS || (typeof PORTFOLIO_ASSETS !== 'undefined' ? PORTFOLIO_ASSETS : null);
      const logoUrl = (assets && assets.branding) ? assets.branding.logo : 'assets/images/logo.svg';
      const currentYear = new Date().getFullYear();

      const socialLinksHtml = (config.social || []).map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="badge" title="${s.platform}">
          ${s.platform}
        </a>
      `).join('');

      footerContainer.className = 'site-footer';
      footerContainer.innerHTML = `
        <div class="container">
          <div class="footer-top-grid">
            <div class="footer-brand-col">
              <a href="index.html" class="brand-link">
                <img src="${logoUrl}" alt="Alex Rivera Logo" height="34" />
              </a>
              <p class="section-subtitle" style="font-size: var(--font-size-sm); max-width: 380px;">
                ${config.profile.tagline}
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${socialLinksHtml}
              </div>
            </div>

            <div>
              <div class="footer-nav-title">Quick Links</div>
              <ul class="footer-nav-list">
                <li><a href="index.html" class="footer-nav-link">Home Overview</a></li>
                <li><a href="about.html" class="footer-nav-link">About &amp; Journey</a></li>
                <li><a href="projects.html" class="footer-nav-link">Featured Work</a></li>
                <li><a href="services.html" class="footer-nav-link">Services &amp; Pricing</a></li>
                <li><a href="skills.html" class="footer-nav-link">Skills &amp; Architecture</a></li>
                <li><a href="contact.html" class="footer-nav-link">Get in Touch</a></li>
              </ul>
            </div>

            <div>
              <div class="footer-nav-title">WordPress Services</div>
              <ul class="footer-nav-list">
                <li><a href="services.html#plugins" class="footer-nav-link">Custom Plugin Engineering</a></li>
                <li><a href="services.html#woocommerce" class="footer-nav-link">WooCommerce Architectures</a></li>
                <li><a href="services.html#elementor" class="footer-nav-link">Elementor Dynamic Suites</a></li>
                <li><a href="services.html#speed" class="footer-nav-link">Core Web Vitals Boost</a></li>
                <li><a href="services.html#maintenance" class="footer-nav-link">VIP Maintenance &amp; Security</a></li>
              </ul>
            </div>

            <div>
              <div class="footer-nav-title">Direct Connection</div>
              <p class="text-muted" style="font-size: var(--font-size-sm); margin-bottom: 0.75rem;">
                Looking for an experienced WordPress engineer for your upcoming release?
              </p>
              <a href="mailto:${config.profile.email}" class="btn btn-outline btn-sm" style="width: 100%; margin-bottom: 0.75rem;">
                ${config.profile.email}
              </a>
              <div style="font-size: var(--font-size-xs); color: var(--color-success); display: flex; align-items: center; gap: 0.4rem;">
                <span class="hero-status-pulse"></span>
                <span>${config.profile.status}</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              &copy; ${currentYear} ${config.profile.name}. All rights reserved. Centralized Design System Architecture.
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
              <button class="footer-nav-link nav-customize-trigger" style="background: none; border: none; cursor: pointer;">Customize Appearance</button>
              <span>&bull;</span>
              <a href="${config.profile.resumeUrl}" class="footer-nav-link" target="_blank">View Resume</a>
            </div>
          </div>
        </div>
      `;
    },

    /**
     * Render the Floating Action Button and Centralized Customization Drawer into #customization-container
     */
    renderCustomizationDrawer() {
      const container = document.getElementById('customization-container');
      if (!container) return;

      const config = window.PORTFOLIO_CONFIG || (typeof PORTFOLIO_CONFIG !== 'undefined' ? PORTFOLIO_CONFIG : null);
      if (!config || !config.colorPresets) return;
      const assets = window.PORTFOLIO_ASSETS || (typeof PORTFOLIO_ASSETS !== 'undefined' ? PORTFOLIO_ASSETS : null);
      const presets = config.colorPresets;

      const swatchesHtml = presets.map(p => `
        <button class="color-swatch-btn ${p.id === 'violet' ? 'active' : ''}" 
                data-preset-id="${p.id}" 
                data-hex="${p.hex}" 
                style="background-color: ${p.hex};" 
                title="${p.name}"
                aria-label="${p.name} color scheme">
        </button>
      `).join('');

      container.innerHTML = `
        <!-- Floating Customizer Launcher -->
        <button class="settings-fab" aria-label="Open Design System Customizer" title="Customize Design System">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        <!-- Back to Top Button -->
        <button class="back-to-top" id="back-to-top-btn" aria-label="Scroll back to top" title="Back to top">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

        <!-- Custom Cursor Elements -->
        <div class="cursor-dot" id="cursor-dot"></div>
        <div class="cursor-ring" id="cursor-ring"></div>

        <!-- Toast Notifications Container -->
        <div class="toast-container" id="toast-container"></div>

        <!-- Backdrop for Drawer -->
        <div class="drawer-backdrop" id="drawer-backdrop"></div>

        <!-- Centralized Customization Drawer -->
        <aside class="settings-drawer" id="settings-drawer" role="dialog" aria-modal="true" aria-label="Design System Settings Panel">
          <div class="drawer-header">
            <div class="drawer-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Design System Studio</span>
            </div>
            <button class="icon-btn drawer-close-btn" aria-label="Close Settings Panel">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Section Navigation Tabs -->
          <div class="drawer-tabs">
            <button class="drawer-tab-btn active" data-tab="appearance">Appearance</button>
            <button class="drawer-tab-btn" data-tab="typography">Typography</button>
            <button class="drawer-tab-btn" data-tab="layout">Layout</button>
            <button class="drawer-tab-btn" data-tab="effects">Effects</button>
            <button class="drawer-tab-btn" data-tab="assets">Assets</button>
            <button class="drawer-tab-btn" data-tab="io">Export / Reset</button>
          </div>

          <!-- Drawer Content Panes -->
          <div class="drawer-body">
            
            <!-- 1. APPEARANCE PANE -->
            <div class="drawer-tab-pane active" data-pane="appearance">
              <div class="settings-group">
                <div class="settings-group-label">Theme Mode</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                  <button class="btn btn-secondary btn-sm" id="btn-theme-dark">
                    <span>Dark Mode</span>
                  </button>
                  <button class="btn btn-secondary btn-sm" id="btn-theme-light">
                    <span>Light Mode</span>
                  </button>
                </div>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Accent Color Scheme</div>
                <div class="color-swatches-grid">
                  ${swatchesHtml}
                </div>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Custom Accent Picker</div>
                <div class="color-picker-row">
                  <input type="color" class="color-picker-input" id="custom-color-picker" value="#8B5CF6" />
                  <div>
                    <div style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text);" id="custom-color-hex-label">#8B5CF6</div>
                    <div style="font-size: 0.725rem; color: var(--color-text-muted);">Real-time CSS variable synthesis</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. TYPOGRAPHY PANE -->
            <div class="drawer-tab-pane" data-pane="typography">
              <div class="settings-group">
                <div class="settings-group-label">Curated Font Pairing</div>
                <select class="form-control" id="pref-font-pairing">
                  <option value="syne">Syne (Headings) + Plus Jakarta Sans (Body)</option>
                  <option value="outfit">Outfit (Headings) + Inter (Body)</option>
                  <option value="jakarta">Plus Jakarta Sans (Headings) + Inter (Body)</option>
                  <option value="space">Space Grotesk (Headings) + Outfit (Body)</option>
                </select>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">
                  <span>Base Font Size</span>
                  <span id="pref-font-size-val">16px</span>
                </div>
                <input type="range" min="14" max="18" step="1" value="16" id="pref-font-size" style="width: 100%; accent-color: var(--color-primary);" />
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Heading Font Weight</div>
                <select class="form-control" id="pref-heading-weight">
                  <option value="600">Semi-Bold (600)</option>
                  <option value="700" selected>Bold (700)</option>
                  <option value="800">Extra-Bold (800)</option>
                </select>
              </div>
            </div>

            <!-- 3. LAYOUT PANE -->
            <div class="drawer-tab-pane" data-pane="layout">
              <div class="settings-group">
                <div class="settings-group-label">Card Corner Radius</div>
                <select class="form-control" id="pref-card-radius">
                  <option value="sharp">Sharp Architectural (8px)</option>
                  <option value="medium" selected>Modern Balanced (18px)</option>
                  <option value="rounded">Soft Rounded (26px)</option>
                  <option value="pill">Pill Curves (36px)</option>
                </select>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Section Spacing Density</div>
                <select class="form-control" id="pref-spacing-mode">
                  <option value="compact">Compact (Dense)</option>
                  <option value="comfortable" selected>Comfortable (Balanced)</option>
                  <option value="spacious">Spacious (Airy)</option>
                </select>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Max Container Width</div>
                <select class="form-control" id="pref-container-width">
                  <option value="1100px">Compact (1100px)</option>
                  <option value="1200px" selected>Standard (1200px)</option>
                  <option value="1320px">Wide Editorial (1320px)</option>
                </select>
              </div>
            </div>

            <!-- 4. EFFECTS PANE -->
            <div class="drawer-tab-pane" data-pane="effects">
              <div class="settings-group">
                <div class="settings-group-label">Animation Intensity</div>
                <select class="form-control" id="pref-anim-intensity">
                  <option value="subtle">Subtle &amp; Minimal</option>
                  <option value="normal" selected>Normal Smooth Motion</option>
                  <option value="energetic">Energetic &amp; Bold</option>
                  <option value="off">Turn Off Animations</option>
                </select>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Interactive Features</div>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <label style="display: flex; align-items: center; gap: 0.65rem; font-size: var(--font-size-sm); cursor: pointer;">
                    <input type="checkbox" id="pref-enable-cursor" checked style="accent-color: var(--color-primary);" />
                    <span>Custom Magnetic Cursor Effect</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.65rem; font-size: var(--font-size-sm); cursor: pointer;">
                    <input type="checkbox" id="pref-enable-bg" checked style="accent-color: var(--color-primary);" />
                    <span>Background Mesh Glow &amp; Grain Overlay</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.65rem; font-size: var(--font-size-sm); cursor: pointer;">
                    <input type="checkbox" id="pref-enable-scroll" checked style="accent-color: var(--color-primary);" />
                    <span>Smooth Viewport Scrolling</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- 5. ASSETS REGISTRY PANE -->
            <div class="drawer-tab-pane" data-pane="assets">
              <div class="settings-group">
                <div class="settings-group-label">Centralized Asset Registry</div>
                <p style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                  All images, logos, and documents are centrally mapped in <code>js/config.js</code>.
                </p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: var(--font-size-xs);">
                  <div class="card" style="padding: 0.75rem;">
                    <strong>Profile Portrait:</strong><br/>
                    <code>${(assets && assets.profile) ? assets.profile.main : 'assets/images/profile/profile.webp'}</code>
                  </div>
                  <div class="card" style="padding: 0.75rem;">
                    <strong>Branding Logo:</strong><br/>
                    <code>${(assets && assets.branding) ? assets.branding.logo : 'assets/images/logo.svg'}</code>
                  </div>
                  <div class="card" style="padding: 0.75rem;">
                    <strong>Resume Document:</strong><br/>
                    <code>${(assets && assets.files) ? assets.files.resumeHtml : 'assets/files/resume.html'}</code>
                  </div>
                </div>
              </div>
            </div>

            <!-- 6. EXPORT / IMPORT / RESET PANE -->
            <div class="drawer-tab-pane" data-pane="io">
              <div class="settings-group">
                <div class="settings-group-label">Export Preferences</div>
                <p style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                  Download your active theme, color, and layout configurations as a JSON file.
                </p>
                <button class="btn btn-secondary btn-sm" id="btn-export-json">
                  <span>Export Preferences JSON</span>
                </button>
              </div>

              <div class="settings-group">
                <div class="settings-group-label">Import Preferences</div>
                <input type="file" id="input-import-json" accept=".json" style="font-size: var(--font-size-xs);" />
              </div>

              <div class="settings-group" style="margin-top: 1rem; border-top: 1px solid var(--color-border); padding-top: 1rem;">
                <div class="settings-group-label" style="color: var(--color-error);">Reset Settings</div>
                <button class="btn btn-outline btn-sm" id="btn-reset-preferences" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.4);">
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="drawer-footer">
            <button class="btn btn-secondary btn-sm drawer-close-btn">Close</button>
            <button class="btn btn-primary btn-sm" id="btn-save-preferences">Save Preferences</button>
          </div>
        </aside>
      `;

      // Hook up UI events inside the drawer
      this.bindDrawerEvents();
    },

    /**
     * Bind listeners for all drawer inputs
     */
    bindDrawerEvents() {
      const mgr = window.SettingsManager;
      if (!mgr) return;

      // Theme buttons
      const btnDark = document.getElementById('btn-theme-dark');
      const btnLight = document.getElementById('btn-theme-light');
      if (btnDark) btnDark.addEventListener('click', () => {
        mgr.prefs.theme = 'dark';
        mgr.applyPreferences();
      });
      if (btnLight) btnLight.addEventListener('click', () => {
        mgr.prefs.theme = 'light';
        mgr.applyPreferences();
      });

      // Swatches
      const swatches = document.querySelectorAll('.color-swatch-btn');
      swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
          const presetId = swatch.getAttribute('data-preset-id');
          mgr.prefs.colorScheme = presetId;
          mgr.applyPreferences();
        });
      });

      // Custom Color Picker
      const colorPicker = document.getElementById('custom-color-picker');
      if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
          mgr.prefs.colorScheme = 'custom';
          mgr.prefs.customHex = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Font Pairing
      const fontSelect = document.getElementById('pref-font-pairing');
      if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
          mgr.prefs.fontPairing = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Font size slider
      const fontSizeInput = document.getElementById('pref-font-size');
      if (fontSizeInput) {
        fontSizeInput.addEventListener('input', (e) => {
          mgr.prefs.baseFontSize = parseInt(e.target.value, 10);
          mgr.applyPreferences();
        });
      }

      // Heading weight
      const weightSelect = document.getElementById('pref-heading-weight');
      if (weightSelect) {
        weightSelect.addEventListener('change', (e) => {
          mgr.prefs.headingWeight = parseInt(e.target.value, 10);
          mgr.applyPreferences();
        });
      }

      // Card Radius
      const radiusSelect = document.getElementById('pref-card-radius');
      if (radiusSelect) {
        radiusSelect.addEventListener('change', (e) => {
          mgr.prefs.cardRadius = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Spacing Mode
      const spacingSelect = document.getElementById('pref-spacing-mode');
      if (spacingSelect) {
        spacingSelect.addEventListener('change', (e) => {
          mgr.prefs.spacingMode = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Container Width
      const containerSelect = document.getElementById('pref-container-width');
      if (containerSelect) {
        containerSelect.addEventListener('change', (e) => {
          mgr.prefs.containerWidth = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Animation Intensity
      const animSelect = document.getElementById('pref-anim-intensity');
      if (animSelect) {
        animSelect.addEventListener('change', (e) => {
          mgr.prefs.animationIntensity = e.target.value;
          mgr.applyPreferences();
        });
      }

      // Feature Toggles
      const cursorToggle = document.getElementById('pref-enable-cursor');
      if (cursorToggle) {
        cursorToggle.addEventListener('change', (e) => {
          mgr.prefs.enableCursor = e.target.checked;
          mgr.applyPreferences();
        });
      }

      const bgToggle = document.getElementById('pref-enable-bg');
      if (bgToggle) {
        bgToggle.addEventListener('change', (e) => {
          mgr.prefs.enableBackgroundEffects = e.target.checked;
          mgr.applyPreferences();
        });
      }

      const scrollToggle = document.getElementById('pref-enable-scroll');
      if (scrollToggle) {
        scrollToggle.addEventListener('change', (e) => {
          mgr.prefs.enableSmoothScroll = e.target.checked;
          mgr.applyPreferences();
        });
      }

      // Save Preferences
      const saveBtn = document.getElementById('btn-save-preferences');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => mgr.savePreferences());
      }

      // Reset
      const resetBtn = document.getElementById('btn-reset-preferences');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => mgr.resetPreferences());
      }

      // Export JSON
      const exportBtn = document.getElementById('btn-export-json');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => mgr.exportSettingsJSON());
      }

      // Import JSON
      const importInput = document.getElementById('input-import-json');
      if (importInput) {
        importInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            mgr.importSettingsJSON(e.target.files[0]);
          }
        });
      }

      // Header theme toggle button listener
      const headerThemeBtn = document.getElementById('header-theme-toggle');
      if (headerThemeBtn) {
        headerThemeBtn.addEventListener('click', () => {
          if (window.ThemeManager) {
            window.ThemeManager.toggleTheme();
            mgr.prefs.theme = window.ThemeManager.currentTheme;
          }
        });
      }

      // Back to top button listener
      const backToTopBtn = document.getElementById('back-to-top-btn');
      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
          if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
        }, { passive: true });
      }
    },

    /**
     * Show toast message
     */
    showToast(message, duration = 3000) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    /**
     * Render Project Card HTML string
     */
    createProjectCard(project) {
      const techChips = project.technologies.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join('');
      return `
        <article class="project-card reveal" data-category="${project.categoryKey}">
          <div class="project-thumb-wrap">
            <img src="${project.image}" alt="${project.title}" class="project-thumb-img" loading="lazy" width="600" height="338" />
            <div class="project-badge-overlay">
              <span class="badge badge-primary">${project.category}</span>
            </div>
          </div>
          <div class="project-body">
            <div class="project-category">${project.year} &bull; ${project.client}</div>
            <h3 class="project-title">
              <a href="project-details.html?id=${project.slug}">${project.title}</a>
            </h3>
            <p class="project-desc">${project.tagline}</p>
            <div class="project-tech-stack">
              ${techChips}
            </div>
            <div class="project-footer">
              <a href="project-details.html?id=${project.slug}" class="btn btn-outline btn-sm">
                <span>View Case Study</span>
                <span class="btn-icon-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
              <div class="project-links-row">
                ${project.liveDemo ? `
                  <a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" class="icon-btn" style="width: 34px; height: 34px;" title="Live Demonstration" aria-label="Live Demonstration">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </article>
      `;
    },

    /**
     * Render Service Card HTML string
     */
    createServiceCard(service) {
      const featuresHtml = service.deliverables.slice(0, 4).map(d => `
        <li class="service-feature-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${d}</span>
        </li>
      `).join('');

      return `
        <div class="service-card reveal">
          <div class="service-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <h3 class="service-title">${service.title}</h3>
          <p class="service-desc">${service.shortDesc}</p>
          <ul class="service-features-list">
            ${featuresHtml}
          </ul>
          <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: var(--font-size-xs); color: var(--color-primary); font-weight: 700;">${service.pricingNote}</span>
            <a href="contact.html?service=${encodeURIComponent(service.title)}" class="btn btn-ghost btn-sm">Inquire &rarr;</a>
          </div>
        </div>
      `;
    },

    /**
     * Render Skills Category Matrix
     */
    createSkillCategoryCard(skillGroup) {
      const itemsHtml = skillGroup.items.map(s => `
        <div class="skill-item">
          <div class="skill-item-header">
            <span class="skill-name">${s.name}</span>
            <span class="skill-level-text">${s.level}% &bull; ${s.tag}</span>
          </div>
          <div class="skill-bar-wrap">
            <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
          </div>
        </div>
      `).join('');

      return `
        <div class="skill-category-card reveal">
          <div class="skill-category-header">
            <div class="skill-category-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="skill-category-title">${skillGroup.category}</h3>
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted);">${skillGroup.description}</p>
            </div>
          </div>
          <div class="skill-list">
            ${itemsHtml}
          </div>
        </div>
      `;
    },

    /**
     * Initialize shared components on DOM ready
     */
    init() {
      this.renderHeader();
      this.renderMobileDrawer();
      this.renderFooter();
      this.renderCustomizationDrawer();
    }
  };

  window.Components = Components;
})();
