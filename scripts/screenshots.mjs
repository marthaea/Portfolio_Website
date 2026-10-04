// Captures a screenshot of every live site listed in src/data/projects.js
// and saves it to public/images/sites/<name>.webp (the paths projects.js already points at).
//
//   npm i -D playwright && npx playwright install chromium
//   npm run screenshots              # only sites that don't have an image yet
//   npm run screenshots -- --all     # re-capture everything
import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { projects } from '../src/data/projects.js'

const all = process.argv.includes('--all')
const targets = projects.filter((p) => p.url && p.image?.startsWith('/images/sites/') && (all || !fs.existsSync(path.join('public', p.image))))
if (!targets.length) { console.log('Nothing to capture.'); process.exit(0) }

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
for (const p of targets) {
  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(1500)
    const png = await page.screenshot()
    await sharp(png).resize({ width: 900 }).webp({ quality: 80 }).toFile(path.join('public', p.image))
    console.log('✓', p.title)
  } catch (e) {
    console.log('✗', p.title, '-', e.message.split('\n')[0])
  }
}
await browser.close()
