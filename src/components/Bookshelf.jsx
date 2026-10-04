import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { asset } from '../asset'
import { SectionIntro } from './Reveal'
import ProjectModal from './ProjectModal'
import { Bookend, BookStack, Candle, FlowerVase, Mug, PaneFrame, Plant } from './ShelfObjects'

const books = projects.filter((p) => p.type === 'Creative Writing' && p.spine && p.image)

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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ zIndex: 20 }}
      whileFocus={{ zIndex: 20 }}
    >
      <span aria-hidden className="pointer-events-none absolute -bottom-[3px] left-[2px] right-[-6px] h-[10px] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/.6),transparent_70%)]" />
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

function MugOnStack() {
  return (
    <div className="relative h-[62px] w-[160px] shrink-0">
      <BookStack className="absolute inset-x-0 bottom-0 w-full" />
      <Mug className="absolute bottom-[44px] left-[48px] w-[58px]" />
    </div>
  )
}

const decor = [
  { left: [<FlowerVase key="v" className="w-[104px] shrink-0" />], right: [<MugOnStack key="m" />] },
  { left: [<Candle key="c" className="w-[54px] shrink-0" />, <Plant key="p" className="w-[92px] shrink-0" />], right: [<PaneFrame key="f" className="w-[92px] shrink-0" />] },
  { left: [<Plant key="p" className="w-[96px] shrink-0" />], right: [<Candle key="c" className="w-[54px] shrink-0" />, <BookStack key="s" className="w-[150px] shrink-0" colors={['#404546', '#9d9996', '#5b5860']} />] },
  { left: [<FlowerVase key="v" className="w-[96px] shrink-0" />], right: [<MugOnStack key="m" />] },
]

// how many books per shelf, and how much decoration fits, by screen width
function useShelfLayout() {
  const get = () => {
    const w = typeof window === 'undefined' ? 1200 : window.innerWidth
    return w >= 940 ? { per: 7, sides: 2 } : w >= 640 ? { per: 5, sides: 1 } : { per: 3, sides: 1, small: true }
  }
  const [layout, setLayout] = useState(get)
  useEffect(() => {
    const on = () => setLayout(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return layout
}

function FairyLights() {
  const xs = Array.from({ length: 13 }, (_, i) => i / 12)
  return (
    <svg viewBox="0 0 1000 70" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[60px] w-full" aria-hidden>
      <path d="M0 6 C250 62 750 62 1000 6" fill="none" stroke="#1a120d" strokeWidth="2" />
      {xs.map((t, i) => {
        const x = t * 1000
        const y = 6 + 4 * 3 * 14 * t * (1 - t) * 1.04
        return (
          <g key={i}>
            <circle cx={x} cy={y + 6} r="14" fill="#ffc46b" className="loop loop-twinkle" style={{ '--lo': 0.1, '--hi': 0.34, animationDuration: '2.6s', animationDelay: `${(i % 4) * 0.5}s` }} />
            <circle cx={x} cy={y + 6} r="4.6" fill="#ffd98a" className="loop loop-twinkle" style={{ '--lo': 0.55, '--hi': 1, animationDuration: '2.6s', animationDelay: `${(i % 4) * 0.5}s` }} />
          </g>
        )
      })}
    </svg>
  )
}

export default function Bookshelf() {
  const [active, setActive] = useState(null)
  const { per, sides, small } = useShelfLayout()
  const shelves = Array.from({ length: Math.ceil(books.length / per) }, (_, i) => books.slice(i * per, (i + 1) * per))
  let n = 0

  return (
    <section id="stories" className="bg-[#ebebeb] py-[120px]">
      <div className="row">
        <SectionIntro eyebrow="Bookshelf" title="Stories on my shelf." lead="Hover a book to turn it, click to open it." />
      </div>

      {/* wooden cabinet */}
      <div
        className="relative mx-auto w-[94%] max-w-[920px] rounded-[8px] p-[12px] sm:p-[16px]"
        style={{ background: 'linear-gradient(180deg,#7b583d,#563a28 40%,#3f2a1d)', boxShadow: '0 40px 70px -20px rgb(0 0 0 / .55), inset 0 2px 0 rgb(255 255 255 / .18)' }}
      >
        <div
          className="relative overflow-hidden rounded-[3px] px-3 pt-[64px] pb-3 sm:px-8"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 0%, rgb(255 196 120 / .22), transparent 70%), repeating-linear-gradient(90deg, rgb(255 255 255 / .018) 0 2px, transparent 2px 9px), linear-gradient(180deg,#2c2019,#1d1511)',
            boxShadow: 'inset 0 0 60px rgb(0 0 0 / .85), inset 0 6px 14px rgb(0 0 0 / .6)',
          }}
        >
          <FairyLights />
          {shelves.map((row, r) => {
            const set = decor[r % decor.length]
            const left = small ? set.left.slice(0, 1) : set.left
            return (
              <div key={r} className="mb-9 last:mb-3">
                <div className="flex items-end justify-center gap-[5px] sm:gap-2" style={{ minHeight: 300 }}>
                  <div className={`flex shrink-0 items-end gap-3 ${small ? '[&_svg]:!w-[56px]' : ''}`}>{left}</div>
                  {row.map((p) => <Book key={p.title} p={p} index={n++} onOpen={setActive} />)}
                  <Bookend className="h-[92px] w-[26px] shrink-0 self-end" />
                  {sides === 2 && <div className="ml-2 flex shrink-0 items-end gap-3">{set.right}</div>}
                </div>
                {/* the plank */}
                <div className="relative -mx-3 h-[22px] sm:-mx-8" style={{ background: 'linear-gradient(180deg,#b08660,#8a6544 45%,#5a3d28)', boxShadow: '0 16px 24px rgb(0 0 0 / .6)' }}>
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-white/25" />
                  <span className="absolute inset-x-0 bottom-0 h-[5px] bg-black/35" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <AnimatePresence>{active && <ProjectModal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
