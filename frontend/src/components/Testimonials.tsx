import { Quote } from 'lucide-react'

import type { Testimonial } from '../types'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="section section--muted testimonials">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Отзывы"
            title="Когда результат говорит за процесс"
            description="Несколько слов от людей, с которыми мы запускали и улучшали цифровые продукты."
            align="center"
          />
        </Reveal>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} className="testimonial-card" delay={index * 90}>
              <Quote className="testimonial-card__quote" size={30} />
              <p>«{testimonial.quote}»</p>
              <div className="testimonial-card__author">
                <span>{testimonial.avatar_initials}</span>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.position} · {testimonial.company}</small>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
