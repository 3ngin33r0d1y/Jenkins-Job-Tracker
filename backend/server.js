const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Make users array globally accessible for demo purposes
// In a real app, this would be a database
global.users = [];

// Routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const schedulesRoutes = require('./routes/schedules');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/schedule', schedulesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Jenkins Job Tracker API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
