import { motion } from 'framer-motion'

/**
 * Mini Martha: puffed hair, pink outfit, typing on a laptop, waving now and then.
 * `waving` is controlled by the parent so the wave can be timed.
 */
const SKIN = '#8a5a3c'
const SKIN_DARK = '#6e4429'
const HAIR = '#24140d'
const PINK = '#ff2e83'
const PINK_DARK = '#c8005a'

export default function BotAvatar({ waving = false, size = 120, className = '' }) {
  const typing = (delay) => ({
    animate: waving && delay > 0 ? { y: 0 } : { y: [0, -2.5, 0, -1.5, 0] },
    transition: { duration: 0.7, delay, repeat: Infinity, ease: 'easeInOut' },
  })

  return (
    <svg viewBox="0 0 160 160" width={size} height={size} className={className} aria-hidden>
      <defs>
        <clipPath id="bot-clip"><circle cx="80" cy="80" r="78" /></clipPath>
        <radialGradient id="bot-bg" cx=".5" cy=".35" r=".75"><stop offset="0" stopColor="#fff2f7" /><stop offset="1" stopColor="#ffd0e3" /></radialGradient>
        <linearGradient id="bot-lid" x1="0" x2="1"><stop offset="0" stopColor="#cfcfd4" /><stop offset=".5" stopColor="#eeeef2" /><stop offset="1" stopColor="#bdbdc4" /></linearGradient>
        <radialGradient id="bot-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#bfe3ff" stopOpacity=".45" /><stop offset="1" stopColor="#bfe3ff" stopOpacity="0" /></radialGradient>
      </defs>

      <g clipPath="url(#bot-clip)">
        <circle cx="80" cy="80" r="80" fill="url(#bot-bg)" />
        {/* little wall details */}
        <circle cx="30" cy="40" r="3" fill="#ff8fbd" opacity=".5" /><circle cx="134" cy="52" r="2" fill="#ff8fbd" opacity=".5" />

        {/* gentle breathing for the whole figure */}
        <motion.g animate={{ y: [0, -1.2, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
          {/* body: pink top with puff sleeves */}
          <path d="M34 162 C34 134 48 118 80 116 C112 118 126 134 126 162 Z" fill={PINK} />
          <path d="M66 117 C70 126 90 126 94 117" fill="none" stroke={PINK_DARK} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="42" cy="132" r="13" fill={PINK} /><circle cx="118" cy="132" r="13" fill={PINK} />
          <path d="M33 128 C38 122 46 121 52 125" stroke="#ff7ab0" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* neck + head */}
          <rect x="72" y="98" width="16" height="20" rx="6" fill={SKIN_DARK} />
          <motion.g animate={waving ? { rotate: [0, -4, 2, -3, 0] } : { rotate: 0 }} transition={{ duration: 1.8 }} style={{ transformBox: 'view-box', transformOrigin: '80px 110px' }}>
            {/* puffed hair: a big round puff on top */}
            {[[80, 30, 24], [62, 38, 13], [98, 38, 13], [70, 22, 12], [90, 22, 12], [80, 14, 11], [58, 28, 9], [102, 28, 9]].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={HAIR} />
            ))}
            <path d="M58 70 C56 52 66 46 80 46 C94 46 104 52 102 70 C100 64 92 58 80 58 C68 58 60 64 58 70 Z" fill={HAIR} />
            <rect x="64" y="45" width="32" height="6" rx="3" fill={PINK} />
            <circle cx="97" cy="47" r="4" fill={PINK} />

            <ellipse cx="80" cy="80" rx="21" ry="24" fill={SKIN} />
            <ellipse cx="59" cy="82" rx="4" ry="6" fill={SKIN_DARK} /><ellipse cx="101" cy="82" rx="4" ry="6" fill={SKIN_DARK} />
            <circle cx="59" cy="90" r="2.4" fill="#fff" /><circle cx="101" cy="90" r="2.4" fill="#fff" />
            <path d="M60 66 C62 58 70 56 80 57 C90 56 98 58 100 66 C96 61 88 60 80 60 C72 60 64 61 60 66 Z" fill={HAIR} />

            {/* brows, eyes (blinking), nose, smile, cheeks */}
            <path d="M68 72 C70 70 74 70 76 71 M84 71 C86 70 90 70 92 72" stroke={HAIR} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4.2, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <ellipse cx="72" cy="78" rx="2.4" ry="3" fill="#1a0f0a" /><ellipse cx="88" cy="78" rx="2.4" ry="3" fill="#1a0f0a" />
              <circle cx="72.8" cy="77" r=".8" fill="#fff" /><circle cx="88.8" cy="77" r=".8" fill="#fff" />
            </motion.g>
            <path d="M79 82 C78 86 79 88 82 88" stroke={SKIN_DARK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M73 92 C77 96 84 96 88 92" stroke="#7a1f3d" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="67" cy="88" r="3.4" fill="#ff5c9d" opacity=".35" /><circle cx="93" cy="88" r="3.4" fill="#ff5c9d" opacity=".35" />
          </motion.g>

          {/* laptop (we see the back of the lid) with a soft screen glow on her face */}
          <ellipse cx="80" cy="112" rx="34" ry="12" fill="url(#bot-glow)" />
          <path d="M38 158 L122 158 L118 150 L42 150 Z" fill="#9c9ca6" />
          <rect x="44" y="114" width="72" height="38" rx="4" fill="url(#bot-lid)" />
          <path d="M80 138 C74 133 75 127 78.5 128 C79.5 128.5 80 130 80 130 C80 130 80.5 128.5 81.5 128 C85 127 86 133 80 138 Z" fill={PINK} />

          {/* typing hands peeking out at the sides of the lid */}
          <motion.ellipse cx="44" cy="148" rx="7" ry="5" fill={SKIN} {...typing(0)} />
          {!waving && <motion.ellipse cx="116" cy="148" rx="7" ry="5" fill={SKIN} {...typing(0.35)} />}
        </motion.g>

        {/* the waving arm */}
        {waving && (
          <motion.g
            initial={{ rotate: 40, opacity: 0 }}
            animate={{ rotate: [40, -18, 14, -18, 14, -10, 40], opacity: [0, 1, 1, 1, 1, 1, 0] }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            style={{ transformBox: 'view-box', transformOrigin: '118px 134px' }}
          >
            <path d="M118 134 C124 120 128 108 130 96" stroke={PINK} strokeWidth="13" strokeLinecap="round" fill="none" />
            <circle cx="130" cy="90" r="8" fill={SKIN} />
            <path d="M125 84 L124 77 M129 82 L129 74 M133 82 L134 75 M137 86 L140 80" stroke={SKIN} strokeWidth="3.4" strokeLinecap="round" />
          </motion.g>
        )}
      </g>
      <circle cx="80" cy="80" r="78" fill="none" stroke="#fff" strokeWidth="3" />
    </svg>
  )
}
