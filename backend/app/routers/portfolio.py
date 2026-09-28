from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("", response_model=schemas.PortfolioRead)
def read_portfolio(db: Session = Depends(get_db)) -> schemas.PortfolioRead:
    return crud.get_portfolio(db)
