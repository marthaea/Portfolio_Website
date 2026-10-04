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
Put the screenshot in `public/images/portfolio/` (WebP/JPG, ~900px wide). If the image is missing, a title tile is shown instead.
The filter tabs are built from the `type` values, so a new type gets its own tab automatically.

### Screenshots of live sites
Netlify entries point at `public/images/sites/<name>.webp`. To capture them from the live URLs:
```bash
npm i -D playwright && npx playwright install chromium
npm run screenshots            # only sites without an image yet
npm run screenshots -- --all   # re-capture everything
```

## Deploying
Connected to Netlify: `netlify.toml` sets build command `npm run build` and publish dir `dist`.

## Design
The visual design (light/dark sections, pink `#FF0077` accent, Poppins + Lora, icon font, layout) matches the original site. Only the tech stack (React + Tailwind) and the animations are new.
