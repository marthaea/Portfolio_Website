import { motion } from 'framer-motion'
import { experience, education } from '../data/site'
import { SectionHeading, Stagger, item } from './Reveal'

function Timeline({ title, entries }) {
  return (
    <div>
      <h3 className="mb-8 text-xl font-semibold text-white">{title}</h3>
      <Stagger className="relative space-y-8 border-l border-line pl-8" gap={0.15}>
        {entries.map((e) => (
          <motion.div key={e.title} variants={item} className="relative">
            <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-ink" />
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{e.period}</p>
            <h4 className="mt-1 text-lg font-medium text-white">{e.title}</h4>
            <p className="text-sm text-zinc-500">{e.place}</p>
            <p className="mt-2 text-zinc-400">{e.text}</p>
          </motion.div>
        ))}
      </Stagger>
    </div>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="scroll-mt-16 bg-panel/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Resume" title="More of my credentials." />
        <div className="grid gap-16 md:grid-cols-2">
          <Timeline title="Work Experience" entries={experience} />
          <Timeline title="Education" entries={education} />
        </div>
      </div>
    </section>
  )
}
