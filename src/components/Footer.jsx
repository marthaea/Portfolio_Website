import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaLongArrowAltUp } from 'react-icons/fa'

const links = [['About', 'about'], ['Portfolio', 'portfolio'], ['Stories', 'stories'], ['Network Lab', 'network-lab'], ['Notes', 'notes'], ['Contact', 'contact']]

export default function Footer() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > window.innerHeight * 0.5)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <footer className="relative bg-[#0e0e0e] pt-10 pb-28 sm:pb-10 font-poppins-regular text-[13px] text-white/45">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink/60 to-transparent" />
      <div className="row flex flex-col items-center gap-6 text-center">
        <div>
          {/* signature writes itself in */}
          <motion.p
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="font-script text-[52px] leading-[1.1] text-pink"
          >
            Martha
          </motion.p>
          <p className="mt-1 text-[11px] uppercase tracking-[3px]">Engineer · Writer · Artist</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {links.map(([label, id]) => (
              <li key={id}><a href={`#${id}`} className="font-poppins-bold text-[11px] uppercase tracking-[2.5px] !text-white/70 hover:!text-pink">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <p>© {new Date().getFullYear()} {`Martha Praise Katusiime`}</p>
          <p>Made in Kampala, Uganda <span className="text-pink">♥</span></p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#intro"
            title="Back to Top"
            aria-label="Back to top"
            className="fixed right-0 bottom-0 z-[600] block h-[66px] w-[60px] bg-pink-dark text-center text-[16px] leading-[66px] !text-white hover:!bg-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <FaLongArrowAltUp className="inline" />
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  )
}
