.PHONY: help build up down logs restart clean rebuild

# Default target
help:
	@echo "Available commands:"
	@echo "  env      - Create .env file template"
	@echo "  build    - Build all Docker images"
	@echo "  up       - Start all services"
	@echo "  down     - Stop all services"
	@echo "  logs     - Show logs for all services"
	@echo "  restart  - Restart all services"
	@echo "  clean    - Remove containers, networks, and volumes"
	@echo "  rebuild  - Rebuild and start all services"
	@echo "  backend  - Build and start only backend"
	@echo "  frontend - Build and start only frontend"

# Build all images
build:
	docker-compose build

# Start all services
up:
	@if [ ! -f .env ]; then \
		echo "Error: .env file not found. Please create it first:"; \
		echo "cp .env.example .env  # or create manually"; \
		echo ""; \
		echo "Required .env contents:"; \
		echo "OPENAI_API_KEY=your_key_here"; \
		echo "API_AUTH_KEY=your_auth_key_here"; \
		echo "ENV=development"; \
		echo "LOG_LEVEL=info"; \
		echo "VITE_API_URL=http://localhost:8000"; \
		exit 1; \
	fi
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# Show logs
logs:
	docker-compose logs -f

# Restart all services
restart:
	docker-compose restart

# Clean up everything
env:
	@if [ ! -f .env ]; then \
		echo "Creating .env file..."; \
		echo "# Backend Configuration" > .env; \
		echo "ENV=development" >> .env; \
		echo "LOG_LEVEL=info" >> .env; \
		echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env; \
		echo "API_AUTH_KEY=your_api_auth_key_here" >> .env; \
		echo "" >> .env; \
		echo "# Frontend Configuration" >> .env; \
		echo "VITE_API_URL=http://localhost:8000" >> .env; \
		echo "VITE_PUBLIC_API_KEY=your_api_auth_key_here" >> .env; \
		echo "" >> .env; \
		echo ".env file created! Please edit it with your actual API keys."; \
	else \
		echo ".env file already exists."; \
	fi

clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

# Rebuild and start
rebuild: clean build up

# Backend only
backend:
	docker-compose up -d --build backend

# Frontend only
frontend:
	docker-compose up -d --build frontend

# Development mode (with logs)
dev:
	docker-compose up --build

# Status
status:
	docker-compose ps
