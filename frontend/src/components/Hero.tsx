import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  MapPin,
  Send,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import type { Profile, SocialLink } from '../types'
import { Reveal } from './Reveal'

interface HeroProps {
  profile: Profile
  socials: SocialLink[]
}

const socialIcons: Record<string, LucideIcon> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  telegram: Send,
  mail: Mail,
}

export function Hero({ profile, socials }: HeroProps) {
  const stats = [
    { value: `${profile.years_experience}+`, label: 'лет в разработке' },
    { value: `${profile.projects_count}`, label: 'запущенных проектов' },
    { value: `${profile.clients_count}`, label: 'клиентов и команд' },
  ]

  return (
    <section className="hero" id="top">
      <div className="hero__orb hero__orb--one" aria-hidden="true" />
      <div className="hero__orb hero__orb--two" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <Reveal className="hero__content">
          <div className="availability-pill">
            <span className="availability-pill__pulse" />
            {profile.availability}
          </div>

          <p className="hero__role">
            <Sparkles size={17} />
            {profile.role}
          </p>

          <h1>
            Делаю кропотливо,
            <span>довожу до результата</span>
          </h1>

          <p className="hero__lead">{profile.short_bio}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              Смотреть проекты
              <ArrowDownRight size={19} />
            </a>
            <a className="button button--ghost" href="#contact">
              Написать мне
              <ArrowRight size={19} />
            </a>
          </div>

          <div className="hero__meta">
            <div className="social-links" aria-label="Социальные сети">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon] ?? ArrowRight
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
            <span className="hero__location">
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>
        </Reveal>

        <Reveal className="hero-card-wrap" delay={130}>
          <div className="hero-card">
            <div className="hero-card__shine" aria-hidden="true" />
            <div className="hero-card__topbar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>portfolio.tsx</span>
              <span className="hero-card__status">online</span>
            </div>

            <div className="hero-card__profile">
              <div className="avatar-orbit">
                <span className="avatar-orbit__ring" />
                <div className="avatar-monogram">ММ</div>
                <span className="avatar-orbit__badge">✦</span>
              </div>
              <div>
                <span className="hero-card__label">Full-stack developer</span>
                <strong>{profile.name}</strong>
                <p>Python · Flask · HTML/CSS</p>
              </div>
            </div>

            <div className="code-card" aria-label="Фрагмент кода">
              <div><span className="code-number">01</span><span className="code-purple">const</span> product = {'{'}</div>
              <div><span className="code-number">02</span>&nbsp;&nbsp;idea: <span className="code-green">'clear'</span>,</div>
              <div><span className="code-number">03</span>&nbsp;&nbsp;interface: <span className="code-green">'fast'</span>,</div>
              <div><span className="code-number">04</span>&nbsp;&nbsp;api: <span className="code-green">'reliable'</span>,</div>
              <div><span className="code-number">05</span>&nbsp;&nbsp;result: <span className="code-green">'measurable'</span></div>
              <div><span className="code-number">06</span>{'}'}</div>
            </div>

            <div className="hero-card__footer">
              <span><i /> Frontend</span>
              <span><i /> Backend</span>
              <span><i /> Product</span>
            </div>
          </div>
          <div className="floating-chip floating-chip--one">API 99.9%</div>
          <div className="floating-chip floating-chip--two">Lighthouse 94</div>
        </Reveal>
      </div>

      <div className="container hero-stats">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} className="hero-stat" delay={index * 80}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </Reveal>
        ))}
        <Reveal className="hero-stat hero-stat--note" delay={260}>
          <span className="hero-stat__icon">↗</span>
          <span>От идеи и вёрстки до работающего backend и API</span>
        </Reveal>
      </div>
    </section>
  )
}