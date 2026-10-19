from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Nordfolio API"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"
    
    database_url: str = "sqlite:///./data/portfolio.db"
    allowed_origins: str = "http://localhost:5173,http://localhost:8080"

    # Настройки почты (SMTP)
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 465
    smtp_user: str = ""
    smtp_password: str = ""
    email_to: str = ""

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
