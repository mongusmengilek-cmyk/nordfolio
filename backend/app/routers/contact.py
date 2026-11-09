import logging
import os
import resend
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)

# Берем ключ из переменных окружения (безопасно, ключ не виден на GitHub)
resend.api_key = os.environ.get("RESEND_API_KEY", "")


@router.post("", response_model=schemas.ContactMessageRead, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    payload: schemas.ContactMessageCreate,
    db: Session = Depends(get_db),
) -> schemas.ContactMessageRead:
    if payload.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Spam check failed")

    # Сохраняем в базу данных
    record = crud.create_contact_message(db, payload)
    
    # Отправляем письмо через Resend
    try:
        if resend.api_key:
            resend.Emails.send({
                "from": "onboarding@resend.dev",  # Тестовый отправитель
                "to": "mongusmengilek@gmail.com", # Ваша почта
                "subject": f"Новая заявка с портфолио от {payload.name}",
                "html": f"""
                    <h3>Новое сообщение с сайта!</h3>
                    <p><b>Имя:</b> {payload.name}</p>
                    <p><b>Email:</b> {payload.email}</p>
                    <p><b>Компания:</b> {payload.company or 'Не указана'}</p>
                    <p><b>Бюджет:</b> {payload.budget or 'Не указан'}</p>
                    <br>
                    <p><b>Сообщение:</b></p>
                    <p>{payload.message}</p>
                """
            })
        else:
            logger.warning("Ключ RESEND_API_KEY не задан. Письмо не отправлено.")
    except Exception as e:
        logger.error(f"Ошибка при отправке через Resend: {e}")
    
    return schemas.ContactMessageRead(
        id=record.id,
        message="Спасибо! Сообщение сохранено — я свяжусь с вами в ближайшее время.",
        created_at=record.created_at,
    )
