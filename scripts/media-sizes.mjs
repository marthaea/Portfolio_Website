// Records the pixel size of every image/video under public/images into src/data/media-sizes.json,
// so <img>/<video> can reserve their space before loading (otherwise the page grows as you scroll
// and links/scrolling land in the wrong place). Runs before every build; videos need ffprobe and
// keep their previous entry when it isn't installed.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const root = new URL('..', import.meta.url).pathname
const pub = join(root, 'public')
const out = join(root, 'src/data/media-sizes.json')
const old = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {}
const sizes = {}

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]))

for (const file of walk(join(pub, 'images')).sort()) {
  const key = '/' + relative(pub, file).split('\\').join('/')
  const ext = extname(file).toLowerCase()
  try {
    if (['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif'].includes(ext)) {
      const { width, height } = await sharp(file).metadata()
      sizes[key] = [width, height]
    } else if (['.mp4', '.webm', '.mov'].includes(ext)) {
      const wh = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file], { encoding: 'utf8' })
      const [width, height] = wh.trim().split(',').map(Number)
      sizes[key] = [width, height]
    }
  } catch {
    if (old[key]) sizes[key] = old[key]
  }
}

writeFileSync(out, '{\n' + Object.entries(sizes).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n')
console.log(`media-sizes: ${Object.keys(sizes).length} files`)
