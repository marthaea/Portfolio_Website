import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { profile, skills } from '../data/site'
import { Reveal, SectionHeading, Stagger, item } from './Reveal'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-28">
      <SectionHeading eyebrow="About" title="Let me introduce myself." />
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <motion.img whileHover={{ scale: 1.02, rotate: -1 }} transition={{ type: 'spring', stiffness: 200 }}
            src="/images/profile.webp" alt="Portrait of Martha Praise Katusiime" width="900" height="1200" loading="lazy"
            className="w-full rounded-2xl border border-line object-cover shadow-2xl shadow-accent/10" />
        </Reveal>
        <div>
          <Reveal delay={0.1}><p className="font-serif text-xl leading-relaxed text-zinc-300">{profile.bio}</p></Reveal>
          <Stagger className="mt-8 space-y-6">
            {Object.entries(skills).map(([group, list]) => (
              <motion.div key={group} variants={item}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">{group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-panel px-4 py-1.5 text-sm transition hover:border-accent hover:text-white">{s}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <a href="/cv.pdf" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:scale-105">
              <Download size={16} /> Download CV
            </a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3 text-sm font-medium text-white transition hover:border-accent">Hire me</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
