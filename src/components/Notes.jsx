import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { notes } from '../data/notes'
import { Reveal, SectionIntro } from './Reveal'

function NoteModal({ note, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto p-5" role="dialog" aria-modal="true" aria-label={note.title}>
      <motion.div className="fixed inset-0 bg-[#0b0b0b]" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} />
      <motion.div
        className="popup-modal relative m-auto !max-w-[620px]"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-[36px] pt-[36px] pb-[18px] max-[600px]:px-6">
          <span className="font-poppins-bold text-[11px] uppercase tracking-[3px] text-pink">{note.tag} · {note.minutes} min read</span>
          <h3 className="mt-2 mb-1 font-poppins-semibold text-[26px] leading-[1.25] text-[#313131]">{note.title}</h3>
          <p className="!mb-5 font-lora text-[18px] italic !leading-[1.6] !text-[#888]">{note.intro}</p>
          <div className="mb-5 h-[3px] w-[50px] bg-black/20" />
          {note.body.map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12 }} className="!mb-4 font-lora !text-[17px] !leading-[1.75] !text-[#555]">
              {para}
            </motion.p>
          ))}
        </div>
        <div className="link-box">
          <a href="#notes" onClick={(e) => { e.preventDefault(); onClose() }}>Close</a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Notes() {
  const [open, setOpen] = useState(null)
  return (
    <section id="notes" className="bg-[#ebebeb] py-[120px]">
      <div className="row">
        <SectionIntro eyebrow="Notes" title="Things I've figured out." lead="Short write-ups on networking, the web and making things." />
      </div>
      <div className="mx-auto grid w-[94%] max-w-[1000px] gap-5 min-[769px]:grid-cols-2">
        {notes.map((n, i) => (
          <Reveal key={n.title} delay={(i % 2) * 0.1} className={i === 0 ? 'min-[769px]:col-span-2' : ''}>
            <motion.button
              type="button"
              onClick={() => setOpen(n)}
              whileHover={{ y: -4 }}
              className="group relative block h-full w-full bg-white p-8 text-left shadow-[0_1px_0_rgb(0_0_0/.04)] transition-shadow duration-300 hover:shadow-[0_18px_36px_-16px_rgb(0_0_0/.25)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-pink transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-poppins-bold text-[11px] uppercase tracking-[3px] text-pink">{n.tag} · {n.minutes} min</span>
              <h3 className="mt-2 mb-2 font-poppins-semibold text-[22px] leading-[1.3] text-[#313131]">{n.title}</h3>
              <p className="!mb-4 font-lora !text-[16px] italic !text-[#888]">{n.intro}</p>
              <span className="font-poppins-bold text-[11px] uppercase tracking-[3px] text-[#313131] transition-colors group-hover:text-pink">Read note →</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{open && <NoteModal note={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
