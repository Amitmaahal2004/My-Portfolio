/**
 * ============================================================================
 * MAIN.JS - Central Application Coordinator
 * Bootstraps configuration, managers, components and page-specific handlers
 * ============================================================================
 */

(function () {
  'use strict';

  function bootApp() {
    // 1. Initialize Managers and Shared Components
    try { if (window.ThemeManager) window.ThemeManager.init(); } catch (e) { console.error(e); }
    try { if (window.ColorManager) window.ColorManager.init(); } catch (e) { console.error(e); }
    try { if (window.SettingsManager) window.SettingsManager.init(); } catch (e) { console.error(e); }
    try { if (window.Components) window.Components.init(); } catch (e) { console.error(e); }

    // 2. Robust Page Detection by both URL and Element Presence
    const path = window.location.pathname.toLowerCase();

    try {
      if (path.includes('project-details') || document.getElementById('case-title')) {
        initProjectDetailsPage();
      } else if (path.includes('projects') || document.getElementById('projects-grid')) {
        initProjectsPage();
      } else if (path.includes('about') || document.getElementById('timeline-container')) {
        initAboutPage();
      } else if (path.includes('services') || document.getElementById('services-full-grid')) {
        initServicesPage();
      } else if (path.includes('skills') || document.getElementById('skills-full-grid')) {
        initSkillsPage();
      } else if (path.includes('contact') || document.getElementById('portfolio-contact-form')) {
        initContactPage();
      } else {
        initHomePage();
      }
    } catch (err) {
      console.error('Error during page initialization:', err);
    }

    // 3. Initialize Animations
    if (window.Animations) {
      try {
        window.Animations.init();
      } catch (e) {
        console.error('Error initializing animations:', e);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApp);
  } else {
    bootApp();
  }

  /* --------------------------------------------------------------------------
     HOME PAGE INITIALIZATION
     ----------------------------------------------------------------------- */
  function initHomePage() {
    const data = window.PORTFOLIO_DATA;
    const config = window.PORTFOLIO_CONFIG;

    // Featured Projects (top 3)
    const featuredContainer = document.getElementById('home-featured-projects');
    if (featuredContainer && data?.projects) {
      const featured = data.projects.filter(p => p.featured).slice(0, 3);
      featuredContainer.innerHTML = featured.map(p => window.Components.createProjectCard(p)).join('');
    }

    // Featured Services (top 3)
    const servicesContainer = document.getElementById('home-services-grid');
    if (servicesContainer && data?.services) {
      const topServices = data.services.slice(0, 3);
      servicesContainer.innerHTML = topServices.map(s => window.Components.createServiceCard(s)).join('');
    }

    // Testimonials Carousel / Grid
    const testimonialsContainer = document.getElementById('home-testimonials-grid');
    if (testimonialsContainer && data?.testimonials) {
      testimonialsContainer.innerHTML = data.testimonials.map(t => `
        <div class="card reveal" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <p style="font-size: var(--font-size-md); font-style: italic; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            &ldquo;${t.quote}&rdquo;
          </p>
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(var(--color-primary-rgb), 0.15); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--color-primary);">
              ${t.author.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--color-text); font-size: var(--font-size-sm);">${t.author}</div>
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">${t.title} &bull; ${t.location}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     ABOUT PAGE INITIALIZATION
     ----------------------------------------------------------------------- */
  function initAboutPage() {
    const milestones = window.PORTFOLIO_DATA?.milestones;
    const container = document.getElementById('timeline-container');
    if (container && milestones) {
      container.innerHTML = milestones.map((m, index) => `
        <div class="card reveal" style="padding: 1.75rem 2rem; border-left: 3px solid var(--color-primary); margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <h3 style="font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text);">${m.title}</h3>
            <span class="badge badge-primary">${m.year}</span>
          </div>
          <div style="font-size: var(--font-size-sm); font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem;">
            ${m.organization}
          </div>
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6;">
            ${m.description}
          </p>
        </div>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     PROJECTS PAGE INITIALIZATION (Filter & Search)
     ----------------------------------------------------------------------- */
  function initProjectsPage() {
    const projects = window.PORTFOLIO_DATA?.projects || [];
    const container = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search-input');

    const render = (filtered) => {
      if (!container) return;
      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
            <p class="section-subtitle" style="margin: 0 auto 1.5rem;">No projects found matching your criteria.</p>
            <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset Filters</button>
          </div>
        `;
        document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          filterButtons.forEach(b => b.classList.remove('active'));
          filterButtons[0]?.classList.add('active');
          render(projects);
        });
        return;
      }
      container.innerHTML = filtered.map(p => window.Components.createProjectCard(p)).join('');
      window.Animations?.observeElements();
    };

    render(projects);

    let activeCategory = 'all';
    let searchQuery = '';

    const applyFilters = () => {
      let filtered = projects;
      if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.categoryKey === activeCategory);
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q))
        );
      }
      render(filtered);
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        applyFilters();
      });
    }
  }

  /* --------------------------------------------------------------------------
     PROJECT DETAILS PAGE (Dynamic Case Study)
     ----------------------------------------------------------------------- */
  function initProjectDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'woopulse-engine';
    const projects = window.PORTFOLIO_DATA?.projects || [];

    const project = projects.find(p => p.slug === projectId) || projects[0];
    const currentIndex = projects.findIndex(p => p.slug === project.slug);
    const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
    const nextProject = projects[(currentIndex + 1) % projects.length];

    // Populate Page Elements
    document.title = `${project.title} — Case Study | Alex Rivera`;

    const titleEl = document.getElementById('case-title');
    if (titleEl) titleEl.textContent = project.title;

    const taglineEl = document.getElementById('case-tagline');
    if (taglineEl) taglineEl.textContent = project.tagline;

    const categoryEl = document.getElementById('case-category');
    if (categoryEl) categoryEl.textContent = project.category;

    const clientEl = document.getElementById('case-client');
    if (clientEl) clientEl.textContent = project.client;

    const yearEl = document.getElementById('case-year');
    if (yearEl) yearEl.textContent = project.year;

    const roleEl = document.getElementById('case-role');
    if (roleEl) roleEl.textContent = project.role;

    const heroImgEl = document.getElementById('case-hero-img');
    if (heroImgEl) {
      heroImgEl.src = project.image;
      heroImgEl.alt = project.title;
    }

    const descEl = document.getElementById('case-description');
    if (descEl) descEl.textContent = project.description;

    const problemEl = document.getElementById('case-problem');
    if (problemEl) problemEl.textContent = project.problem;

    const solutionEl = document.getElementById('case-solution');
    if (solutionEl) solutionEl.textContent = project.solution;

    // Stats
    const statsContainer = document.getElementById('case-stats-grid');
    if (statsContainer && project.stats) {
      statsContainer.innerHTML = project.stats.map(s => `
        <div class="card reveal" style="padding: 1.5rem; text-align: center;">
          <div style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-primary);">${s.value}</div>
          <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase; margin-top: 0.25rem;">${s.label}</div>
        </div>
      `).join('');
    }

    // Deliverables & Key Features
    const featuresContainer = document.getElementById('case-features-list');
    if (featuresContainer && project.keyFeatures) {
      featuresContainer.innerHTML = project.keyFeatures.map(f => `
        <li style="display: flex; gap: 0.75rem; margin-bottom: 0.85rem; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${f}</span>
        </li>
      `).join('');
    }

    // Technologies
    const techContainer = document.getElementById('case-tech-chips');
    if (techContainer && project.technologies) {
      techContainer.innerHTML = project.technologies.map(t => `
        <span class="tech-chip" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">${t}</span>
      `).join('');
    }

    // Code Snippet
    const codeEl = document.getElementById('case-code-snippet');
    if (codeEl && project.codeSnippet) {
      codeEl.textContent = project.codeSnippet;
    }

    // Demo and Repo Links
    const liveLinkEl = document.getElementById('case-live-link');
    if (liveLinkEl) {
      if (project.liveDemo) {
        liveLinkEl.href = project.liveDemo;
        liveLinkEl.style.display = 'inline-flex';
      } else {
        liveLinkEl.style.display = 'none';
      }
    }

    const repoLinkEl = document.getElementById('case-repo-link');
    if (repoLinkEl) {
      if (project.sourceCode) {
        repoLinkEl.href = project.sourceCode;
        repoLinkEl.style.display = 'inline-flex';
      } else {
        repoLinkEl.style.display = 'none';
      }
    }

    // Previous & Next navigation
    const prevLink = document.getElementById('case-prev-project');
    if (prevLink) {
      prevLink.href = `project-details.html?id=${prevProject.slug}`;
      prevLink.querySelector('.nav-proj-title').textContent = prevProject.title;
    }

    const nextLink = document.getElementById('case-next-project');
    if (nextLink) {
      nextLink.href = `project-details.html?id=${nextProject.slug}`;
      nextLink.querySelector('.nav-proj-title').textContent = nextProject.title;
    }
  }

  /* --------------------------------------------------------------------------
     SERVICES PAGE INITIALIZATION
     ----------------------------------------------------------------------- */
  function initServicesPage() {
    const services = window.PORTFOLIO_DATA?.services || [];
    const container = document.getElementById('services-full-grid');
    if (container) {
      container.innerHTML = services.map(s => window.Components.createServiceCard(s)).join('');
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-question');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isOpen) item.classList.add('active');
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     SKILLS PAGE INITIALIZATION
     ----------------------------------------------------------------------- */
  function initSkillsPage() {
    const skillGroups = window.PORTFOLIO_DATA?.skills || [];
    const container = document.getElementById('skills-full-grid');
    if (container) {
      container.innerHTML = skillGroups.map(sg => window.Components.createSkillCategoryCard(sg)).join('');
    }
  }

  /* --------------------------------------------------------------------------
     CONTACT PAGE INITIALIZATION
     ----------------------------------------------------------------------- */
  function initContactPage() {
    const config = window.PORTFOLIO_CONFIG;
    const form = document.getElementById('portfolio-contact-form');
    const successAlert = document.getElementById('form-success-alert');
    const errorAlert = document.getElementById('form-error-alert');

    // Pre-fill service inquiry if query param exists
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      const subjectInput = document.getElementById('contact-subject');
      if (subjectInput) {
        subjectInput.value = `Inquiry regarding: ${serviceParam}`;
      }
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Anti-spam honeypot check
        const honeypot = document.getElementById('contact-website-trap');
        if (honeypot && honeypot.value.trim() !== '') {
          // Silent bot trap
          console.warn('Spam submission suppressed by honeypot.');
          return;
        }

        // 2. Validate inputs
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        if (!name || !email || !message) {
          if (errorAlert) {
            errorAlert.textContent = 'Please fill out all required fields.';
            errorAlert.style.display = 'flex';
          }
          return;
        }

        // Simple email validation regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          if (errorAlert) {
            errorAlert.textContent = 'Please provide a valid email address.';
            errorAlert.style.display = 'flex';
          }
          return;
        }

        // 3. Clear errors and show success state
        if (errorAlert) errorAlert.style.display = 'none';

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message...';

        setTimeout(() => {
          if (successAlert) {
            successAlert.style.display = 'flex';
          }
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          if (window.Components?.showToast) {
            window.Components.showToast('Message submitted! Alex will respond shortly.');
          }
        }, 800);
      });
    }
  }

})();
