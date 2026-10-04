# Portfolio Website

Personal portfolio of Martha Praise Katusiime — built with **React**, **Tailwind CSS v4**, **Framer Motion** and **Vite**.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Editing content
- `src/data/site.js` — bio, skills, resume, services, contact details, social links
- `src/data/site.js` — also holds the "Currently" strip under the hero (`currently`)
- `src/data/projects.js` — everything in the portfolio grid and the bookshelf. Optional fields: `progress` + `todo` (shows an "In progress" badge), `excerpt` (array of paragraphs for "Peek Inside"), `spine` (colour of the book on the shelf)

### Adding a project (e.g. a new Netlify site)
Add one object to `src/data/projects.js` (web projects use a hand-drawn icon from `src/components/SketchIcon.jsx`; pick any `icon` name from that file):

```js
{ title: 'My App', type: 'Web Development', icon: 'browser', url: 'https://my-app.netlify.app', description: '' },
```
To use a screenshot instead of an icon, add `image: ...` (a file under `public/`). Without an image the icon tile is shown.
The filter tabs are built from the `type` values, so a new type gets its own tab automatically.

## CV
`public/cv.pdf` is the one-page CV shown behind "Download CV". Its editable source is `cv/cv.html` (open it in a browser and print to PDF, A4, no margins, background graphics on).

## Deploying
Connected to Netlify: `netlify.toml` sets build command `npm run build` and publish dir `dist`.

## Design
The visual design (light/dark sections, pink `#FF0077` accent, Poppins + Lora, icon font, layout) matches the original site. Only the tech stack (React + Tailwind) and the animations are new.
