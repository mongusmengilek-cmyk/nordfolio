import {
  ArrowUpRight,
  Check,
  Layers3,
  LayoutTemplate,
  Rocket,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import type { Service } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface ServicesProps {
  services: Service[]
}

const serviceIcons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  app: Layers3,
  rocket: Rocket,
  sparkles: Sparkles,
}

export function Services({ services }: ServicesProps) {
  return (
    <section className="section section--muted services" id="services">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Что делаю"
            title="От сильной идеи до работающего продукта"
            description="Можно подключиться на отдельный этап или пройти весь путь одной командой."
          />
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Sparkles
            return (
              <Reveal key={service.id} className="service-card" delay={index * 80}>
                <div className="service-card__top">
                  <div className="service-card__icon"><Icon size={24} /></div>
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}><Check size={15} /> {feature}</li>
                  ))}
                </ul>
                <a href="#contact" aria-label={`Обсудить услугу «${service.title}»`}>
                  Обсудить
                  <ArrowUpRight size={17} />
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
