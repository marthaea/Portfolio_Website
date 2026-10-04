import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset, sizeOf } from '../asset'
import SketchIcon from './SketchIcon'

export function Tile({ title, icon, large, hideTitle }) {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_38%,#3f3f3f,#262626)] p-8 text-center transition-opacity duration-500 group-hover:opacity-0">
      <SketchIcon name={icon} size={large ? 220 : 170} />
      {!hideTitle && <span className="mt-3 font-poppins-semibold text-[21px] text-white">{title}</span>}
    </div>
  )
}

export function Picture({ src, alt, icon, large, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <Tile title={alt} icon={icon} large={large} />
  return <img src={asset(src)} {...sizeOf(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
}

/** A book-style page with the story's opening lines. */
function Peek({ p }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center bg-[#f6f3ec] px-[44px] py-[40px] text-center">
      <span className="font-poppins-bold text-[11px] uppercase tracking-[3px] text-pink">Peek inside</span>
      <h5 className="mt-2 mb-6 font-poppins-semibold text-[22px] leading-tight text-[#313131]">{p.title}</h5>
      <div className="mb-6 h-[3px] w-[50px] bg-black/20" />
      {p.excerpt.map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
          className="!mb-3 font-lora text-[19px] !leading-[1.7] italic !text-[#4a4a4a]"
        >
          {para}
        </motion.p>
      ))}
      {p.url && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-6 font-poppins-bold text-[11px] uppercase tracking-[3px] text-[#313131] hover:text-pink">
          Read the full story on Wattpad →
        </a>
      )}
    </div>
  )
}

function Progress({ p }) {
  return (
    <div className="mb-3 rounded-[3px] bg-[#f4f4f4] px-4 py-3">
      <div className="mb-2 flex items-center justify-between font-poppins-bold text-[11px] uppercase tracking-[1px] text-[#313131]">
        <span className="flex items-center gap-2"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-pink" />In progress</span>
        <span className="text-[#888]">{p.progress}% there</span>
      </div>
      <div className="h-[6px] w-full bg-[#d8d8d8]">
        <motion.div className="h-full bg-pink" initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      {p.todo && <p className="!mt-2 !mb-0 !text-[13px] !leading-5 !text-[#6e6e6e]"><strong className="font-poppins-bold !text-[13px] !leading-5 text-[#313131]">Still to do: </strong>{p.todo}</p>}
    </div>
  )
}

export default function ProjectModal({ p, onClose }) {
  const [peek, setPeek] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const media = p.video
    ? <video src={asset(p.video)} {...sizeOf(p.video)} controls autoPlay muted playsInline className="block w-full" />
    : p.image
      ? <Picture src={p.image} alt={p.title} icon={p.icon} large className="block w-full align-bottom" />
      : <Tile title={p.title} icon={p.icon} large hideTitle />

  return (
    <motion.div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto p-5" role="dialog" aria-modal="true" aria-label={p.title}>
      <motion.div className="fixed inset-0 bg-[#0b0b0b]" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} />
      <motion.div
        className="popup-modal relative m-auto"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={peek ? 'peek' : 'cover'}
              initial={{ rotateY: peek ? 90 : -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: peek ? -90 : 90, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ transformOrigin: peek ? 'left center' : 'right center' }}
            >
              {peek ? <Peek p={p} /> : media}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="description-box">
          {p.progress < 100 && <Progress p={p} />}
          <h4>{p.title}</h4>
          {p.description && <p className="max-h-[190px] overflow-y-auto whitespace-pre-line pr-1">{p.description}</p>}
          <div className="categories">{p.type}</div>
        </div>
        <div className="link-box">
          {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer">{p.type === 'Web Development' ? 'Visit' : 'Details'}</a>}
          {p.excerpt && <a href="#portfolio" onClick={(e) => { e.preventDefault(); setPeek(!peek) }}>{peek ? 'Cover' : 'Peek Inside'}</a>}
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); onClose() }}>Close</a>
        </div>
      </motion.div>
    </motion.div>
  )
}
