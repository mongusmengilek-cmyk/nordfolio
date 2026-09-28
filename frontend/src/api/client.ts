import type { ContactPayload, ContactResponse, PortfolioData } from '../types'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '')

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    let detail = 'Не удалось выполнить запрос'
    try {
      const payload = (await response.json()) as { detail?: string | Array<{ msg?: string }> }
      if (typeof payload.detail === 'string') {
        detail = payload.detail
      } else if (Array.isArray(payload.detail)) {
        detail = payload.detail.map((item) => item.msg).filter(Boolean).join(', ') || detail
      }
    } catch {
      // The server may return an empty or non-JSON response.
    }
    throw new Error(detail)
  }

  return (await response.json()) as T
}

export function fetchPortfolio(): Promise<PortfolioData> {
  return request<PortfolioData>('/portfolio')
}

export function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  return request<ContactResponse>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
