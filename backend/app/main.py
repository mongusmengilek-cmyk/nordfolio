from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database import Base, SessionLocal, engine
from app.routers import contact, health, portfolio
from app.seed import seed_database


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    yield


app = FastAPI(
    title=settings.app_name,
    description="API для готового демонстрационного сайта-портфолио.",
    version="1.0.0",
    debug=settings.debug,
    lifespan=lifespan,
)

# Настройка CORS, чтобы фронтенд на Render мог обращаться к API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Разрешаем запросы с любого домена
    allow_credentials=False,      # Обязательно False, если origins=["*"]
    allow_methods=["*"],          # Разрешаем все методы (GET, POST, OPTIONS и т.д.)
    allow_headers=["*"],          # Разрешаем любые заголовки
)

app.include_router(health.router, prefix=settings.api_v1_prefix)
app.include_router(portfolio.router, prefix=settings.api_v1_prefix)
app.include_router(contact.router, prefix=settings.api_v1_prefix)


@app.get("/", include_in_schema=False)
def root() -> dict[str, str]:
    return {
        "name": settings.app_name,
        "docs": "/docs",
        "health": f"{settings.api_v1_prefix}/health",
    }
