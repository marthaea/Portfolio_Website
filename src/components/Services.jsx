import { motion } from 'framer-motion'
import { services } from '../data/site'
import { SectionHeading, Stagger, item } from './Reveal'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-panel/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Services" title="What can I do for you?"
          text="If you're interested in working with me, let me know how you'd like to proceed. I'm always open to discussing your project and collaborating on new ideas." />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.li key={s.title} variants={item} whileHover={{ y: -6 }} className="list-none rounded-2xl border border-line bg-panel p-7 transition-colors hover:border-accent/60">
              <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-zinc-400">{s.text}</p>
            </motion.li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
