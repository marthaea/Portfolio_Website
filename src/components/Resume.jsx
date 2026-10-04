import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { education, experience } from '../data/site'
import { Reveal, SectionIntro } from './Reveal'

const ease = [0.22, 1, 0.36, 1]

function Timeline({ title, entries, Icon }) {
  return (
    <div className="mx-auto mt-[30px] w-[94%] max-w-[980px] px-5">
      <Reveal className="text-center"><h2 className="mb-[21px] font-poppins-semibold text-[24px] leading-[1.25] text-pink max-[600px]:text-[22px]">{title}</h2></Reveal>
      <div className="timeline-wrap">
        {entries.map((e) => (
          <motion.div
            key={e.title}
            className="timeline-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div className="timeline-ico" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}>
              <Icon />
            </motion.div>
            <div className="timeline-header">
              <h3>{e.title}</h3>
              <p>{e.period}</p>
            </div>
            <div className="timeline-content">
              <h4>{e.place}</h4>
              <p className="mb-[30px]">{e.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="bg-[#ebebeb] py-[120px]">
      <div className="row">
        <div className="section-intro [&_p.lead]:!text-[#7d7d7d]">
          <Reveal><h5>Resume</h5></Reveal>
          <Reveal delay={0.1}><h1>More of my credentials.</h1></Reveal>
          <Reveal delay={0.2}><p className="lead">Kindly check out my credentials.</p></Reveal>
        </div>
      </div>
      <Timeline title="Work Experience" entries={experience} Icon={FaGraduationCap} />
      <Timeline title="Education" entries={education} Icon={FaBriefcase} />
    </section>
  )
}
