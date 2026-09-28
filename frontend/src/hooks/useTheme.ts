import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') {
    return saved
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
