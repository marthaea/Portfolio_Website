/**
 * Add a project by adding an object to the end of this list — nothing else to change.
 *
 *  title, type        : shown on hover ("Art", "Creative writing", "Web Development"…)
 *  description        : shown in the popup
 *  image | video      : path under /public
 *  url                : optional "Details" link (Netlify site, custom domain, Wattpad…)
 */
export const projects = [
  { title: 'Chaos On The Edge', type: 'creative writing', image: '/images/portfolio/liberty.webp', description: 'Short story that I wrote. You can read more in the details section.', url: 'https://www.wattpad.com/1502731591-chaos-on-the-edge' },
  { title: 'Arms Over Head', type: 'Art', image: '/images/portfolio/shutterbug.webp', description: 'One of my recent artpieces.' },
  { title: 'Silence Speaks', type: 'Creative writing', image: '/images/portfolio/clouds.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1410631197-silence-speaks' },
  { title: 'Silent On The Outside', type: 'Art', image: '/images/portfolio/beetle.webp', description: 'Highly symbolic art piece.' },
  { title: 'When Tara Left', type: 'Creative writing', image: '/images/portfolio/lighthouse.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1508182401-when-tara-left' },
  { title: 'Emerald', type: 'Creative writing', image: '/images/portfolio/salad.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1409139768-emerald-i' },
  { title: 'Meaningless Demeanors', type: 'Creative writing', image: '/images/portfolio/meaninglees.webp', description: 'Poem I wrote.', url: 'https://www.wattpad.com/1502982154-meaningless-demeanors' },
  { title: 'Pouring Glass', type: 'Art', image: '/images/portfolio/glass.webp', description: 'Artpiece.' },
  { title: 'The Lost Art Of Feminine Mystique', type: 'Creative Writing', image: '/images/portfolio/feminine.webp', description: 'Story I wrote.', url: 'https://www.wattpad.com/1512136133-the-lost-art-of-feminine-mystique-what-is-feminine' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/pompi.mp4', description: '' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/peter.mp4', description: '' },

  // ---- Web development ----------------------------------------------------
  { title: 'Sky level Films website', type: 'Web Development', image: '/images/portfolio/skylevelwebsite.webp', description: '', url: 'https://focusdirector.netlify.app' },
  { title: 'Bullion Events Website', type: 'Web Development', image: '/images/portfolio/bullionwebsite.webp', description: '', url: 'https://bullionevents.net' },
  { title: 'The Voiceless Shelter', type: 'Web Development', description: '', url: 'https://thevoicelesshelter.org' },

  // ---- Story posters ------------------------------------------------------
  { title: 'Unclaimed', type: 'Creative writing', image: '/images/posters/unclaimed.webp', description: 'Some mothers leave. Some daughters survive.' },
  { title: 'The Diary of Elyse Harper', type: 'Creative writing', image: '/images/posters/diary-of-elyse-harper.webp', description: 'Story poster.' },
  { title: 'Andrea', type: 'Creative writing', image: '/images/posters/andrea.webp', description: 'Story poster.' },
  { title: 'Glass People', type: 'Creative writing', image: '/images/posters/glass-people.webp', description: 'Story poster.' },
  { title: 'Singing to the Shadows', type: 'Creative writing', image: '/images/posters/singing-to-the-shadows.webp', description: 'Story poster.' },
]
