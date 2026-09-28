from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models, schemas


def get_portfolio(db: Session) -> schemas.PortfolioRead:
    profile = db.scalar(select(models.Profile).limit(1))
    if profile is None:
        raise RuntimeError("Portfolio profile has not been seeded")

    def ordered(model: type, order_column: object) -> list:
        return list(db.scalars(select(model).order_by(order_column)).all())

    return schemas.PortfolioRead(
        profile=profile,
        socials=ordered(models.SocialLink, models.SocialLink.sort_order),
        skills=ordered(models.Skill, models.Skill.sort_order),
        projects=ordered(models.Project, models.Project.sort_order),
        experiences=ordered(models.Experience, models.Experience.sort_order),
        services=ordered(models.Service, models.Service.sort_order),
        testimonials=ordered(models.Testimonial, models.Testimonial.sort_order),
    )


def create_contact_message(
    db: Session, payload: schemas.ContactMessageCreate
) -> models.ContactMessage:
    message = models.ContactMessage(
        name=payload.name,
        email=str(payload.email),
        company=payload.company or None,
        budget=payload.budget or None,
        message=payload.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
