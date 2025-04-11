# Jenkins Job Tracker - System Architecture

## Overview
The Jenkins Job Tracker is a web application designed to interface with Jenkins CI/CD servers, allowing users to view, filter, and schedule jobs. The application provides real-time status updates and visualizations of job performance.

## System Components

### 1. Frontend (React)
- **User Interface**: React-based SPA with black and red theme
- **State Management**: Redux for global state management
- **API Communication**: Axios for REST API calls
- **Visualization**: Chart.js for dashboard visualizations
- **Styling**: Styled-components with responsive design

### 2. Backend (Node.js)
- **API Server**: Express.js REST API
- **Authentication**: JWT-based authentication
- **Jenkins Integration**: Node-jenkins client library
- **Job Scheduling**: Node-cron for scheduling jobs
- **Database Interface**: Mongoose/Sequelize ORM

### 3. Database (MongoDB/PostgreSQL)
- Store user preferences
- Cache Jenkins job data
- Store scheduling information
- Track historical job performance metrics

### 4. Jenkins Integration
- Connect via Jenkins REST API
- Authentication via token-based system
- Polling mechanism for status updates

## API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/token` - Store Jenkins API token

### Jenkins Jobs
- `GET /api/jobs` - List all Jenkins jobs
- `GET /api/jobs/:id` - Get specific job details
- `GET /api/jobs/:id/status` - Get job status
- `GET /api/jobs/:id/logs` - Get job logs

### Job Scheduling
- `POST /api/schedule` - Create new job schedule
- `GET /api/schedule` - List all scheduled jobs
- `PUT /api/schedule/:id` - Update job schedule
- `DELETE /api/schedule/:id` - Delete job schedule

### Dashboard
- `GET /api/stats/summary` - Get success/failure counts
- `GET /api/stats/by-date` - Get stats filtered by date range

## Database Schema

### User Collection/Table
```
{
  id: String,
  username: String,
  jenkinsToken: String (encrypted),
  preferences: Object
}
```

### Job Schedule Collection/Table
```
{
  id: String,
  jobId: String,
  cronExpression: String,
  enabled: Boolean,
  lastRun: Date,
  nextRun: Date,
  userId: String
}
```

### Job Stats Collection/Table
```
{
  jobId: String,
  date: Date,
  status: String,
  duration: Number,
  userId: String
}
```

## Authentication Flow
1. User logs in to the web application
2. User provides Jenkins credentials or API token
3. Backend stores encrypted token
4. All subsequent Jenkins API requests use this token

## Data Flow
1. Frontend requests job data from backend API
2. Backend retrieves data from Jenkins using stored credentials
3. Data is cached in the database for performance
4. Updates are pushed to frontend in real-time or via polling

## Security Considerations
- All API endpoints require authentication
- Jenkins credentials are encrypted at rest
- HTTPS for all communications
- Input validation on all API endpoints
- Rate limiting to prevent abuse

## Deployment Architecture
- Frontend: Static hosting (Netlify/Vercel)
- Backend: Node.js server (Docker container)
- Database: Managed database service
- CI/CD: Automated deployment pipeline
