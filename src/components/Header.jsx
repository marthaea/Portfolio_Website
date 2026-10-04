import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [['Home', 'intro'], ['About', 'about'], ['Resume', 'resume'], ['Portfolio', 'portfolio'], ['Services', 'services'], ['Contact', 'contact']]

function useCurrentSection() {
  const [current, setCurrent] = useState('intro')
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.35
      let found = 'intro'
      for (const [, id] of links) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) found = id
      }
      setCurrent(found)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return current
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const current = useCurrentSection()
  const t = { duration: 0.25 }

  // Scroll to the section ourselves: closing the menu in the same click made browsers drop the
  // link's own jump, so the page stayed put while only the address bar changed.
  const go = (e, id) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    setOpen(false)
    history.replaceState(null, '', `#${id}`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
    // if anything above changed height on the way (e.g. a late image), settle exactly on the section
    const settle = () => { if (Math.abs(el.getBoundingClientRect().top) > 4) el.scrollIntoView({ behavior: 'auto', block: 'start' }) }
    if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true })
    else setTimeout(settle, 1200)
  }

  return (
    <header className="fixed z-[600] min-h-[66px] w-full">
      <div className="row relative min-h-[66px]" style={{ maxWidth: 1140 }}>
        <div className="absolute top-0 left-[25px] min-h-[66px] min-w-[220px] bg-black min-[401px]:left-[35px] min-[601px]:left-[50px] min-[769px]:left-[60px] min-[1025px]:left-[90px]">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label="Menu"
            className="relative mt-[13px] ml-5 block h-10 w-10"
          >
            <span className="absolute top-1/2 right-2 -mt-[1.5px] block h-[3px] w-6">
              <motion.span className="absolute inset-0 bg-pink" animate={{ opacity: open ? 0 : 1 }} transition={t} />
              <motion.span className="absolute inset-0 bg-pink" animate={{ y: open ? 0 : -8, rotate: open ? 45 : 0 }} transition={t} />
              <motion.span className="absolute inset-0 bg-pink" animate={{ y: open ? 0 : 8, rotate: open ? -45 : 0 }} transition={t} />
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.nav
                id="main-nav"
                aria-label="Main"
                className="absolute top-full left-0 w-full overflow-hidden bg-black font-poppins-medium text-[15px]"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ul className="px-[30px] pt-6 pb-[42px]">
                  {links.map(([label, id], i) => (
                    <motion.li key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.04 }}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => go(e, id)}
                        className={`block py-[15px] leading-4 hover:pl-2.5 hover:!text-pink ${current === id ? '!text-pink' : '!text-white'}`}
                      >
                        {label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
