import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react'

import { sendContactMessage } from '../api/client'
import type { ContactPayload, Profile } from '../types'
import { Reveal } from './Reveal'

interface ContactProps {
  profile: Profile
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const initialForm: ContactPayload = {
  name: '',
  email: '',
  company: '',
  budget: '',
  message: '',
  website: '',
}

export function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState<ContactPayload>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')
  const [copied, setCopied] = useState(false)

  const updateField = (field: keyof ContactPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')

    try {
      const response = await sendContactMessage(form)
      setStatus('success')
      setFeedback(response.message)
      setForm(initialForm)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Не удалось отправить сообщение')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <span className="contact__eyebrow"><Sparkles size={17} /> Есть идея?</span>
          <h2>Давайте превратим её в сильный цифровой продукт.</h2>
          <p>
            Опишите задачу, сроки и контекст. Отвечу с первыми вопросами и предложу понятный следующий шаг.
          </p>

          <div className="contact__details">
            <div>
              <span><Mail size={17} /> Почта</span>
              <button type="button" onClick={copyEmail}>
                {profile.email}
                {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <div>
              <span><MapPin size={17} /> Локация</span>
              <strong>{profile.location}</strong>
            </div>
          </div>

          <div className="contact__availability">
            <i />
            <span>
              <strong>{profile.availability}</strong>
              Обычно отвечаю в течение одного рабочего дня
            </span>
          </div>
        </Reveal>

        <Reveal className="contact-form-card" delay={110}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                <span>Ваше имя *</span>
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Анна"
                />
              </label>
              <label>
                <span>Email *</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="anna@company.com"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>Компания</span>
                <input
                  maxLength={140}
                  value={form.company}
                  onChange={(event) => updateField('company', event.target.value)}
                  placeholder="Название или команда"
                />
              </label>
              <label>
                <span>Ориентир по бюджету</span>
                <select
                  value={form.budget}
                  onChange={(event) => updateField('budget', event.target.value)}
                >
                  <option value="">Выберите диапазон</option>
                  <option value="до €3k">до €3k</option>
                  <option value="€3–7k">€3–7k</option>
                  <option value="€7–15k">€7–15k</option>
                  <option value="€15k+">€15k+</option>
                  <option value="обсудим">Нужно обсудить</option>
                </select>
              </label>
            </div>

            <label>
              <span>О проекте *</span>
              <textarea
                required
                minLength={20}
                maxLength={2500}
                rows={6}
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Что нужно сделать, для кого продукт и какой результат вы ожидаете?"
              />
            </label>

            <label className="honeypot" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => updateField('website', event.target.value)}
              />
            </label>

            <button className="button button--primary contact-form-card__submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Отправляю…' : 'Отправить сообщение'}
              <Send size={18} />
            </button>

            {feedback ? (
              <p className={`form-feedback form-feedback--${status}`} role="status">
                {status === 'success' ? <CheckCircle2 size={18} /> : <ArrowUpRight size={18} />}
                {feedback}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
