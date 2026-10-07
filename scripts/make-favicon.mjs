import fs from 'fs'
import sharp from 'sharp'

async function makeFavicons() {
  // Generate 64x64 PNG
  await sharp('public/logo.jpg')
    .resize(64, 64, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/favicon.png')

  // Generate 32x32 PNG
  await sharp('public/logo.jpg')
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/favicon-32x32.png')

  // Generate apple touch icon
  await sharp('public/logo.jpg')
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/apple-touch-icon.png')

  // Generate favicon.ico
  await sharp('public/logo.jpg')
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile('public/favicon.ico')

  // Generate SVG wrapping the high-res PNG
  const b64 = fs.readFileSync('public/favicon.png').toString('base64')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#ffffff"/>
  <image href="data:image/png;base64,${b64}" width="60" height="60" x="2" y="2"/>
</svg>`
  fs.writeFileSync('public/favicon.svg', svg)

  console.log('All favicons successfully generated from logo.jpg')
}

makeFavicons()
