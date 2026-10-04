/**
 * Add a project by adding an object here — nothing else to change.
 *
 *  category : 'Web' | 'Writing' | 'Art' | 'Posters'
 *  image    : path under /public (optional — a styled card is shown without one)
 *  url      : live link (Netlify, custom domain, Wattpad…) (optional)
 *  video    : path under /public, used instead of image (optional)
 *  tech     : array of tags, shown on Web projects (optional)
 */
export const categories = ['All', 'Web', 'Writing', 'Posters', 'Art']

export const projects = [
  // ---- Web ----------------------------------------------------------------
  { title: 'Bullion Events', category: 'Web', image: '/images/portfolio/bullionwebsite.webp', url: 'https://bullionevents.net', description: 'Website for an events company.', tech: ['React', 'Netlify'] },
  { title: 'The Voiceless Shelter', category: 'Web', url: 'https://thevoicelesshelter.org', description: 'Website for The Voiceless Shelter.', tech: ['React', 'Netlify'] },
  { title: 'Sky level Films', category: 'Web', image: '/images/portfolio/skylevelwebsite.webp', url: 'https://focusdirector.netlify.app', description: 'Portfolio website for a film director.', tech: ['Netlify'] },

  // ---- Story posters ------------------------------------------------------
  { title: 'Unclaimed', category: 'Posters', image: '/images/posters/unclaimed.webp', description: 'Some mothers leave. Some daughters survive.' },
  { title: 'The Diary of Elyse Harper', category: 'Posters', image: '/images/posters/diary-of-elyse-harper.webp', description: 'Story poster.' },
  { title: 'Andrea', category: 'Posters', image: '/images/posters/andrea.webp', description: 'Story poster.' },
  { title: 'Glass People', category: 'Posters', image: '/images/posters/glass-people.webp', description: 'Story poster.' },
  { title: 'Singing to the Shadows', category: 'Posters', image: '/images/posters/singing-to-the-shadows.webp', description: 'Story poster.' },

  // ---- Writing ------------------------------------------------------------
  { title: 'Chaos On The Edge', category: 'Writing', image: '/images/portfolio/liberty.webp', url: 'https://www.wattpad.com/1502731591-chaos-on-the-edge', description: 'Short story.' },
  { title: 'Silence Speaks', category: 'Writing', image: '/images/portfolio/clouds.webp', url: 'https://www.wattpad.com/1410631197-silence-speaks', description: 'Short story.' },
  { title: 'When Tara Left', category: 'Writing', image: '/images/portfolio/lighthouse.webp', url: 'https://www.wattpad.com/1508182401-when-tara-left', description: 'Short story.' },
  { title: 'Emerald', category: 'Writing', image: '/images/portfolio/salad.webp', url: 'https://www.wattpad.com/1409139768-emerald-i', description: 'My debut story, written in 2018.' },
  { title: 'Meaningless Demeanors', category: 'Writing', image: '/images/portfolio/meaninglees.webp', url: 'https://www.wattpad.com/1502982154-meaningless-demeanors', description: 'A poem.' },
  { title: 'The Lost Art Of Feminine Mystique', category: 'Writing', image: '/images/portfolio/feminine.webp', url: 'https://www.wattpad.com/1512136133-the-lost-art-of-feminine-mystique-what-is-feminine', description: 'Short story.' },

  // ---- Art ----------------------------------------------------------------
  { title: 'Arms Over Head', category: 'Art', image: '/images/portfolio/shutterbug.webp', description: 'One of my recent art pieces.' },
  { title: 'Silent On The Outside', category: 'Art', image: '/images/portfolio/beetle.webp', description: 'A highly symbolic art piece.' },
  { title: 'Pouring Glass', category: 'Art', image: '/images/portfolio/glass.webp', description: 'Art piece.' },
  { title: 'Random Drawing I', category: 'Art', video: '/images/portfolio/pompi.mp4', description: 'Drawing timelapse.' },
  { title: 'Random Drawing II', category: 'Art', video: '/images/portfolio/peter.mp4', description: 'Drawing timelapse.' },
]
