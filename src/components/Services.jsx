import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '../data/site'
import { asset } from '../asset'
import { SectionIntro } from './Reveal'

function usePerPage() {
  const calc = () => (window.innerWidth >= 960 ? 3 : window.innerWidth >= 700 ? 2 : 1)
  const [n, setN] = useState(() => (typeof window === 'undefined' ? 3 : calc()))
  useEffect(() => {
    const on = () => setN(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return n
}

export default function Services() {
  const perPage = usePerPage()
  const pages = Math.ceil(services.length / perPage)
  const [state, setState] = useState({ page: 0, dir: 1 })
  const page = Math.min(state.page, pages - 1)
  const go = (next) => setState({ page: next, dir: next > page ? 1 : -1 })
  const items = services.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="services" className="relative bg-char bg-cover bg-center py-[120px] text-white" style={{ backgroundImage: `url(${asset('/images/bg.webp')})` }}>
      <div className="absolute inset-0 bg-ink opacity-90" />
      <div className="row relative">
        <SectionIntro dark eyebrow="Services" title="What Can I Do For You?" lead="If you're interested in working with me, please let me know how you'd like to proceed. I'm always open to discussing your project and collaborating on new ideas." />
      </div>

      <div className="relative mx-auto mt-[30px] w-[94%] max-w-[1200px] overflow-x-clip text-center">
        <AnimatePresence mode="wait" custom={state.dir} initial={false}>
          <motion.div
            key={`${page}-${perPage}`}
            custom={state.dir}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 80 }),
              center: { opacity: 1, x: 0 },
              exit: (d) => ({ opacity: 0, x: d * -80 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -60 && page < pages - 1) go(page + 1)
              else if (offset.x > 60 && page > 0) go(page - 1)
            }}
            className="grid"
            style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
          >
            {items.map((s, i) => (
              <motion.div key={s.title} className="px-[30px] pb-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.45 }} whileHover={{ y: -6 }}>
                <span className="mb-[21px] inline-block"><i className={`${s.icon} text-[54px] text-pink`} aria-hidden /></span>
                <h3 className="mb-[18px] font-poppins-semibold text-[20px] leading-[1.5] text-white">{s.title}</h3>
                <p className="text-white/60">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-1.5 text-center" role="tablist" aria-label="Services pages">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} role="tab" aria-selected={i === page} aria-label={`Page ${i + 1}`} onClick={() => go(i)} className={`owl-dot ${i === page ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
