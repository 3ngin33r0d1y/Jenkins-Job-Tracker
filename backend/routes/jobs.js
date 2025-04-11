const express = require('express');
const router = express.Router();
const jenkins = require('jenkins');
const { authenticateToken } = require('../middleware/auth');

// Get all jobs
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { jenkinsUrl, jenkinsToken } = req.user;
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins configuration not found' });
    }
    
    // Connect to Jenkins
    const jenkinsInstance = jenkins({
      baseUrl: `${jenkinsUrl}`,
      promisify: true,
      headers: {
        'Authorization': `Bearer ${jenkinsToken}`
      }
    });
    
    // Get all jobs
    const jobs = await jenkinsInstance.job.list();
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching Jenkins jobs:', error);
    res.status(500).json({ message: 'Failed to fetch Jenkins jobs', error: error.message });
  }
});

// Get job details
router.get('/:name', authenticateToken, async (req, res) => {
  try {
    const { jenkinsUrl, jenkinsToken } = req.user;
    const jobName = req.params.name;
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins configuration not found' });
    }
    
    // Connect to Jenkins
    const jenkinsInstance = jenkins({
      baseUrl: `${jenkinsUrl}`,
      promisify: true,
      headers: {
        'Authorization': `Bearer ${jenkinsToken}`
      }
    });
    
    // Get job details
    const jobInfo = await jenkinsInstance.job.get(jobName);
    
    res.json(jobInfo);
  } catch (error) {
    console.error(`Error fetching job details for ${req.params.name}:`, error);
    res.status(500).json({ message: 'Failed to fetch job details', error: error.message });
  }
});

// Get job status
router.get('/:name/status', authenticateToken, async (req, res) => {
  try {
    const { jenkinsUrl, jenkinsToken } = req.user;
    const jobName = req.params.name;
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins configuration not found' });
    }
    
    // Connect to Jenkins
    const jenkinsInstance = jenkins({
      baseUrl: `${jenkinsUrl}`,
      promisify: true,
      headers: {
        'Authorization': `Bearer ${jenkinsToken}`
      }
    });
    
    // Get job details
    const jobInfo = await jenkinsInstance.job.get(jobName);
    
    // Get last build info if available
    let lastBuildInfo = null;
    if (jobInfo.lastBuild) {
      lastBuildInfo = await jenkinsInstance.build.get(jobName, jobInfo.lastBuild.number);
    }
    
    const status = {
      name: jobInfo.name,
      lastBuild: lastBuildInfo ? {
        number: lastBuildInfo.number,
        result: lastBuildInfo.result,
        timestamp: lastBuildInfo.timestamp,
        duration: lastBuildInfo.duration,
        url: lastBuildInfo.url
      } : null
    };
    
    res.json(status);
  } catch (error) {
    console.error(`Error fetching job status for ${req.params.name}:`, error);
    res.status(500).json({ message: 'Failed to fetch job status', error: error.message });
  }
});

// Get job logs
router.get('/:name/logs', authenticateToken, async (req, res) => {
  try {
    const { jenkinsUrl, jenkinsToken } = req.user;
    const jobName = req.params.name;
    const buildNumber = req.query.build || 'lastBuild';
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins configuration not found' });
    }
    
    // Connect to Jenkins
    const jenkinsInstance = jenkins({
      baseUrl: `${jenkinsUrl}`,
      promisify: true,
      headers: {
        'Authorization': `Bearer ${jenkinsToken}`
      }
    });
    
    // Get build logs
    const logs = await jenkinsInstance.build.log({
      name: jobName,
      number: buildNumber
    });
    
    res.json({ logs });
  } catch (error) {
    console.error(`Error fetching job logs for ${req.params.name}:`, error);
    res.status(500).json({ message: 'Failed to fetch job logs', error: error.message });
  }
});

// Trigger a job
router.post('/:name/build', authenticateToken, async (req, res) => {
  try {
    const { jenkinsUrl, jenkinsToken } = req.user;
    const jobName = req.params.name;
    const parameters = req.body.parameters || {};
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins configuration not found' });
    }
    
    // Connect to Jenkins
    const jenkinsInstance = jenkins({
      baseUrl: `${jenkinsUrl}`,
      promisify: true,
      headers: {
        'Authorization': `Bearer ${jenkinsToken}`
      }
    });
    
    // Check if job has parameters
    const jobInfo = await jenkinsInstance.job.get(jobName);
    
    let buildNumber;
    
    if (jobInfo.property && jobInfo.property.some(p => p._class?.includes('ParametersDefinitionProperty'))) {
      // Build with parameters
      buildNumber = await jenkinsInstance.job.build({
        name: jobName,
        parameters: parameters
      });
    } else {
      // Build without parameters
      buildNumber = await jenkinsInstance.job.build(jobName);
    }
    
    res.json({ 
      message: `Build triggered for job ${jobName}`,
      buildNumber
    });
  } catch (error) {
    console.error(`Error triggering build for ${req.params.name}:`, error);
    res.status(500).json({ message: 'Failed to trigger build', error: error.message });
  }
});

module.exports = router;
