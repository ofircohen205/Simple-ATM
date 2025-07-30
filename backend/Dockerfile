FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
COPY . /app

RUN uv sync --frozen --no-cache

# Use dynamic port for Heroku compatibility
CMD ["sh", "-c", "uv run python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]