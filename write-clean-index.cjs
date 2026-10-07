const fs = require('fs');
const path = require('path');

const criticalCss = fs.readFileSync(path.join(__dirname, 'critical.css'), 'utf8');

// Read clean base index.html
let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#080d18" />

    <!-- SEO -->
    <title>SATI I CHEMICALS | Reactive Dyes &amp; Pigment Colours — Jetpur, Gujarat, India</title>
    <meta name="description" content="SATI I CHEMICALS provides Reactive Dyes and Pigment Colours for textile, garment and printing applications. Based in Jetpur - 360370, Gujarat, India. 8 years of industry experience. Enquire for pricing and availability." />
    <meta name="keywords" content="reactive dyes, pigment colours, textile dyes, garment dyes, printing dyes, Reactive Black GDN, Reactive Brown GR, Reactive Yellow H7GL, Reactive Orange H2R, Reactive Red H4B, Jetpur, Gujarat, India, SATI I CHEMICALS" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="SATI I CHEMICALS" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="SATI I CHEMICALS | Reactive Dyes &amp; Pigment Colours" />
    <meta property="og:description" content="Manufacturer of Reactive Dyes and Pigment Colours for textile, garment and printing applications. Jetpur - 360370, Gujarat, India." />
    <meta property="og:image" content="/hero.webp" />
    <meta property="og:site_name" content="SATI I CHEMICALS" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="SATI I CHEMICALS | Reactive Dyes &amp; Pigment Colours" />
    <meta name="twitter:description" content="Manufacturer of Reactive Dyes and Pigment Colours for textile, garment and printing applications." />
    <meta name="twitter:image" content="/hero.webp" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    <!-- Preload Critical LCP Hero Image (Mobile-optimized for phones, desktop for large screens) -->
    <link rel="preload" as="image" href="/hero-480.webp" type="image/webp" media="(max-width: 640px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/hero.webp" type="image/webp" media="(min-width: 641px)" fetchpriority="high" />

    <!-- Google Fonts — Non-blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
      media="print"
      onload="this.media='all'"
    />

    <!-- Inlined Critical CSS for Instant 0.3s FCP -->
    <style id="critical-css">${criticalCss}</style>

    <!-- Asynchronous Non-blocking Full Stylesheet -->
    <link rel="stylesheet" href="/src/index.css" media="print" onload="this.media='all'" />
  </head>
  <body>
    <div id="root">
      <header class="header header--transparent" id="header">
        <div class="container header__inner">
          <a href="#" class="header__logo">
            <img src="/logo.webp" alt="SATI I CHEMICALS Logo" class="header__logo-img" width="44" height="44" decoding="async" />
            <div class="header__logo-text">
              <span class="header__logo-name">SATI I CHEMICALS</span>
              <span class="header__logo-tagline">Reactive Dyes &amp; Pigment Colours</span>
            </div>
          </a>
          <nav class="header__nav" aria-label="Main navigation">
            <div class="header__nav-links">
              <a href="#about" class="header__nav-link">About</a>
              <a href="#products" class="header__nav-link">Products</a>
              <a href="#applications" class="header__nav-link">Applications</a>
              <a href="#quality" class="header__nav-link">Quality</a>
              <a href="#contact" class="header__nav-link">Contact</a>
            </div>
            <a href="https://wa.me/918758852951" class="btn header__cta-btn" target="_blank" rel="noopener noreferrer" id="header-whatsapp-cta">Enquire</a>
          </nav>
        </div>
      </header>
      <main>
        <section class="hero" id="hero">
          <div class="hero__bg">
            <div class="hero__bg-gradient"></div>
            <div class="hero__bg-pattern"></div>
            <div class="hero__bg-image">
              <img
                src="/hero.webp"
                srcset="/hero-480.webp 540w, /hero-800.webp 900w, /hero.webp 1920w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
                alt="Reactive dye powders in a chemical manufacturing facility"
                class="hero__img"
                fetchpriority="high"
                decoding="async"
                width="1920"
                height="1080"
              />
              <div class="hero__bg-image-overlay"></div>
            </div>
          </div>
          <div class="hero__content container">
            <div class="hero__inner">
              <div class="hero__text">
                <div class="hero__label">
                  <span>Established Manufacturer — Jetpur, Gujarat, India</span>
                </div>
                <h1 class="hero__title">
                  <span class="hero__title-line" style="display: block">REACTIVE</span>
                  <span class="hero__title-line" style="display: block">DYES &amp;</span>
                  <span class="hero__title-line hero__title-line--accent" style="display: block">PIGMENT</span>
                  <span class="hero__title-line hero__title-line--accent" style="display: block">COLOURS</span>
                </h1>
                <p class="hero__subtitle">
                  Colour solutions for textile, garment and printing applications from the heart of Gujarat's dye industry.
                </p>
                <div class="hero__actions">
                  <a href="#products" class="btn btn--primary" id="hero-explore-btn">Explore Products</a>
                  <a href="https://wa.me/918758852951" class="btn btn--outline" target="_blank" rel="noopener noreferrer" id="hero-whatsapp-btn">Send Enquiry</a>
                </div>
                <div class="hero__stats">
                  <div class="hero__stat">
                    <span class="hero__stat-number">8+</span>
                    <span class="hero__stat-label">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('index.html fully written with non-blocking CSS and inlined critical styles!');
