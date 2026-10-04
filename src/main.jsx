import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import '@fontsource/mrs-saint-delafield'
import './loader.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* "user" honours the visitor's reduced-motion setting */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)

// Keep the hourglass up only briefly: fade it out shortly after the site has rendered.
const preloader = document.getElementById('preloader')
if (preloader) {
  setTimeout(() => {
    preloader.classList.add('is-done')
    setTimeout(() => preloader.remove(), 400)
  }, 700)
}
