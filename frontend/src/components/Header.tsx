import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

import type { Theme } from '../hooks/useTheme'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

const navigation = [
  { label: 'Работы', href: '#projects' },
  { label: 'Услуги', href: '#services' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Опыт', href: '#experience' },
]

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="На главную" onClick={closeMenu}>
          <span className="brand__mark">AM</span>
          <span className="brand__dot" aria-hidden="true" />
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            className="icon-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="button button--small desktop-contact" href="#contact">
            Обсудить проект
            <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Мобильная навигация">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a className="mobile-nav__contact" href="#contact" onClick={closeMenu}>
            Обсудить проект
            <ArrowUpRight size={20} />
          </a>
        </nav>
      </div>
    </header>
  )
}
