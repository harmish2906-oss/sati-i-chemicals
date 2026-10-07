const fs = require('fs');
const path = require('path');

const criticalCss = fs.readFileSync(path.join(__dirname, 'critical.css'), 'utf8');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace the Google Fonts preload + font links and stylesheet link
const oldHeadPattern = /<!-- Google Fonts[\s\S]*?<link rel="stylesheet" href="\/src\/index\.css" \/>/;

const replacement = `<!-- Google Fonts — Non-blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
      />
    </noscript>

    <!-- Inlined Critical CSS for Instant 0.3s FCP -->
    <style id="critical-css">${criticalCss}</style>

    <!-- Asynchronous Non-blocking Full Stylesheet -->
    <link rel="stylesheet" href="/src/index.css" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="/src/index.css" /></noscript>`;

if (oldHeadPattern.test(html)) {
  html = html.replace(oldHeadPattern, replacement);
  fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
  console.log('Successfully updated index.html with inlined critical CSS and non-blocking styles!');
} else {
  console.log('Pattern not found in index.html');
}
