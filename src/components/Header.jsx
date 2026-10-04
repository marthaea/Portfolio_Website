import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = ['About', 'Resume', 'Portfolio', 'Services', 'Contact']

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'bg-ink/85 backdrop-blur border-b border-line' : ''}`}
    >
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-accent focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="text-lg font-semibold tracking-tight text-white">MPK<span className="text-accent">.</span></a>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="text-zinc-400 transition-colors hover:text-white">{l}</a></li>
          ))}
        </ul>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden overflow-hidden px-5 pb-4">
          {links.map((l) => (
            <li key={l}><a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block py-3 text-zinc-300">{l}</a></li>
          ))}
        </motion.ul>
      )}
      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-accent" />
    </motion.header>
  )
}
