import { createContext, useContext } from 'react'
import { motion } from 'framer-motion'

/**
 * Hand-drawn style line icons. Each one is drawn in a 64×64 box from a few
 * strokes; the shared <Icon> wrapper adds the pencil look (a soft wobble
 * filter, a faint offset "sketch" pass, a pale tinted shadow shape) and
 * draws the lines on when the icon scrolls into view.
 */

const Layer = createContext('stroke')

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
}

const fade = { hidden: { opacity: 0 }, show: { opacity: 0.16, transition: { duration: 0.5, delay: 0.3 } } }

/** One stroke. `shade` also gives the shape a tinted back-shadow (use on closed shapes). */
function P({ d, shade }) {
  const layer = useContext(Layer)
  if (layer === 'shade') return shade ? <motion.path d={d} fill="#ff0077" stroke="none" variants={fade} /> : null
  return <motion.path d={d} variants={draw} />
}

const star = (x, y, r = 4) => `M${x} ${y - r} L${x} ${y + r} M${x - r} ${y} L${x + r} ${y}`
const dot = (x, y) => `M${x} ${y} L${x + 0.1} ${y}`

const icons = {
  browser: () => (<>
    <P shade d="M8 14 L56 13 C58 13 59 14 59 16 L58 49 C58 51 57 52 55 52 L9 53 C7 53 6 52 6 50 L7 16 C7 14 7 14 8 14 Z" />
    <P d="M7 24 L58 23" />
    <P d={dot(13, 18.5)} /><P d={dot(19, 18.5)} /><P d={dot(25, 18.5)} />
    <P d="M17 34 C24 33 30 35 38 34 M17 42 C23 41 27 43 33 42" />
  </>),
  giving: () => (<>
    <P shade d="M32 30 C21 22 24 11 30 13 C32 14 32 17 32 17 C32 17 33 14 35 13 C41 11 43 22 32 30 Z" />
    <P d="M32 31 C20 22 23 10 30 12 C32 13 32 16 32 16 C32 16 34 13 36 12 C42 10 44 22 32 31" />
    <P shade d="M6 42 C8 55 22 59 32 59 C42 59 56 55 58 42 C46 49 18 49 6 42 Z" />
    <P d="M5 41 C17 50 47 50 59 41" />
    <P d="M6 42 C8 55 22 59 32 59 C42 59 56 55 58 42" />
    <P d="M17 53 C21 55 26 56 30 56" />
    <P d={star(52, 20, 3.5)} /><P d={star(12, 22, 3)} />
  </>),
  shelter: () => (<>
    <P shade d="M12 30 L12 54 C26 55 40 54 52 54 L52 30 Z" />
    <P d="M6 31 C16 24 24 16 32 9 C40 16 48 24 58 31" />
    <P d="M12 27 L12 54 C26 55 40 53 52 54 L52 27" />
    <P d="M32 47 C22 40 24 32 29 34 C31 35 32 37 32 37 C32 37 33 35 35 34 C40 32 42 40 32 47 Z" />
    <P d="M46 14 L46 22 L51 18" />
  </>),
  story: () => (<>
    <P shade d="M32 19 C24 14 15 14 8 17 L8 50 C15 47 24 47 32 52 C40 47 49 47 56 50 L56 17 C49 14 40 14 32 19 Z" />
    <P d="M32 19 C24 13 14 13 7 17 L8 51 C15 47 25 47 32 53 C39 47 49 47 56 51 L57 17 C50 13 40 13 32 19" />
    <P d="M32 19 L32 52" />
    <P d="M14 25 C18 24 22 25 26 27 M14 33 C18 32 22 33 26 35 M38 27 C42 25 46 24 50 25" />
    <P d={star(50, 8, 3.5)} />
  </>),
  galaxy: () => (<>
    <P shade d="M32 19 C40 19 46 25 46 33 C46 41 40 47 32 47 C24 47 18 41 18 33 C18 25 24 19 32 19 Z" />
    <P d="M32 18 C41 18 47 25 46 33 C45 42 39 48 31 47 C23 46 17 40 18 32 C19 24 24 18 32 18" />
    <P d="M9 44 C2 36 18 24 38 22 C56 21 62 28 54 36 C45 45 20 50 9 44" />
    <P d={star(10, 14, 4)} /><P d={star(54, 10, 3)} /><P d={dot(52, 52)} /><P d={dot(14, 56)} />
  </>),
  shield: () => (<>
    <P shade d="M32 8 L52 15 C52 35 46 48 32 56 C18 48 12 35 12 15 Z" />
    <P d="M32 7 C38 11 45 13 53 15 C53 34 46 49 32 57 C18 49 11 34 11 15 C19 13 26 11 32 7" />
    <P d="M22 32 L29 39 C33 33 38 28 43 23" />
  </>),
  pear: () => (<>
    <P shade d="M32 22 C26 22 25 28 22 33 C17 40 20 54 32 54 C44 54 47 40 42 33 C39 28 38 22 32 22 Z" />
    <P d="M32 21 C26 21 25 28 21 33 C16 41 19 55 32 55 C45 55 48 41 43 33 C39 28 38 21 32 21" />
    <P d="M32 21 C31 16 33 13 35 10" />
    <P d="M35 14 C40 8 47 9 49 12 C45 17 39 18 35 14" />
    <P d="M5 34 L14 34 M3 43 L11 43 M7 52 L14 52" />
  </>),
  kitchen: () => (<>
    <P shade d="M12 31 L52 31 L50 50 C50 53 48 55 45 55 L19 55 C16 55 14 53 14 50 Z" />
    <P d="M11 31 L53 30 L50 50 C50 54 48 55 45 55 L19 55 C16 55 14 54 14 50 Z" />
    <P d="M11 35 L5 35 M53 35 L59 35" />
    <P d="M16 26 C28 24 38 25 48 26" />
    <P d="M24 20 C20 16 27 13 23 8 M33 20 C29 16 36 13 32 8 M42 20 C38 16 45 13 41 8" />
  </>),
  lotus: () => (<>
    <P shade d="M32 52 C24 44 24 30 32 14 C40 30 40 44 32 52 Z" />
    <P d="M32 53 C23 45 24 29 32 13 C40 29 41 45 32 53" />
    <P d="M30 53 C18 53 10 45 7 32 C19 32 28 39 30 53" />
    <P d="M34 53 C46 53 54 45 57 32 C45 32 36 39 34 53" />
    <P d="M14 59 C26 61 38 61 50 59" />
  </>),
  chat: () => (<>
    <P shade d="M10 14 L40 14 C43 14 45 16 45 19 L45 32 C45 35 43 37 40 37 L22 37 L14 44 L14 37 L10 37 C7 37 5 35 5 32 L5 19 C5 16 7 14 10 14 Z" />
    <P d="M10 13 C20 14 30 13 40 13 C44 13 46 16 46 20 L46 32 C46 36 44 38 40 38 L22 37 L14 45 L14 37 L10 38 C6 38 4 36 4 32 L5 19 C5 15 7 13 10 13" />
    <P d="M27 43 L27 46 C27 49 29 51 32 51 L44 51 L52 58 L52 51 L56 51 C59 51 61 49 61 46 L61 35 C61 32 59 30 56 30 L50 30" />
    <P d={dot(15, 26)} /><P d={dot(25, 26)} /><P d={dot(35, 26)} />
  </>),
  ship: () => (<>
    <P shade d="M9 42 L55 42 C51 52 44 57 32 57 C20 57 13 52 9 42 Z" />
    <P d="M8 42 C22 43 40 41 56 42 C52 53 44 58 32 58 C20 58 12 53 8 42" />
    <P d="M32 7 L32 42" />
    <P shade d="M33 11 C44 18 49 29 49 38 L33 38 Z" />
    <P d="M33 10 C45 18 49 29 50 38 L33 38" />
    <P d="M30 17 C22 23 18 30 16 38 L30 38" />
    <P d="M4 62 C9 59 12 63 17 60 C22 57 25 62 30 60" />
  </>),
  bloom: () => (<>
    {[0, 72, 144, 216, 288].map((a) => (
      <g key={a} transform={`rotate(${a} 32 27)`}><P shade d="M32 22 C23 10 41 10 32 22 Z" /><P d="M32 22 C22 9 42 9 32 22" /></g>
    ))}
    <P d="M32 23 C35 23 37 26 36 29 C34 32 29 32 28 29 C27 26 29 23 32 23" />
    <P d="M32 36 C32 45 30 51 32 59" />
    <P d="M32 48 C27 42 21 42 18 44 C21 50 27 51 32 48 M32 52 C37 47 43 47 46 49 C43 55 37 56 32 52" />
  </>),
  globe: () => (<>
    <P shade d="M32 8 C45 8 56 19 56 32 C56 45 45 56 32 56 C19 56 8 45 8 32 C8 19 19 8 32 8 Z" />
    <P d="M32 7 C46 7 57 18 57 32 C57 46 46 57 32 57 C18 57 7 46 7 32 C7 18 18 7 32 7" />
    <P d="M8 32 C22 34 42 30 56 32" />
    <P d="M32 8 C21 20 21 44 32 56 C43 44 43 20 32 8" />
    <P d="M13 19 C25 24 39 24 51 19 M13 45 C25 40 39 40 51 45" />
  </>),
  maths: () => (<>
    <P shade d="M10 12 L54 12 C57 12 58 13 58 15 L58 49 C58 51 57 52 54 52 L10 52 C7 52 6 51 6 49 L6 15 C6 13 7 12 10 12 Z" />
    <P d="M10 11 C24 12 40 10 54 11 C58 11 59 13 59 16 L58 49 C58 52 57 53 54 53 L10 52 C7 52 5 51 5 48 L6 15 C6 12 7 11 10 11" />
    <P d="M41 20 L22 20 L32 32 L22 44 L42 44" />
    <P d={star(49, 21, 3.5)} /><P d="M12 40 L17 45 M17 40 L12 45" />
  </>),
  network: () => (<>
    <P shade d="M32 23 C37 23 41 27 41 32 C41 37 37 41 32 41 C27 41 23 37 23 32 C23 27 27 23 32 23 Z" />
    <P d="M32 22 C38 22 42 27 41 33 C40 39 35 42 30 41 C25 40 22 35 23 30 C24 25 28 22 32 22" />
    <P d="M24 25 L16 17 M40 25 L48 17 M24 39 L16 47 M40 39 L48 47" />
    <P d="M16 11 C20 11 22 14 21 17 C20 20 16 21 13 19 C11 17 12 12 16 11" />
    <P d="M49 11 C53 11 55 14 54 17 C53 20 49 21 46 19 C44 17 45 12 49 11" />
    <P d="M16 43 C20 43 22 46 21 49 C20 52 16 53 13 51 C11 49 12 44 16 43" />
    <P d="M49 43 C53 43 55 46 54 49 C53 52 49 53 46 51 C44 49 45 44 49 43" />
  </>),
  nest: () => (<>
    <P shade d="M8 36 C10 53 54 53 56 36 Z" />
    <P d="M7 35 C10 54 54 54 57 35" />
    <P d="M8 36 C20 41 44 41 56 35 M11 43 C26 48 40 48 53 43" />
    <P shade d="M22 35 C19 24 25 17 30 18 C35 19 38 27 36 35 Z" />
    <P d="M22 35 C19 25 25 17 30 17 C35 18 38 27 36 35" />
    <P d="M35 34 C34 27 38 22 42 22 C46 22 49 28 47 35" />
    <P d={star(52, 14, 3.5)} />
  </>),
  video: () => (<>
    <P shade d="M10 16 L54 16 C57 16 58 17 58 20 L58 44 C58 47 57 48 54 48 L10 48 C7 48 6 47 6 44 L6 20 C6 17 7 16 10 16 Z" />
    <P d="M10 15 C24 16 40 14 54 15 C58 15 59 17 59 21 L58 44 C58 48 56 49 53 49 L10 48 C6 48 5 46 5 43 L6 20 C6 17 7 15 10 15" />
    <P d="M27 24 C32 27 38 30 42 32 C37 35 32 38 27 41 C26 35 27 30 27 24" />
    <P d="M23 57 L41 57 M32 49 L32 57" />
  </>),
  film: () => (<>
    <P shade d="M8 27 L56 27 L56 54 L8 54 Z" />
    <P d="M7 27 C22 28 40 26 57 27 L56 54 C40 55 22 53 8 54 Z" />
    <P d="M8 26 L10 15 L58 18 L56 26" />
    <P d="M21 16 L17 26 M33 17 L29 26 M45 18 L41 26" />
    <P d="M20 40 L24 40 M30 40 L44 40 M20 47 L38 47" />
  </>),
  events: () => (<>
    <P shade d="M10 17 L54 17 L54 54 L10 54 Z" />
    <P d="M9 17 C24 18 40 16 55 17 L54 54 C40 55 24 53 10 54 Z" />
    <P d="M9 29 C24 30 40 28 55 29" />
    <P d="M22 10 L22 21 M42 10 L42 21" />
    <P d="M32 33 L34.6 39.2 L41 39.7 L36.1 43.9 L37.7 50.3 L32 46.8 L26.3 50.3 L27.9 43.9 L23 39.7 L29.4 39.2 Z" />
  </>),
}

export const iconNames = Object.keys(icons)

export default function SketchIcon({ name = 'browser', size = 112, className = '' }) {
  const Draw = icons[name] ?? icons.browser
  return (
    <motion.svg
      viewBox="-4 -4 72 72"
      width={size}
      height={size}
      className={className}
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <defs>
        <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </defs>
      <g filter="url(#pencil)">
        <Layer.Provider value="shade"><g transform="translate(3 3)"><Draw /></g></Layer.Provider>
        {/* faint offset pass, like a second pencil line */}
        <g stroke="#ffffff" strokeOpacity=".4" strokeWidth="1" transform="translate(-0.9 0.8)"><Draw /></g>
        <g stroke="#ff0077" strokeWidth="2.4"><Draw /></g>
      </g>
    </motion.svg>
  )
}
