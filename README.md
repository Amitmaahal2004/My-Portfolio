# Premium Creative Developer Portfolio — Centralized Design System

A modern, highly interactive, responsive multi-page personal portfolio website for a **Senior Web Designer & WordPress Developer**. Built using semantic HTML5, modern CSS3 custom properties, and modular vanilla JavaScript with **zero build steps or external library dependencies required**.

---

## 🌟 Architecture Highlights

- **Single Source of Truth (`js/config.js`)**: All personal profile details, project case studies, services, skills, navigation, color presets, and asset paths are managed from one centralized configuration registry.
- **Shared Component Engine (`js/components.js`)**: Consistent header navigation, mobile drawer, footer, floating customization trigger, custom cursor, back-to-top button, and toast notifications across all 7 pages.
- **Zero-FOUC Dark/Light Mode Switcher (`js/theme-manager.js`)**: Early inline theme execution eliminates flash of unstyled content, remembers visitor preferences via `localStorage`, and falls back to operating system `prefers-color-scheme`.
- **Dynamic Accent Color Studio (`js/color-manager.js`)**: 8 curated color presets plus a real-time custom hex color picker with automated WCAG contrast calculation and dynamic RGB derivation.
- **One-Page Customization Dashboard (`js/settings-manager.js`)**: Floating settings drawer allowing visitors to customize theme, accent color, typography pairings, base font size, heading weight, card radii, layout density, and animations, with live preview, JSON export/import, and factory reset.
- **Centralized Asset Registry (`PORTFOLIO_ASSETS`)**: All images, SVGs, and files are referenced through a single object mapping with graceful fallbacks and lazy loading.
- **Fully Responsive & Accessible**: Calibrated across 1440px, 1280px, 1024px, 768px, 480px, and 375px with keyboard navigation and `prefers-reduced-motion` compliance.

---

## 📁 Project Structure

```text
My Portfolio/
├── index.html              # Home page: Hero, stats, code spotlight, featured projects & services
├── about.html              # About page: Story, studio workspace photo, principles & career timeline
├── projects.html           # Projects page: Filterable project grid with live search
├── project-details.html    # Case study template: Deep-dive view driven by ?id= query param
├── services.html           # Services page: 6 specialized offerings, 4-step process & FAQ accordion
├── skills.html             # Skills page: Honest categorized proficiency matrix & tooling stack
├── contact.html            # Contact page: Validated form, honeypot spam protection, direct channels
├── assets/
│   ├── files/
│   │   ├── resume.html     # Clean printable resume document
│   │   └── resume.pdf      # Downloadable resume copy
│   └── images/
│       ├── backgrounds/    # Tech grid mesh & grain overlay SVGs
│       ├── profile/        # High-res WebP portrait & workspace photos
│       ├── projects/       # 16:9 UI previews for all case studies
│       ├── logo.svg        # Adaptive dynamic SVG brand mark
│       ├── logo-dark.svg   # Standalone dark mode logo
│       └── logo-light.svg  # Standalone light mode logo
├── css/
│   ├── variables.css       # Central design tokens (colors, fonts, radii, transitions)
│   ├── themes.css          # Calibrated dark & light mode palettes
│   ├── reset.css           # Modern defensive CSS reset
│   ├── global.css          # Layout containers, typography utilities, surface cards
│   ├── components.css      # Reusable header, footer, project cards, drawer, controls
│   ├── animations.css      # IntersectionObserver scroll reveals & intensity levels
│   └── responsive.css      # Comprehensive breakpoint rules (1440px to 375px)
├── js/
│   ├── config.js           # Central configuration, asset registry & case study data
│   ├── theme-manager.js    # Dark/light mode switcher & localStorage persistence
│   ├── color-manager.js    # Accent color presets, custom picker & luminance math
│   ├── settings-manager.js # Customization drawer UI, layout controls & JSON I/O
│   ├── components.js       # Shared header, mobile drawer, footer & card renderers
│   ├── animations.js       # Scroll reveals, custom cursor, magnetic tilts & counters
│   └── main.js             # Application coordinator and page-specific handlers
├── .gitignore              # Git ignore rules
└── README.md               # Documentation and maintenance guide
```

---

## 🚀 Quick Start / Local Setup

Since this project uses vanilla HTML, modern CSS, and ES6 JavaScript, no build step or node package installation is required.

### Option 1: Any Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Using Node `npx serve`:
```bash
npx serve .
```

Using VS Code / IDE:
Right click `index.html` and choose **"Open with Live Server"**.

### Option 2: Direct File Execution
You can also open `index.html` directly in modern Chrome, Edge, Safari, or Firefox.

---

## 🛠️ How to Customize Your Portfolio

### 1. Changing Profile Information
Open `js/config.js` and edit the `PORTFOLIO_CONFIG.profile` object:
```javascript
profile: {
  name: "Your Name",
  role: "Web Designer & WordPress Developer",
  tagline: "Designing modern experiences. Engineering robust WordPress solutions.",
  email: "your.email@example.com",
  phone: "+1 (555) 000-0000",
  status: "Available for Q4 Client Projects",
  yearsExperience: 8,
  completedProjects: 120,
  pluginsAuthored: 14
}
```
Updating this single object automatically updates the header, hero section, statistics counters, footer, and contact details across every page.

---

### 2. Replacing Images & Assets
All image paths are centrally registered in `PORTFOLIO_ASSETS` in `js/config.js`:
- **Profile Photo**: Replace `assets/images/profile/profile.webp` (or change the path in `PORTFOLIO_ASSETS.profile.main`).
- **Workspace Photo**: Replace `assets/images/profile/workspace.webp`.
- **Project Thumbnails**: Add your project screenshots to `assets/images/projects/` and update `PORTFOLIO_ASSETS.projects`.
- **Resume**: Replace `assets/files/resume.html` and `assets/files/resume.pdf`.

---

### 3. Adding or Editing Projects
In `js/config.js`, update `PORTFOLIO_DATA.projects`. Each project entry supports:
```javascript
{
  id: "my-new-plugin",
  title: "My Plugin Name",
  slug: "my-new-plugin",
  category: "WordPress Plugins", // Display name
  categoryKey: "plugins",         // Used for filtering ('plugins' | 'woocommerce' | 'elementor' | 'webapps')
  featured: true,                // If true, highlighted on homepage
  image: PORTFOLIO_ASSETS.projects.myImage,
  tagline: "One line summary of what it does",
  client: "Client Name",
  year: "2024",
  role: "Lead Developer",
  technologies: ["PHP 8.2", "WordPress REST API", "Vue.js"],
  stats: [
    { label: "Performance Gain", value: "85%" },
    { label: "Active Installs", value: "10,000+" }
  ],
  description: "Detailed overview of the project.",
  problem: "What technical roadblock was the client facing?",
  solution: "How did your architecture solve it?",
  keyFeatures: [
    "Feature point 1",
    "Feature point 2"
  ],
  codeSnippet: `// Your PHP or JavaScript snippet`,
  liveDemo: "https://demo.example.com",
  sourceCode: "https://github.com/username/repo"
}
```
Case studies automatically generate dedicated detail pages at `project-details.html?id=my-new-plugin` with full prev/next navigation!

---

### 4. Customizing Color Presets
In `js/config.js`, edit `PORTFOLIO_CONFIG.colorPresets`:
```javascript
colorPresets: [
  { id: "violet", name: "Electric Violet", hex: "#8B5CF6", secondary: "#06B6D4" },
  { id: "cyan", name: "Ocean Cyan", hex: "#06B6D4", secondary: "#3B82F6" },
  { id: "emerald", name: "Emerald Mint", hex: "#10B981", secondary: "#06B6D4" },
  // Add your own custom preset:
  { id: "gold", name: "Imperial Gold", hex: "#EAB308", secondary: "#F97316" }
]
```

---

### 5. Adding New Pages
To add a new page (e.g. `blog.html` or `pricing.html`):
1. Duplicate any page (e.g., `about.html`) and rename it.
2. In `js/config.js`, add your new link to `PORTFOLIO_CONFIG.navigation`:
   ```javascript
   { label: "Blog", path: "blog.html" }
   ```
3. The shared header, mobile menu, and footer will automatically render your new page across the entire website.

---

### 6. Connecting the Contact Form to a Backend
`contact.html` is production-ready for client-side validation and anti-spam protection. To send real emails:

#### Option A: Formspree (Easiest)
1. Register free at [Formspree.io](https://formspree.io).
2. In `contact.html`, add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to `<form id="portfolio-contact-form">`.

#### Option B: Netlify Forms
If deploying on Netlify, add `data-netlify="true"` and `name="contact"` to `<form id="portfolio-contact-form">`.

#### Option C: Custom WordPress REST API Endpoint
In `js/main.js`, update the submit handler in `initContactPage()`:
```javascript
fetch('https://your-wordpress-site.com/wp-json/contact/v1/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

---

## 📱 Responsive Testing Matrix

Validated across standard device viewport dimensions:
- **1440px+**: Ultrawide & large desktop container (1320px max).
- **1280px**: Standard laptop display with 3-column project cards.
- **1024px**: Tablet landscape; 2-column grids with adjusted spacing.
- **768px**: Tablet portrait; header folds into mobile drawer; clean touch targets.
- **480px**: Large smartphones; 1-column layouts, full-width customizer sheet.
- **375px**: Compact smartphones; fluid typography scaling with zero horizontal scroll.

---

## 📄 License & Version Control

Created with clean modular architecture. Ready for Git initialization:
```bash
git init
git add .
git commit -m "feat: initial commit of premium portfolio with centralized design system"
```
