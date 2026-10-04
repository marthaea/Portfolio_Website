import { motion } from 'framer-motion'
import { profile } from '../data/site'
import { SectionIntro } from './Reveal'

const text = 'font-poppins-regular text-[15px] leading-[30px] text-[#b9b9b9]'

export default function Contact() {
  const cols = [
    { icon: 'icon-pin', title: 'Where to find me', lines: profile.address.map((l) => <span key={l}>{l}<br /></span>) },
    { icon: 'icon-mail', title: 'Email Me At', lines: profile.email.map((m) => <a key={m} href={`mailto:${m}`} className="!text-[#b9b9b9] hover:!text-pink break-all">{m}<br /></a>) },
    { icon: 'icon-phone', title: 'Call Me At', lines: profile.phones.map(([k, v]) => <a key={k} href={`tel:+256${v.slice(1)}`} className="!text-[#b9b9b9] hover:!text-pink">{k}: {v}<br /></a>) },
  ]
  return (
    <section id="contact" className="bg-ink pt-[120px] pb-[72px]">
      <div className="row">
        <SectionIntro dark eyebrow="Contact Me" title="I'd Love To Hear From You." />
        <div className="contact-info mx-auto mt-[48px] grid max-w-[720px] gap-y-10 text-center min-[769px]:grid-cols-3">
          {cols.map((c, i) => (
            <motion.div key={c.title} className="px-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: i * 0.12 }}>
              <motion.div className="mb-[21px]" whileHover={{ scale: 1.15, rotate: -4 }}><i className={`${c.icon} text-[42px] text-white`} aria-hidden /></motion.div>
              <h5>{c.title}</h5>
              <p className={text}>{c.lines}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
