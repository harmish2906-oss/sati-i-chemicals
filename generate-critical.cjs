const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, 'src', 'index.css'), 'utf8');

// Slice tokens through end of hero section cleanly (lines 6 to 746)
const lines = cssContent.split('\n');
const topLines = lines.slice(6, 747).join('\n');

const respLines = `
@media (max-width: 1024px) {
  .header__nav-links { display: none; }
  .header__cta-btn { display: none; }
  .header__menu-toggle { display: flex; }
}
@media (max-width: 640px) {
  :root {
    --header-height: 64px;
    --space-section: clamp(4rem, 3rem + 4vw, 7rem);
  }
  .hero { min-height: 100dvh; }
  .hero__stats {
    flex-wrap: wrap;
    gap: var(--space-md);
  }
  .hero__stat-divider { display: none; }
  .hero__actions {
    flex-direction: column;
    width: 100%;
  }
  .hero__actions .btn {
    width: 100%;
    justify-content: center;
  }
  .hero__scroll-indicator { display: none; }
}
`;

const rawCritical = topLines + '\n' + respLines;

const minified = rawCritical
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([:;{}])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

fs.writeFileSync(path.join(__dirname, 'critical.css'), minified, 'utf8');
console.log('Valid Critical CSS written, length:', minified.length);
