import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'
import { availability, profile } from '../data/site'
import { asset } from '../asset'
import SocialLinks from './SocialLinks'

const ease = [0.22, 1, 0.36, 1]
const up = (i) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease },
})

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center bg-ink bg-cover min-[1025px]:bg-fixed bg-[position:center_bottom] text-center min-[769px]:min-h-[660px] min-[1025px]:min-h-[720px]"
      style={{ backgroundImage: `url(${asset('/images/intro-bg.webp')})` }}
    >
      <div className="absolute inset-0 bg-[#111] opacity-[.85]" />

      <div className="relative w-[94%] max-w-[1140px] -translate-y-[21px] px-5">
        {availability.open && (
          <motion.a
            {...up(-1)}
            href={availability.url}
            className="group mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-0 rounded-full border border-white/20 bg-white/5 px-5 py-1.5 font-poppins-regular text-[12px] uppercase leading-6 tracking-[2px] !text-white hover:border-pink-dark hover:bg-white/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3ddc84]" />
            </span>
            <span>{availability.text}<span className="hidden text-white/50 min-[601px]:inline"> · {availability.where}</span></span>
            <span className="font-poppins-bold text-pink transition-transform duration-300 group-hover:translate-x-1">{availability.cta} →</span>
          </motion.a>
        )}
        <motion.h5 {...up(0)} className="font-poppins-bold text-[15px] uppercase tracking-[2px] text-pink-dark min-[601px]:text-[18px] min-[769px]:text-[23px] min-[769px]:tracking-[3px]">
          Hello.
        </motion.h5>
        <motion.h1
          {...up(1)}
          className="mx-auto mb-1.5 max-w-[900px] font-poppins-medium font-[700] text-[46px] leading-[1.071] text-white [text-shadow:0_0_20px_rgba(0,0,0,.5)] min-[601px]:text-[52px] min-[769px]:text-[76px] min-[1025px]:text-[84px]"
        >
          I'm {profile.name}.
        </motion.h1>
        <motion.p {...up(2)} className="intro-position mx-auto mb-[30px] max-w-[1100px] text-[12px] uppercase leading-6 tracking-[2px] text-white min-[769px]:text-[17px]">
          {profile.roles.map((r) => (
            <span key={r}>
              {r}
            </span>
          ))}
        </motion.p>
        <motion.div {...up(3)}>
          <a
            href="#about"
            className="btn btn-stroke group mt-1.5 !h-[60px] !border-white/30 !bg-transparent !px-[30px] !text-[13px] !leading-[54px] tracking-[4px] !text-white hover:!border-pink-dark"
          >
            More About Me <FaAngleDown className="relative -top-px ml-3 inline transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </motion.div>
      </div>

      <motion.div {...up(5)} className="absolute bottom-[72px] left-0 w-full">
        <SocialLinks className="text-[24px] min-[601px]:text-[25px] min-[769px]:text-[30px] min-[1025px]:text-[33px]" gap="mx-2.5 min-[1025px]:mx-5" hoverClass="hover:text-pink-dark" />
      </motion.div>
    </section>
  )
}
