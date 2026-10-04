import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SectionIntro } from './Reveal'

/*
 * An illustrative enterprise network: Internet edge, firewall, two core routers sharing a
 * virtual gateway (HSRP), access + server switches, and a branch office joined over the WAN,
 * with OSPF running between the routers. Visitors can follow VLAN traffic, watch OSPF and
 * HSRP at work, and fail Core 1 to see the network recover.
 */

const C = {
  10: '#ff0077', // staff
  20: '#ffb347', // labs
  30: '#4fd1c5', // guest wi-fi
  40: '#a78bfa', // voice
  99: '#60a5fa', // servers
  0: '#9a9a9a', // trunks / routed links
  ospf: '#3ddc84',
  hsrp: '#ffd166',
  down: '#ff4d4d',
}

const VLANS = [
  { id: 0, label: 'All traffic' },
  { id: 10, label: 'Staff · 10' },
  { id: 20, label: 'Labs · 20' },
  { id: 30, label: 'Guest Wi-Fi · 30' },
  { id: 40, label: 'Voice · 40' },
  { id: 99, label: 'Servers · 99' },
]

const MODES = [
  { id: 'traffic', label: 'Traffic & VLANs' },
  { id: 'ospf', label: 'OSPF routing' },
  { id: 'hsrp', label: 'HSRP gateway' },
]

// device positions (viewBox 1000 x 650)
const P = {
  net: [360, 52], edge: [360, 128], fw: [360, 205], r1: [225, 292], r2: [495, 292], vip: [360, 292],
  wan: [728, 118], r3: [860, 292],
  sw1: [150, 412], sw2: [360, 412], sw3: [600, 412], sw4: [860, 412],
  pc1: [80, 528], pc2: [150, 528], phone1: [220, 528], lab1: [300, 528], lab2: [370, 528], ap: [445, 528], guest: [445, 604],
  srv1: [565, 528], srv2: [640, 528], bpc: [790, 528], printer: [860, 528], bphone: [930, 528],
}

const nodes = [
  { id: 'net', kind: 'cloud', label: 'Internet' },
  { id: 'edge', kind: 'router', label: 'Edge router', ospf: true, side: true },
  { id: 'fw', kind: 'firewall', label: 'Firewall', ospf: true, side: true },
  { id: 'r1', kind: 'core', label: 'Core 1', ospf: true, hsrp: true },
  { id: 'r2', kind: 'core', label: 'Core 2', ospf: true, hsrp: true },
  { id: 'wan', kind: 'cloud', label: 'WAN' },
  { id: 'r3', kind: 'router', label: 'Branch router', ospf: true },
  { id: 'sw1', kind: 'switch', label: 'Access switch 1' },
  { id: 'sw2', kind: 'switch', label: 'Access switch 2' },
  { id: 'sw3', kind: 'switch', label: 'Server switch' },
  { id: 'sw4', kind: 'switch', label: 'Branch switch' },
  { id: 'pc1', kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'pc2', kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'phone1', kind: 'ipphone', label: 'IP phone', vlan: 40 },
  { id: 'lab1', kind: 'pc', label: 'Lab PC', vlan: 20 },
  { id: 'lab2', kind: 'pc', label: 'Lab PC', vlan: 20 },
  { id: 'ap', kind: 'ap', label: 'Access point', vlan: 30 },
  { id: 'guest', kind: 'mobile', label: 'Guest', vlan: 30 },
  { id: 'srv1', kind: 'server', label: 'DHCP · DNS', vlan: 99 },
  { id: 'srv2', kind: 'server', label: 'Web server', vlan: 99 },
  { id: 'bpc', kind: 'pc', label: 'Staff PC', vlan: 10 },
  { id: 'printer', kind: 'printer', label: 'Printer', vlan: 10 },
  { id: 'bphone', kind: 'ipphone', label: 'IP phone', vlan: 40 },
]

// links: [from, to, kind, vlan]; kind: internet | routed | trunk | access | wifi | wan | hsrp
const links = [
  ['net', 'edge', 'internet'],
  ['edge', 'fw', 'routed'],
  ['fw', 'r1', 'routed'],
  ['fw', 'r2', 'routed'],
  ['r1', 'r2', 'hsrp'],
  ['r1', 'wan', 'wan'],
  ['r2', 'wan', 'wan'],
  ['wan', 'r3', 'wan'],
  ['r1', 'sw1', 'trunk'], ['r2', 'sw1', 'trunk'],
  ['r1', 'sw2', 'trunk'], ['r2', 'sw2', 'trunk'],
  ['r1', 'sw3', 'trunk'], ['r2', 'sw3', 'trunk'],
  ['r3', 'sw4', 'trunk'],
  ['sw1', 'pc1', 'access', 10], ['sw1', 'pc2', 'access', 10], ['sw1', 'phone1', 'access', 40],
  ['sw2', 'lab1', 'access', 20], ['sw2', 'lab2', 'access', 20], ['sw2', 'ap', 'access', 30], ['ap', 'guest', 'wifi', 30],
  ['sw3', 'srv1', 'access', 99], ['sw3', 'srv2', 'access', 99],
  ['sw4', 'bpc', 'access', 10], ['sw4', 'printer', 'access', 10], ['sw4', 'bphone', 'access', 40],
]

const ROUTED = new Set(['routed', 'wan', 'hsrp'])

// curved paths for the WAN links so they arc over the firewall
function linkPath(a, b, kind) {
  const [x1, y1] = P[a]
  const [x2, y2] = P[b]
  if (kind === 'wan' && a === 'r1') return `M${x1} ${y1} C 290 150, 560 92, ${x2} ${y2}`
  if (kind === 'wan' && a === 'r2') return `M${x1} ${y1} C 560 210, 650 150, ${x2} ${y2}`
  if (kind === 'wan') return `M${x1} ${y1} C 820 130, 860 190, ${x2} ${y2}`
  return `M${x1} ${y1} L${x2} ${y2}`
}

const via = (...ids) => 'M' + ids.map((id) => P[id].join(' ')).join(' L')

const info = {
  net: ['Internet', 'The outside world. Every site leaves through one guarded exit: the edge router and the firewall.'],
  edge: ['Edge router', 'Connects the company to its internet provider and translates private addresses (NAT). It also hands a default route into OSPF, so every router knows the way out.'],
  fw: ['Firewall', 'Checks traffic in both directions. Guests may reach the internet but nothing inside; the web server is the only thing the outside can reach.'],
  r1: ['Core 1 (layer-3)', 'Routes between VLANs and runs OSPF. Together with Core 2 it shares one virtual gateway using HSRP; Core 1 is the active one, with the higher priority.'],
  r2: ['Core 2 (layer-3)', 'The standby half of the HSRP pair. It listens for Core 1’s hello messages and takes over the virtual gateway within seconds if they stop.'],
  vip: ['Virtual gateway (HSRP)', 'Every device uses this one gateway address. It doesn’t belong to a single box: whichever core is active answers for it, so a failed core never means re-configuring PCs.'],
  wan: ['WAN', 'Private links to the branch from both cores. OSPF sees two equal paths and can share traffic across them, or use the survivor if one fails.'],
  r3: ['Branch router', 'Runs OSPF with both HQ cores, learning every HQ network and the default route to the internet automatically.'],
  sw1: ['Access switch 1', 'Connects staff PCs and IP phones. Each port carries a data VLAN and a separate voice VLAN, and the switch has uplinks to both cores so losing one isn’t fatal.'],
  sw2: ['Access switch 2', 'Connects the labs and the guest Wi-Fi access point, dual-homed to both cores.'],
  sw3: ['Server switch', 'Keeps the servers on their own VLAN, reachable through the cores and protected by the firewall rules.'],
  sw4: ['Branch switch', 'Serves the branch’s staff PCs, printer and phones, uplinked to the branch router.'],
  pc1: ['Staff PC · VLAN 10', 'Gets its address from the DHCP server and uses the virtual gateway to reach everything else.'],
  pc2: ['Staff PC · VLAN 10', 'Gets its address from the DHCP server and uses the virtual gateway to reach everything else.'],
  phone1: ['IP phone · VLAN 40', 'Voice gets its own VLAN and priority (QoS), so calls stay clear even when the network is busy.'],
  lab1: ['Lab PC · VLAN 20', 'Kept apart from staff machines; it can reach the servers it needs through the cores.'],
  lab2: ['Lab PC · VLAN 20', 'Kept apart from staff machines; it can reach the servers it needs through the cores.'],
  ap: ['Access point', 'Broadcasts the guest network, mapped to VLAN 30.'],
  guest: ['Guest device · VLAN 30', 'Internet only. The firewall blocks every internal network.'],
  srv1: ['DHCP & DNS server · VLAN 99', 'Hands out addresses to every VLAN (the cores relay the requests) and turns names into addresses.'],
  srv2: ['Web server · VLAN 99', 'Published to the internet through the firewall; nothing else inside is.'],
  bpc: ['Branch PC · VLAN 10', 'Reaches HQ servers and the internet through the branch router, using routes learned by OSPF.'],
  printer: ['Branch printer', 'Shared by the branch office on the staff VLAN.'],
  bphone: ['Branch IP phone · VLAN 40', 'Calls head office across the WAN on the voice VLAN.'],
}

const modeIntro = {
  traffic: ['Traffic & VLANs', 'Glowing dots are real conversations: a staff PC browsing, a lab PC fetching from a server, a guest online and a phone call to the branch. Pick a VLAN to follow just one.'],
  ospf: ['OSPF routing', 'The green links are OSPF neighbours in area 0. Each router floods what it knows (the pulses) and works out the shortest path to every network by cost. If a link dies, they recalculate in moments.'],
  hsrp: ['HSRP gateway redundancy', 'Core 1 and Core 2 share one virtual gateway. They swap hello messages every few seconds; if Core 1 goes quiet, Core 2 takes over the gateway without anyone touching a PC. Try failing Core 1.'],
}

function Shape({ kind, color, down }) {
  const s = { fill: '#202020', stroke: down ? C.down : color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (kind) {
    case 'router':
      return <g {...s}><circle r="22" /><path d="M-11 0 H11 M0 -11 V11 M-11 0 l4 -3 M-11 0 l4 3 M11 0 l-4 -3 M11 0 l-4 3 M0 -11 l-3 4 M0 -11 l3 4 M0 11 l-3 -4 M0 11 l3 -4" fill="none" /></g>
    case 'core':
      return <g {...s}><rect x="-30" y="-20" width="60" height="40" rx="8" /><path d="M-14 -7 H14 M-14 7 H14 M10 -11 l4 4 l-4 4 M-10 3 l-4 4 l4 4" fill="none" /></g>
    case 'firewall':
      return <g {...s}><rect x="-26" y="-17" width="52" height="34" rx="3" /><path d="M-26 -6 H26 M-26 6 H26 M-10 -17 V-6 M10 -17 V-6 M0 -6 V6 M-18 6 V17 M18 6 V17" fill="none" /></g>
    case 'switch':
      return <g {...s}><rect x="-32" y="-15" width="64" height="30" rx="5" /><path d="M-20 -4 H-5 M-20 5 H-5 M5 -4 H20 M5 5 H20 M17 -7 l3 3 l-3 3 M-17 2 l-3 3 l3 3" fill="none" /></g>
    case 'server':
      return <g {...s}><rect x="-14" y="-22" width="28" height="44" rx="3" /><path d="M-8 -12 H8 M-8 -4 H8 M-8 4 H8" fill="none" /><circle cx="0" cy="14" r="2" /></g>
    case 'ap':
      return <g {...s}><path d="M-18 10 A18 18 0 0 1 18 10 Z" /><path d="M-8 -6 A11 11 0 0 1 8 -6 M-14 -13 A20 20 0 0 1 14 -13" fill="none" /></g>
    case 'mobile':
      return <g {...s}><rect x="-9" y="-15" width="18" height="30" rx="3" /><path d="M-3 10 H3" fill="none" /></g>
    case 'ipphone':
      return <g {...s}><rect x="-17" y="-8" width="34" height="20" rx="3" /><path d="M-14 -8 C-14 -16 14 -16 14 -8" fill="none" /><path d="M-8 0 h2 M-1 0 h2 M6 0 h2 M-8 6 h2 M-1 6 h2 M6 6 h2" fill="none" /></g>
    case 'printer':
      return <g {...s}><rect x="-18" y="-6" width="36" height="18" rx="3" /><path d="M-11 -6 V-15 H11 V-6 M-11 12 V17 H11 V12" fill="none" /></g>
    case 'cloud':
      return <g {...s}><path d="M-34 12 C-46 12 -46 -6 -32 -6 C-30 -22 -6 -24 0 -12 C8 -24 34 -18 30 -2 C46 -2 44 12 32 12 Z" /></g>
    default:
      return <g {...s}><rect x="-17" y="-13" width="34" height="23" rx="3" /><path d="M-6 16 H6 M0 10 V16" fill="none" /></g>
  }
}

export default function NetworkLab() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState('traffic')
  const [vlan, setVlan] = useState(0)
  const [sel, setSel] = useState(null)
  const [failed, setFailed] = useState(false)

  const active = failed ? 'r2' : 'r1'
  const isDown = (id) => failed && id === 'r1'
  const linkDown = (a, b) => failed && (a === 'r1' || b === 'r1')

  // conversations, routed through whichever core is active
  const packets = [
    { vlan: 10, d: via('pc1', 'sw1', active, 'fw', 'edge', 'net'), dur: 6 },
    { vlan: 20, d: via('lab2', 'sw2', active, 'sw3', 'srv2'), dur: 5, begin: 1 },
    { vlan: 30, d: via('guest', 'ap', 'sw2', active, 'fw', 'edge', 'net'), dur: 6.5, begin: 2 },
    { vlan: 40, d: via('phone1', 'sw1', active, 'wan', 'r3', 'sw4', 'bphone'), dur: 7, begin: 0.5 },
    { vlan: 99, d: via('srv1', 'sw3', active, 'sw2', 'lab1'), dur: 5, begin: 3 },
  ]

  // OSPF flooding: pulses travel along every OSPF adjacency
  const ospfLinks = links.filter(([a, b, k]) => ROUTED.has(k) && !linkDown(a, b))

  const linkColor = (a, b, k, v) => {
    if (linkDown(a, b)) return C.down
    if (mode === 'ospf') return ROUTED.has(k) ? C.ospf : '#4a4a4a'
    if (mode === 'hsrp') return k === 'hsrp' ? C.hsrp : (a === active || b === active) && k === 'trunk' ? '#d6d6d6' : '#4a4a4a'
    return v ? C[v] : C[0]
  }
  const linkOpacity = (v) => (mode !== 'traffic' || vlan === 0 || !v || v === vlan ? 1 : 0.12)
  const nodeOpacity = (n) => {
    if (mode === 'ospf') return n.ospf || n.kind === 'cloud' ? 1 : 0.35
    if (mode === 'hsrp') return n.hsrp || ['sw1', 'sw2', 'sw3'].includes(n.id) ? 1 : 0.35
    return vlan === 0 || !n.vlan || n.vlan === vlan ? 1 : 0.15
  }

  const [title, text] = sel ? info[sel] : modeIntro[mode]
  const status = failed
    ? 'Core 1 is down. Core 2 took over the virtual gateway, and OSPF re-routed around it. Nobody had to change a setting.'
    : 'All links up. Core 1 is the active gateway; Core 2 is standing by.'

  return (
    <section id="network-lab" className="relative overflow-hidden bg-ink py-[120px]">
      <div className="row">
        <SectionIntro dark eyebrow="Network Lab" title="An enterprise network, live." lead="Two sites, a firewall, redundant cores sharing one gateway (HSRP) and OSPF routing between them. Switch views, follow the traffic, then break something." />
      </div>

      {/* mode tabs */}
      <div className="mx-auto mb-5 flex w-[94%] max-w-[1040px] flex-wrap justify-center gap-2" role="tablist" aria-label="Network view">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => { setMode(m.id); setSel(null) }}
            className={`relative px-5 py-2.5 font-poppins-bold text-[11px] uppercase tracking-[2.5px] transition-colors ${mode === m.id ? 'text-ink' : 'text-white/70 hover:text-white'}`}
          >
            {mode === m.id && <motion.span layoutId="lab-mode" className="absolute inset-0 bg-pink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{m.label}</span>
          </button>
        ))}
      </div>

      {/* VLAN filters (traffic view) + failure switch */}
      <div className="mx-auto mb-6 flex w-[94%] max-w-[1040px] flex-wrap items-center justify-center gap-2">
        {mode === 'traffic' && VLANS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVlan(v.id)}
            aria-pressed={vlan === v.id}
            className="flex items-center gap-2 border px-3 py-1.5 font-poppins-bold text-[10px] uppercase leading-5 tracking-[1.5px] text-white transition-colors hover:bg-white/10"
            style={{ borderColor: vlan === v.id ? C[v.id] : 'rgb(255 255 255 / .18)', background: vlan === v.id ? `${C[v.id]}33` : 'transparent' }}
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: C[v.id] }} />{v.label}
          </button>
        ))}
        <button
          onClick={() => setFailed((f) => !f)}
          aria-pressed={failed}
          className={`ml-0 flex items-center gap-2 border px-4 py-1.5 font-poppins-bold text-[10px] uppercase leading-5 tracking-[1.5px] transition-colors sm:ml-3 ${failed ? 'border-[#3ddc84] text-[#3ddc84] hover:bg-[#3ddc84]/10' : 'border-[#ff4d4d] text-[#ff6b6b] hover:bg-[#ff4d4d]/10'}`}
        >
          {failed ? '↺ Restore Core 1' : '⚡ Fail Core 1'}
        </button>
      </div>

      <div className="mx-auto w-[94%] max-w-[1040px] border border-white/10 bg-[#1a1a1a]">
        <div className="overflow-x-auto">
          <svg viewBox="0 0 1000 650" className="block w-full min-w-[720px]" role="group" aria-label="Network diagram">
            <defs>
              <pattern id="lab-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 H0 V40" fill="none" stroke="#fff" strokeOpacity=".04" /></pattern>
            </defs>
            <rect width="1000" height="650" fill="url(#lab-grid)" />

            {/* sites */}
            <rect x="18" y="88" width="694" height="550" rx="14" fill="none" stroke="#fff" strokeOpacity=".16" strokeDasharray="7 7" />
            <text x="38" y="114" fill="#fff" fillOpacity=".45" fontSize="12" letterSpacing="3" style={{ fontFamily: 'poppins-bold' }}>HEAD OFFICE</text>
            <rect x="742" y="200" width="242" height="438" rx="14" fill="none" stroke="#fff" strokeOpacity=".16" strokeDasharray="7 7" />
            <text x="762" y="226" fill="#fff" fillOpacity=".45" fontSize="12" letterSpacing="3" style={{ fontFamily: 'poppins-bold' }}>BRANCH OFFICE</text>

            {/* OSPF area label */}
            <AnimatePresence>
              {mode === 'ospf' && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <rect x="84" y="188" width="92" height="24" rx="12" fill={C.ospf} fillOpacity=".15" stroke={C.ospf} />
                  <text x="130" y="204" textAnchor="middle" fill={C.ospf} fontSize="11" letterSpacing="2" style={{ fontFamily: 'poppins-bold' }}>AREA 0</text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* links */}
            {links.map(([a, b, k, v], i) => (
              <motion.path
                key={i}
                d={linkPath(a, b, k)}
                fill="none"
                strokeLinecap="round"
                strokeWidth={ROUTED.has(k) || k === 'internet' ? 3 : k === 'trunk' ? 2 : 2.2}
                strokeDasharray={k === 'wifi' || k === 'wan' || k === 'internet' || linkDown(a, b) ? '6 6' : undefined}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                animate={{ stroke: linkColor(a, b, k, v), opacity: linkDown(a, b) ? 0.5 : linkOpacity(v) }}
                transition={{ pathLength: { duration: 1.1, delay: i * 0.03 }, default: { duration: 0.4 } }}
              />
            ))}

            {/* HSRP virtual gateway */}
            <AnimatePresence>
              {mode === 'hsrp' && (
                <motion.g
                  key="vip"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  onClick={() => setSel('vip')}
                  className="cursor-pointer"
                >
                  <rect x="298" y="306" width="124" height="40" rx="8" fill="#2a2416" stroke={C.hsrp} strokeDasharray="4 4" />
                  <text x="360" y="323" textAnchor="middle" fill={C.hsrp} fontSize="10" letterSpacing="1.5" style={{ fontFamily: 'poppins-bold' }}>VIRTUAL GATEWAY</text>
                  <text x="360" y="338" textAnchor="middle" fill="#fff" fillOpacity=".7" fontSize="10" style={{ fontFamily: 'poppins-regular' }}>served by {failed ? 'Core 2' : 'Core 1'}</text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* devices */}
            {nodes.map((n, i) => {
              const [x, y] = P[n.id]
              const down = isDown(n.id)
              const color = n.vlan ? C[n.vlan] : mode === 'ospf' && n.ospf ? C.ospf : mode === 'hsrp' && n.hsrp ? C.hsrp : '#cfcfcf'
              const role = mode === 'hsrp' && n.hsrp ? (n.id === active ? 'ACTIVE' : down ? 'DOWN' : 'STANDBY') : null
              return (
                <g key={n.id} transform={`translate(${x} ${y})`}>
                  <motion.g
                    role="button"
                    tabIndex={0}
                    aria-label={n.label}
                    onClick={() => setSel(n.id)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(n.id)}
                    className="cursor-pointer outline-none"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: nodeOpacity(n), scale: 1 }}
                    animate={{ opacity: nodeOpacity(n) }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 + i * 0.03 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <rect x="-40" y="-34" width="80" height="78" fill="transparent" />
                    {sel === n.id && <circle r="38" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="4 6" />}
                    <Shape kind={n.kind} color={color} down={down} />
                    {n.kind === 'cloud' && <text y="5" textAnchor="middle" fill="#fff" fontSize="10.5" letterSpacing="2" style={{ fontFamily: 'poppins-bold' }}>{n.label.toUpperCase()}</text>}
                    {n.kind !== 'cloud' && n.side && (
                      <text x={-34} y={4} textAnchor="end" fill="#fff" fillOpacity=".7" fontSize="11" style={{ fontFamily: 'poppins-regular' }}>{n.label}</text>
                    )}
                    {n.kind !== 'cloud' && !n.side && (
                      <text y={n.kind === 'core' ? 36 : n.kind === 'server' ? 38 : 34} textAnchor="middle" fill="#fff" fillOpacity=".7" fontSize="11" style={{ fontFamily: 'poppins-regular' }}>{n.label}</text>
                    )}
                    {down && <path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke={C.down} strokeWidth="4" strokeLinecap="round" />}
                    {role && (
                      <g transform="translate(0 -34)">
                        <rect x="-32" y="-10" width="64" height="18" rx="9" fill={role === 'ACTIVE' ? '#3ddc84' : role === 'DOWN' ? C.down : C.hsrp} />
                        <text y="3" textAnchor="middle" fill="#151515" fontSize="9.5" letterSpacing="1.5" style={{ fontFamily: 'poppins-bold' }}>{role}</text>
                      </g>
                    )}
                  </motion.g>
                </g>
              )
            })}

            {/* moving dots */}
            {!reduce && mode === 'traffic' && packets.map((p) => (vlan === 0 || vlan === p.vlan) && (
              <circle key={`${p.vlan}-${active}-${vlan}`} r="5.5" fill={C[p.vlan]}>
                <animateMotion dur={`${p.dur}s`} begin={`${p.begin ?? 0}s`} repeatCount="indefinite" path={p.d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.05;.95;1" dur={`${p.dur}s`} begin={`${p.begin ?? 0}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {!reduce && mode === 'ospf' && ospfLinks.map(([a, b, k], i) => (
              <circle key={`ospf-${a}-${b}-${failed}`} r="4.5" fill={C.ospf}>
                <animateMotion dur="2.4s" begin={`${(i % 4) * 0.6}s`} repeatCount="indefinite" path={linkPath(a, b, k)} />
                <animate attributeName="r" values="2;6;2" dur="2.4s" begin={`${(i % 4) * 0.6}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {!reduce && mode === 'hsrp' && !failed && [0, 1].map((dir) => (
              <circle key={`hello-${dir}`} r="5" fill={C.hsrp}>
                <animateMotion dur="1.4s" begin={`${dir * 1.5}s`} repeatCount="indefinite" path={dir ? 'M465 292 L255 292' : 'M255 292 L465 292'} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="1.4s" begin={`${dir * 1.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {!reduce && mode === 'hsrp' && (
              <circle key={`gw-${active}`} r="5.5" fill="#fff">
                <animateMotion dur="3s" repeatCount="indefinite" path={via('pc2', 'sw1', active, 'fw')} />
              </circle>
            )}
          </svg>
        </div>

        <div className="grid gap-5 border-t border-white/10 px-5 pt-5 pb-5 min-[769px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <AnimatePresence mode="wait">
            <motion.div key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <h4 className="font-poppins-semibold text-[18px] leading-[1.4] text-white">{title}</h4>
              <p className="!mb-0 !mt-1 font-lora text-[16px] !leading-[1.7] text-white/65">{text}</p>
              {sel && <button onClick={() => setSel(null)} className="mt-2 font-poppins-bold text-[10px] uppercase tracking-[2px] text-pink">← Back to {MODES.find((m) => m.id === mode).label}</button>}
            </motion.div>
          </AnimatePresence>
          <div className={`self-start border-l-2 pl-4 font-poppins-regular text-[13px] leading-[1.6] ${failed ? 'border-[#ff4d4d] text-[#ffb3b3]' : 'border-[#3ddc84] text-white/60'}`} aria-live="polite">
            <p className="mb-1 font-poppins-bold text-[10px] uppercase tracking-[2px]">{failed ? 'Failover' : 'Status'}</p>
            {status}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-4 w-[94%] max-w-[1040px] text-center font-lora text-[14px] italic text-white/35">Illustrative design. Tap any device to see what it does.</p>
    </section>
  )
}
