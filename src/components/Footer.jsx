import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaLongArrowAltUp } from 'react-icons/fa'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > window.innerHeight * 0.5)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <footer className="bg-ink pb-[30px] font-poppins-regular text-[14px]">
      <div className="mx-auto flex w-[94%] max-w-[900px] flex-col-reverse items-center gap-6 min-[769px]:flex-row min-[769px]:justify-between">
        <p className="copyright text-center text-[#6e6e6e] min-[769px]:text-left">
          <span className="after:px-3 after:text-white/10 after:content-['|'] max-[768px]:after:hidden">© Martha Praise Katusiime.</span>{' '}
          <span className="inline-block">Design by <a href="https://github.com/marthaea" className="!text-white hover:!text-pink">Martha Praise Katusiime</a></span>
        </p>
        <SocialLinks className="text-[21px]" gap="mx-3" />
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
