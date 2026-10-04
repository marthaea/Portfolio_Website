import wattpad from './wattpad.json'

/**
 * Add a project by adding an object to the end of this list — nothing else to change.
 *
 *  title, type        : shown on hover; also drives the filter tabs ("Web Development", "Creative Writing", "Art")
 *  description        : shown in the popup
 *  image | video      : path under /public (optional; web projects use an icon instead)
 *  icon               : hand-drawn icon name from src/components/SketchIcon.jsx (shown when there is no image)
 *  spine, excerpt     : stories only — spine colour on the bookshelf; excerpt = array of paragraphs for "Peek inside"
 *  progress, todo     : unfinished projects — shows an "In progress" badge (progress is 0–100, todo says what is left)
 *  url                : optional "Details" link (Netlify site, custom domain, Wattpad…)
 */
const list = [
  { title: 'Chaos On The Edge', type: 'Creative Writing', spine: '#404546', image: '/images/portfolio/liberty.webp', description: 'Short story that I wrote. You can read more in the details section.', url: 'https://www.wattpad.com/1502731591-chaos-on-the-edge' },
  { title: 'Arms Over Head', type: 'Art', image: '/images/portfolio/shutterbug.webp', description: 'One of my recent artpieces.' },
  { title: 'Silence Speaks', type: 'Creative Writing', spine: '#9d9996', image: '/images/portfolio/clouds.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1410631197-silence-speaks' },
  { title: 'Silent On The Outside', type: 'Art', image: '/images/portfolio/beetle.webp', description: 'Highly symbolic art piece.' },
  { title: 'When Tara Left', type: 'Creative Writing', spine: '#7b8176', image: '/images/portfolio/lighthouse.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1508182401-when-tara-left' },
  { title: 'Emerald', type: 'Creative Writing', spine: '#ac8778', image: '/images/portfolio/salad.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1409139768-emerald-i' },
  { title: 'Meaningless Demeanors', type: 'Creative Writing', spine: '#9e8091', image: '/images/portfolio/meaninglees.webp', description: 'Poem I wrote.', url: 'https://www.wattpad.com/1502982154-meaningless-demeanors' },
  { title: 'Pouring Glass', type: 'Art', image: '/images/portfolio/glass.webp', description: 'Artpiece.' },
  { title: 'The Lost Art Of Feminine Mystique', type: 'Creative Writing', spine: '#605959', image: '/images/portfolio/feminine.webp', description: 'Story I wrote.', url: 'https://www.wattpad.com/1512136133-the-lost-art-of-feminine-mystique-what-is-feminine' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/pompi.mp4', description: '' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/peter.mp4', description: '' },

  // ---- Web development ----------------------------------------------------
  { title: 'Sky level Films website', type: 'Web Development', icon: 'film', description: '', url: 'https://focusdirector.netlify.app' },
  { title: 'Bullion Events Website', type: 'Web Development', icon: 'events', description: '', url: 'https://bullionevents.net' },
  { title: 'The Voiceless Shelter', type: 'Web Development', icon: 'shelter', description: '', url: 'https://thevoicelesshelter.org' },
  { title: 'Martha Story', type: 'Web Development', icon: 'story', description: '', url: 'https://marthastory.netlify.app', progress: 80, todo: 'Sign-in for some stories, and dark-theme text readability.' },
  { title: 'Galaxy Quest', type: 'Web Development', icon: 'galaxy', description: '', url: 'https://galaxyquest.netlify.app' },
  { title: 'Guardian SafeCheck', type: 'Web Development', icon: 'shield', description: '', url: 'https://guardiansafecheck.netlify.app' },
  { title: 'Speedy Pear', type: 'Web Development', icon: 'pear', description: '', url: 'https://speedypear.netlify.app' },
  { title: 'My Ugandan Kitchen', type: 'Web Development', icon: 'kitchen', description: '', url: 'https://myugandankitchen.netlify.app' },
  { title: 'Mindfl', type: 'Web Development', icon: 'lotus', description: '', url: 'https://mindfl.netlify.app', progress: 90, todo: 'Making the sign-up page responsive on mobile.' },
  { title: 'Chattr', type: 'Web Development', icon: 'chat', description: '', url: 'https://chattr.netlify.app', progress: 60, todo: 'The bot and chat functionality.' },
  { title: 'Disnep Voyage', type: 'Web Development', icon: 'ship', description: '', url: 'https://disnepvoyage.netlify.app', progress: 99, todo: 'The hero picture.' },
  { title: 'Bumb and Bloom', type: 'Web Development', icon: 'bloom', description: '', url: 'https://bumbandbloom.netlify.app', progress: 70, todo: 'Layout and functionality.' },
  { title: 'West and East African Fusion', type: 'Web Development', icon: 'globe', description: '', url: 'https://westandeastafricanfusion.netlify.app' },
  { title: 'Computational Maths Bestie', type: 'Web Development', icon: 'maths', description: '', url: 'https://computationalmathsbestie.netlify.app' },
  { title: 'Nexus Haven', type: 'Web Development', icon: 'network', description: '', url: 'https://nexushavenn.netlify.app', progress: 70, todo: 'The portfolio section.' },
  { title: 'Nestly Domain', type: 'Web Development', icon: 'nest', description: '', url: 'https://nestlydomain.netlify.app', progress: 70, todo: 'Functionality.' },
  { title: 'Viddnest', type: 'Web Development', icon: 'video', description: '', url: 'https://viddnest.netlify.app', progress: 50, todo: 'Functionality.' },

  // ---- Story posters ------------------------------------------------------
  { title: 'Unclaimed', type: 'Creative Writing', spine: '#5b5860', image: '/images/posters/unclaimed.webp', description: 'Some mothers leave. Some daughters survive.', url: 'https://www.wattpad.com/story/406237023-unclaimed', excerpt: ["Some mothers leave.", "Some daughters survive."] },
  { title: 'The Diary of Elyse Harper', type: 'Creative Writing', spine: '#4b4346', image: '/images/posters/diary-of-elyse-harper.webp', description: 'Story poster.', url: 'http://wattpad.com/story/394394938-the-diary-of-elyse-harper', excerpt: ["A lady-in-waiting’s account of the rise and fall of Anne Boleyn."] },
  { title: 'Andrea', type: 'Creative Writing', spine: '#191713', image: '/images/posters/andrea.webp', description: 'Story poster.', url: 'https://www.wattpad.com/story/395974985-andrea' },
  { title: 'Glass People', type: 'Creative Writing', spine: '#767676', image: '/images/posters/glass-people.webp', description: 'Story poster.', url: 'https://www.wattpad.com/story/404563183-glass-people', excerpt: ["\"Typical modern day society’s hatred for anything genuine.\"", "— someone"] },
  { title: 'Singing to the Shadows', type: 'Creative Writing', spine: '#b48759', image: '/images/posters/singing-to-the-shadows.webp', description: 'Story poster.', url: 'https://www.wattpad.com/story/407446479-%F0%9D%95%8A%F0%9D%95%80%E2%84%95%F0%9D%94%BE%F0%9D%95%80%E2%84%95%F0%9D%94%BE-%F0%9D%95%8B%F0%9D%95%86-%F0%9D%95%8B%E2%84%8D%F0%9D%94%BC-%F0%9D%95%8A%E2%84%8D%F0%9D%94%B8%F0%9D%94%BB%F0%9D%95%86%F0%9D%95%8E%F0%9D%95%8A', excerpt: ["Some invitations should never be accepted."] },
  { title: 'Passenger', type: 'Creative Writing', spine: '#5d5c5c', image: '/images/posters/passenger.webp', description: '', url: 'https://www.wattpad.com/story/393699412-passenger' },
  { title: 'Still Standing', type: 'Creative Writing', spine: '#928b81', image: '/images/posters/still-standing.webp', description: '', url: 'https://www.wattpad.com/story/398078248-still-standing' },
  { title: 'Turbulent Skies', type: 'Creative Writing', spine: '#46453c', image: '/images/posters/turbulent-skies.webp', description: '', url: 'https://www.wattpad.com/story/393328594-turbulent-skies' },
]

// Wattpad descriptions are pulled in by `npm run fetch-stories` (see scripts/fetch-wattpad.mjs);
// a hand-written `description` above is used until then.
const storyId = (url = '') => url.match(/wattpad\.com\/story\/(\d+)/)?.[1]

export const projects = list.map((p) => {
  const blurb = wattpad[storyId(p.url)]?.description
  return blurb ? { ...p, description: blurb } : p
})
