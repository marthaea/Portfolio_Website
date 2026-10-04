# Portfolio Website

Personal portfolio of Martha Praise Katusiime — built with **React**, **Tailwind CSS v4**, **Framer Motion** and **Vite**.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Editing content
- `src/data/site.js` — bio, skills, resume, services, contact details, social links
- `src/data/projects.js` — everything in the portfolio grid

### Adding a project (e.g. a new Netlify site)
Add one object to `src/data/projects.js`:

```js
{ title: 'My App', category: 'Web', url: 'https://my-app.netlify.app',
  image: '/images/portfolio/my-app.webp', description: 'What it is.', tech: ['React', 'Netlify'] },
```
Put the screenshot in `public/images/portfolio/` (WebP/JPG, ~900px wide). Without `image`, a styled card is shown.

## Deploying
Connected to Netlify: `netlify.toml` sets build command `npm run build` and publish dir `dist`.
