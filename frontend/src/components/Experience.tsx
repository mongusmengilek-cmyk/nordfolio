import { Check, MapPin } from 'lucide-react'

import type { Experience as ExperienceItem } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface ExperienceProps {
  experiences: ExperienceItem[]
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="section experience" id="experience">
      <div className="container experience__layout">
        <Reveal className="experience__intro">
          <SectionHeading
            eyebrow="Опыт"
            title="Первый год в разработке"
            description="Учусь на реальных задачах, собираю проекты от идеи до запуска и не боюсь сложных мест."
          />
          <div className="experience__location">
            <MapPin size={18} />
            Удалённо · по всему миру
          </div>
        </Reveal>

        <div className="timeline">
          {experiences.map((experience, index) => (
            <Reveal key={experience.id} className="timeline-item" delay={index * 90}>
              <span className="timeline-item__dot" />
              <div className="timeline-item__period">{experience.period}</div>
              <div className="timeline-item__content">
                <span>{experience.company}</span>
                <h3>{experience.role}</h3>
                <p>{experience.description}</p>
                <ul>
                  {experience.achievements.map((achievement) => (
                    <li key={achievement}><Check size={15} /> {achievement}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
