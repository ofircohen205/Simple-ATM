# ATM API

A simple ATM API built with FastAPI that allows for basic banking operations such as checking balance, depositing, and withdrawing money.

## Features

- Check account balance
- Deposit money (creates account if it doesn't exist)
- Withdraw money (with validation for insufficient funds)
- SQLite database for persistent storage
- Docker support for easy deployment

## Technology Stack

- Python 3.10+
- FastAPI - Web framework
- SQLModel - ORM for database operations
- SQLite - Database
- Pytest - Testing framework
- Docker - Containerization

## Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) for dependency management (optional, but recommended)
- Docker (optional, for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Simple-ATM.git
   cd Simple-ATM/backend
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   # Using uv (recommended)
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv sync
   
   # Using pip
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -e .
   ```

### Docker

1. Build the Docker image:
   ```bash
   docker build -t atm-api .
   ```

2. Run the container:
   ```bash
   docker run -p 8000:80 atm-api
   ```

### Heroku Deployment with GitHub Actions

This project is configured for automatic deployment to Heroku using GitHub Actions. When changes are pushed to the main branch, the following happens:

1. GitHub Actions workflow is triggered
2. The backend Docker image is built
3. The image is pushed to Heroku Container Registry
4. The application is released on Heroku

The deployment configuration can be found in `.github/workflows/deploy.yml` at the root of the repository.

To set up your own deployment:

1. Create a Heroku app
2. Add the following secrets to your GitHub repository:
   - `HEROKU_API_KEY`: Your Heroku API key
   - `HEROKU_APP_NAME`: Your Heroku app name

For more details, see the [Heroku Deployment Guide](../HEROKU_DEPLOYMENT.md) in the root of the repository.

## Running the Application

### Local Development

```bash
# Using uvicorn directly
uvicorn app.main:app --reload

# Using FastAPI CLI
fastapi run app/main.py --port 8000 --host 0.0.0.0 --reload
```

The API will be available at http://localhost:8000

### Docker

```bash
docker run -p 8000:80 atm-api
```

The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Endpoints

#### Check Account Balance

```
GET /accounts/{account_number}/balance
```

Response:
```json
{
  "account_number": 123,
  "balance": 100.0
}
```

#### Deposit Money

```
POST /accounts/{account_number}/deposit
```

Request Body:
```json
{
  "amount": 50.0
}
```

Response:
```json
{
  "account_number": 123,
  "balance": 150.0
}
```

#### Withdraw Money

```
POST /accounts/{account_number}/withdraw
```

Request Body:
```json
{
  "amount": 30.0
}
```

Response:
```json
{
  "account_number": 123,
  "balance": 120.0
}
```

## Testing

The project includes unit tests for the core functionality. To run the tests:

```bash
# Using pytest
pytest

# Using pytest with verbose output
pytest -v
```

## Project Structure

```
backend/
├── app/
│   ├── db/
│   │   ├── __init__.py
│   │   └── creation.py      # Database setup
│   ├── routers/
│   │   ├── __init__.py
│   │   └── accounts.py      # API endpoints
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── account.py       # Data models
│   ├── __init__.py
│   └── main.py              # Application entry point
├── data/
│   └── atm.db               # SQLite database file (local development only)
├── tests/
│   ├── unit/
│   │   ├── __init__.py
│   │   ├── conftest.py      # Test configuration
│   │   └── test_deposit_and_balance.py  # Tests
├── Dockerfile               # Docker configuration for containerization
├── Procfile                 # Heroku deployment configuration
├── pyproject.toml           # Project dependencies
├── README.md                # This file
└── uv.lock                  # Lock file for dependencies
```

## Development

### Adding New Features

1. Create new schemas in `app/schemas/`
2. Add new endpoints in `app/routers/`
3. Update the database models in `app/schemas/` if needed
4. Add tests for the new functionality in `tests/unit/`
