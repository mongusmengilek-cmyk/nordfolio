import type { PortfolioData } from '../types'

export const fallbackPortfolio: PortfolioData = {
  profile: {
    id: 1,
    name: 'Монгуш Менгилек',
    role: 'Начинающий full-stack разработчик',
    headline: 'Делаю кропотливо, довожу до результата',
    short_bio:
      'Начинающий full-stack разработчик. Учусь каждый день, пишу код аккуратно и довожу задачи до конца — от идеи и интерфейса до работающего API.',
    long_bio:
      'Я только начинаю путь в разработке, но подхожу к делу серьёзно: разбираюсь в деталях, не бросаю задачи на полпути и стараюсь писать код, который будет понятен не только мне. Работаю с Python и Flask, собираю небольшие проекты от идеи до запуска. Мне важно не просто «сделать», а сделать так, чтобы этим было удобно пользоваться. Открыт для первых серьёзных проектов, стажировок и команд, где можно учиться и расти.',
    email: 'mongusmemgilek@gmail.com',
    phone: '',
    location: 'Удалённо · работаю по всему миру',
    availability: 'Открыт для новых проектов',
    years_experience: 1,
    projects_count: 3,
    clients_count: 1,
  },
  socials: [
    {
      id: 1,
      label: 'GitHub',
      url: 'https://github.com/mongusmengilek-cmyk',
      icon: 'github',
      sort_order: 1,
    },
    { id: 2, label: 'Telegram', url: 'https://t.me/', icon: 'telegram', sort_order: 2 },
    {
      id: 3,
      label: 'Почта',
      url: 'mailto:mongusmemgilek@gmail.com',
      icon: 'mail',
      sort_order: 3,
    },
  ],
  skills: [
    { id: 1, name: 'Python', category: 'Backend', level: 75, years: '1 год', sort_order: 1 },
    { id: 2, name: 'Flask', category: 'Backend', level: 65, years: '6 месяцев', sort_order: 2 },
    { id: 3, name: 'SQLAlchemy', category: 'Backend', level: 60, years: '6 месяцев', sort_order: 3 },
    { id: 4, name: 'FastAPI', category: 'Backend', level: 55, years: '2 месяца', sort_order: 4 },
    { id: 5, name: 'API', category: 'Backend', level: 60, years: '6 месяцев', sort_order: 5 },
    { id: 6, name: 'HTML / CSS', category: 'Frontend', level: 70, years: '1 год', sort_order: 6 },
    { id: 7, name: 'JavaScript', category: 'Frontend', level: 60, years: '6 месяцев', sort_order: 7 },
    { id: 8, name: 'React', category: 'Frontend', level: 45, years: '2 месяца', sort_order: 8 },
    { id: 9, name: 'TypeScript', category: 'Frontend', level: 40, years: '1 месяц', sort_order: 9 },
    { id: 10, name: 'Docker', category: 'Data & DevOps', level: 50, years: '1 месяц', sort_order: 10 },
    { id: 11, name: 'Git', category: 'Инструменты', level: 65, years: '6 месяцев', sort_order: 11 },
  ],
  projects: [
    {
      id: 1,
      slug: 'tuvan-reserves',
      title: 'Заповедники Республики Тыва',
      category: 'Учебный',
      short_description:
        'Сайт о заповедниках, городах и озёрах Республики Тыва с описанием важных природных мест.',
      full_description:
        'Школьный проект, посвящённый природным достопримечательностям Тувы.',
      technologies: ['Python', 'HTML', 'CSS'],
      year: 2025,
      featured: true,
      demo_url: '#',
      repo_url: '#',
      cover_variant: 'blue',
      metric: 'Оценка 5 за школьный проект',
      sort_order: 1,
    },
    {
      id: 2,
      slug: 'londa-salon',
      title: 'Лонда — сайт парикмахерской',
      category: 'Web',
      short_description:
        'Сайт салона красоты с онлайн-записью на услуги и каталогом. Клиент выбирает услугу, смотрит цены и записывается на удобное время.',
      full_description:
        'Backend на Flask, база данных через SQLAlchemy, API для записи и вывода услуг.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'SQLAlchemy', 'API'],
      year: 2025,
      featured: true,
      demo_url: '#',
      repo_url: 'https://github.com/mongusmengilek-cmyk/londa',
      cover_variant: 'pink',
      metric: 'Первый коммерческий заказ',
      sort_order: 2,
    },
    {
      id: 3,
      slug: 'nordfolio',
      title: 'Nordfolio — моё портфолио',
      category: 'Web',
      short_description:
        'Собственный сайт-портфолио с адаптивным интерфейсом, тёмной и светлой темой и собственным API для хранения данных.',
      full_description:
        'Full-stack проект: React и TypeScript на фронтенде, FastAPI и SQLAlchemy на бэкенде, Docker и Nginx для запуска.',
      technologies: [
        'React',
        'TypeScript',
        'Vite',
        'FastAPI',
        'Python',
        'SQLAlchemy',
        'SQLite',
        'Docker',
        'Nginx',
        'REST API',
      ],
      year: 2025,
      featured: true,
      demo_url: '#',
      repo_url: '#',
      cover_variant: 'violet',
      metric: 'Собственный full-stack проект',
      sort_order: 3,
    },
  ],
  experiences: [
    {
      id: 1,
      company: 'Самообразование',
      role: 'Начинающий программист',
      period: '2024 — сейчас',
      description:
        'Самостоятельно изучаю full-stack разработку: Python, Flask, HTML, CSS, JavaScript. Делаю первые проекты для школы и клиентов.',
      achievements: [
        'Сделал школьный проект о заповедниках Тывы на оценку 5',
        'Выполнил первый коммерческий заказ — сайт для парикмахерской',
        'Освоил работу с API, SQLAlchemy и Docker на личном проекте',
      ],
      sort_order: 1,
    },
  ],
  services: [
    {
      id: 1,
      title: 'Разработка сайтов',
      description:
        'Делаю сайты под задачу: лендинги, визитки, простые веб-приложения с формами и записью.',
      icon: 'app',
      features: [
        'Вёрстка по макету или с нуля',
        'Backend на Python / Flask',
        'Подключение базы данных и API',
      ],
      sort_order: 1,
    },
  ],
  testimonials: [],
}