/**
 * ============================================================================
 * CONFIG.JS - Centralized Configuration & Asset Registry
 * Single Source of Truth for Design System, Profile, Projects & Content
 * ============================================================================
 */

window.PORTFOLIO_CONFIG = {
  // --------------------------------------------------------------------------
  // Profile & Personal Branding
  // --------------------------------------------------------------------------
  profile: {
    name: "Amit Maahal",
    role: "Senior Web Designer & WordPress Developer",
    tagline: "Designing modern experiences. Engineering robust web & WordPress solutions.",
    shortBio: "Specializing in high-performance WordPress systems, bespoke WooCommerce architectures, custom web design, and interactive modern frontend experiences.",
    longBio: "With dedicated experience at the intersection of design systems and web engineering, I build digital products that balance aesthetic beauty with rock-solid PHP architecture. From high-throughput WooCommerce engines to dynamic Elementor add-ons and bespoke modern websites, every project is crafted for speed, scalability, and seamless user experience.",
    location: "Shimla, Himachal Pradesh, India (Available Globally & Remote)",
    address: "Village Lateri, Teh. Nankhari, Dist. Shimla, P.O. Nankhari (H.P.)",
    status: "Available for Client Projects & Web Architecture Consulting",
    statusAvailable: true,
    email: "maahalanku36@gmail.com",
    phone: "+91 62306 02387",
    instagram: "@anku_official_92_",
    calendly: "https://calendly.com",
    resumeUrl: "assets/files/resume.html",
    yearsExperience: 8,
    completedProjects: 120,
    pluginsAuthored: 14,
    clientSatisfaction: "99.8%"
  },

  // --------------------------------------------------------------------------
  // Default Appearance & Theme Settings
  // --------------------------------------------------------------------------
  appearance: {
    defaultTheme: "dark", // 'dark' | 'light'
    defaultColorScheme: "violet", // 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'lime' | 'custom'
    defaultFont: "syne", // 'syne' | 'outfit' | 'inter' | 'jakarta'
    borderRadius: "medium", // 'small' | 'medium' | 'large' | 'pill'
    animationIntensity: "normal", // 'subtle' | 'normal' | 'energetic' | 'off'
    enableCursor: true,
    enableBackgroundEffects: true,
    enableSmoothScroll: true
  },

  // --------------------------------------------------------------------------
  // Curated Accent Color Schemes
  // --------------------------------------------------------------------------
  colorPresets: [
    { id: "violet", name: "Electric Violet", hex: "#8B5CF6", secondary: "#06B6D4" },
    { id: "cyan", name: "Ocean Cyan", hex: "#06B6D4", secondary: "#3B82F6" },
    { id: "emerald", name: "Emerald Mint", hex: "#10B981", secondary: "#06B6D4" },
    { id: "amber", name: "Sunset Amber", hex: "#F59E0B", secondary: "#EC4899" },
    { id: "rose", name: "Neon Rose", hex: "#F43F5E", secondary: "#8B5CF6" },
    { id: "lime", name: "Cyber Lime", hex: "#84CC16", secondary: "#10B981" },
    { id: "indigo", name: "Royal Indigo", hex: "#6366F1", secondary: "#EC4899" },
    { id: "sky", name: "Pacific Sky", hex: "#0EA5E9", secondary: "#8B5CF6" }
  ],

  // --------------------------------------------------------------------------
  // Typography Choices (Google Fonts)
  // --------------------------------------------------------------------------
  typography: {
    fonts: [
      { id: "syne", name: "Syne & Plus Jakarta Sans", headingFont: "'Syne', sans-serif", bodyFont: "'Plus Jakarta Sans', sans-serif" },
      { id: "outfit", name: "Outfit & Inter", headingFont: "'Outfit', sans-serif", bodyFont: "'Inter', sans-serif" },
      { id: "jakarta", name: "Plus Jakarta Sans & Inter", headingFont: "'Plus Jakarta Sans', sans-serif", bodyFont: "'Inter', sans-serif" },
      { id: "space", name: "Space Grotesk & Outfit", headingFont: "'Space Grotesk', sans-serif", bodyFont: "'Outfit', sans-serif" }
    ],
    baseSize: "16px",
    headingWeight: 700,
    bodyWeight: 400,
    lineHeight: 1.6
  },

  // --------------------------------------------------------------------------
  // Layout Dimensions
  // --------------------------------------------------------------------------
  layout: {
    maxWidth: "1440px",
    containerWidth: "1200px",
    sectionSpacing: "96px",
    cardRadius: "20px"
  },

  // --------------------------------------------------------------------------
  // Interactive Feature Toggles
  // --------------------------------------------------------------------------
  features: {
    themeSwitcher: true,
    colorSwitcher: true,
    customizationPanel: true,
    animations: true,
    cursorEffects: true,
    backToTop: true,
    toastNotifications: true
  },

  // --------------------------------------------------------------------------
  // Social Profiles
  // --------------------------------------------------------------------------
  social: [
    { platform: "GitHub", url: "https://github.com", icon: "github", label: "github.com/alexrivera" },
    { platform: "WordPress", url: "https://profiles.wordpress.org", icon: "wordpress", label: "profiles.wordpress.org/alex" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", label: "linkedin.com/in/alexrivera" },
    { platform: "X / Twitter", url: "https://twitter.com", icon: "twitter", label: "@alexrivera_dev" },
    { platform: "Dribbble", url: "https://dribbble.com", icon: "dribbble", label: "dribbble.com/alexrivera" }
  ],

  // --------------------------------------------------------------------------
  // Navigation Menu Structure
  // --------------------------------------------------------------------------
  navigation: [
    { label: "Home", path: "index.html" },
    { label: "About", path: "about.html" },
    { label: "Projects", path: "projects.html" },
    { label: "Services", path: "services.html" },
    { label: "Skills", path: "skills.html" },
    { label: "Contact", path: "contact.html" }
  ]
};

/**
 * ============================================================================
 * ASSET REGISTRY - Centralized File Paths & Fallbacks
 * ============================================================================
 */
window.PORTFOLIO_ASSETS = {
  profile: {
    main: "assets/images/profile/profile.webp",
    fallback: "assets/images/profile/profile.jpg",
    altPortrait: "assets/images/profile/profile-alt.webp",
    workspace: "assets/images/profile/workspace.webp",
    alt: "Alex Rivera - Web Designer & WordPress Developer in studio office"
  },

  branding: {
    logo: "assets/images/logo.svg",
    logoDark: "assets/images/logo-dark.svg",
    logoLight: "assets/images/logo-light.svg",
    favicon: "assets/images/logo.svg"
  },

  backgrounds: {
    gridMesh: "assets/images/backgrounds/grid-mesh.svg",
    grain: "assets/images/backgrounds/grain.svg"
  },

  files: {
    resumeHtml: "assets/files/resume.html",
    resumePdf: "assets/files/resume.pdf"
  },

  projects: {
    woopulse: "assets/images/projects/woopulse.webp",
    auraLiving: "assets/images/projects/aura-living.webp",
    novacraft: "assets/images/projects/novacraft.webp",
    metrohealth: "assets/images/projects/metrohealth.webp",
    vanguard: "assets/images/projects/vanguard.webp",
    artisanGuild: "assets/images/projects/artisan-guild.webp"
  }
};

/**
 * ============================================================================
 * DATA - Projects, Services, Skills, Milestones
 * ============================================================================
 */
window.PORTFOLIO_DATA = {
  // --------------------------------------------------------------------------
  // Project Case Studies
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "woopulse-engine",
      title: "WooPulse Engine — Real-Time WooCommerce Analytics Plugin",
      slug: "woopulse-engine",
      category: "WordPress Plugins",
      categoryKey: "plugins",
      featured: true,
      image: PORTFOLIO_ASSETS.projects.woopulse,
      tagline: "High-performance analytics & live order routing dashboard built natively for WooCommerce stores.",
      client: "SaaS Commerce Labs",
      year: "2024",
      role: "Lead WordPress & Full-Stack Architect",
      deliverables: ["Custom WordPress Plugin", "REST API Endpoints", "Live Vue.js Dashboard", "Redis Caching Layer"],
      technologies: ["WordPress Core", "PHP 8.2", "WooCommerce REST API", "Vue.js", "Redis", "MySQL Indexing"],
      stats: [
        { label: "TTFB Improvement", value: "68% Faster" },
        { label: "Concurrent Stores", value: "1,200+" },
        { label: "Order Throughput", value: "450 orders/min" }
      ],
      description: "WooPulse is an enterprise-grade WordPress plugin that bypasses standard admin bloat by streaming WooCommerce order velocity, conversion rates, and revenue trends in real-time. Built with optimized custom database tables and an asynchronous REST API bridge, it maintains sub-80ms dashboard latency without taxing server resources.",
      problem: "Standard WooCommerce analytics query heavy postmeta tables on every admin request, causing timeouts and high CPU usage for stores doing over 10,000 monthly orders.",
      solution: "Engineered a decoupled micro-indexing engine with custom MySQL tables and transient caching. Built a responsive single-page dashboard utilizing reactive components and secure nonce-verified AJAX endpoints.",
      keyFeatures: [
        "Zero-bloat asynchronous data pipeline using WordPress Cron and Redis transients",
        "Encrypted webhook routing with WooCommerce Action Scheduler",
        "Granular role-based capability system (`manage_woopulse_reports`)",
        "Exportable PDF & CSV executive summaries with one-click generation"
      ],
      codeSnippet: `// Registering high-performance custom REST endpoint
add_action('rest_api_init', function () {
    register_rest_route('woopulse/v1', '/metrics', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => ['WooPulse_Metrics_Controller', 'get_realtime_metrics'],
        'permission_callback' => function () {
            return current_user_can('view_woocommerce_reports');
        },
    ]);
});`,
      liveDemo: "https://demo.woopulse.dev",
      sourceCode: "https://github.com/alexrivera/woopulse-engine"
    },

    {
      id: "aura-living",
      title: "Aura Living — Bespoke E-Commerce & 3D Configurator",
      slug: "aura-living",
      category: "WooCommerce",
      categoryKey: "woocommerce",
      featured: true,
      image: PORTFOLIO_ASSETS.projects.auraLiving,
      tagline: "Minimalist Scandinavian luxury furniture e-commerce experience with interactive material customization.",
      client: "Aura Design Studio (Copenhagen)",
      year: "2023",
      role: "Lead UI/UX Designer & WooCommerce Developer",
      deliverables: ["Custom WooCommerce Theme", "3D WebGL Configurator", "Cart Flyout Drawer", "ACF Pro Flexible Fields"],
      technologies: ["WooCommerce", "PHP 8.1", "ACF Pro", "Three.js / WebGL", "Vanilla CSS", "Stripe API"],
      stats: [
        { label: "Checkout Conversion", value: "+34.2%" },
        { label: "Mobile Bounce Rate", value: "-22%" },
        { label: "Lighthouse Score", value: "98 / 100" }
      ],
      description: "A luxury lifestyle brand required a bespoke WordPress shopping experience that felt more like a high-end architectural catalog than a standard template store. The result features seamless AJAX add-to-cart drawers, dynamic material previews, and a 1-step checkout flow.",
      problem: "The client previously suffered from bloated off-the-shelf themes with 85+ unused scripts, resulting in a 4.8 second mobile load time and abandoned carts.",
      solution: "Designed and programmed a custom WordPress theme from scratch without CSS frameworks. Integrated an interactive 3D material picker that renders fabrics and wood finishes in real time before checkout.",
      keyFeatures: [
        "Sub-second page transitions using prefetching and vanilla JS micro-interactions",
        "Dynamic cart drawer with upsell recommendations and live threshold free shipping meter",
        "ACF Flexible Content modular layout builder for marketing landing pages",
        "Full WooCommerce HPOS (High-Performance Order Storage) support"
      ],
      codeSnippet: `// Optimized AJAX Add to Cart Handler with Cart Fragments
add_action('wp_ajax_aura_add_to_cart', 'aura_custom_ajax_add_to_cart');
add_action('wp_ajax_nopriv_aura_add_to_cart', 'aura_custom_ajax_add_to_cart');

function aura_custom_ajax_add_to_cart() {
    check_ajax_referer('aura_shop_nonce', 'security');
    $product_id = absint($_POST['product_id']);
    $variation  = isset($_POST['variation_id']) ? absint($_POST['variation_id']) : 0;
    WC()->cart->add_to_cart($product_id, 1, $variation);
    wp_send_json_success([
        'count' => WC()->cart->get_cart_contents_count(),
        'html'  => aura_get_mini_cart_html()
    ]);
}`,
      liveDemo: "https://demo.auraliving.studio",
      sourceCode: "https://github.com/alexrivera/aura-living-store"
    },

    {
      id: "novacraft-elementor",
      title: "NovaCraft — Elementor Dynamic Component Suite",
      slug: "novacraft-elementor",
      category: "Elementor & Themes",
      categoryKey: "elementor",
      featured: true,
      image: PORTFOLIO_ASSETS.projects.novacraft,
      tagline: "Lightweight modular add-on plugin providing high-performance query widgets and custom controls.",
      client: "DevCraft Themes",
      year: "2024",
      role: "WordPress Core & Plugin Developer",
      deliverables: ["Elementor Pro Add-on", "Custom Query Loop Builder", "PHP Control Wrappers", "Asset Minifier"],
      technologies: ["Elementor API", "PHP 8.2", "JavaScript ES6", "CSS Grid", "WP Hook System"],
      stats: [
        { label: "Active Installs", value: "18,000+" },
        { label: "Asset Size", value: "< 14KB CSS" },
        { label: "Ratings Average", value: "4.9 / 5.0" }
      ],
      description: "NovaCraft is a developer-centric add-on for Elementor that solves the notorious DOM bloating of generic widget packs. Every widget is compiled strictly on-demand, generating clean semantic HTML5 markup and zero unnecessary wrapper `<div>` tags.",
      problem: "Third-party Elementor add-ons frequently load 500KB of redundant scripts and bloated DOM trees on pages that only use a single slider or icon box.",
      solution: "Engineered an intelligent asset dependency manager that registers and loads CSS/JS only when the specific widget is present in the rendered post content.",
      keyFeatures: [
        "Zero-bloat architecture: Widget CSS loads conditionally per post",
        "Dynamic Post Grid with client-side category filtering without page reloads",
        "Elementor Dynamic Tags integration for Custom Post Types and ACF fields",
        "Built-in WCAG 2.1 AA accessibility compliance across all interactive widgets"
      ],
      codeSnippet: `// Dynamic conditional asset enqueuing in Elementor
public function get_style_depends() {
    return ['novacraft-query-grid-style'];
}

protected function render() {
    $settings = $this->get_settings_for_display();
    $query = new WP_Query([
        'post_type'      => $settings['post_type'],
        'posts_per_page' => $settings['posts_per_page'],
    ]);
    // Semantic, lean markup output
}`,
      liveDemo: "https://novacraft.dev",
      sourceCode: "https://github.com/alexrivera/novacraft-elementor"
    },

    {
      id: "metrohealth-portal",
      title: "MetroHealth Clinic — Patient Intake & Scheduling Hub",
      slug: "metrohealth-portal",
      category: "Web Applications",
      categoryKey: "webapps",
      featured: false,
      image: PORTFOLIO_ASSETS.projects.metrohealth,
      tagline: "HIPAA-conscious appointment scheduler, intake forms, and physician directory on WordPress.",
      client: "MetroHealth Regional Network",
      year: "2023",
      role: "Senior Frontend & WordPress Specialist",
      deliverables: ["Multi-Step Intake Form", "Physician Directory", "Calendar Integration", "Data Encryption"],
      technologies: ["WordPress REST API", "PHP Security Hardening", "Custom Post Types", "Modern Vanilla JS", "Tailwind-free CSS"],
      stats: [
        { label: "Patient Adoption", value: "94%" },
        { label: "Booking Time", value: "2.1 min avg" },
        { label: "Form Errors", value: "-65%" }
      ],
      description: "A centralized healthcare portal that allows patients to filter doctors by specialty, schedule appointments, and complete pre-visit health intake questionnaires on any mobile device.",
      problem: "Manual phone bookings led to long wait times and frequent administrative errors, while off-the-shelf medical software failed to match the clinic's brand experience.",
      solution: "Architected a custom intake pipeline with encrypted field storage, multi-step validation, and calendar sync utilizing custom WordPress REST API endpoints.",
      keyFeatures: [
        "End-to-end client-side validation with instant accessible error feedback",
        "Encrypted database storage for private medical questionnaire responses",
        "Physician taxonomy search with real-time availability slots",
        "Responsive appointment calendar supporting timezone conversions"
      ],
      codeSnippet: `// Pre-save sanitization and field-level encryption hook
add_filter('wp_insert_post_data', function ($data, $postarr) {
    if ($data['post_type'] === 'patient_intake') {
        $data['post_title'] = sanitize_text_field($postarr['intake_reference_id']);
        // Store sensitive data in encrypted custom metadata
    }
    return $data;
}, 10, 2);`,
      liveDemo: "https://demo.metrohealth.org",
      sourceCode: "https://github.com/alexrivera/metrohealth-portal"
    },

    {
      id: "vanguard-media",
      title: "Vanguard Media — VIP Digital Magazine & Gutenberg Hub",
      slug: "vanguard-media",
      category: "WordPress Plugins",
      categoryKey: "plugins",
      featured: false,
      image: PORTFOLIO_ASSETS.projects.vanguard,
      tagline: "High-traffic digital publication featuring custom Gutenberg blocks and sub-second TTFB caching.",
      client: "Vanguard Publishing Group",
      year: "2023",
      role: "WordPress Architect & Gutenberg Developer",
      deliverables: ["Bespoke Gutenberg Block Suite", "Varnish Caching Integration", "Breaking News Ticker", "Dark/Light Reader Mode"],
      technologies: ["WordPress VIP", "React / Gutenberg API", "PHP 8.2", "PWA / Service Workers", "Edge Caching"],
      stats: [
        { label: "Monthly Readers", value: "4.2M+" },
        { label: "Core Web Vitals", value: "100% Pass" },
        { label: "Average TTFB", value: "42ms" }
      ],
      description: "An editorial publishing platform designed for speed, editorial freedom, and immense traffic spikes. Includes custom Gutenberg blocks tailored for investigative journalism layouts.",
      problem: "Heavy editorial teams struggled with inconsistent layouts, slow publishing workflows, and server crashes during breaking news traffic surges.",
      solution: "Created custom Gutenberg blocks with React and server-side rendering, paired with aggressive edge caching and automated image optimization.",
      keyFeatures: [
        "12 bespoke Gutenberg blocks including Live Feeds, Fact Check Cards, and Audio Player embeds",
        "Sub-50ms TTFB powered by edge CDN purging hooks",
        "Instant editorial live preview without saving drafts",
        "Accessible reading mode with adjustable font sizing and contrast"
      ],
      codeSnippet: `// Gutenberg Block Registration with Server-Side Render
register_block_type('vanguard/breaking-ticker', [
    'editor_script' => 'vanguard-ticker-editor',
    'render_callback' => function ($attributes, $content) {
        $recent_news = vanguard_get_latest_alerts();
        return render_breaking_ticker_html($recent_news);
    }
]);`,
      liveDemo: "https://demo.vanguardmedia.co",
      sourceCode: "https://github.com/alexrivera/vanguard-media-wp"
    },

    {
      id: "artisan-guild",
      title: "Artisan Guild — Interactive Maker Directory & Geolocation",
      slug: "artisan-guild",
      category: "Web Applications",
      categoryKey: "webapps",
      featured: false,
      image: PORTFOLIO_ASSETS.projects.artisanGuild,
      tagline: "Interactive map directory connecting 500+ independent craft studios with local buyers.",
      client: "Artisan Guild Collective",
      year: "2023",
      role: "Lead UI Designer & Full-Stack Developer",
      deliverables: ["Interactive Leaflet Map UI", "Custom Database Search Engine", "Maker Profile Dashboard", "AJAX Filtering"],
      technologies: ["WordPress Core", "Leaflet.js", "MySQL Spatial Indexing", "PHP 8.1", "Vanilla JS"],
      stats: [
        { label: "Listed Studios", value: "520+" },
        { label: "Search Latency", value: "< 120ms" },
        { label: "Mobile Usage", value: "78%" }
      ],
      description: "A community-focused interactive directory featuring custom spatial geolocation queries, categorized workshop listings, and rich maker profiles.",
      problem: "Traditional directory plugins were clunky, loaded slow Google Maps APIs, and could not handle multi-category spatial search without slowing to a crawl.",
      solution: "Built a custom lightweight Leaflet map interface integrated with WordPress REST API and MySQL spatial indexing for instant radius queries.",
      keyFeatures: [
        "Client-side clustered map markers with custom SVG pins for pottery, woodworking, and leathercraft",
        "Geolocation radius search ('Find studios within 15 miles of me')",
        "AJAX filter sidebar updating URL state without full page reloads",
        "Verified maker badge system and workshop booking request modals"
      ],
      codeSnippet: `// Spatial radius query with MySQL Haversine formula
$query = "SELECT ID, post_title, ( 3959 * acos( cos( radians(%f) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(%f) ) + sin( radians(%f) ) * sin( radians( lat ) ) ) ) AS distance 
FROM {$wpdb->prefix}artisan_locations HAVING distance < %d ORDER BY distance LIMIT 25;";`,
      liveDemo: "https://demo.artisanguild.org",
      sourceCode: "https://github.com/alexrivera/artisan-guild-directory"
    }
  ],

  // --------------------------------------------------------------------------
  // Core Services
  // --------------------------------------------------------------------------
  services: [
    {
      id: "custom-plugin-development",
      title: "Custom WordPress Plugin Development",
      icon: "plugin",
      shortDesc: "Bespoke, secure, and object-oriented PHP plugins engineered specifically for your business workflow.",
      fullDesc: "Eliminate dependency on fragile third-party plugins. I design and build lean, enterprise-grade WordPress plugins following the official WordPress Plugin Handbook, complete with custom REST endpoints, database tables, and clean admin UIs.",
      deliverables: [
        "Object-Oriented PHP 8.x architecture",
        "Custom Post Types, Taxonomies & Metadata",
        "Custom REST API endpoints & Webhooks",
        "WordPress Action Scheduler integration",
        "Automated unit testing & full documentation"
      ],
      pricingNote: "Bespoke Projects from $2,500"
    },

    {
      id: "woocommerce-customization",
      title: "Bespoke WooCommerce Architecture",
      icon: "cart",
      shortDesc: "High-converting, blisteringly fast e-commerce stores with custom checkout funnels and integrations.",
      fullDesc: "Take your store beyond generic templates. From custom checkout flows, subscription engines, and B2B wholesale pricing rules to custom payment gateway integrations and High-Performance Order Storage (HPOS) optimization.",
      deliverables: [
        "Custom checkout funnels & one-click purchases",
        "Dynamic cart drawers & micro-interactions",
        "Custom product configurators & 3D viewers",
        "ERP, CRM & inventory API integrations",
        "Stripe, PayPal & modern payment gateways"
      ],
      pricingNote: "Custom Stores from $3,800"
    },

    {
      id: "elementor-gutenberg-design",
      title: "Elementor & Gutenberg Design Systems",
      icon: "layout",
      shortDesc: "Pixel-perfect, responsive website designs with customized visual editing tools for your marketing team.",
      fullDesc: "Empower your team to publish beautiful pages without breaking layouts. I create bespoke Elementor widgets, custom Gutenberg blocks, and comprehensive design tokens tailored to your exact brand identity.",
      deliverables: [
        "Figma-to-WordPress pixel-perfect conversion",
        "Zero-bloat custom Elementor widgets",
        "Native Gutenberg React block development",
        "Complete CSS variable design tokens",
        "Video training & editor documentation"
      ],
      pricingNote: "Websites from $2,800"
    },

    {
      id: "performance-optimization",
      title: "Speed, Core Web Vitals & Performance",
      icon: "zap",
      shortDesc: "Transform sluggish WordPress sites into lightning-fast experiences that pass all Google Core Web Vitals.",
      fullDesc: "Slow sites lose visitors and rank lower on Google. I audit your complete server, database, and asset stack to achieve sub-second load times, 95+ mobile Lighthouse scores, and effortless traffic resilience.",
      deliverables: [
        "Database query auditing & indexing",
        "Asset minification & unused CSS removal",
        "Next-gen WebP/AVIF automated pipelines",
        "Redis Object Caching & edge CDN setups",
        "100% Core Web Vitals compliance guarantee"
      ],
      pricingNote: "Audits & Speed Boosts from $1,200"
    },

    {
      id: "modern-frontend-engineering",
      title: "Responsive Frontend & JavaScript Engineering",
      icon: "code",
      shortDesc: "Modern, interactive user interfaces with smooth animations, accessible controls, and resilient CSS.",
      fullDesc: "Modern web experiences require more than static pages. I build dynamic frontend interfaces using modern vanilla JavaScript, fluid typography, subtle micro-animations, and full WCAG 2.1 AA accessibility.",
      deliverables: [
        "Fluid clamp() layouts & CSS Grid systems",
        "Lightweight vanilla JavaScript micro-apps",
        "Interactive data filters & real-time search",
        "Full keyboard & screen reader accessibility",
        "Cross-browser & cross-device validation"
      ],
      pricingNote: "Custom Interfaces from $1,800"
    },

    {
      id: "maintenance-security",
      title: "WordPress Security, VIP Hosting & Maintenance",
      icon: "shield",
      shortDesc: "Proactive security hardening, automated backups, staging environments, and ongoing peace of mind.",
      fullDesc: "Never worry about hacked sites, failed updates, or broken databases. I provide enterprise-tier ongoing maintenance, server hardening, malware defense, and VIP hosting migrations.",
      deliverables: [
        "24/7 uptime monitoring & anomaly alerts",
        "Automated encrypted daily off-site backups",
        "Staging environments & Git-driven deployments",
        "Malware defense & WAF firewall configuration",
        "Monthly performance & analytics reports"
      ],
      pricingNote: "Monthly Retainers from $450/mo"
    }
  ],

  // --------------------------------------------------------------------------
  // Technical Skills Matrix
  // --------------------------------------------------------------------------
  skills: [
    {
      category: "WordPress & CMS",
      icon: "wordpress",
      description: "Deep core knowledge of hooks, loop mechanics, database structure, and the modern block editor.",
      items: [
        { name: "WordPress Core & Architecture", level: 95, tag: "Expert", experience: "8+ yrs" },
        { name: "Custom Plugin Development", level: 94, tag: "Expert", experience: "7+ yrs" },
        { name: "WooCommerce & HPOS", level: 92, tag: "Advanced", experience: "6+ yrs" },
        { name: "Elementor Pro & Dynamic Add-ons", level: 90, tag: "Advanced", experience: "6+ yrs" },
        { name: "Gutenberg Block Development", level: 86, tag: "Proficient", experience: "4+ yrs" },
        { name: "WP-CLI & Multisite", level: 85, tag: "Proficient", experience: "5+ yrs" }
      ]
    },

    {
      category: "Backend & Database",
      icon: "database",
      description: "Robust server-side engineering focused on efficiency, security, and scalability.",
      items: [
        { name: "PHP 8.x (OOP & Modern Standards)", level: 92, tag: "Advanced", experience: "8+ yrs" },
        { name: "MySQL & Spatial Indexing", level: 88, tag: "Advanced", experience: "7+ yrs" },
        { name: "REST API Integration & Webhooks", level: 90, tag: "Advanced", experience: "6+ yrs" },
        { name: "Redis & Object Caching", level: 84, tag: "Proficient", experience: "4+ yrs" },
        { name: "WordPress Security Hardening", level: 89, tag: "Advanced", experience: "6+ yrs" }
      ]
    },

    {
      category: "Frontend & Design",
      icon: "palette",
      description: "Creative visual design coupled with clean, accessible, semantic web standards.",
      items: [
        { name: "HTML5 Semantic Architecture", level: 98, tag: "Expert", experience: "8+ yrs" },
        { name: "CSS3 / Grid / Custom Properties", level: 96, tag: "Expert", experience: "8+ yrs" },
        { name: "Vanilla JavaScript (ES6+)", level: 90, tag: "Advanced", experience: "7+ yrs" },
        { name: "UI/UX Design Systems (Figma)", level: 88, tag: "Advanced", experience: "6+ yrs" },
        { name: "Responsive & Fluid Design (clamp)", level: 95, tag: "Expert", experience: "8+ yrs" },
        { name: "WCAG 2.1 AA Accessibility", level: 88, tag: "Advanced", experience: "5+ yrs" }
      ]
    },

    {
      category: "DevOps & Optimization",
      icon: "server",
      description: "Modern workflows, automated testing, version control, and performance auditing.",
      items: [
        { name: "Google PageSpeed & Core Web Vitals", level: 96, tag: "Expert", experience: "7+ yrs" },
        { name: "Git & Version Control Workflows", level: 90, tag: "Advanced", experience: "7+ yrs" },
        { name: "LocalWP & Staging Pipelines", level: 92, tag: "Advanced", experience: "6+ yrs" },
        { name: "Cloudflare & CDN Edge Caching", level: 88, tag: "Advanced", experience: "5+ yrs" },
        { name: "SEO Technical Best Practices", level: 90, tag: "Advanced", experience: "7+ yrs" }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // Career Milestones / Timeline
  // --------------------------------------------------------------------------
  milestones: [
    {
      year: "2023 — Present",
      title: "Principal WordPress Engineer & Creative Consultant",
      organization: "Independent Practice",
      description: "Delivering bespoke WooCommerce systems, custom commercial plugins, and high-performance design architectures for international digital agencies and growing businesses."
    },
    {
      year: "2020 — 2023",
      title: "Senior WordPress & Frontend Developer",
      organization: "Veloce Interactive Studio",
      description: "Led development of 35+ custom e-commerce and media platforms. Built an in-house modular Elementor add-on suite reducing average project build times by 40%."
    },
    {
      year: "2018 — 2020",
      title: "WordPress & PHP Developer",
      organization: "Apex Digital Media",
      description: "Authored custom plugins for high-volume content publishers, implemented automated deployment workflows, and optimized database queries for sub-second page loads."
    },
    {
      year: "2016 — 2018",
      title: "Web Designer & Junior Frontend Engineer",
      organization: "Craftwork Creative Agency",
      description: "Created responsive client websites, converted Figma designs into semantic HTML/CSS, and configured WordPress themes for small-to-medium businesses."
    }
  ],

  // --------------------------------------------------------------------------
  // Client Testimonials
  // --------------------------------------------------------------------------
  testimonials: [
    {
      quote: "Alex completely transformed our WooCommerce store. Our checkout bounce rate dropped immediately, and the custom inventory plugin he built saves our operations team hours every single day.",
      author: "Marcus Lindqvist",
      title: "Founder, Aura Design Studio",
      location: "Copenhagen, Denmark"
    },
    {
      quote: "Finding a developer who genuinely understands high-end visual design AND deep WordPress PHP architecture is almost impossible. Alex is that rare 1% hybrid talent.",
      author: "Elena Rostova",
      title: "Creative Director, Vanguard Media",
      location: "London, UK"
    },
    {
      quote: "Our previous agency gave us a bloated site with 45 plugins. Alex rebuilt it lean, cut our server costs in half, and achieved a 99 mobile Lighthouse score.",
      author: "David Chen",
      title: "VP of Digital, MetroHealth Clinic",
      location: "San Francisco, CA"
    }
  ]
};

// Expose global aliases
var PORTFOLIO_CONFIG = window.PORTFOLIO_CONFIG;
var PORTFOLIO_ASSETS = window.PORTFOLIO_ASSETS;
var PORTFOLIO_DATA = window.PORTFOLIO_DATA;

// Freeze configurations to protect integrity in browser runtime
if (typeof Object.freeze === 'function') {
  Object.freeze(PORTFOLIO_CONFIG.colorPresets);
}
