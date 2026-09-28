from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app import models


def seed_database(db: Session) -> None:
    """Fill a fresh database with portfolio content."""

    existing = db.scalar(select(func.count(models.Profile.id)))
    if existing:
        return

    db.add(
        models.Profile(
            name="Монгуш Менгилек",
            role="Начинающий full-stack разработчик",
            headline="Делаю кропотливо, довожу до результата",
            short_bio=(
                "Начинающий full-stack разработчик. Учусь каждый день, пишу код аккуратно "
                "и довожу задачи до конца — от идеи и интерфейса до работающего API."
            ),
            long_bio=(
                "Я только начинаю путь в разработке, но подхожу к делу серьёзно: разбираюсь "
                "в деталях, не бросаю задачи на полпути и стараюсь писать код, который будет "
                "понятен не только мне. Работаю с Python и Flask, собираю небольшие проекты "
                "от идеи до запуска. Мне важно не просто «сделать», а сделать так, чтобы этим "
                "было удобно пользоваться. Открыт для первых серьёзных проектов, стажировок "
                "и команд, где можно учиться и расти."
            ),
            email="mongusmemgilek@gmail.com",
            phone="",
            location="Удалённо · работаю по всему миру",
            availability="Открыт для новых проектов",
            years_experience=1,
            projects_count=3,
            clients_count=1,
        )
    )

    db.add_all(
        [
            models.SocialLink(
                label="GitHub",
                url="https://github.com/mongusmengilek-cmyk",
                icon="github",
                sort_order=1,
            ),
            models.SocialLink(
                label="Telegram", url="https://t.me/", icon="telegram", sort_order=2
            ),
            models.SocialLink(
                label="Почта",
                url="mailto:mongusmemgilek@gmail.com",
                icon="mail",
                sort_order=3,
            ),
        ]
    )

    skill_rows = [
        ("Python", "Backend", 75, "1 год"),
        ("Flask", "Backend", 65, "6 месяцев"),
        ("SQLAlchemy", "Backend", 60, "6 месяцев"),
        ("FastAPI", "Backend", 55, "2 месяца"),
        ("API", "Backend", 60, "6 месяцев"),
        ("HTML / CSS", "Frontend", 70, "1 год"),
        ("JavaScript", "Frontend", 60, "6 месяцев"),
        ("React", "Frontend", 45, "2 месяца"),
        ("TypeScript", "Frontend", 40, "1 месяц"),
        ("Docker", "Data & DevOps", 50, "1 месяц"),
        ("Git", "Инструменты", 65, "6 месяцев"),
    ]
    db.add_all(
        [
            models.Skill(
                name=name,
                category=category,
                level=level,
                years=years,
                sort_order=index,
            )
            for index, (name, category, level, years) in enumerate(skill_rows, start=1)
        ]
    )

    db.add_all(
        [
            models.Project(
                slug="tuvan-reserves",
                title="Заповедники Республики Тыва",
                category="Учебный",
                short_description=(
                    "Сайт о заповедниках, городах и озёрах Республики Тыва с описанием "
                    "важных природных мест."
                ),
                full_description=(
                    "Школьный проект, посвящённый природным достопримечательностям Тувы. "
                    "Собрал информацию о заповедниках, городах и озёрах, оформил её в виде "
                    "удобного сайта с навигацией по разделам."
                ),
                technologies=["Python", "HTML", "CSS"],
                year=2025,
                featured=True,
                demo_url="#",
                repo_url="#",
                cover_variant="blue",
                metric="Оценка 5 за школьный проект",
                sort_order=1,
            ),
            models.Project(
                slug="londa-salon",
                title="Лонда — сайт парикмахерской",
                category="Web",
                short_description=(
                    "Сайт салона красоты с онлайн-записью на услуги и каталогом. "
                    "Клиент выбирает услугу, смотрит цены и записывается на удобное время."
                ),
                full_description=(
                    "Разработал backend на Flask, подключил базу данных через SQLAlchemy, "
                    "реализовал API для записи и вывода услуг, сверстал интерфейс. "
                    "Клиент остался доволен результатом, но не купил домен для публикации."
                ),
                technologies=[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Python",
                    "Flask",
                    "SQLAlchemy",
                    "API",
                ],
                year=2025,
                featured=True,
                demo_url="#",
                repo_url="https://github.com/mongusmengilek-cmyk/londa",
                cover_variant="pink",
                metric="Первый коммерческий заказ",
                sort_order=2,
            ),
            models.Project(
                slug="nordfolio",
                title="Nordfolio — моё портфолио",
                category="Web",
                short_description=(
                    "Собственный сайт-портфолио с адаптивным интерфейсом, тёмной и светлой "
                    "темой и собственным API для хранения данных."
                ),
                full_description=(
                    "Full-stack проект, в котором я собрал всё, что уже знаю: React и TypeScript "
                    "на фронтенде, FastAPI и SQLAlchemy на бэкенде, Docker для запуска и Nginx "
                    "как reverse proxy. Это тот самый сайт, который вы сейчас смотрите."
                ),
                technologies=[
                    "React",
                    "TypeScript",
                    "Vite",
                    "FastAPI",
                    "Python",
                    "SQLAlchemy",
                    "SQLite",
                    "Docker",
                    "Nginx",
                    "REST API",
                ],
                year=2025,
                featured=True,
                demo_url="#",
                repo_url="#",
                cover_variant="violet",
                metric="Собственный full-stack проект",
                sort_order=3,
            ),
        ]
    )

    db.add_all(
        [
            models.Experience(
                company="Самообразование",
                role="Начинающий программист",
                period="2024 — сейчас",
                description=(
                    "Самостоятельно изучаю full-stack разработку: Python, Flask, HTML, CSS, "
                    "JavaScript. Делаю первые проекты для школы и клиентов."
                ),
                achievements=[
                    "Сделал школьный проект о заповедниках Тывы на оценку 5",
                    "Выполнил первый коммерческий заказ — сайт для парикмахерской",
                    "Освоил работу с API, SQLAlchemy и Docker на личном проекте",
                ],
                sort_order=1,
            ),
        ]
    )

    db.add_all(
        [
            models.Service(
                title="Разработка сайтов",
                description=(
                    "Делаю сайты под задачу: лендинги, визитки, простые веб-приложения "
                    "с формами и записью."
                ),
                icon="app",
                features=[
                    "Вёрстка по макету или с нуля",
                    "Backend на Python / Flask",
                    "Подключение базы данных и API",
                ],
                sort_order=1,
            ),
        ]
    )

    db.commit()