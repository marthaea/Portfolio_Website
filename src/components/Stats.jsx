import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { stats } from '../data/site'

const EASE_IN = [0.55, 0, 0.9, 0.4]

function Count({ to, suffix = '', countless, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (countless && reduce) { setDone(true); return }
    const target = countless ? 9999999 : to
    const controls = animate(0, target, {
      duration: countless ? 1.8 : 1.4,
      delay,
      ease: countless ? EASE_IN : 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') + (countless ? '' : suffix) },
      onComplete: () => countless && setDone(true),
    })
    return () => controls.stop()
  }, [inView, to, countless, reduce, delay])

  if (countless && done) {
    return (
      <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} className="inline-block text-[28px] min-[1025px]:text-[26px]">
        Countless
      </motion.span>
    )
  }
  return <span ref={ref}>0</span>
}

export default function Stats() {
  return (
    <section id="stats" className="bg-[#990047] pt-[72px] pb-[60px] text-center">
      <div className="mx-auto w-[94%] max-w-[1440px]">
        <ul className="grid grid-cols-1 min-[601px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:grid-cols-6">
          {stats.map((s, i) => (
            <motion.li
              key={s.title}
              className={`stat max-[600px]:!border-0 min-[601px]:max-[768px]:odd:!border-l-0 min-[769px]:max-[1024px]:nth-[3n+1]:!border-l-0`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div><i className={`${s.icon} text-[48px] text-black`} aria-hidden /></div>
              <h3 className="mt-3 font-poppins-medium text-[36px] leading-[1.5] text-white"><Count to={s.value} suffix={s.suffix} countless={s.countless} delay={i * 0.15} /></h3>
              <h5 className="font-poppins-bold text-[13px] uppercase leading-6 tracking-[2px] text-white/50">{s.title}</h5>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
