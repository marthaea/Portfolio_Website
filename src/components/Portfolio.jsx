import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { asset } from '../asset'
import { Reveal, SectionIntro } from './Reveal'
import ProjectModal, { Picture, Tile } from './ProjectModal'

function Thumb({ p }) {
  if (p.video) return <video src={asset(p.video)} muted playsInline preload="metadata" className="block w-full" />
  if (p.image) return <Picture src={p.image} alt={p.title} icon={p.icon} className="block w-full align-middle transition-all duration-500 ease-in-out group-hover:scale-105" />
  return <Tile title={p.title} icon={p.icon} />
}

function Item({ p, onOpen, index }) {
  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Thumb p={p} />
      {p.progress < 100 && (
        <span className="pointer-events-none absolute top-4 left-4 z-[2] flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 font-poppins-bold text-[10px] uppercase leading-5 tracking-[2px] text-white backdrop-blur-sm">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-pink" />In progress
        </span>
      )}
      <a
        href="#portfolio"
        onClick={(e) => { e.preventDefault(); onOpen(p) }}
        className="absolute inset-0 flex items-center justify-center bg-transparent text-center transition-all duration-500 ease-in-out hover:bg-black/80 focus-visible:bg-black/80 [&:hover>div]:translate-x-0 [&:hover>div]:opacity-100 [&:focus-visible>div]:translate-x-0 [&:focus-visible>div]:opacity-100"
        aria-label={`${p.title} (${p.type})`}
      >
        <div className="-translate-x-full opacity-0 transition-all duration-500 ease-in-out">
          <h3 className="folio-title">{p.title}</h3>
          <span className="folio-types">{p.type}</span>
        </div>
      </a>
    </motion.div>
  )
}

// two columns above 600px, one below — items alternate between columns like the original masonry
function useColumnCount() {
  const query = '(min-width: 601px)'
  const [two, setTwo] = useState(() => typeof window === 'undefined' || window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setTwo(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return two ? 2 : 1
}

const types = ['All', ...new Set(projects.map((p) => p.type))]

function Filters({ value, onChange }) {
  return (
    <ul className="mx-auto mb-[42px] flex w-[94%] max-w-[1100px] flex-wrap justify-center gap-x-[30px] gap-y-1" aria-label="Filter projects by type">
      {types.map((t) => (
        <li key={t}>
          <button
            onClick={() => onChange(t)}
            aria-pressed={value === t}
            className={`relative px-1 py-2 font-poppins-bold text-[13px] uppercase leading-6 tracking-[2px] transition-colors duration-300 hover:text-pink ${value === t ? 'text-pink' : 'text-[#888]'}`}
          >
            {t}
            {value === t && <motion.span layoutId="folio-filter" className="absolute inset-x-0 bottom-0 h-[3px] bg-pink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('All')
  const count = useColumnCount()
  const shown = filter === 'All' ? projects : projects.filter((p) => p.type === filter)
  const columns = Array.from({ length: count }, (_, c) => shown.map((p, i) => ({ p, i })).filter(({ i }) => i % count === c))

  return (
    <section id="portfolio" className="bg-white py-[120px]">
      <div className="row">
        <SectionIntro eyebrow="Portfolio" title="Creative writing, Art and Web development." lead="Kindly check out some of my projects." />
      </div>
      <Filters value={filter} onChange={setFilter} />
      <motion.div key={filter} className="mx-auto flex w-[94%] max-w-[1100px] items-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {columns.map((col, c) => (
          <div key={c} className="min-w-0 flex-1">
            {col.map(({ p, i }) => <Item key={p.title + i} p={p} index={i} onOpen={setActive} />)}
          </div>
        ))}
      </motion.div>
      <AnimatePresence>{active && <ProjectModal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
