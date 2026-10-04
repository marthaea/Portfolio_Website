// Pulls the story description (blurb) of every Wattpad link in src/data/projects.js
// and saves it to src/data/wattpad.json, which projects.js merges in.
//
//   npm run fetch-stories
//
// It never fails the build: if Wattpad can't be reached, the descriptions already saved
// (or the hand-written ones in projects.js) are kept.
import fs from 'node:fs'

const BASE = process.env.WATTPAD_BASE ?? 'https://www.wattpad.com'
const FILE = new URL('../src/data/wattpad.json', import.meta.url)
const UA = 'Mozilla/5.0 (compatible; PortfolioBuild/1.0)'

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))

async function fromApi(id) {
  const res = await fetch(`${BASE}/api/v3/stories/${id}?fields=description`, { headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const { description } = await res.json()
  return description?.trim()
}

async function fromPage(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`page ${res.status}`)
  const html = await res.text()
  const m =
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i) ??
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
  return m ? decode(m[1]).trim() : undefined
}

const saved = JSON.parse(fs.readFileSync(FILE, 'utf8'))
let ok = 0
// read the Wattpad links straight from projects.js (no need to run the file)
const source = fs.readFileSync(new URL('../src/data/projects.js', import.meta.url), 'utf8')
const links = [...source.matchAll(/title: '([^']+)'[^\n]*?url: '(https?:\/\/(?:www\.)?wattpad\.com\/story\/\d+[^']*)'/g)].map(([, title, url]) => ({ title, url }))

for (const p of links) {
  const id = p.url.match(/story\/(\d+)/)[1]
  let description
  try { description = await fromApi(id) } catch { /* fall through to the page */ }
  if (!description) {
    try { description = await fromPage(p.url) } catch (e) { console.log('✗', p.title, '-', e.message) }
  }
  if (description) {
    saved[id] = { title: p.title, description }
    ok++
    console.log('✓', p.title)
  }
}

fs.writeFileSync(FILE, JSON.stringify(saved, null, 2) + '\n')
console.log(`${ok}/${links.length} descriptions updated.`)
