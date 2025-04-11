# Jenkins Job Tracker

A web application for tracking and scheduling Jenkins jobs with a modern black and red UI theme.

## Features

- View and filter Jenkins jobs
- Schedule jobs using cron expressions
- Track job status (success/failure)
- View job logs
- Dashboard with success/failure visualization
- Date-based filtering for statistics

## Technology Stack

- **Frontend**: React, Redux, Styled Components, Chart.js
- **Backend**: Node.js, Express
- **Authentication**: JWT
- **Jenkins Integration**: Jenkins API with token-based authentication
- **Job Scheduling**: Node-cron

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Jenkins server with API access

### Installation

#### Backend

1. Navigate to the backend directory:
```
cd jenkins-tracker/backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
JWT_SECRET=your-secret-key
```

4. Start the server:
```
npm start
```

The backend server will run on http://localhost:5000

#### Frontend

1. Navigate to the frontend directory:
```
cd jenkins-tracker/frontend
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

The frontend application will run on http://localhost:3000

## Usage

1. Register or login to the application
2. Add your Jenkins credentials (URL and API token)
3. Browse your Jenkins jobs
4. Create schedules for automated job runs
5. View job status and logs
6. Use the dashboard to monitor job performance

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/jenkins-token` - Set Jenkins credentials

### Jenkins Jobs
- `GET /api/jobs` - List all Jenkins jobs
- `GET /api/jobs/:name` - Get job details
- `GET /api/jobs/:name/status` - Get job status
- `GET /api/jobs/:name/logs` - Get job logs
- `POST /api/jobs/:name/build` - Trigger a job

### Job Scheduling
- `GET /api/schedule` - List all scheduled jobs
- `POST /api/schedule` - Create a new schedule
- `PUT /api/schedule/:id` - Update a schedule
- `DELETE /api/schedule/:id` - Delete a schedule

## Deployment

### Backend
The backend can be deployed to any Node.js hosting service like Heroku, AWS, or DigitalOcean.

### Frontend
The frontend can be built for production using:
```
npm run build
```

This will create a `dist` directory with optimized production files that can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Security Considerations

- Jenkins API tokens are sensitive and should be stored securely
- All API endpoints require authentication
- HTTPS should be used in production
- Input validation is implemented on all API endpoints

## License

This project is licensed under the MIT License.
