# ATM Frontend Application

A React-based frontend for the ATM application that provides a user interface for basic banking operations.

## Features

- Check account balance
- Deposit money (creates account if it doesn't exist)
- Withdraw money (with validation for insufficient funds)
- Responsive design for desktop and mobile devices
- Connection to the ATM API backend

## Technology Stack

- TypeScript
- React
- React Router
- Axios for API requests
- CSS for styling
- Docker for containerization

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- Docker (optional, for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Simple-ATM.git
   cd Simple-ATM/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - For development: Create or modify `.env.development` with:
     ```
     REACT_APP_API=http://localhost:8000
     ```
   - For production: Create or modify `.env.production` with:
     ```
     REACT_APP_API=...
     ```

### Docker

1. Build the Docker image:
   ```bash
   docker build -t atm-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:80 atm-frontend
   ```

## Running the Application

### Local Development

```bash
# Start the development server
npm start
```

The application will be available at http://localhost:3000

### Production Build

```bash
# Create a production build
npm run build
```

## Connecting to the Backend

The frontend connects to the backend API using the URL specified in the environment variables:

- In development mode, it connects to `http://localhost:8000` by default
- In production mode, it connects to your provided URL in .env.production

The API connection is configured in `src/api.ts`.

## Project Structure

```
frontend/
├── public/                # Static files
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── api.ts             # API configuration and requests
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── ...                # Other configuration files
├── .env.development       # Development environment variables
├── .env.production        # Production environment variables
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## Deployment

The frontend can be deployed to any static hosting service. For Heroku deployment, see the [Heroku Deployment Guide](../HEROKU_DEPLOYMENT.md) in the root of the repository.