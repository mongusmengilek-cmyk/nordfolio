import { Braces, Database, PenTool, ServerCog, type LucideIcon } from 'lucide-react'

import type { Skill } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface SkillsProps {
  skills: Skill[]
}

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Braces,
  Backend: Database,
  'Data & DevOps': ServerCog,
  Инструменты: PenTool,
}

export function Skills({ skills }: SkillsProps) {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Стек"
            title="Инструменты под задачу, а не задача под инструменты"
            description="Основной стек — React, TypeScript, Python и FastAPI. Всё остальное подбираю по требованиям продукта."
          />
        </Reveal>

        <div className="skills__grid">
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category] ?? Braces
            const categorySkills = skills.filter((skill) => skill.category === category)
            return (
              <Reveal key={category} className="skill-group" delay={categoryIndex * 90}>
                <div className="skill-group__header">
                  <span><Icon size={20} /></span>
                  <div>
                    <h3>{category}</h3>
                    <p>{categorySkills.length} ключевых компетенции</p>
                  </div>
                </div>
                <div className="skill-group__list">
                  {categorySkills.map((skill) => (
                    <div className="skill-row" key={skill.id}>
                      <div className="skill-row__meta">
                        <strong>{skill.name}</strong>
                        <span>{skill.years}</span>
                      </div>
                      <div className="skill-row__track" aria-label={`${skill.name}: ${skill.level}%`}>
                        <span style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
