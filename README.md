# ATM Application

A full-stack ATM application with a FastAPI backend and React frontend.

## Project Structure

This project consists of two main components:

- **Backend**: A FastAPI application that provides the API for ATM operations
- **Frontend**: A React application that provides the user interface

## Features

- Check account balance
- Deposit money (creates account if it doesn't exist)
- Withdraw money (with validation for insufficient funds)
- Persistent storage using SQLite database (locally)

## Local Development

### Backend

See the [Backend README](./backend/README.md) for detailed instructions on setting up and running the backend.

Quick start:
```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv sync
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

See the [Frontend README](./frontend/README.md) for detailed instructions on setting up and running the frontend.

Quick start:
```bash
cd frontend
npm install
npm start
```

The application will be available at http://localhost:3000

## Docker Deployment

You can run the entire application using Docker Compose:

```bash
docker-compose up
```

This will start both the backend and frontend containers.

## Heroku Deployment

This application is deployed to Heroku using GitHub Actions and Docker containers. The backend is automatically deployed when changes are pushed to the main branch.

For detailed instructions on the deployment process, see the [Heroku Deployment Guide](./HEROKU_DEPLOYMENT.md).

## API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc