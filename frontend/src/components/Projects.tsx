import { useMemo, useState } from 'react'
import { ArrowUpRight, GitBranch, MoveUpRight } from 'lucide-react'

import type { Project } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface ProjectsProps {
  projects: Project[]
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.cover_variant}`} aria-hidden="true">
      <div className="project-visual__noise" />
      <div className="project-visual__orb" />
      <div className="mock-window">
        <div className="mock-window__bar">
          <span /><span /><span />
          <i>{project.slug}.app</i>
        </div>
        <div className="mock-window__body">
          <div className="mock-sidebar">
            <b />
            <span /><span /><span /><span />
          </div>
          <div className="mock-content">
            <div className="mock-content__header">
              <span />
              <i />
            </div>
            <div className="mock-metric-row">
              <div><small /><strong /></div>
              <div><small /><strong /></div>
              <div><small /><strong /></div>
            </div>
            <div className="mock-chart">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </div>
      <div className="project-visual__badge">{project.category}</div>
    </div>
  )
}

export function Projects({ projects }: ProjectsProps) {
  const categories = useMemo(
    () => ['Все', ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  )
  const [activeCategory, setActiveCategory] = useState('Все')

  const visibleProjects =
    activeCategory === 'Все'
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="section section--muted projects" id="projects">
      <div className="container">
        <div className="projects__heading-row">
          <Reveal>
            <SectionHeading
              eyebrow="Избранные проекты"
              title="Работы, в которых дизайн решает бизнес-задачу"
              description="Демо-кейсы уже заполнены и приходят из FastAPI. Замените тексты и ссылки на свои — структура останется прежней."
            />
          </Reveal>
          <Reveal className="projects__filters" delay={100}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? 'is-active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="projects__grid">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} className="project-card" delay={(index % 2) * 80}>
              <ProjectVisual project={project} />
              <div className="project-card__body">
                <div className="project-card__meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.short_description}</p>
                <div className="project-card__metric">↗ {project.metric}</div>
                <div className="project-card__tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="project-card__links">
                  <a href={project.demo_url} target="_blank" rel="noreferrer">
                    Открыть кейс
                    <MoveUpRight size={17} />
                  </a>
                  <a
                    className="project-card__icon-link"
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub проекта ${project.title}`}
                  >
                    <GitBranch size={18} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="projects__cta">
          <div>
            <span>Есть похожая задача?</span>
            <strong>Давайте соберём продукт, которым вы будете гордиться.</strong>
          </div>
          <a className="button button--primary" href="#contact">
            Обсудить проект
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
