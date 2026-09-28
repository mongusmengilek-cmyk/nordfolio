# Nordfolio — готовое портфолио на React + FastAPI

Полностью заполненный демонстрационный сайт-портфолио full-stack разработчика. Проект можно запустить одной командой через Docker или отдельно в режиме разработки.

## Что уже сделано

- адаптивный React-интерфейс на TypeScript и Vite;
- тёмная и светлая темы с сохранением выбора;
- hero-блок, проекты, услуги, навыки, опыт, отзывы и контакты;
- фильтрация проектов по категориям;
- плавные появления секций и микроанимации;
- резервные данные во frontend — страница видна даже без API;
- FastAPI API с документацией Swagger;
- SQLAlchemy и SQLite;
- автоматическое заполнение базы при первом старте;
- рабочая контактная форма с серверной валидацией и honeypot-полем;
- Docker Compose, Nginx reverse proxy и healthcheck;
- тесты API и TypeScript typecheck;
- доступная навигация с клавиатуры и поддержка `prefers-reduced-motion`.

## Быстрый запуск через Docker

Нужны Docker и Docker Compose.

```bash
cp .env.example .env
docker compose up --build
```

После запуска:

- сайт: `http://localhost:8080`;
- Swagger API: `http://localhost:8000/docs`;
- healthcheck: `http://localhost:8000/api/v1/health`.

Остановка:

```bash
docker compose down
```

Чтобы удалить сохранённую SQLite-базу вместе с Docker volume:

```bash
docker compose down -v
```

## Локальная разработка

### 1. Backend

Требуется Python 3.12+.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend запустится на `http://localhost:8000`.

### 2. Frontend

Требуется Node.js 22+.

В новом терминале:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend запустится на `http://localhost:5173`. Vite автоматически проксирует запросы `/api` на FastAPI.

## Где менять содержимое

Основные демонстрационные данные находятся в:

```text
backend/app/seed.py
```

Там можно заменить:

- имя, должность, биографию и контакты;
- ссылки GitHub, LinkedIn и Telegram;
- проекты и технологии;
- опыт работы;
- услуги;
- отзывы;
- навыки и уровни владения.

После изменения seed-данных удалите локальную базу и перезапустите backend:

```bash
make clean-db
```

или вручную:

```bash
rm backend/data/portfolio.db
```

Резервная копия контента для автономного frontend-просмотра находится в:

```text
frontend/src/data/fallback.ts
```

Её стоит обновить теми же данными, если нужен корректный демо-режим без API.

## Структура проекта

```text
portfolio-react-fastapi/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Makefile
├── README.md
├── backend/
│   ├── .env.example
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── data/
│   │   └── .gitkeep
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_api.py
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── database.py
│       ├── models.py
│       ├── schemas.py
│       ├── crud.py
│       ├── seed.py
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py
│       └── routers/
│           ├── __init__.py
│           ├── health.py
│           ├── portfolio.py
│           └── contact.py
└── frontend/
    ├── .env.example
    ├── .dockerignore
    ├── Dockerfile
    ├── nginx.conf
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── styles.css
        ├── vite-env.d.ts
        ├── api/
        │   └── client.ts
        ├── data/
        │   └── fallback.ts
        ├── hooks/
        │   └── useTheme.ts
        ├── types/
        │   └── index.ts
        └── components/
            ├── About.tsx
            ├── Contact.tsx
            ├── Experience.tsx
            ├── Footer.tsx
            ├── Header.tsx
            ├── Hero.tsx
            ├── Projects.tsx
            ├── Reveal.tsx
            ├── ScrollProgress.tsx
            ├── SectionHeading.tsx
            ├── Services.tsx
            ├── Skills.tsx
            └── Testimonials.tsx
```

## API

### Получить всё портфолио

```http
GET /api/v1/portfolio
```

### Отправить контактную форму

```http
POST /api/v1/contact
Content-Type: application/json
```

Пример:

```json
{
  "name": "Анна",
  "email": "anna@company.com",
  "company": "Acme",
  "budget": "€7–15k",
  "message": "Нужен личный кабинет для B2B-сервиса с ролями и аналитикой.",
  "website": ""
}
```

Сообщения сохраняются в таблице `contact_messages` SQLite-базы.

## Проверка проекта

Backend-тесты:

```bash
cd backend
pytest -q
```

Frontend typecheck и production build:

```bash
cd frontend
npm run typecheck
npm run build
```

Или из корня:

```bash
make test
make build
```

## Перед публикацией

Замените демонстрационные контакты и внешние ссылки в `backend/app/seed.py` и `frontend/src/data/fallback.ts`. Для реального production-проекта рекомендуется подключить PostgreSQL, миграции Alembic, отправку писем или CRM-интеграцию и ограничение частоты запросов контактной формы.
