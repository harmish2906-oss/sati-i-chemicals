const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function run() {
  const publicDir = path.join(__dirname, 'public');
  const heroJpg = path.join(publicDir, 'hero.jpg');

  // Mobile hero: 420px width, quality 55 with chromaSubsampling 4:2:0 -> target ~18-20 KB
  await sharp(heroJpg)
    .resize(420, null, { withoutEnlargement: true })
    .webp({ quality: 55, effort: 6 })
    .toFile(path.join(publicDir, 'hero-480.webp') + '.tmp');
  fs.renameSync(path.join(publicDir, 'hero-480.webp') + '.tmp', path.join(publicDir, 'hero-480.webp'));

  // Desktop hero: 1200px width, quality 65 -> target ~50 KB
  await sharp(heroJpg)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 65, effort: 6 })
    .toFile(path.join(publicDir, 'hero.webp') + '.tmp');
  fs.renameSync(path.join(publicDir, 'hero.webp') + '.tmp', path.join(publicDir, 'hero.webp'));

  console.log('hero-480.webp:', (fs.statSync(path.join(publicDir, 'hero-480.webp')).size / 1024).toFixed(1), 'KB');
  console.log('hero.webp:', (fs.statSync(path.join(publicDir, 'hero.webp')).size / 1024).toFixed(1), 'KB');
}

run().catch(console.error);
