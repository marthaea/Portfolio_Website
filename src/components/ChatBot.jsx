import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { reply, suggestions } from '../bot/brain'
import { asset } from '../asset'
import BotAvatar from './BotAvatar'

const greeting = {
  from: 'bot',
  text: 'Hi! I’m Martha’s assistant. 👋\nAsk me about her work, skills, stories, services or how to hire her.',
  chips: suggestions,
}

// keep in-page links working and resolve the CV path against the deploy base
const resolve = (href) => (href.startsWith('#') || /^[a-z]+:/i.test(href) ? href : asset('/' + href))

function Message({ m, onChip }) {
  const bot = m.from === 'bot'
  return (
    <motion.li
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex ${bot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[85%] ${bot ? '' : 'text-right'}`}>
        <div className={`inline-block px-4 py-2.5 text-left font-poppins-regular text-[13.5px] leading-[21px] ${bot ? 'rounded-[16px_16px_16px_4px] bg-[#f3f3f3] text-[#313131]' : 'rounded-[16px_16px_4px_16px] bg-pink text-white'}`}>
          {m.text.split('\n').map((line, i) => <p key={i} className={i ? 'mt-1.5' : ''}>{line}</p>)}
        </div>
        {m.links?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {m.links.map((l) => (
              <a key={l.label} href={resolve(l.href)} target={/^https?:/.test(l.href) ? '_blank' : undefined} rel="noopener noreferrer"
                className="border border-pink px-3 py-1 font-poppins-bold text-[10.5px] uppercase tracking-[1.5px] !text-pink hover:!bg-pink hover:!text-white">
                {l.label}
              </a>
            ))}
          </div>
        )}
        {m.chips?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.chips.map((c) => (
              <button key={c} onClick={() => onChip(c)} className="rounded-full border border-[#d8d8d8] bg-white px-3 py-1 font-poppins-regular text-[12px] text-[#555] transition-colors hover:border-pink hover:text-pink">
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  )
}

export default function ChatBot() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [waving, setWaving] = useState(false)
  const [hint, setHint] = useState(false)
  const [messages, setMessages] = useState([greeting])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const seen = useRef(false)

  // wave every so often while she works; show the "ask me" bubble the first few times
  useEffect(() => {
    if (reduce) return
    let count = 0
    const wave = () => {
      setWaving(true)
      if (!seen.current && count < 3) setHint(true)
      count++
      setTimeout(() => setWaving(false), 2300)
      setTimeout(() => setHint(false), 4500)
    }
    const first = setTimeout(wave, 2500)
    const loop = setInterval(wave, 9000)
    return () => { clearTimeout(first); clearInterval(loop) }
  }, [reduce])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!open) return
    seen.current = true
    setHint(false)
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const send = (text) => {
    const q = text.trim()
    if (!q || typing) return
    setMessages((m) => [...m, { from: 'me', text: q }])
    setInput('')
    setTyping(true)
    const answer = reply(q)
    const delay = Math.min(1400, 450 + answer.text.length * 6)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', ...answer }])
    }, delay)
  }

  return (
    <div className="fixed bottom-4 left-4 z-[900] flex flex-col items-start sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with Martha’s assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ transformOrigin: 'bottom left' }}
            className="mb-3 flex h-[min(560px,calc(100vh-150px))] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden bg-white shadow-[0_24px_60px_-12px_rgb(0_0_0/.45)]"
          >
            <header className="flex items-center gap-3 bg-ink px-4 py-3">
              <BotAvatar size={44} waving={waving} />
              <div className="min-w-0 flex-1">
                <p className="font-poppins-semibold text-[15px] leading-5 text-white">Martha’s assistant</p>
                <p className="flex items-center gap-1.5 font-poppins-regular text-[11.5px] text-white/60">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#3ddc84]" />Online · answers instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 text-white/70 hover:text-white"><X size={20} /></button>
            </header>

            <ul ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m, i) => <Message key={i} m={m} onChip={send} />)}
              {typing && (
                <li className="flex">
                  <div className="flex gap-1 rounded-[16px_16px_16px_4px] bg-[#f3f3f3] px-4 py-3" aria-label="Assistant is typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-2 w-2 rounded-full bg-[#aaa]" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </li>
              )}
            </ul>

            <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex items-center gap-2 border-t border-[#eee] p-3">
              <label htmlFor="bot-input" className="sr-only">Your message</label>
              <input
                id="bot-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                autoComplete="off"
                className="min-w-0 flex-1 border border-[#e2e2e2] px-3 py-2 font-poppins-regular text-[14px] text-[#313131] outline-none focus:border-pink"
              />
              <button type="submit" aria-label="Send" disabled={!input.trim()} className="flex h-10 w-10 items-center justify-center bg-pink text-white transition-opacity disabled:opacity-40">
                <Send size={17} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {hint && !open && (
            <motion.button
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: -6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -6, scale: 0.9 }}
              className="absolute bottom-[70%] left-[78%] whitespace-nowrap rounded-[14px_14px_14px_4px] bg-white px-4 py-2 font-poppins-semibold text-[13px] text-[#313131] shadow-[0_10px_30px_-8px_rgb(0_0_0/.35)]"
            >
              Hi! Ask me anything <span className="text-pink">→</span>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat with Martha’s assistant' : 'Chat with Martha’s assistant'}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="block rounded-full shadow-[0_14px_34px_-8px_rgb(0_0_0/.5)]"
        >
          <BotAvatar waving={waving} size={92} className="block h-[76px] w-[76px] sm:h-[92px] sm:w-[92px]" />
        </motion.button>
      </div>
    </div>
  )
}
