import { ArrowUp, BriefcaseBusiness, GitBranch, Mail, Send, type LucideIcon } from 'lucide-react'

import type { Profile, SocialLink } from '../types'

interface FooterProps {
  profile: Profile
  socials: SocialLink[]
}

const socialIcons: Record<string, LucideIcon> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  telegram: Send,
  mail: Mail,
}

export function Footer({ profile, socials }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p>Дизайн, frontend и backend — в одной цельной системе.</p>
        </div>

        {/* Ссылки навигации удалены */}

        <div className="footer__socials">
          {socials.map((social) => {
            const Icon = socialIcons[social.icon] ?? Mail
            return (
              <a
                key={social.id}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={social.label}
              >
                <Icon size={17} />
              </a>
            )
          })}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {profile.name}. Сделано на React + FastAPI.</span>
        <a href="#top">Наверх <ArrowUp size={15} /></a>
      </div>
    </footer>
  )
}
