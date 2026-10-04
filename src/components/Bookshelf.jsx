import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { asset } from '../asset'
import { SectionIntro } from './Reveal'
import ProjectModal from './ProjectModal'

const books = projects.filter((p) => p.type === 'Creative Writing' && p.spine && p.image)
const PER_SHELF = 7

function hash(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

// darken a hex colour so white spine text always reads well
function deepen(hex, k = 0.62) {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v * k))
  return `rgb(${ch[0]} ${ch[1]} ${ch[2]})`
}

function Book({ p, index, onOpen }) {
  const h = hash(p.title)
  const w = 46 + (h % 5) * 5 // spine width
  const height = 236 + ((h >> 3) % 5) * 9
  const depth = Math.round(height * 0.62) // cover width
  const spine = deepen(p.spine)
  const face = { position: 'absolute', backfaceVisibility: 'hidden' }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(p)}
      aria-label={`${p.title}. Open details`}
      className="group relative shrink-0 cursor-pointer outline-offset-8"
      style={{ width: w, height, perspective: 1100, zIndex: 0 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ zIndex: 20 }}
      whileFocus={{ zIndex: 20 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', transform: `translateZ(${-depth / 2}px)` }}
        variants={{ rest: { rotateY: 0, x: 0 }, hover: { rotateY: -68, x: depth * 0.28 } }}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        transition={{ type: 'spring', stiffness: 130, damping: 16 }}
      >
        {/* spine (faces the viewer at rest) */}
        <div
          style={{ ...face, width: w, height, background: `linear-gradient(90deg, rgb(0 0 0 / .28), transparent 18%, transparent 82%, rgb(0 0 0 / .22)), ${spine}`, transform: `translateZ(${depth / 2}px)` }}
          className="flex flex-col items-center justify-between py-4"
        >
          <span className="h-[3px] w-[70%] bg-pink" />
          <span className="font-poppins-bold text-[12px] uppercase leading-none tracking-[2px] text-white/95 [text-orientation:mixed] [writing-mode:vertical-rl]" style={{ maxHeight: height - 70, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {p.title}
          </span>
          <span className="flex flex-col items-center gap-1.5">
            <span className="font-poppins-bold text-[8px] tracking-[1px] text-white/60">MPK</span>
            <span className="h-[3px] w-[70%] min-w-[24px] bg-pink" />
          </span>
        </div>

        {/* front cover (the right-hand face, turns into view on hover) */}
        <div style={{ ...face, width: depth, height, left: (w - depth) / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} className="overflow-hidden bg-black">
          <img src={asset(p.image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/.18),transparent_12%,transparent_88%,rgb(0_0_0/.25))]" />
        </div>

        {/* back, top and bottom so no gaps show mid-turn */}
        <div style={{ ...face, width: w, height, background: spine, transform: `rotateY(180deg) translateZ(${depth / 2}px)` }} />
        <div style={{ ...face, width: depth, height, left: (w - depth) / 2, background: spine, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
        <div style={{ ...face, width: w, height: depth, top: (height - depth) / 2, background: '#e9e4d8', transform: `rotateX(90deg) translateZ(${height / 2}px)` }} />
      </motion.div>

      {/* floating title label while the book is turned out */}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-black px-3 py-1 font-poppins-bold text-[10px] uppercase tracking-[2px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {p.title}
      </span>
    </motion.button>
  )
}

export default function Bookshelf() {
  const [active, setActive] = useState(null)
  const shelves = Array.from({ length: Math.ceil(books.length / PER_SHELF) }, (_, i) => books.slice(i * PER_SHELF, (i + 1) * PER_SHELF))
  let n = 0

  return (
    <section id="stories" className="bg-[#ebebeb] py-[120px]">
      <div className="row">
        <SectionIntro eyebrow="Bookshelf" title="Stories on my shelf." lead="Hover a book to turn it, click to open it." />
      </div>

      <div className="mx-auto w-[94%] max-w-[860px] rounded-[3px] bg-[#1b1b1b] px-4 pt-10 shadow-[inset_0_0_40px_rgb(0_0_0/.7)] sm:px-10">
        {shelves.map((row, r) => (
          <div key={r} className="mb-10 last:mb-0">
            <div className="flex items-end justify-center gap-[5px] sm:gap-2" style={{ minHeight: 290 }}>
              {row.map((p) => <Book key={p.title} p={p} index={n++} onOpen={setActive} />)}
            </div>
            {/* the plank */}
            <div className="relative -mx-4 h-[16px] bg-gradient-to-b from-[#444] to-[#2a2a2a] shadow-[0_10px_18px_rgb(0_0_0/.55)] sm:-mx-10">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-pink/70" />
            </div>
          </div>
        ))}
        <div className="h-6" />
      </div>
      <AnimatePresence>{active && <ProjectModal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
