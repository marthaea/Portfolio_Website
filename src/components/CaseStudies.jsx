import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import { Reveal, SectionIntro } from './Reveal'
import SketchIcon from './SketchIcon'

function Block({ label, children }) {
  return (
    <div>
      <h5 className="mb-1 font-poppins-bold text-[12px] uppercase tracking-[3px] text-pink">{label}</h5>
      {children}
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white py-[120px]">
      <div className="row">
        <SectionIntro eyebrow="Case Studies" title="Three projects, up close." lead="What each one needed, what I built, and where it stands." />
      </div>
      <div className="mx-auto w-[94%] max-w-[1000px] space-y-[70px]">
        {caseStudies.map((c, i) => (
          <article key={c.title} className={`grid items-center gap-8 min-[769px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${i % 2 ? 'min-[769px]:[&>div:first-child]:order-2' : ''}`}>
            <Reveal className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_50%_38%,#3f3f3f,#262626)]">
              <SketchIcon name={c.icon} size={200} />
            </Reveal>
            <Reveal delay={0.1} className="space-y-5">
              <header>
                <span className="font-poppins-bold text-[12px] uppercase tracking-[3px] text-[#888]">{c.role}</span>
                <h3 className="mt-1 font-poppins-semibold text-[28px] leading-[1.25] text-[#313131]">{c.title}</h3>
              </header>
              <Block label="The need"><p className="!mb-0">{c.problem}</p></Block>
              <Block label="What I built">
                <ul className="space-y-1">
                  {c.built.map((b) => (
                    <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[13px] before:h-[5px] before:w-[5px] before:bg-pink">{b}</li>
                  ))}
                </ul>
              </Block>
              <Block label="Where it stands"><p className="!mb-0">{c.result}</p></Block>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                <ul className="flex flex-wrap gap-2">
                  {c.tags.map((t) => <li key={t} className="border border-[#d8d8d8] px-3 py-[2px] font-poppins-regular text-[12px] leading-[22px] text-[#6e6e6e]">{t}</li>)}
                </ul>
                <motion.a whileHover={{ x: 3 }} href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-poppins-bold text-[12px] uppercase tracking-[3px] !text-[#313131] hover:!text-pink">
                  Visit site <ExternalLink size={14} />
                </motion.a>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}
