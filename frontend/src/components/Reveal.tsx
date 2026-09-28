import { useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from 'react'

interface RevealProps extends PropsWithChildren {
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <div
      ref={elementRef}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  )
}
