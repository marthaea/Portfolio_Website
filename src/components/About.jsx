import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/site'
import { asset } from '../asset'
import { Reveal, SectionIntro } from './Reveal'

function SkillBar({ name, percent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <li ref={ref}>
      <motion.div className="progress" initial={{ width: 0 }} animate={{ width: inView ? `${percent}%` : 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.9, duration: 0.4 }}>{percent}%</motion.span>
      </motion.div>
      <strong>{name}</strong>
    </li>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-white pt-[120px] pb-[150px]">
      <div className="row">
        <div className="section-intro !mb-[30px]">
          <Reveal><h5>About</h5></Reveal>
          <Reveal delay={0.1}><h1>Let me introduce myself.</h1></Reveal>
          <Reveal delay={0.2} className="mt-[42px] text-left">
            <img src={asset('/images/profile.webp')} alt="Profile Picture" width="509" height="706" loading="lazy" className="block h-auto w-full object-cover" />
            <p className="lead mt-[18px] !text-left">{profile.lead}</p>
          </Reveal>
        </div>
      </div>

      <div className="about-content mx-auto mb-[36px] grid w-[94%] max-w-[850px] text-left min-[769px]:grid-cols-2">
        <Reveal className="px-5">
          <h3 className="max-[768px]:text-center">Profile</h3>
          <p className="mb-[21px]">{profile.summary}</p>
          <ul className="info-list mb-[42px]">
            {profile.info.map(([k, v]) => (
              <li key={k}><strong>{k}:</strong><span>{v}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="px-5">
          <h3 className="max-[768px]:text-center">Skills</h3>
          <p className="mb-[21px]">
            {profile.skillsText.map(([k, v]) => (<span key={k} className="block">{k}: {v}</span>))}
          </p>
          <ul className="skill-bars mt-[60px] mb-[30px]">
            {profile.skillBars.map(([name, pct]) => <SkillBar key={name} name={name} percent={pct} />)}
          </ul>
        </Reveal>
      </div>

      <Reveal className="row text-center">
        <a href="#contact" title="Hire Me" className="btn btn-stroke w-[250px] max-[768px]:mb-[30px] max-[768px]:w-full min-[769px]:mr-[40px]">Hire Me</a>
        <a href={asset('/cv.pdf')} title="Download CV" className="btn btn-primary w-[250px] max-[768px]:w-full">Download CV</a>
      </Reveal>
    </section>
  )
}
