# Heroku Deployment Guide

This guide provides instructions for deploying the ATM application (backend and frontend) to Heroku.

## Prerequisites

Before you begin, make sure you have:

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. A Heroku account
3. Git installed on your machine
4. Node.js and npm installed (for frontend deployment)
5. Python 3.10+ installed (for local testing)

## Backend Deployment

### 1. Prepare the Backend for Heroku

The backend is already configured with a Procfile, which is required for Heroku deployment. However, we need to modify the database configuration since SQLite is not suitable for Heroku's ephemeral filesystem.

1. Log in to Heroku:
   ```bash
   heroku login
   ```

2. Create a new Heroku app for the backend:
   ```bash
   cd backend
   heroku create atm-api-backend
   ```

3. Add PostgreSQL add-on to your Heroku app:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. Modify the database configuration to use PostgreSQL in production:
   - Create a new file `backend/app/db/config.py` with environment-based configuration
   - Update `backend/app/db/creation.py` to use PostgreSQL in production

5. Push the backend to Heroku:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### 2. Configure Environment Variables

Set the necessary environment variables for the backend:

```bash
heroku config:set ENVIRONMENT=production
```

## Frontend Deployment

### 1. Prepare the Frontend for Heroku

1. Modify the API URL configuration to use environment variables:
   - Update `frontend/src/api.ts` to use a dynamic API URL

2. Create a new Heroku app for the frontend:
   ```bash
   cd frontend
   heroku create atm-app-frontend
   ```

3. Add a `static.json` file to the frontend directory for static site hosting:
   ```json
   {
     "root": "build/",
     "routes": {
       "/**": "index.html"
     }
   }
   ```

4. Add the Node.js buildpack:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

5. Configure environment variables:
   ```bash
   heroku config:set REACT_APP_API_URL=https://atm-api-backend.herokuapp.com
   ```

6. Deploy the frontend to Heroku:
   ```bash
   git subtree push --prefix frontend heroku main
   ```

## Connecting Frontend and Backend

After deploying both applications, you need to ensure they can communicate with each other:

1. Enable CORS on the backend for the frontend domain:
   ```bash
   heroku config:set CORS_ORIGINS=https://atm-app-frontend.herokuapp.com --app atm-api-backend
   ```

2. Test the connection by opening the frontend app in your browser:
   ```bash
   heroku open --app atm-app-frontend
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Check the database URL configuration
   - Ensure the PostgreSQL add-on is properly provisioned

2. **CORS Issues**:
   - Verify that the backend CORS configuration includes the frontend domain
   - Check browser console for CORS errors

3. **Build Failures**:
   - Review the build logs: `heroku logs --tail`
   - Ensure all dependencies are properly specified

## Maintenance

### Updating the Application

To update your application after making changes:

1. Push changes to your Git repository
2. Deploy the changes to Heroku:
   ```bash
   git subtree push --prefix backend heroku main  # For backend
   git subtree push --prefix frontend heroku main  # For frontend
   ```

### Monitoring

Monitor your application's performance and logs:

```bash
heroku logs --tail --app atm-api-backend
heroku logs --tail --app atm-app-frontend
```

## Additional Resources

- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Heroku Python Support](https://devcenter.heroku.com/articles/python-support)
- [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql)
- [Deploying React with Zero Configuration](https://blog.heroku.com/deploying-react-with-zero-configuration)