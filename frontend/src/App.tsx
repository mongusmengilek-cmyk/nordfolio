import { useEffect, useState } from 'react'

import { fetchPortfolio } from './api/client'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { fallbackPortfolio } from './data/fallback'
import { useTheme } from './hooks/useTheme'
import type { PortfolioData } from './types'

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(fallbackPortfolio)
  const [usingFallback, setUsingFallback] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    let active = true

    fetchPortfolio()
      .then((data) => {
        if (active) {
          setPortfolio(data)
          setUsingFallback(false)
        }
      })
      .catch(() => {
        if (active) {
          setUsingFallback(true)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const { profile, socials, projects, services, skills, experiences } = portfolio

  return (
    <>
      <a className="skip-link" href="#main-content">К основному содержанию</a>
      <ScrollProgress />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      {usingFallback ? (
        <div className="api-notice" role="status">
          Демо-режим: запустите FastAPI, чтобы форма сохраняла сообщения в SQLite.
        </div>
      ) : null}
      <main id="main-content">
        <Hero profile={profile} socials={socials} />
        <Projects projects={projects} />
        <Services services={services} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} socials={socials} />
    </>
  )
}