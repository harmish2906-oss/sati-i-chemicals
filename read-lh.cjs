const fs = require('fs');
const file = process.argv[2] || 'lh-prod-mobile.json';
const r = JSON.parse(fs.readFileSync(file, 'utf8'));

console.log(`=== LIGHTHOUSE METRICS (${file}) ===`);
console.log('Performance Score:', Math.round(r.categories.performance.score * 100));
console.log('FCP:', r.audits['first-contentful-paint']?.displayValue);
console.log('LCP:', r.audits['largest-contentful-paint']?.displayValue);
console.log('TBT:', r.audits['total-blocking-time']?.displayValue);
console.log('CLS:', r.audits['cumulative-layout-shift']?.displayValue);
console.log('Speed Index:', r.audits['speed-index']?.displayValue);

console.log('\n=== DIAGNOSTICS ===');
for (const [key, audit] of Object.entries(r.audits)) {
  if (audit.score !== null && audit.score < 0.9 && audit.title && audit.details?.type === 'opportunity') {
    console.log(`- ${audit.title}: ${audit.displayValue || Math.round(audit.numericValue) + 'ms'}`);
  }
}
