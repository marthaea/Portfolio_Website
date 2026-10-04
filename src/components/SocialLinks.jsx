import { motion } from 'framer-motion'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { profile } from '../data/site'

const icons = { facebook: FaFacebookF, linkedin: FaLinkedinIn, twitter: FaTwitter, github: FaGithub, instagram: FaInstagram }

export default function SocialLinks({ className = '', gap = 'mx-3', hoverClass = 'hover:text-pink' }) {
  return (
    <ul className={`flex justify-center ${className}`}>
      {profile.socials.map(({ name, icon, url }) => {
        const Icon = icons[icon]
        return (
          <li key={name} className={gap}>
            <motion.a whileHover={{ y: -4 }} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className={`block !text-white ${hoverClass}`}>
              <Icon aria-hidden />
            </motion.a>
          </li>
        )
      })}
    </ul>
  )
}
