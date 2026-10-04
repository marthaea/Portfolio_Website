import { motion } from 'framer-motion'
import { currently } from '../data/site'

export default function Currently() {
  return (
    <section aria-label="What I'm up to right now" className="border-t border-white/10 bg-black py-5">
      <ul className="row flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
        <li className="flex items-center gap-2 font-poppins-bold text-[12px] uppercase tracking-[3px] text-pink-dark">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink" />
          </span>
          Currently
        </li>
        {currently.map((c, i) => (
          <motion.li
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
            className="text-[15px] leading-6 text-white/70"
          >
            <span className="mr-2 font-poppins-bold text-[11px] uppercase tracking-[2px] text-white">{c.label}</span>
            {c.text}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
