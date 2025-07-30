# Heroku Deployment Guide

This guide provides instructions for deploying the ATM application (backend and frontend) to Heroku.

## Prerequisites

Before you begin, make sure you have:

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. A Heroku account
3. Git installed on your machine
4. GitHub account with access to the repository
5. Docker installed (for local testing)

## Current Deployment Setup

The ATM application is currently deployed with the following setup:

- **Backend**: Deployed to Heroku at your provided URL
- **Frontend**: Connects to the backend using the URL specified in `.env.production`

The deployment is automated using GitHub Actions, which builds and deploys the backend Docker container to Heroku when changes are pushed to the main branch.

## Automated Deployment with GitHub Actions

### How It Works

1. When code is pushed to the main branch, the GitHub Actions workflow in `.github/workflows/deploy.yml` is triggered
2. The workflow builds a Docker image for the backend
3. The image is pushed to the Heroku Container Registry
4. The application is released on Heroku

### Setting Up GitHub Actions Deployment

To set up automated deployment with GitHub Actions:

1. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Add the following secrets to your GitHub repository:
   - `HEROKU_API_KEY`: Your Heroku API key (find it in your Heroku account settings)
   - `HEROKU_APP_NAME`: Your Heroku app name

3. Ensure the `.github/workflows/deploy.yml` file is configured correctly:
   ```yaml
   name: Deploy to Heroku

   on:
     push:
       branches:
         - main  # Or your deploy branch
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
   
       steps:
         - name: Checkout code
           uses: actions/checkout@v4
   
         - name: Login to Heroku Container Registry
           run: echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com
           env:
             HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
   
         - name: Build Docker image
           run: docker build -t registry.heroku.com/${{ secrets.HEROKU_APP_NAME }}/web ./backend
   
         - name: Push to Heroku Container Registry
           run: docker push registry.heroku.com/${{ secrets.HEROKU_APP_NAME }}/web
   
         - name: Install Heroku CLI
           run: |
             curl https://cli-assets.heroku.com/install.sh | sh
         
         - name: Release on Heroku
           run: heroku container:release web -a ${{ secrets.HEROKU_APP_NAME }}
           env:
             HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
   ```

## Backend Configuration for Heroku

### Database Configuration

The backend can be configured to use PostgreSQL on Heroku instead of SQLite. Here's how to set up the database:

1. Add PostgreSQL add-on to your Heroku app:
   ```bash
   heroku addons:create heroku-postgresql:mini -a your-app-name
   ```

2. Create a `backend/app/db/config.py` file with the following content:
   ```python
   import os
   from sqlmodel import create_engine, SQLModel

   def get_database_url():
       # Get the DATABASE_URL from Heroku environment if available
       database_url = os.environ.get("DATABASE_URL")
       
       # Heroku provides PostgreSQL URLs starting with "postgres://"
       # but SQLAlchemy 1.4+ requires "postgresql://"
       if database_url and database_url.startswith("postgres://"):
           database_url = database_url.replace("postgres://", "postgresql://", 1)
           return database_url
       
       # For local development, use SQLite
       return "sqlite:///data/atm.db"

   # Create engine with the appropriate URL
   database_url = get_database_url()
   engine = create_engine(database_url)

   def create_db_and_tables():
       SQLModel.metadata.create_all(engine)
   ```

3. Update `backend/app/db/creation.py` to use the configuration:
   ```python
   from app.db.config import create_db_and_tables

   def create_tables():
       create_db_and_tables()
   ```

### Procfile

The backend includes a Procfile for Heroku deployment:

```
web: uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-8000}
```

This tells Heroku to run the FastAPI application using uvicorn, binding to the port provided by Heroku.

## Frontend Configuration for Heroku

The frontend is configured to connect to the backend using the URL specified in the `.env.production` file:

```
REACT_APP_API=...
```

If you're deploying to a different Heroku app, update this URL to match your backend URL.

### Deploying the Frontend (Manual)

While the backend is deployed automatically via GitHub Actions, you can deploy the frontend manually to a static hosting service:

1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Deploy the `build` directory to your preferred static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Check the database URL configuration
   - Ensure the PostgreSQL add-on is properly provisioned
   - Verify that the database URL is correctly formatted for SQLAlchemy

2. **CORS Issues**:
   - Ensure the backend CORS configuration includes the frontend domain
   - Check browser console for CORS errors

3. **Build Failures**:
   - Review the GitHub Actions logs for errors
   - Ensure all dependencies are properly specified

## Maintenance

### Updating the Application

To update your application after making changes:

1. Push changes to the main branch of your GitHub repository
2. GitHub Actions will automatically deploy the backend to Heroku
3. If you've made changes to the frontend, rebuild and redeploy it manually

### Monitoring

Monitor your application's performance and logs:

```bash
heroku logs --tail -a your-app-name
```

## Additional Resources

- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Heroku Python Support](https://devcenter.heroku.com/articles/python-support)
- [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)