import { ArrowUp } from 'lucide-react'
import { profile } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} {profile.name}</p>
        <ul className="flex gap-5 text-sm">
          {profile.socials.map((s) => (
            <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition hover:text-accent">{s.name}</a></li>
          ))}
        </ul>
        <a href="#top" aria-label="Back to top" className="rounded-full border border-line p-3 text-zinc-400 transition hover:border-accent hover:text-accent"><ArrowUp size={16} /></a>
      </div>
    </footer>
  )
}
