import { ArrowUpRight, CircleCheck, Code2, Gauge, Users } from 'lucide-react'

import type { Profile } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface AboutProps {
  profile: Profile
}

const principles = [
  {
    icon: Users,
    title: 'Думаю о пользователе',
    text: 'Начинаю со сценариев, боли и ожидаемого результата — не с количества экранов.',
  },
  {
    icon: Code2,
    title: 'Строю на перспективу',
    text: 'Компоненты, API и данные остаются понятными, когда продукт и команда растут.',
  },
  {
    icon: Gauge,
    title: 'Измеряю эффект',
    text: 'Скорость, конверсия и удержание важнее субъективного ощущения «стало красивее».',
  },
]

export function About({ profile }: AboutProps) {
  return (
    <section className="section about" id="about">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Обо мне"
            title="Учусь, делаю, довожу до конца"
            description="Пока набираюсь опыта, но отношусь к каждой задаче так, будто это мой главный проект."
          />
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__story">
            <p className="about__lead">{profile.long_bio}</p>
            <div className="about__facts">
              <span><CircleCheck size={17} /> Коммуникация без «чёрного ящика»</span>
              <span><CircleCheck size={17} /> Код, готовый к поддержке командой</span>
              <span><CircleCheck size={17} /> Решения через данные и приоритеты</span>
            </div>
            <a className="text-link" href="#contact">
              Расскажите о своей задаче
              <ArrowUpRight size={18} />
            </a>
          </Reveal>

          <div className="about__principles">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Reveal key={principle.title} className="principle-card" delay={index * 90}>
                  <span className="principle-card__number">0{index + 1}</span>
                  <div className="principle-card__icon"><Icon size={21} /></div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
