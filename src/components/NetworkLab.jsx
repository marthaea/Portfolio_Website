import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SectionIntro } from './Reveal'

const COLORS = { 10: '#ff0077', 20: '#ffb347', 30: '#4fd1c5', 0: '#bdbdbd' }
const VLANS = [
  { id: 0, label: 'All traffic' },
  { id: 10, label: 'VLAN 10 · Staff' },
  { id: 20, label: 'VLAN 20 · Labs' },
  { id: 30, label: 'VLAN 30 · Guest Wi-Fi' },
]

const links = [
  { d: 'M330 160 H770', vlan: 0, dash: true },
  { d: 'M300 190 V272', vlan: 0 },
  { d: 'M800 190 V272', vlan: 0 },
  { d: 'M280 318 L150 402', vlan: 10 },
  { d: 'M292 322 L232 402', vlan: 10 },
  { d: 'M308 322 L358 402', vlan: 20 },
  { d: 'M320 318 L448 402', vlan: 20 },
  { d: 'M336 300 H438', vlan: 30 },
  { d: 'M476 276 Q505 326 508 384', vlan: 30, dash: true },
  { d: 'M780 318 L752 402', vlan: 10 },
  { d: 'M820 318 L842 402', vlan: 20 },
  { d: 'M836 300 H888', vlan: 30 },
  { d: 'M924 276 Q942 326 922 384', vlan: 30, dash: true },
]

const packets = [
  { vlan: 10, d: 'M130 430 L300 300 L300 160 L800 160 L800 300 L750 430', dur: 7, begin: 0 },
  { vlan: 20, d: 'M358 430 L300 300 L300 160 L300 300 L220 430', dur: 6, begin: 1.2 },
  { vlan: 30, d: 'M508 420 L470 300 L300 300 L300 160 L600 160', dur: 6, begin: 2.2 },
]

const nodes = [
  { id: 'router', x: 300, y: 160, kind: 'router', label: 'Router · Head office' },
  { id: 'router', x: 800, y: 160, kind: 'router', label: 'Router · Branch' },
  { id: 'switch', x: 300, y: 300, kind: 'switch', label: 'Switch' },
  { id: 'switch', x: 800, y: 300, kind: 'switch', label: 'Switch' },
  { id: 'ap', x: 470, y: 300, kind: 'ap', label: 'Access point', vlan: 30 },
  { id: 'ap', x: 920, y: 300, kind: 'ap', label: 'Access point', vlan: 30 },
  { id: 'pc10', x: 130, y: 430, kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'pc10', x: 220, y: 430, kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'pc20', x: 358, y: 430, kind: 'pc', label: 'Lab PC', vlan: 20 },
  { id: 'pc20', x: 448, y: 430, kind: 'pc', label: 'Lab PC', vlan: 20 },
  { id: 'guest', x: 508, y: 424, kind: 'phone', label: 'Guest', vlan: 30 },
  { id: 'pc10', x: 750, y: 430, kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'pc20', x: 842, y: 430, kind: 'pc', label: 'Lab PC', vlan: 20 },
  { id: 'guest', x: 922, y: 424, kind: 'phone', label: 'Guest', vlan: 30 },
]

const info = {
  router: ['Router', 'Does the inter-VLAN routing. Each VLAN gets its own sub-interface on the trunk and acts as that VLAN’s gateway, so Staff can reach the Labs on purpose while Guests are kept out. It also forwards traffic over the WAN link between the two sites, using a routing protocol.'],
  switch: ['Switch', 'Puts every port into the right VLAN and carries all of them to the router over one trunk, each frame tagged. This is what keeps staff, lab and guest traffic apart on the same hardware.'],
  ap: ['Wireless access point', 'Broadcasts a separate guest network that maps to its own VLAN. Visitors get internet access but never touch the staff or lab networks.'],
  pc10: ['Staff computers · VLAN 10', 'Everyday office machines. They can reach the lab through the router, and the branch over the WAN link.'],
  pc20: ['Lab computers · VLAN 20', 'Kept on their own network so experiments and testing cannot disturb the office. Staff reach them only through the router.'],
  guest: ['Guest devices · VLAN 30', 'Phones and laptops on the guest Wi-Fi. Internet only: no route to staff or lab VLANs.'],
  wan: ['WAN link', 'Joins the two sites. Each router shares the networks it knows about, so the branch can reach head office and the other way round.'],
}

function Shape({ kind, color }) {
  const s = { fill: '#222', stroke: color, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'router') return (<g {...s}><circle r="30" /><path d="M-16 0 H16 M0 -16 V16 M-16 0 l5 -4 M-16 0 l5 4 M16 0 l-5 -4 M16 0 l-5 4 M0 -16 l-4 5 M0 -16 l4 5 M0 16 l-4 -5 M0 16 l4 -5" fill="none" /></g>)
  if (kind === 'switch') return (<g {...s}><rect x="-36" y="-18" width="72" height="36" rx="5" /><path d="M-22 -4 H-6 M-22 6 H-6 M8 -4 H24 M8 6 H24" fill="none" /><path d="M22 -4 l4 0 M-8 6 l-4 0" fill="none" /></g>)
  if (kind === 'ap') return (<g {...s}><path d="M-22 12 A22 22 0 0 1 22 12 Z" /><path d="M-10 -8 A14 14 0 0 1 10 -8 M-17 -16 A24 24 0 0 1 17 -16" fill="none" /></g>)
  if (kind === 'phone') return (<g {...s}><rect x="-11" y="-17" width="22" height="34" rx="4" /><path d="M-3 12 H3" fill="none" /></g>)
  return (<g {...s}><rect x="-22" y="-16" width="44" height="29" rx="3" /><path d="M-8 20 H8 M0 13 V20" fill="none" /></g>)
}

export default function NetworkLab() {
  const reduce = useReducedMotion()
  const [vlan, setVlan] = useState(0)
  const [sel, setSel] = useState(null) // index of the selected device, or 'wan'
  const selId = sel === 'wan' ? 'wan' : nodes[sel]?.id
  const dim = (v) => (vlan === 0 || v === 0 || v === vlan ? 1 : 0.12)
  const [title, text] = info[selId] ?? ['Tap a device', 'See what it does. Pick a VLAN above to follow its traffic through the network.']

  return (
    <section id="network-lab" className="relative overflow-hidden bg-ink py-[120px]">
      <div className="row">
        <SectionIntro dark eyebrow="Network Lab" title="How a multi-site network fits together." lead="A simplified, illustrative map of the enterprise network I designed, simulated and documented in Cisco Packet Tracer." />
      </div>

      <ul className="mx-auto mb-8 flex w-[94%] max-w-[1000px] flex-wrap justify-center gap-3" aria-label="Follow a VLAN">
        {VLANS.map((v) => (
          <li key={v.id}>
            <button
              onClick={() => setVlan(v.id)}
              aria-pressed={vlan === v.id}
              className="flex items-center gap-2 border px-4 py-2 font-poppins-bold text-[11px] uppercase leading-5 tracking-[2px] text-white transition-colors duration-300 hover:bg-white/10"
              style={{ borderColor: vlan === v.id ? COLORS[v.id] : 'rgb(255 255 255 / .18)', background: vlan === v.id ? `${COLORS[v.id]}33` : 'transparent' }}
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[v.id] }} />
              {v.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto w-[94%] max-w-[1000px] border border-white/10 bg-[#1b1b1b] p-2 sm:p-6">
        <svg viewBox="0 0 1000 560" className="block w-full" role="group" aria-label="Network diagram of two sites joined by a WAN link">
          <defs>
            <filter id="lab-pencil" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2" />
            </filter>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#fff" strokeOpacity=".05" /></pattern>
          </defs>
          <rect width="1000" height="560" fill="url(#grid)" />

          <g filter="url(#lab-pencil)">
            {/* sites */}
            {[['HEAD OFFICE', 30, 70, 540, 480], ['BRANCH OFFICE', 640, 70, 330, 480]].map(([t, x, y, w, h]) => (
              <g key={t}>
                <rect x={x} y={y} width={w} height={h} rx="14" fill="none" stroke="#fff" strokeOpacity=".22" strokeDasharray="7 7" strokeWidth="1.6" />
                <text x={x + 20} y={y + 30} fill="#fff" fillOpacity=".55" fontSize="13" letterSpacing="3" style={{ fontFamily: 'poppins-bold' }}>{t}</text>
              </g>
            ))}

            {/* links */}
            {links.map((l, i) => (
              <motion.path
                key={i}
                d={l.d}
                fill="none"
                stroke={COLORS[l.vlan]}
                strokeWidth={l.vlan === 0 ? 3 : 2.4}
                strokeDasharray={l.dash ? '7 7' : undefined}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: dim(l.vlan) }}
                animate={{ opacity: dim(l.vlan) }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1.2, delay: i * 0.06 }, opacity: { duration: 0.4 } }}
              />
            ))}

            {/* WAN cloud */}
            <g onClick={() => setSel('wan')} onKeyDown={(e) => e.key === 'Enter' && setSel('wan')} role="button" tabIndex={0} aria-label="WAN link" className="cursor-pointer outline-none">
              <path d="M556 176 C546 176 544 158 560 158 C562 140 590 138 598 150 C612 138 640 146 636 164 C656 166 652 182 636 182 H562 C554 182 552 176 556 176 Z" fill="#222" stroke="#bdbdbd" strokeWidth="2.4" strokeLinejoin="round" transform="translate(-26 -22)" />
              <text x="570" y="165" textAnchor="middle" fill="#fff" fontSize="13" letterSpacing="3" style={{ fontFamily: 'poppins-bold' }}>WAN</text>
            </g>

            {/* devices */}
            {nodes.map((n, i) => (
              <g key={i} transform={`translate(${n.x} ${n.y})`}>
                <motion.g
                  role="button"
                  tabIndex={0}
                  aria-label={n.label}
                  onClick={() => setSel(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(i)}
                  className="cursor-pointer outline-none"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: dim(n.vlan ?? 0), scale: 1 }}
                  animate={{ opacity: dim(n.vlan ?? 0) }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <rect x="-44" y="-40" width="88" height="96" fill="transparent" />
                  {sel === i && <circle r="44" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="4 6" />}
                  <Shape kind={n.kind} color={COLORS[n.vlan ?? 0]} />
                  <text y={n.kind === 'router' ? 50 : n.kind === 'phone' ? 34 : 38} textAnchor="middle" fill="#fff" fillOpacity=".7" fontSize="11.5" style={{ fontFamily: 'poppins-regular' }}>{n.label}</text>
                </motion.g>
              </g>
            ))}
          </g>

          {/* packets */}
          {!reduce && packets.map((p) => (vlan === 0 || vlan === p.vlan) && (
            <circle key={p.vlan + '-' + vlan} r="5.5" fill={COLORS[p.vlan]}>
              <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.06;.94;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        <div className="min-h-[118px] border-t border-white/10 px-2 pt-5 pb-1 sm:px-4">
          <AnimatePresence mode="wait">
            <motion.div key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <h4 className="font-poppins-semibold text-[18px] leading-[1.4] text-white">{title}</h4>
              <p className="!mb-0 !mt-1 font-lora text-[16px] !leading-[1.7] text-white/65">{text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
