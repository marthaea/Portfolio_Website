import { projects } from './projects'

export const profile = {
  name: 'Martha Praise Katusiime',
  roles: ['Front-end Developer', 'Tech Enthusiast', 'Software Developer', 'Artist', 'Writer', 'Animator'],
  lead: 'I’m Katusiime Praise Martha, a passionate software engineer, artist, and writer based in Kampala, Uganda. Currently pursuing a degree in Information Technology, I have skills in programming, data analysis, design, and storytelling. My goal is to bring imaginations to life through tech and art.',
  summary: 'I am an artist, writer and tech enthusiast. I bring imaginations to life through story telling and art.',
  info: [
    ['Fullname', 'Katusiime Praise Martha'],
    ['Job', 'Freelancer, Frontend Developer, Artist, Writer'],
    ['Location', 'Kampala, Uganda'],
    ['Email', 'marthapraisekatusiime@gmail.com'],
  ],
  skillGroups: [
    ['Front end', ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Redux / Zustand']],
    ['Back end & data', ['Node.js', 'Express', 'Python', 'SQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'REST APIs', 'Pandas', 'Jupyter']],
    ['Networking & systems', ['Advanced networking', 'Enterprise networking', 'Server systems', 'Automation']],
    ['AI & chat', ['AI / LLM APIs', 'Prompt design', 'Chatbots']],
    ['Tools & deploy', ['Git & GitHub', 'Netlify', 'Vercel', 'Figma', 'VS Code', 'Postman']],
    ['Art & design', ['Digital art', 'Animation', 'Graphic design']],
    ['Writing & content', ['Storytelling', 'Blogging', 'Creative writing']],
  ],
  email: ['marthapraisekatusiime@gmail.com'],
  address: ['Kampala, Uganda'],
  socials: [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/marthapraisekatusiime' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/martha-praise-katusiime-15455b328' },
    { name: 'X (Twitter)', icon: 'twitter', url: 'https://x.com/capulet_praise' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/marthaea' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/marthapraisekatusiime' },
  ],
}

export const experience = [
  { title: 'Website developer', period: '2024 up to date', place: 'Freelancing', text: "I've worked on a number of websites which has enhanced my expertise." },
  { title: 'Front-end Developer', period: '2024 up to date', place: 'Freelancing', text: "I've done Front-end development, manipulating my creativity." },
  { title: 'Writing', period: '2018 up to date', place: 'Freelancing', text: "My debut work was 'Emerald' written in 2018." },
]

export const education = [
  { title: 'Degree-Bachelor of Science in Information Technology', period: 'May 2024 - Present', place: 'Uganda Christian University', text: "I am currently pursuing my bachelors' degree." },
  { title: 'A-Level certificate', period: '2022 and 2023', place: 'St. Lawrence Academy, Schools and colleges Paris Palais', text: 'I attained my Advanced level certificate and got 17 points with an A, B and C in Art, Literature and Divinity with a distinction in ICT.' },
  { title: 'O-level certificate', period: '2017-2020', place: "Bishop Kivengere Girls' School, Muyebe", text: 'I successfully completed my ordinary level certificate with a first grade of 29 aggregates' },
]

export const services = [
  { icon: 'icon-earth', title: 'Webdesign', text: 'Feel free to reach out!' },
  { icon: 'icon-window', title: 'Web Development', text: 'React, Next.js and Tailwind builds that load fast and work on any screen.' },
  { icon: 'icon-cloud', title: 'Back-end & Databases', text: 'Node.js, Supabase, PostgreSQL and REST APIs behind your app.' },
  { icon: 'icon-network', title: 'Networking', text: 'Enterprise network design: VLANs, routing and wireless, planned and documented.' },
  { icon: 'icon-terminal', title: 'Servers & Automation', text: 'Server setup and scripts that take repetitive work off your hands.' },
  { icon: 'icon-chat', title: 'AI & Chatbots', text: 'Chat features and bots built on AI APIs, tuned with careful prompts.' },
  { icon: 'icon-paint-brush', title: 'Creative writing', text: "Let's write that down." },
  { icon: 'icon-toggles', title: 'Art and Design', text: 'Let us bring that imagination to reality!' },
  { icon: 'icon-image', title: 'Graphics Design', text: "Let's design that!" },
  { icon: 'icon-video-camera', title: 'Animation', text: 'Hand-drawn motion and storytelling in Toon Boom Harmony and TVPaint.' },
  { icon: 'icon-headset', title: 'Consultancy', text: 'More than ready to talk.' },
]

// Numbers marked "counted" update themselves as you add projects. The rest are estimates:
// edit them to whatever you can stand behind.
const count = (test) => projects.filter(test).length

export const stats = [
  { icon: 'icon-pencil-ruler', value: count((p) => p.type === 'Web Development'), title: 'Websites Built' }, // counted
  { icon: 'icon-users', value: 5, title: 'Happy Clients' }, // Docere, Voiceless Shelter, Timo's Bread, Bullion Events, Sky level Films
  { icon: 'icon-book', value: count((p) => p.type === 'Creative Writing' && p.spine), title: 'Stories Written' }, // counted
  { icon: 'icon-light-bulb', value: 150, title: 'Ideas About to unfold' },
  { icon: 'icon-cup', value: 1700, suffix: '+', title: 'Coding hours' }, // estimate: ~2 hours a day since May 2024
  { icon: 'icon-clock', value: 7200, title: 'Inspirations' },
]

