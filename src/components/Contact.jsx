import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { availability, profile, services } from '../data/site'

const email = profile.email[0]
const socials = profile.socials.filter((s) => ['LinkedIn', 'GitHub', 'Instagram'].includes(s.name))
const socialIcon = { LinkedIn: FaLinkedinIn, GitHub: FaGithub, Instagram: FaInstagram }

/** Two bands of huge outlined words drifting in opposite directions. */
function Marquee({ words, reverse, speed = 38 }) {
  const row = [...words, ...words]
  return (
    <div className="flex overflow-hidden whitespace-nowrap" aria-hidden>
      <div className={`loop-marquee flex shrink-0 items-center gap-8 pr-8 ${reverse ? 'reverse' : ''}`} style={{ '--marquee-duration': `${speed}s` }}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-poppins-bold text-[44px] uppercase leading-none tracking-[1px] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/.22)] sm:text-[72px]">{w}</span>
            <span className="text-[26px] text-pink sm:text-[38px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <button onClick={copy} className="group inline-flex items-center gap-3 border border-white/25 px-6 py-[15px] font-poppins-bold text-[12px] uppercase tracking-[3px] text-white transition-colors hover:border-pink">
      {copied ? <Check size={16} className="text-[#3ddc84]" /> : <Copy size={16} className="text-pink" />}
      {copied ? 'Email copied' : 'Copy email'}
    </button>
  )
}

/** A postcard addressed from Martha, with a stamp and a postmark. */
function Postcard() {
  const year = new Date().getFullYear()
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      whileHover={{ rotate: 0, y: -6 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className="relative mx-auto w-full max-w-[460px] bg-[#fbf8f2] p-6 text-[#313131] shadow-[0_30px_60px_-20px_rgb(0_0_0/.8)] sm:p-8"
    >
      {/* airmail stripes */}
      <div className="absolute inset-x-0 top-0 h-[8px] bg-[repeating-linear-gradient(135deg,#ff0077_0_14px,#fbf8f2_14px_22px,#151515_22px_36px,#fbf8f2_36px_44px)]" />
      <div className="absolute inset-x-0 bottom-0 h-[8px] bg-[repeating-linear-gradient(135deg,#ff0077_0_14px,#fbf8f2_14px_22px,#151515_22px_36px,#fbf8f2_36px_44px)]" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-poppins-bold text-[11px] uppercase tracking-[3px] text-[#888]">Postcard from</p>
          <p className="mt-1 font-script text-[44px] leading-[1.1] text-pink">Martha</p>
        </div>
        {/* stamp + postmark */}
        <div className="relative">
          <div className="flex h-[78px] w-[64px] rotate-3 items-center justify-center bg-pink p-[5px] shadow-[0_2px_6px_rgb(0_0_0/.2)] outline-dotted outline-[3px] outline-offset-[-2px] outline-[#fbf8f2]">
            <div className="flex h-full w-full flex-col items-center justify-center border border-white/70 text-white">
              <span className="text-[24px] leading-none">♥</span>
              <span className="mt-1 font-poppins-bold text-[8px] tracking-[1px]">UGANDA</span>
            </div>
          </div>
          <div className="absolute top-8 -left-[74px] flex h-[70px] w-[70px] -rotate-12 items-center justify-center rounded-full border-2 border-[#313131]/40 text-center font-poppins-bold text-[8px] uppercase leading-[11px] tracking-[1px] text-[#313131]/55">
            Kampala<br />{year}<br />Open for work
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_1px_1fr] sm:gap-6">
        <p className="font-lora text-[16px] italic leading-[1.7] text-[#555]">
          “Have a website, a network or a story that needs telling? Write to me. I read every message.”
        </p>
        <div className="hidden bg-[#313131]/15 sm:block" />
        <ul className="space-y-3 font-poppins-regular text-[13px] leading-5">
          <li className="border-b border-dashed border-[#313131]/25 pb-2">{profile.address[0]}</li>
          <li className="border-b border-dashed border-[#313131]/25 pb-2 break-all"><a href={`mailto:${email}`} className="!text-[#313131] hover:!text-pink">{email}</a></li>
          <li className="flex gap-2 pt-1">
            {socials.map((s) => {
              const Icon = socialIcon[s.name]
              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#313131]/25 !text-[#313131] transition-colors hover:!border-pink hover:!bg-pink hover:!text-white">
                  <Icon size={15} />
                </a>
              )
            })}
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const words = ['Web Design', 'Networking', 'Stories', 'Animation', 'AI & Chatbots', 'Servers & Automation']
  return (
    <section id="contact" className="relative overflow-hidden bg-ink pt-[90px] pb-[100px]">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgb(255_0_119/.16),transparent_65%)]" />

      <div className="space-y-3">
        <Marquee words={words} />
        <Marquee words={services.slice(6).map((s) => s.title).concat(['Web Development', 'Back-end & Databases'])} reverse speed={46} />
      </div>

      <div className="row relative mt-[80px] grid items-center gap-16 min-[961px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-poppins-bold text-[14px] uppercase tracking-[4px] text-pink">Contact me</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.5 }}
            className="mt-3 font-poppins-semibold text-[38px] leading-[1.15] text-white sm:text-[52px]"
          >
            Got an idea?<br />Let’s make it
          </motion.h2>
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
            className="-mt-2 block font-script text-[70px] leading-[1.15] text-pink sm:text-[96px]"
          >
            unforgettable.
          </motion.span>
          <p className="mt-4 max-w-[480px] font-lora text-[18px] leading-[1.7] text-white/60">
            Websites, networks, stories or something brand new: tell me what you have in mind and I’ll get back to you by email.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {availability.open && (
              <a href={availability.url} className="inline-flex items-center gap-3 bg-pink px-7 py-4 font-poppins-bold text-[12px] uppercase tracking-[3px] !text-white transition-colors hover:!bg-pink-dark">
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" /></span>
                {availability.cta}
              </a>
            )}
            <CopyEmail />
          </div>
        </div>
        <Postcard />
      </div>
    </section>
  )
}
