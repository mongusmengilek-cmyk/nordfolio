export interface Profile {
  id: number
  name: string
  role: string
  headline: string
  short_bio: string
  long_bio: string
  email: string
  phone: string
  location: string
  availability: string
  years_experience: number
  projects_count: number
  clients_count: number
}

export interface SocialLink {
  id: number
  label: string
  url: string
  icon: string
  sort_order: number
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
  years: string
  sort_order: number
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  short_description: string
  full_description: string
  technologies: string[]
  year: number
  featured: boolean
  demo_url: string
  repo_url: string
  cover_variant: string
  metric: string
  sort_order: number
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  sort_order: number
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
  sort_order: number
}

export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  quote: string
  avatar_initials: string
  sort_order: number
}

export interface PortfolioData {
  profile: Profile
  socials: SocialLink[]
  skills: Skill[]
  projects: Project[]
  experiences: Experience[]
  services: Service[]
  testimonials: Testimonial[]
}

export interface ContactPayload {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
  website?: string
}

export interface ContactResponse {
  id: number
  message: string
  created_at: string
}
