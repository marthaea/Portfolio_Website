import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/site'

const up = (i) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5">
      {/* drifting colour blobs */}
      <motion.div aria-hidden className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative mx-auto w-full max-w-6xl pt-16">
        <motion.p {...up(0)} className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Hello.</motion.p>
        <motion.h1 {...up(1)} className="mt-4 text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          I'm {profile.name}.
        </motion.h1>
        <motion.p {...up(2)} className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-serif text-xl text-zinc-400">
          {profile.roles.map((r, i) => (
            <span key={r}>{r}{i < profile.roles.length - 1 && <span className="ml-3 text-accent">/</span>}</span>
          ))}
        </motion.p>
        <motion.div {...up(3)} className="mt-10 flex flex-wrap gap-4">
          <a href="#portfolio" className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--color-accent)]">View my work</a>
          <a href="#contact" className="rounded-full border border-line px-7 py-3 text-sm font-medium text-white transition hover:border-accent">Hire me</a>
        </motion.div>
      </div>

      <motion.a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ArrowDown />
      </motion.a>
    </section>
  )
}
