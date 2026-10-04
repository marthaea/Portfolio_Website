import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/** Fades and slides content up once as it scrolls into view. */
export function Reveal({ children, delay = 0, y = 40, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionIntro({ eyebrow, title, lead, dark }) {
  return (
    <div className={`section-intro ${dark ? 'on-dark' : ''}`}>
      <Reveal><h5>{eyebrow}</h5></Reveal>
      <Reveal delay={0.06}><h1>{title}</h1></Reveal>
      {lead && <Reveal delay={0.12}><p className="lead">{lead}</p></Reveal>}
    </div>
  )
}
