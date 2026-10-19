import logging
from email.message import EmailMessage

import aiosmtplib
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.database import get_db

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)


async def send_email_notification(name: str, email: str, message: str, company: str | None, budget: str | None) -> None:
    if not settings.smtp_user or not settings.smtp_password or not settings.email_to:
        logger.warning("SMTP настройки не заданы. Письмо не отправлено.")
        return

    email_message = EmailMessage()
    email_message["From"] = f"Portfolio <{settings.smtp_user}>"
    email_message["To"] = settings.email_to
    email_message["Subject"] = f"Новая заявка с портфолио от {name}"
    
    body = (
        f"Новое сообщение с сайта!\n\n"
        f"Имя: {name}\n"
        f"Email: {email}\n"
        f"Компания: {company or 'Не указана'}\n"
        f"Бюджет: {budget or 'Не указан'}\n\n"
        f"Сообщение:\n{message}\n"
    )
    email_message.set_content(body)

    try:
        await aiosmtplib.send(
            email_message,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_user,
            password=settings.smtp_password,
            use_tls=True,
        )
    except Exception as e:
        logger.error(f"Ошибка при отправке почты: {e}")


@router.post("", response_model=schemas.ContactMessageRead, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    payload: schemas.ContactMessageCreate,
    db: Session = Depends(get_db),
) -> schemas.ContactMessageRead:
    if payload.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Spam check failed")

    record = crud.create_contact_message(db, payload)
    
    # Отправляем письмо
    await send_email_notification(
        name=payload.name,
        email=str(payload.email),
        message=payload.message,
        company=payload.company,
        budget=payload.budget
    )
    
    return schemas.ContactMessageRead(
        id=record.id,
        message="Спасибо! Сообщение сохранено — я свяжусь с вами в ближайшее время.",
        created_at=record.created_at,
    )
