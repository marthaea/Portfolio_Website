import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Fades and slides content up once as it scrolls into view. */
export function Reveal({ children, delay = 0, y = 30, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionIntro({ eyebrow, title, lead, dark }) {
  return (
    <div className={`section-intro ${dark ? 'on-dark' : ''}`}>
      <Reveal><h5>{eyebrow}</h5></Reveal>
      <Reveal delay={0.1}><h1>{title}</h1></Reveal>
      {lead && <Reveal delay={0.2}><p className="lead">{lead}</p></Reveal>}
    </div>
  )
}
