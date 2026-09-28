from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    role: Mapped[str] = mapped_column(String(160))
    headline: Mapped[str] = mapped_column(String(240))
    short_bio: Mapped[str] = mapped_column(Text)
    long_bio: Mapped[str] = mapped_column(Text)
    email: Mapped[str] = mapped_column(String(160))
    phone: Mapped[str] = mapped_column(String(80))
    location: Mapped[str] = mapped_column(String(160))
    availability: Mapped[str] = mapped_column(String(160))
    years_experience: Mapped[int] = mapped_column(Integer)
    projects_count: Mapped[int] = mapped_column(Integer)
    clients_count: Mapped[int] = mapped_column(Integer)


class SocialLink(Base):
    __tablename__ = "social_links"

    id: Mapped[int] = mapped_column(primary_key=True)
    label: Mapped[str] = mapped_column(String(80))
    url: Mapped[str] = mapped_column(String(300))
    icon: Mapped[str] = mapped_column(String(40))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    category: Mapped[str] = mapped_column(String(100))
    level: Mapped[int] = mapped_column(Integer)
    years: Mapped[str] = mapped_column(String(40))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(140))
    category: Mapped[str] = mapped_column(String(100))
    short_description: Mapped[str] = mapped_column(Text)
    full_description: Mapped[str] = mapped_column(Text)
    technologies: Mapped[list[str]] = mapped_column(JSON)
    year: Mapped[int] = mapped_column(Integer)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    demo_url: Mapped[str] = mapped_column(String(300))
    repo_url: Mapped[str] = mapped_column(String(300))
    cover_variant: Mapped[str] = mapped_column(String(40), default="violet")
    metric: Mapped[str] = mapped_column(String(140))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Experience(Base):
    __tablename__ = "experiences"

    id: Mapped[int] = mapped_column(primary_key=True)
    company: Mapped[str] = mapped_column(String(140))
    role: Mapped[str] = mapped_column(String(160))
    period: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    achievements: Mapped[list[str]] = mapped_column(JSON)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(140))
    description: Mapped[str] = mapped_column(Text)
    icon: Mapped[str] = mapped_column(String(40))
    features: Mapped[list[str]] = mapped_column(JSON)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    position: Mapped[str] = mapped_column(String(140))
    company: Mapped[str] = mapped_column(String(140))
    quote: Mapped[str] = mapped_column(Text)
    avatar_initials: Mapped[str] = mapped_column(String(8))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(160), index=True)
    company: Mapped[str | None] = mapped_column(String(140), nullable=True)
    budget: Mapped[str | None] = mapped_column(String(80), nullable=True)
    message: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(40), default="new")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
