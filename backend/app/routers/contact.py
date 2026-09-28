from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=schemas.ContactMessageRead, status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    payload: schemas.ContactMessageCreate,
    db: Session = Depends(get_db),
) -> schemas.ContactMessageRead:
    if payload.website:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Spam check failed")

    record = crud.create_contact_message(db, payload)
    return schemas.ContactMessageRead(
        id=record.id,
        message="Спасибо! Сообщение сохранено — я свяжусь с вами в ближайшее время.",
        created_at=record.created_at,
    )
