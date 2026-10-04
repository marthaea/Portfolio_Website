import { motion } from 'framer-motion'
import { profile } from '../data/site'
import { asset } from '../asset'
import { Reveal, SectionIntro } from './Reveal'

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
          <ul className="mt-[30px] mb-[30px] space-y-[26px]">
            {profile.skillGroups.map(([group, items]) => (
              <li key={group}>
                <strong className="mb-2 block font-poppins-bold text-[13px] uppercase leading-6 tracking-[2px] text-[#313131]">{group}</strong>
                <motion.ul
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                >
                  {items.map((t) => (
                    <motion.li
                      key={t}
                      variants={{ hidden: { opacity: 0, y: 10, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1 } }}
                      whileHover={{ y: -2 }}
                      className="border border-[#d8d8d8] px-3 py-[3px] font-poppins-regular text-[13px] leading-[24px] text-[#6e6e6e] transition-colors hover:border-pink hover:text-pink"
                    >
                      {t}
                    </motion.li>
                  ))}
                </motion.ul>
              </li>
            ))}
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
