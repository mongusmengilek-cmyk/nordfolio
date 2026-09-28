interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <span className="section-heading__eyebrow">
        <span aria-hidden="true">✦</span>
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  )
}
