import { useId } from 'react'

/** Little still-life objects that sit on the bookshelf. Soft-shaded SVG, brand pink as the accent. */

// gentle sway, done in CSS (see .loop-sway in index.css)
const sway = (deg, dur, origin, delay = 0) => ({
  className: 'loop loop-sway',
  style: { '--sway': `${deg}deg`, animationDuration: `${dur}s`, animationDelay: `${delay}s`, transformOrigin: origin },
})

/** Ground shadow shared by the objects. */
function Shadow({ w, opacity = 0.45 }) {
  // a radial gradient instead of a blur filter: same soft edge, far cheaper to repaint on phones
  const id = 'sh' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <>
      <defs><radialGradient id={id}><stop offset=".35" stopColor="#000" stopOpacity={opacity} /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient></defs>
      <ellipse cx="0" cy="0" rx={Number(w) + 3} ry="7" fill={`url(#${id})`} />
    </>
  )
}

export function FlowerVase({ className }) {
  return (
    <svg viewBox="0 0 120 210" className={className} aria-hidden>
      <defs>
        <linearGradient id="vase" x1="0" x2="1">
          <stop offset="0" stopColor="#bdb3a3" /><stop offset=".35" stopColor="#f3ece0" /><stop offset="1" stopColor="#9a9081" />
        </linearGradient>
        <radialGradient id="bloomA" cx=".4" cy=".35"><stop offset="0" stopColor="#ff7ab5" /><stop offset="1" stopColor="#d4005f" /></radialGradient>
        <radialGradient id="bloomB" cx=".4" cy=".35"><stop offset="0" stopColor="#fff6ec" /><stop offset="1" stopColor="#e6cfb8" /></radialGradient>
      </defs>
      <g transform="translate(60 204)"><Shadow w="30" /></g>
      <g {...sway(1.6, 5, '60px 150px')}>
        {/* stems */}
        <g stroke="#5f7f4f" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M60 150 C58 120 40 92 36 66" /><path d="M60 150 C60 112 62 80 66 44" /><path d="M60 150 C66 118 84 96 90 72" /><path d="M60 150 C52 126 52 108 50 90" />
        </g>
        <g fill="#6f9559">
          <path d="M57 128 C44 126 38 116 40 108 C50 110 56 118 57 128" /><path d="M63 118 C76 114 84 104 82 96 C72 98 64 106 63 118" />
        </g>
        {/* blooms */}
        <g>
          <circle cx="36" cy="62" r="13" fill="url(#bloomA)" /><circle cx="36" cy="62" r="4.5" fill="#ffd0e4" />
          <circle cx="66" cy="38" r="15" fill="url(#bloomB)" /><circle cx="66" cy="38" r="5" fill="#d9a35c" />
          <circle cx="90" cy="68" r="12" fill="url(#bloomA)" /><circle cx="90" cy="68" r="4" fill="#ffd0e4" />
          <circle cx="50" cy="86" r="10" fill="url(#bloomB)" /><circle cx="50" cy="86" r="3.5" fill="#d9a35c" />
        </g>
      </g>
      {/* vase */}
      <path d="M44 150 L76 150 C80 160 90 170 88 188 C87 198 80 202 60 202 C40 202 33 198 32 188 C30 170 40 160 44 150 Z" fill="url(#vase)" />
      <path d="M44 150 L76 150" stroke="#8a8072" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 172 C52 176 68 176 76 172" stroke="#ff0077" strokeWidth="2" fill="none" opacity=".55" />
    </svg>
  )
}

export function Mug({ className }) {
  return (
    <svg viewBox="0 0 90 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="mug" x1="0" x2="1"><stop offset="0" stopColor="#a8003f" /><stop offset=".4" stopColor="#ff4d92" /><stop offset="1" stopColor="#8a0033" /></linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${36 + i * 12} 40 C${30 + i * 12} 30 ${44 + i * 12} 24 ${38 + i * 12} 12`}
          stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none"
          className="loop loop-steam"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
      <path d="M62 54 C80 52 80 76 62 76" stroke="#d6004f" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M20 46 L64 46 L61 88 C61 93 58 95 54 95 L30 95 C26 95 23 93 23 88 Z" fill="url(#mug)" />
      <ellipse cx="42" cy="46" rx="22" ry="5" fill="#3b1a12" /><ellipse cx="42" cy="46.5" rx="19" ry="3.4" fill="#6b3a24" />
    </svg>
  )
}

export function BookStack({ className, colors = ['#5b5860', '#8a6f5a', '#404546'] }) {
  const slabs = [{ w: 150, x: 6 }, { w: 132, x: 18 }, { w: 142, x: 10 }]
  return (
    <svg viewBox="0 0 170 62" className={className} aria-hidden>
      <g transform="translate(85 58)"><Shadow w="78" /></g>
      {slabs.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${42 - i * 17}) `}>
          <rect width={s.w} height="16" rx="1.5" fill={colors[i]} />
          <rect x={s.w - 8} y="2.5" width="6" height="11" fill="#efe8d8" />
          <path d={`M${s.w - 8} 5.5 H${s.w - 2} M${s.w - 8} 8 H${s.w - 2} M${s.w - 8} 10.5 H${s.w - 2}`} stroke="#c9bfa8" strokeWidth=".6" />
          <rect width={s.w} height="3" fill="#fff" opacity=".12" />
          <rect x="10" y="6" width="26" height="3" rx="1" fill="#ff0077" opacity=".75" />
        </g>
      ))}
    </svg>
  )
}

export function Candle({ className }) {
  return (
    <svg viewBox="0 0 70 120" className={className} aria-hidden>
      <defs>
        <radialGradient id="glow" cx=".5" cy=".4"><stop offset="0" stopColor="#ffd28a" stopOpacity=".7" /><stop offset="1" stopColor="#ffd28a" stopOpacity="0" /></radialGradient>
        <linearGradient id="wax" x1="0" x2="1"><stop offset="0" stopColor="#d8cfbc" /><stop offset=".4" stopColor="#fbf6ea" /><stop offset="1" stopColor="#c4baa4" /></linearGradient>
      </defs>
      <circle cx="35" cy="34" r="34" fill="url(#glow)" className="loop loop-glow" />
      <g transform="translate(35 112)"><Shadow w={26} opacity={0.4} /></g>
      <path d="M12 108 L58 108 L54 100 L16 100 Z" fill="#b08d4a" /><rect x="14" y="98" width="42" height="3" fill="#d4ae62" />
      <rect x="22" y="48" width="26" height="52" rx="2" fill="url(#wax)" />
      <path d="M35 48 V42" stroke="#2a2018" strokeWidth="1.6" />
      <path d="M35 40 C28 32 33 24 35 16 C37 24 42 32 35 40 Z" fill="#ffb347" className="loop loop-flicker" />
      <path d="M35 38 C32 33 34 28 35 24 C36 28 38 33 35 38 Z" fill="#fff4cf" />
    </svg>
  )
}

export function Plant({ className }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden>
      <defs>
        <linearGradient id="pot" x1="0" x2="1"><stop offset="0" stopColor="#8a4a34" /><stop offset=".4" stopColor="#c47a5a" /><stop offset="1" stopColor="#74392a" /></linearGradient>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#8fb36f" /><stop offset="1" stopColor="#4e7a45" /></linearGradient>
      </defs>
      <g transform="translate(60 154)"><Shadow w="34" /></g>
      <g {...sway(2, 6, '60px 104px', 0.5)}>
        <path d="M60 104 C52 80 36 64 24 34 C44 40 58 62 60 104" fill="url(#leaf)" />
        <path d="M60 104 C62 74 62 44 68 12 C80 40 72 76 60 104" fill="url(#leaf)" />
        <path d="M60 104 C70 80 88 66 100 40 C80 42 64 66 60 104" fill="url(#leaf)" />
        <path d="M60 104 C46 96 30 96 16 84 C32 80 50 88 60 104" fill="url(#leaf)" opacity=".9" />
        <path d="M60 104 C74 96 90 98 104 88 C88 82 70 90 60 104" fill="url(#leaf)" opacity=".9" />
      </g>
      <path d="M32 104 L88 104 L82 148 C81 152 78 154 74 154 L46 154 C42 154 39 152 38 148 Z" fill="url(#pot)" />
      <rect x="29" y="100" width="62" height="9" rx="2" fill="#a05f45" />
    </svg>
  )
}

/** A small framed window scene: night sky seen through four panes. */
export function PaneFrame({ className }) {
  return (
    <svg viewBox="0 0 110 130" className={className} aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b2140" /><stop offset=".7" stopColor="#5a3a6a" /><stop offset="1" stopColor="#ff7a59" /></linearGradient>
        <linearGradient id="frameWood" x1="0" x2="1"><stop offset="0" stopColor="#8a6446" /><stop offset=".5" stopColor="#b88a62" /><stop offset="1" stopColor="#6a4a33" /></linearGradient>
      </defs>
      <g transform="translate(55 124)"><Shadow w="40" /></g>
      <path d="M32 106 L46 122 L64 122 L78 106" fill="#4a3223" />
      <rect x="8" y="6" width="94" height="108" rx="3" fill="url(#frameWood)" />
      <rect x="16" y="14" width="78" height="92" fill="url(#sky)" />
      <circle cx="68" cy="40" r="9" fill="#fff4cf" /><circle cx="64" cy="37" r="9" fill="#2a2150" opacity=".35" />
      {[[28, 28], [40, 50], [82, 62], [24, 70], [52, 24], [76, 24]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="#fff" className="loop loop-twinkle" style={{ animationDuration: `${2 + (i % 3)}s`, animationDelay: `${i * 0.4}s` }} />
      ))}
      <path d="M16 106 C34 84 50 98 66 84 C78 74 88 84 94 80 V106 Z" fill="#150f26" opacity=".85" />
      {/* panes */}
      <g stroke="#a67c58" strokeWidth="4"><path d="M55 14 V106" /><path d="M16 60 H94" /></g>
    </svg>
  )
}

export function Bookend({ className }) {
  return (
    <svg viewBox="0 0 30 110" className={className} aria-hidden>
      <defs><linearGradient id="steel" x1="0" x2="1"><stop offset="0" stopColor="#5d5d5d" /><stop offset=".5" stopColor="#bdbdbd" /><stop offset="1" stopColor="#555" /></linearGradient></defs>
      <rect x="0" y="0" width="7" height="110" rx="1" fill="url(#steel)" />
      <rect x="0" y="102" width="30" height="8" rx="1" fill="url(#steel)" />
    </svg>
  )
}
