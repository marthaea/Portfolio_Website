/**
 * Add a project by adding an object to the end of this list — nothing else to change.
 *
 *  title, type        : shown on hover; also drives the filter tabs ("Web Development", "Creative Writing", "Art")
 *  description        : shown in the popup
 *  image | video      : path under /public (a missing image falls back to a title tile;
 *                       run `npm run screenshots` to capture the live sites)
 *  icon               : micons class shown on the tile when there is no screenshot (default icon-window)
 *  url                : optional "Details" link (Netlify site, custom domain, Wattpad…)
 */
export const projects = [
  { title: 'Chaos On The Edge', type: 'Creative Writing', image: '/images/portfolio/liberty.webp', description: 'Short story that I wrote. You can read more in the details section.', url: 'https://www.wattpad.com/1502731591-chaos-on-the-edge' },
  { title: 'Arms Over Head', type: 'Art', image: '/images/portfolio/shutterbug.webp', description: 'One of my recent artpieces.' },
  { title: 'Silence Speaks', type: 'Creative Writing', image: '/images/portfolio/clouds.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1410631197-silence-speaks' },
  { title: 'Silent On The Outside', type: 'Art', image: '/images/portfolio/beetle.webp', description: 'Highly symbolic art piece.' },
  { title: 'When Tara Left', type: 'Creative Writing', image: '/images/portfolio/lighthouse.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1508182401-when-tara-left' },
  { title: 'Emerald', type: 'Creative Writing', image: '/images/portfolio/salad.webp', description: 'Story that I wrote.', url: 'https://www.wattpad.com/1409139768-emerald-i' },
  { title: 'Meaningless Demeanors', type: 'Creative Writing', image: '/images/portfolio/meaninglees.webp', description: 'Poem I wrote.', url: 'https://www.wattpad.com/1502982154-meaningless-demeanors' },
  { title: 'Pouring Glass', type: 'Art', image: '/images/portfolio/glass.webp', description: 'Artpiece.' },
  { title: 'The Lost Art Of Feminine Mystique', type: 'Creative Writing', image: '/images/portfolio/feminine.webp', description: 'Story I wrote.', url: 'https://www.wattpad.com/1512136133-the-lost-art-of-feminine-mystique-what-is-feminine' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/pompi.mp4', description: '' },
  { title: 'Random Drawing', type: 'Art', video: '/images/portfolio/peter.mp4', description: '' },

  // ---- Web development ----------------------------------------------------
  { title: 'Sky level Films website', type: 'Web Development', image: '/images/portfolio/skylevelwebsite.webp', description: '', url: 'https://focusdirector.netlify.app' },
  { title: 'Bullion Events Website', type: 'Web Development', image: '/images/portfolio/bullionwebsite.webp', description: '', url: 'https://bullionevents.net' },
  { title: 'The Voiceless Shelter', type: 'Web Development', icon: 'icon-megaphone', image: '/images/sites/thevoicelesshelter.webp', description: '', url: 'https://thevoicelesshelter.org' },
  { title: 'Martha Story', type: 'Web Development', icon: 'icon-book', image: '/images/sites/marthastory.webp', description: '', url: 'https://marthastory.netlify.app' },
  { title: 'Galaxy Quest', type: 'Web Development', icon: 'icon-star', image: '/images/sites/galaxyquest.webp', description: '', url: 'https://galaxyquest.netlify.app' },
  { title: 'Guardian SafeCheck', type: 'Web Development', icon: 'icon-shield', image: '/images/sites/guardiansafecheck.webp', description: '', url: 'https://guardiansafecheck.netlify.app' },
  { title: 'Speedy Pear', type: 'Web Development', icon: 'icon-speed-o-meter', image: '/images/sites/speedypear.webp', description: '', url: 'https://speedypear.netlify.app' },
  { title: 'My Ugandan Kitchen', type: 'Web Development', icon: 'icon-fork-knife', image: '/images/sites/myugandankitchen.webp', description: '', url: 'https://myugandankitchen.netlify.app' },
  { title: 'Mindfl', type: 'Web Development', icon: 'icon-leaf', image: '/images/sites/mindfl.webp', description: '', url: 'https://mindfl.netlify.app' },
  { title: 'Chattr', type: 'Web Development', icon: 'icon-chat', image: '/images/sites/chattr.webp', description: '', url: 'https://chattr.netlify.app' },
  { title: 'Disnep Voyage', type: 'Web Development', icon: 'icon-map', image: '/images/sites/disnepvoyage.webp', description: '', url: 'https://disnepvoyage.netlify.app' },
  { title: 'Bumb and Bloom', type: 'Web Development', icon: 'icon-heart', image: '/images/sites/bumbandbloom.webp', description: '', url: 'https://bumbandbloom.netlify.app' },
  { title: 'West and East African Fusion', type: 'Web Development', icon: 'icon-earth', image: '/images/sites/westandeastafricanfusion.webp', description: '', url: 'https://westandeastafricanfusion.netlify.app' },
  { title: 'Computational Maths Bestie', type: 'Web Development', icon: 'icon-pencil-ruler', image: '/images/sites/computationalmathsbestie.webp', description: '', url: 'https://computationalmathsbestie.netlify.app' },
  { title: 'Nexus Haven', type: 'Web Development', icon: 'icon-home', image: '/images/sites/nexushavenn.webp', description: '', url: 'https://nexushavenn.netlify.app' },
  { title: 'Nestly Domain', type: 'Web Development', icon: 'icon-building', image: '/images/sites/nestlydomain.webp', description: '', url: 'https://nestlydomain.netlify.app' },
  { title: 'Viddnest', type: 'Web Development', icon: 'icon-video', image: '/images/sites/viddnest.webp', description: '', url: 'https://viddnest.netlify.app' },

  // ---- Story posters ------------------------------------------------------
  { title: 'Unclaimed', type: 'Creative Writing', image: '/images/posters/unclaimed.webp', description: 'Some mothers leave. Some daughters survive.' },
  { title: 'The Diary of Elyse Harper', type: 'Creative Writing', image: '/images/posters/diary-of-elyse-harper.webp', description: 'Story poster.' },
  { title: 'Andrea', type: 'Creative Writing', image: '/images/posters/andrea.webp', description: 'Story poster.' },
  { title: 'Glass People', type: 'Creative Writing', image: '/images/posters/glass-people.webp', description: 'Story poster.' },
  { title: 'Singing to the Shadows', type: 'Creative Writing', image: '/images/posters/singing-to-the-shadows.webp', description: 'Story poster.' },
]
