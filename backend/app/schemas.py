from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class ProfileRead(ORMModel):
    id: int
    name: str
    role: str
    headline: str
    short_bio: str
    long_bio: str
    email: EmailStr
    phone: str
    location: str
    availability: str
    years_experience: int
    projects_count: int
    clients_count: int


class SocialLinkRead(ORMModel):
    id: int
    label: str
    url: str
    icon: str
    sort_order: int


class SkillRead(ORMModel):
    id: int
    name: str
    category: str
    level: int
    years: str
    sort_order: int


class ProjectRead(ORMModel):
    id: int
    slug: str
    title: str
    category: str
    short_description: str
    full_description: str
    technologies: list[str]
    year: int
    featured: bool
    demo_url: str
    repo_url: str
    cover_variant: str
    metric: str
    sort_order: int


class ExperienceRead(ORMModel):
    id: int
    company: str
    role: str
    period: str
    description: str
    achievements: list[str]
    sort_order: int


class ServiceRead(ORMModel):
    id: int
    title: str
    description: str
    icon: str
    features: list[str]
    sort_order: int


class TestimonialRead(ORMModel):
    id: int
    name: str
    position: str
    company: str
    quote: str
    avatar_initials: str
    sort_order: int


class PortfolioRead(BaseModel):
    profile: ProfileRead
    socials: list[SocialLinkRead]
    skills: list[SkillRead]
    projects: list[ProjectRead]
    experiences: list[ExperienceRead]
    services: list[ServiceRead]
    testimonials: list[TestimonialRead]


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=140)
    budget: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=20, max_length=2500)
    website: str | None = Field(default=None, max_length=200, exclude=True)

    @field_validator("name", "company", "budget", "message", mode="before")
    @classmethod
    def strip_strings(cls, value: object) -> object:
        return value.strip() if isinstance(value, str) else value


class ContactMessageRead(BaseModel):
    id: int
    message: str
    created_at: datetime
