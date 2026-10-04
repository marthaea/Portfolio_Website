import { Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/site'
import { SectionHeading, Stagger, item } from './Reveal'
import { motion } from 'framer-motion'

export default function Contact() {
  const cards = [
    { icon: MapPin, title: 'Where to find me', body: profile.address.map((l) => <span key={l} className="block">{l}</span>) },
    { icon: Mail, title: 'Email me at', body: [profile.email, profile.email2].map((m) => <a key={m} className="block break-all hover:text-accent" href={`mailto:${m}`}>{m}</a>) },
    { icon: Phone, title: 'Call me at', body: profile.phones.map((p) => <a key={p.tel} className="block hover:text-accent" href={`tel:${p.tel}`}>{p.label}: {p.display}</a>) },
  ]
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-28">
      <SectionHeading eyebrow="Contact" title="I'd love to hear from you." />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, body }) => (
          <motion.div key={title} variants={item} className="rounded-2xl border border-line bg-panel p-8 text-center">
            <Icon className="mx-auto text-accent" />
            <h3 className="mt-4 font-semibold text-white">{title}</h3>
            <div className="mt-3 text-zinc-400">{body}</div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}
