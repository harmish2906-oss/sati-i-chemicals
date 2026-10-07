/**
 * SATI I CHEMICALS — Image Optimization Script
 * Converts all public JPEGs to optimised WebP files.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { stat } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dir = fileURLToPath(new URL('.', import.meta.url))
const PUBLIC = join(__dir, '..', 'public')

const CONFIGS = {
  'hero.jpg':           { width: 1920, quality: 78, effort: 5 },
  'about.jpg':          { width: 1200, quality: 75, effort: 5 },
  'reactive-dyes.jpg':  { width: 900,  quality: 75, effort: 5 },
  'pigments.jpg':       { width: 900,  quality: 75, effort: 5 },
  'quality.jpg':        { width: 900,  quality: 75, effort: 5 },
  'app-textile.jpg':    { width: 800,  quality: 72, effort: 5 },
  'app-garments.jpg':   { width: 800,  quality: 72, effort: 5 },
  'app-printing.jpg':   { width: 800,  quality: 72, effort: 5 },
}

async function processImage(filename, cfg) {
  const inputPath = join(PUBLIC, filename)
  const outputName = filename.replace(/\.(jpg|jpeg)$/i, '.webp')
  const outputPath = join(PUBLIC, outputName)
  try {
    const meta = await sharp(inputPath).metadata()
    const originalSize = (await stat(inputPath)).size
    const targetWidth = Math.min(cfg.width, meta.width)
    await sharp(inputPath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: cfg.effort, smartSubsample: true })
      .toFile(outputPath)
    const newSize = (await stat(outputPath)).size
    const saving = (((originalSize - newSize) / originalSize) * 100).toFixed(1)
    console.log(
      'OK ' + filename + ' -> ' + outputName + '  ' +
      Math.round(originalSize/1024) + 'KB -> ' + Math.round(newSize/1024) + 'KB  (' + saving + '% smaller)'
    )
  } catch (err) {
    console.error('FAIL ' + filename + ': ' + err.message)
  }
}

async function generateHeroLQIP() {
  const inputPath = join(PUBLIC, 'hero.jpg')
  const outputPath = join(PUBLIC, 'hero-lqip.webp')
  try {
    await sharp(inputPath)
      .resize({ width: 40 })
      .webp({ quality: 20 })
      .toFile(outputPath)
    console.log('OK hero-lqip.webp generated (40px blur placeholder)')
  } catch (err) {
    console.error('FAIL hero-lqip:', err.message)
  }
}

async function main() {
  console.log('SATI I CHEMICALS - Image Optimization')
  const tasks = Object.entries(CONFIGS).map(([file, cfg]) => processImage(file, cfg))
  tasks.push(generateHeroLQIP())
  await Promise.all(tasks)
  console.log('Done.')
}

main()
