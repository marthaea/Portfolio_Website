// Three short case studies, written from the CV. Edit the wording freely; keep it factual.
export const caseStudies = [
  {
    title: 'Docere Foundation',
    role: 'Designer & developer',
    icon: 'giving',
    url: 'https://www.docerefoundation.org',
    problem: 'A registered nonprofit needed a website that explains what it stands for within seconds, and gives donors and the people it serves a clear way in.',
    built: [
      'Designed and built the whole site, from structure to final polish.',
      'Organised every page around the mission, so a first-time visitor understands it fast.',
      'Made it accessible: readable type, strong contrast, keyboard-friendly navigation.',
      'Applied SEO best practice throughout so the foundation can be found.',
    ],
    result: 'A live, searchable site that the foundation runs under its own domain.',
    tags: ['Accessibility', 'SEO', 'Nonprofit'],
  },
  {
    title: 'The Voiceless Pet Shelter',
    role: 'Project lead & developer',
    icon: 'shelter',
    url: 'https://thevoicelesshelter.org',
    problem: 'An animal shelter needed visitors to move from browsing to asking about an adoption as quickly as possible, without friction.',
    built: [
      'Led the project and built the React front end.',
      'Connected WhatsApp so an adoption enquiry opens a chat in one tap.',
      'Set up the custom domain and deployed to production.',
    ],
    result: 'Adopters reach the shelter on the app they already use, and the site is live at thevoicelesshelter.org.',
    tags: ['React', 'WhatsApp', 'Deployment'],
  },
  {
    title: 'Link Guardian',
    role: 'Developer',
    icon: 'shield',
    url: 'https://guardiansafecheck.netlify.app',
    problem: 'Malicious links look harmless. People need a quick, trustworthy check before they click.',
    built: [
      'Built a checker that sends each URL to the VirusTotal and IPQualityScore APIs.',
      'Combines the answers into a real-time risk score with clear reasons.',
      'Now turning it into a browser extension, so the check happens where the link is.',
    ],
    result: 'A working safe-link checker, moving toward an in-browser extension.',
    tags: ['Security', 'APIs', 'JavaScript'],
  },
]
