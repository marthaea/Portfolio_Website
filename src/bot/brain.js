/**
 * The bot's "brain": finds the best answer for a message.
 * No AI service is involved. Messages are normalised, split into words and each word is
 * matched loosely (one or two typos allowed), so "waht servcies" still finds "services".
 */
import { availability, education, profile, services, stats } from '../data/site.js'
import { projects } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { faqs } from './faqs.js'

// ---------- text helpers ----------
const norm = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

// Damerau-Levenshtein (optimal string alignment) distance
function dist(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

// collapse stretched words: "helloooo" -> "hello", "pleeease" -> "please"
const squeeze = (w) => w.replace(/(.)\1{2,}/g, '$1$1')

// Everyday words that appear in lots of questions: they only count when spelled exactly,
// and they count for less than a specific word like "pricing" or "wattpad".
const GENERIC = new Set(['do', 'can', 'you', 'u', 'how', 'it', 'up', 'where', 'when', 'from', 'live', 'this', 'made', 'make',
  'help', 'start', 'work', 'built', 'call', 'talk', 'read', 'write', 'book', 'time', 'real', 'name', 'who', 'about',
  'tell', 'she', 'like', 'love', 'what', 'your',
  'ur', 'site', 'page', 'code', 'link', 'safe', 'old', 'number', 'message', 'reach', 'job', 'quick', 'fast', 'soon', 'when'])

/** How well does a typed word match a keyword? 0 = not at all, 1 = exactly. */
function similar(word, key) {
  if (word === key) return GENERIC.has(key) ? 0.6 : 1
  if (GENERIC.has(key) || key.length <= 3 || word.length <= 2) return 0 // these must match exactly
  if (word[0] !== key[0]) return 0 // typos rarely change the first letter
  // "portfolios" ~ "portfolio", "remotely" ~ "remote"; a short word only counts as the start of a long one from 5 letters
  if ((word.length >= 4 && word.startsWith(key) && word.length - key.length <= 3) || (word.length >= 5 && key.startsWith(word) && key.length - word.length <= 3)) return 0.9
  const tolerance = key.length <= 5 ? 1 : 2
  return dist(word, key) <= tolerance ? 0.8 : 0
}

// also try each word with doubled letters collapsed: "heyy" -> "hey", "youu" -> "you"
const variants = (w) => { const single = w.replace(/(.)\1+/g, '$1'); return single === w ? [w] : [w, single] }

const hit = (words, keys) => {
  let best = 0
  for (const w of words) for (const v of variants(w)) for (const k of keys) best = Math.max(best, similar(v, k))
  return best
}

// ---------- answers ----------
const email = profile.email[0]
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const stories = projects.filter((p) => p.type === 'Creative Writing' && p.spine).map((p) => p.title)
const webCount = stats.find((s) => s.title === 'Websites Built')
const clientCount = stats.find((s) => s.title === 'Happy Clients')
const bookCall = { label: availability.cta, href: availability.url }
const caseLink = { label: 'Case studies', href: '#case-studies' }
const listServices = services.map((s) => s.title).join(', ')
const skillLines = profile.skillGroups.map(([g, items]) => `${g}: ${items.join(', ')}`).join('\n')
const study = education[0]
const cs = (name) => caseStudies.find((c) => c.title.toLowerCase().includes(name))

const jokes = [
  'Why do network engineers make great friends? They always keep you connected.',
  'Martha told her CSS it was a mess. It said it just had too much class.',
  'Why did the developer go broke? She used up all her cache.',
  'There are 10 kinds of people: those who understand binary and those who don’t.',
]

/**
 * Each intent lists word groups. Every group must match at least one word in the message;
 * `boost` words add confidence. Small talk is only chosen when nothing else matches as well.
 */
const intents = [
  // ---- small talk ----
  { id: 'greet', small: true, maxWords: 6, groups: [['hi', 'hello', 'hey', 'hiya', 'howdy', 'greetings', 'morning', 'afternoon', 'evening', 'yo', 'hola', 'oli', 'jambo', 'habari']],
    answer: () => ({ text: pick(['Hi there! I’m Martha’s bot. Ask me about her work, skills, stories or how to hire her.', 'Hello! Lovely to see you here. What would you like to know about Martha?', 'Hey! I’m on a little coffee break from coding. Ask me anything about Martha.']) }) },
  { id: 'howareyou', small: true, phrase: /\b(how (are|ar|r|re) (you|u|ya|yu)|how (you|u) doing|hows it going|how is it going|how are things|hows life|how do you do|whats up|wassup|wazzup|sup|what (are|r) (you|u) (up to|doing)|whatre you (up to|doing)|wyd)\b/,
    answer: () => ({ text: pick(['I’m great, thanks for asking! Just typing away on Martha’s laptop. How can I help?', 'Doing well! A little busy writing code, but never too busy to chat. What about you?']) }) },
  { id: 'imgood', small: true, maxWords: 4, groups: [['good', 'great', 'fine', 'okay', 'ok', 'well', 'awesome', 'cool', 'nice']],
    answer: () => ({ text: 'Glad to hear it! Anything you’d like to know about Martha’s work?' }) },
  { id: 'laugh', small: true, maxWords: 4, groups: [['lol', 'haha', 'hahaha', 'hehe', 'lmao', 'rofl', 'xd']],
    answer: () => ({ text: pick(['Haha! 😄 Anything else you’d like to know?', 'Glad I made you smile! Ask me anything about Martha.']) }) },
  { id: 'thanks', small: true, groups: [['thanks', 'thank', 'thx', 'ty', 'appreciate', 'cheers', 'asante', 'webale', 'merci']],
    answer: () => ({ text: pick(['You’re welcome! Anything else?', 'Anytime! Webale (thank you) for stopping by.', 'My pleasure!']) }) },
  { id: 'bye', small: true, groups: [['bye', 'goodbye', 'later', 'ciao', 'cya', 'goodnight', 'night', 'tata']],
    answer: () => ({ text: 'Bye for now! If you have a project in mind, Martha would love to hear about it.', links: [bookCall] }) },
  { id: 'bot', small: true, groups: [['you', 'your', 'u', 'ur'], ['bot', 'robot', 'ai', 'real', 'human', 'name', 'who', 'person', 'alive']],
    answer: () => ({ text: 'I’m Martha’s little bot: a drawing of her, fed with what she does. I’m not the real Martha, but I know a lot about her work. For anything personal or detailed, email her.', links: [{ label: 'Email Martha', href: `mailto:${email}` }] }) },
  { id: 'joke', small: true, groups: [['joke', 'jokes', 'funny', 'laugh', 'pun']],
    answer: () => ({ text: pick(jokes) }) },
  { id: 'colour', small: true, groups: [['favourite', 'favorite', 'fav', 'colour', 'color', 'pink']],
    answer: () => ({ text: 'Pink, obviously. Look at the outfit. 💗' }) },
  { id: 'love', small: true, groups: [['love', 'like', 'awesome', 'amazing', 'beautiful', 'cool', 'nice', 'wow'], ['site', 'website', 'portfolio', 'you', 'bot', 'this', 'work']],
    answer: () => ({ text: 'Aww, thank you! Martha will be thrilled. Want to see more of her work?', links: [{ label: 'Portfolio', href: '#portfolio' }, caseLink] }) },
  { id: 'private', small: true, weight: 1.5, groups: [['age', 'old', 'birthday', 'born', 'married', 'boyfriend', 'girlfriend', 'husband', 'single', 'relationship', 'religion', 'address', 'dating']],
    answer: () => ({ text: 'That’s personal, so I keep it private. I’m happy to talk about Martha’s work, skills and stories, though!' }) },

  // ---- about Martha ----
  { id: 'about', groups: [['who', 'about', 'tell', 'introduce', 'martha', 'yourself', 'bio', 'background', 'she']], boost: ['martha', 'about', 'who'],
    answer: () => ({ text: `${profile.name} is a software engineer, creative technologist and writer based in ${profile.address[0]}. She builds accessible websites, designs networks, writes fiction and draws.\nShe is studying for a ${study.title.replace('Degree-', '')} at ${study.place}.`, links: [{ label: 'About', href: '#about' }] }) },
  { id: 'services', groups: [['service', 'services', 'offer', 'provide', 'specialise', 'specialize', 'speciality', 'specialty', 'help', 'do', 'can']], boost: ['services', 'offer', 'what'],
    answer: () => ({ text: `Here’s what Martha offers: ${listServices}.\nTell her about your project and she’ll suggest the best fit.`, links: [{ label: 'Services', href: '#services' }, bookCall] }) },
  { id: 'hire', groups: [['hire', 'hiring', 'available', 'availability', 'freelance', 'book', 'call', 'meeting', 'commission', 'collaborate', 'collab', 'start', 'job', 'opportunity']], boost: ['hire', 'available', 'freelance'],
    answer: () => ({ text: availability.open ? `Yes! ${availability.text} (${availability.where}). Book a call or send a short note about your project.` : 'Martha isn’t taking new work right now, but you can still email her.', links: [bookCall] }) },
  { id: 'buildme', groups: [['build', 'make', 'create', 'design', 'develop', 'code'], ['me', 'my', 'us', 'our', 'mine']], boost: ['website', 'site', 'app', 'logo', 'network'],
    answer: () => ({ text: 'Yes, that’s exactly the kind of thing Martha does! Tell her what you have in mind (what it’s for, any deadline and budget) and she’ll get back to you.', links: [bookCall, { label: 'Services', href: '#services' }] }) },
  { id: 'speak', weight: 1.5, groups: [['speak', 'spoken', 'speaks', 'english', 'french', 'swahili', 'kiswahili', 'runyakitara', 'luganda']],
    answer: () => ({ text: 'Martha speaks English (professionally), Runyakitara (near-native), and French and Kiswahili (conversational).' }) },
  { id: 'price', groups: [['price', 'pricing', 'prices', 'cost', 'costs', 'charge', 'charges', 'rate', 'rates', 'budget', 'fee', 'fees', 'quote', 'expensive', 'cheap', 'much', 'pay']],
    answer: () => ({ text: 'It depends on what you need: the size of the site, features and timeline. Send Martha a short description and your budget, and she’ll come back with a clear quote.', links: [bookCall] }) },
  { id: 'time', groups: [['long', 'time', 'timeline', 'deadline', 'fast', 'quick', 'quickly', 'duration', 'weeks', 'days', 'when', 'soon', 'urgent']], boost: ['website', 'site', 'build', 'take'],
    answer: () => ({ text: 'That depends on the scope. A simple site is quicker than one with logins, payments or a database. Share your deadline and Martha will tell you honestly what’s possible.', links: [bookCall] }) },
  { id: 'skills', groups: [['skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'languages', 'language', 'framework', 'frameworks', 'tools', 'react', 'javascript', 'python', 'typescript', 'tailwind', 'node', 'nextjs', 'next', 'supabase', 'code', 'coding', 'program', 'programming']], boost: ['skills', 'stack', 'tech'],
    answer: () => ({ text: `${skillLines}\n(Spoken languages: English, Runyakitara, French and Kiswahili.)`, links: [{ label: 'Skills', href: '#about' }] }) },
  { id: 'network', groups: [['network', 'networking', 'networks', 'vlan', 'vlans', 'cisco', 'packet', 'tracer', 'router', 'routing', 'switch', 'switches', 'server', 'servers', 'automation', 'automate', 'infrastructure', 'wifi', 'wireless', 'enterprise', 'sysadmin']],
    answer: () => ({ text: 'Martha does advanced and enterprise networking, server systems and automation. She has designed and documented a multi-site enterprise network in Cisco Packet Tracer with VLANs, inter-VLAN routing and wireless.\nThere’s an interactive version of it on this page.', links: [{ label: 'Open the Network Lab', href: '#network-lab' }] }) },
  { id: 'work', groups: [['project', 'projects', 'portfolio', 'work', 'websites', 'sites', 'built', 'examples', 'samples', 'clients', 'client', 'made', 'apps']], boost: ['projects', 'portfolio', 'work', 'show', 'see'],
    answer: () => ({ text: `Martha has built ${webCount.value}${webCount.suffix} websites for ${clientCount.value}${clientCount.suffix} happy clients. Highlights include Docere Foundation, The Voiceless Pet Shelter, Galaxy Quest (a NASA exoplanet explorer) and Link Guardian.`, links: [{ label: 'Portfolio', href: '#portfolio' }, caseLink] }) },
  { id: 'linkguardian', weight: 1.5, groups: [['guardian', 'security', 'malicious', 'virus', 'phishing', 'safe', 'scam', 'cybersecurity', 'link', 'links', 'url']],
    answer: () => { const c = cs('guardian'); return { text: `${c.title}: ${c.problem} ${c.built.join(' ')}`, links: [{ label: 'Visit', href: c.url }, caseLink] } } },
  { id: 'shelter', weight: 1.5, groups: [['voiceless', 'shelter', 'pet', 'pets', 'adopt', 'adoption', 'animal', 'animals', 'dog', 'cat', 'puppy', 'kitten']],
    answer: () => { const c = cs('voiceless'); return { text: `${c.title}: Martha was ${c.role.toLowerCase()}. ${c.built.join(' ')}`, links: [{ label: 'Visit', href: c.url }, caseLink] } } },
  { id: 'docere', weight: 1.5, groups: [['docere', 'foundation', 'nonprofit', 'ngo', 'charity']],
    answer: () => { const c = cs('docere'); return { text: `${c.title}: ${c.problem} ${c.result}`, links: [{ label: 'Visit', href: c.url }, caseLink] } } },
  { id: 'galaxy', weight: 1.5, groups: [['galaxy', 'nasa', 'space', 'exoplanet', 'exoplanets', 'planet', 'planets', 'quest', 'stars', 'astronomy']],
    answer: () => ({ text: 'Galaxy Quest is a NASA exoplanet explorer. Martha built the front end on NASA’s Exoplanet Archive API, with a data-rich interface for exploring planets beyond our solar system.', links: [{ label: 'Visit', href: 'https://galaxyquest.netlify.app' }] }) },
  { id: 'stories', groups: [['story', 'stories', 'write', 'writing', 'writer', 'book', 'books', 'wattpad', 'novel', 'novels', 'read', 'reading', 'fiction', 'author', 'poem', 'poems', 'poetry', 'shelf', 'bookshelf', 'bookshelves']],
    answer: () => ({ text: `Martha is a fiction writer on Wattpad with ${stats.find((s) => s.title === 'Stories Written').value}+ stories, including ${stories.slice(-6).join(', ')}.\nPick one off the bookshelf to read a peek.`, links: [{ label: 'Bookshelf', href: '#stories' }] }) },
  { id: 'art', groups: [['art', 'artist', 'draw', 'drawing', 'drawings', 'sketch', 'animation', 'animate', 'animator', 'paint', 'painting', 'illustration', 'illustrator', 'toon', 'tvpaint', 'graphic', 'graphics', 'logo', 'brand']],
    answer: () => ({ text: 'Martha draws, animates and designs. She works in Toon Boom Harmony and TVPaint, interned as an animator at Musinguzi Studios in May 2025, and does logo and brand design.', links: [{ label: 'See her art', href: '#portfolio' }] }) },
  { id: 'education', groups: [['study', 'studying', 'studies', 'school', 'university', 'uni', 'degree', 'education', 'ucu', 'college', 'student', 'course', 'graduate', 'qualification', 'qualifications']],
    answer: () => ({ text: `Martha is studying for a ${study.title.replace('Degree-', '')} at ${study.place} (${study.period}).`, links: [{ label: 'Resume', href: '#resume' }] }) },
  { id: 'experience', groups: [['experience', 'intern', 'internship', 'worked', 'musinguzi', 'studio', 'career', 'employment']],
    answer: () => ({ text: 'Martha has been freelancing as a web and front-end developer since 2024, writing since 2018, and interned as an animator at Musinguzi Studios in May 2025.', links: [{ label: 'Resume', href: '#resume' }] }) },
  { id: 'contact', groups: [['contact', 'email', 'mail', 'reach', 'phone', 'number', 'call', 'whatsapp', 'message', 'instagram', 'linkedin', 'github', 'social', 'socials', 'dm', 'talk']],
    answer: () => ({ text: `The best way to reach Martha is email: ${email}. You can also find her on LinkedIn, GitHub and Instagram.`, links: [{ label: 'Email Martha', href: `mailto:${email}` }, { label: 'Contact', href: '#contact' }] }) },
  { id: 'location', groups: [['where', 'location', 'located', 'based', 'live', 'from', 'country', 'city', 'kampala', 'uganda']],
    answer: () => ({ text: `Martha is based in ${profile.address[0]}, and works with clients ${availability.where.includes('remote') ? 'both locally and remotely' : 'locally'}.` }) },
  { id: 'cv', weight: 1.5, groups: [['cv', 'resume', 'resumé', 'download', 'pdf']],
    answer: () => ({ text: 'Here’s Martha’s one-page CV.', links: [{ label: 'Download CV', href: 'cv.pdf' }] }) },
  { id: 'site', groups: [['this'], ['site', 'website', 'portfolio', 'page'], ['built', 'made', 'make', 'created', 'stack', 'tech', 'react', 'code', 'coded']],
    answer: () => ({ text: 'This site is built with React, Tailwind CSS and Framer Motion, deployed on Netlify. The pencil-style icons are hand-made SVGs, and I run entirely in your browser: no AI service, just a lot of careful matching.' }) },
]

// every project in the portfolio can be asked about by name ("what is chattr?")
const STOP = new Set(['website', 'events', 'random', 'drawing', 'with', 'from', 'that', 'this', 'over', 'head', 'left', 'edge',
  'outside', 'into', 'lost', 'still', 'the', 'and', 'films', 'level', 'speaks'])
for (const p of projects) {
  const keys = norm(p.title).split(' ').filter((w) => w.length >= 4 && !STOP.has(w))
  if (!keys.length) continue
  intents.push({
    // every distinctive word of the title must appear ("nexus haven", not just "haven")
    id: 'project:' + p.title, weight: 1.3, avg: true, groups: keys.map((k) => [k]),
    answer: () => {
      if (p.type === 'Creative Writing') return { text: `${p.title} is one of Martha’s stories.${p.description ? ' ' + p.description : ''}`, links: [p.url && { label: 'Read on Wattpad', href: p.url }, { label: 'Bookshelf', href: '#stories' }].filter(Boolean) }
      if (p.type === 'Web Development') return { text: `${p.title} is one of Martha’s web projects.${p.progress < 100 ? ` It’s still in progress (${p.progress}%). Next up: ${p.todo.toLowerCase()}` : ''}`, links: [p.url && { label: 'Visit', href: p.url }].filter(Boolean) }
      return { text: `${p.title} is one of Martha’s art pieces.${p.description ? ' ' + p.description : ''}`, links: [{ label: 'Portfolio', href: '#portfolio' }] }
    },
  })
}

// user-added FAQs become intents too
for (const f of faqs) {
  intents.push({ id: 'faq:' + f.keywords[0], weight: 1.2, groups: [f.keywords.map(norm)], answer: () => ({ text: f.answer, links: f.links }) })
}

export const suggestions = ['What do you do?', 'Are you available?', 'Show me your work', 'Your stories', 'How do I contact you?', 'Tell me a joke']

const fallback = () => ({
  text: pick([
    'Hmm, I’m not sure about that one. I know about Martha’s work, skills, stories, services and how to reach her.',
    'That one’s beyond me, sorry! Try asking about her projects, skills or stories, or email Martha directly.',
  ]),
  links: [{ label: 'Email Martha', href: `mailto:${email}` }],
  chips: suggestions.slice(0, 4),
})

/** Returns { text, links?, chips?, intent } for a message. */
export function reply(message) {
  const words = norm(message).split(' ').filter(Boolean).map(squeeze)
  if (!words.length) return { ...fallback(), intent: 'empty' }

  const text = words.join(' ')
  let best = null
  for (const intent of intents) {
    if (intent.maxWords && words.length > intent.maxWords) continue
    let score = 0
    if (intent.phrase) {
      if (!intent.phrase.test(text)) continue
      score = 3
    } else {
      let ok = true
      for (const group of intent.groups) {
        const h = hit(words, group)
        if (!h) { ok = false; break }
        score += 2 * h
      }
      if (!ok) continue
      if (intent.avg) score /= intent.groups.length
      score *= intent.weight ?? 1
      if (intent.boost) score += 0.5 * hit(words, intent.boost)
    }
    // small talk only wins when nothing more specific matches as well
    if (intent.small) score -= 0.3
    if (!best || score > best.score) best = { intent, score }
  }

  if (!best || best.score < 1.2) return { ...fallback(), intent: 'fallback' }
  return { ...best.intent.answer(), intent: best.intent.id }
}
