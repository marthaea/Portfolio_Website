import { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { stats } from '../data/site'

function Count({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') + suffix } })
    return () => controls.stop()
  }, [inView, to])
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
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <div><i className={`${s.icon} text-[48px] text-black`} aria-hidden /></div>
              <h3 className="mt-3 font-poppins-medium text-[36px] leading-[1.5] text-white"><Count to={s.value} suffix={s.suffix} /></h3>
              <h5 className="font-poppins-bold text-[13px] uppercase leading-6 tracking-[2px] text-white/50">{s.title}</h5>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
