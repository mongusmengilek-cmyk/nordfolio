import os
from pathlib import Path

TEST_DB = Path("data/test_portfolio.db")
TEST_DB.unlink(missing_ok=True)
os.environ["DATABASE_URL"] = f"sqlite:///{TEST_DB}"

from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402


def test_health_and_portfolio() -> None:
    with TestClient(app) as client:
        health = client.get("/api/v1/health")
        assert health.status_code == 200
        assert health.json()["status"] == "ok"

        response = client.get("/api/v1/portfolio")
        assert response.status_code == 200
        payload = response.json()
        assert payload["profile"]["name"] == "Алексей Морозов"
        assert len(payload["projects"]) >= 6
        assert len(payload["skills"]) >= 12


def test_contact_form() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/contact",
            json={
                "name": "Тестовый клиент",
                "email": "client@example.com",
                "company": "Example",
                "budget": "€5–10k",
                "message": "Хотим обсудить разработку нового продуктового кабинета.",
                "website": "",
            },
        )
        assert response.status_code == 201
        assert response.json()["id"] >= 1
