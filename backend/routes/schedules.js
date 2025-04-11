const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const { authenticateToken } = require('../middleware/auth');

// In-memory storage for schedules (would be replaced with database in production)
let schedules = [];
let scheduleId = 1;

// Get all schedules
router.get('/', authenticateToken, (req, res) => {
  const userSchedules = schedules.filter(schedule => schedule.userId === req.user.id);
  res.json(userSchedules);
});

// Create a new schedule
router.post('/', authenticateToken, (req, res) => {
  const { jobId, jobName, cronExpression, enabled, description } = req.body;
  
  if (!jobId || !cronExpression) {
    return res.status(400).json({ message: 'Job ID and cron expression are required' });
  }
  
  // Validate cron expression
  if (!cron.validate(cronExpression)) {
    return res.status(400).json({ message: 'Invalid cron expression' });
  }
  
  const newSchedule = {
    id: scheduleId++,
    jobId,
    jobName,
    cronExpression,
    enabled: enabled !== undefined ? enabled : true,
    description: description || '',
    userId: req.user.id,
    createdAt: new Date(),
    lastRun: null,
    nextRun: getNextRunTime(cronExpression)
  };
  
  schedules.push(newSchedule);
  
  // If enabled, schedule the job
  if (newSchedule.enabled) {
    scheduleJob(newSchedule);
  }
  
  res.status(201).json(newSchedule);
});

// Update a schedule
router.put('/:id', authenticateToken, (req, res) => {
  const scheduleId = parseInt(req.params.id);
  const index = schedules.findIndex(s => s.id === scheduleId && s.userId === req.user.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Schedule not found' });
  }
  
  const { jobId, jobName, cronExpression, enabled, description } = req.body;
  
  if (cronExpression && !cron.validate(cronExpression)) {
    return res.status(400).json({ message: 'Invalid cron expression' });
  }
  
  // Update schedule
  const updatedSchedule = {
    ...schedules[index],
    jobId: jobId || schedules[index].jobId,
    jobName: jobName || schedules[index].jobName,
    cronExpression: cronExpression || schedules[index].cronExpression,
    enabled: enabled !== undefined ? enabled : schedules[index].enabled,
    description: description !== undefined ? description : schedules[index].description,
    nextRun: cronExpression ? getNextRunTime(cronExpression) : schedules[index].nextRun
  };
  
  schedules[index] = updatedSchedule;
  
  // Update job scheduling
  if (updatedSchedule.enabled) {
    scheduleJob(updatedSchedule);
  }
  
  res.json(updatedSchedule);
});

// Delete a schedule
router.delete('/:id', authenticateToken, (req, res) => {
  const scheduleId = parseInt(req.params.id);
  const index = schedules.findIndex(s => s.id === scheduleId && s.userId === req.user.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Schedule not found' });
  }
  
  // Remove schedule
  schedules.splice(index, 1);
  
  res.json({ message: 'Schedule deleted successfully' });
});

// Helper function to calculate next run time
function getNextRunTime(cronExpression) {
  try {
    return cron.schedule(cronExpression, () => {}).nextDate().toDate();
  } catch (error) {
    console.error('Error calculating next run time:', error);
    return new Date();
  }
}

// Map to store active job schedules
const activeSchedules = new Map();

// Helper function to schedule a job
function scheduleJob(schedule) {
  // Cancel existing schedule if it exists
  if (activeSchedules.has(schedule.id)) {
    activeSchedules.get(schedule.id).stop();
    activeSchedules.delete(schedule.id);
  }
  
  // Create new schedule
  const task = cron.schedule(schedule.cronExpression, async () => {
    try {
      // This would trigger the Jenkins job in a real implementation
      console.log(`Running scheduled job: ${schedule.jobName} (ID: ${schedule.jobId})`);
      
      // Update last run time
      const index = schedules.findIndex(s => s.id === schedule.id);
      if (index !== -1) {
        schedules[index].lastRun = new Date();
        schedules[index].nextRun = getNextRunTime(schedule.cronExpression);
      }
    } catch (error) {
      console.error(`Error running scheduled job ${schedule.jobId}:`, error);
    }
  });
  
  // Store the task
  activeSchedules.set(schedule.id, task);
}

module.exports = router;
