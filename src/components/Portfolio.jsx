import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { categories, projects } from '../data/projects'
import { SectionHeading, Reveal } from './Reveal'

function Media({ p, className, controls }) {
  if (p.video) return <video src={p.video} className={className} controls={controls} muted={!controls} playsInline preload="metadata" />
  if (p.image) return <img src={p.image} alt={p.title} loading="lazy" className={className} />
  // no screenshot yet: a styled placeholder card
  return (
    <div className={`${className} flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent/30 via-panel to-violet-700/30 p-6 text-center`}>
      <span className="text-xl font-semibold text-white">{p.title}</span>
    </div>
  )
}

function Card({ p, onOpen }) {
  return (
    <motion.li layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mb-5 break-inside-avoid">
      <button onClick={() => onOpen(p)} className="group relative block w-full overflow-hidden rounded-xl border border-line bg-panel text-left">
        <Media p={p} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.category}</span>
          <h3 className="text-lg font-semibold text-white">{p.title}</h3>
        </div>
      </button>
    </motion.li>
  )
}

function Lightbox({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={p.title}>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }} onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-panel">
        <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
          <Media p={p} controls className="max-h-[65vh] w-auto max-w-full object-contain" />
        </div>
        <div className="p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.category}</span>
          <h3 className="mt-1 text-2xl font-semibold text-white">{p.title}</h3>
          {p.description && <p className="mt-2 text-zinc-400">{p.description}</p>}
          {p.tech && <ul className="mt-3 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</li>)}</ul>}
          <div className="mt-5 flex gap-3">
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
                {p.category === 'Web' ? 'Visit site' : 'Read'} <ExternalLink size={14} />
              </a>
            )}
            <button onClick={onClose} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-white"><X size={14} /> Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-28">
      <SectionHeading eyebrow="Portfolio" title="Web development, writing and art." text="Kindly check out some of my projects." />
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2" >
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c}
            className="relative rounded-full px-5 py-2 text-sm text-zinc-400 transition-colors hover:text-white aria-pressed:text-white">
            {filter === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </Reveal>
      <motion.ul layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => <Card key={p.title} p={p} onOpen={setActive} />)}
        </AnimatePresence>
      </motion.ul>
      <AnimatePresence>{active && <Lightbox p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
