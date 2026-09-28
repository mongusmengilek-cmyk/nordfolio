.PHONY: install-backend install-frontend dev-backend dev-frontend test build docker-up docker-down clean-db

install-backend:
	cd backend && python3 -m pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	cd frontend && npm run dev

test:
	cd backend && pytest -q
	cd frontend && npm run typecheck

build:
	cd frontend && npm run build

docker-up:
	docker compose up --build

docker-down:
	docker compose down

clean-db:
	rm -f backend/data/portfolio.db backend/data/test_portfolio.db
