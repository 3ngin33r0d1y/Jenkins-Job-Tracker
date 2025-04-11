const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for JWT (in production, this would be in environment variables)
const JWT_SECRET = 'jenkins-tracker-secret-key';

// In-memory user storage (would be replaced with database in production)
let users = [];

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Check if user already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      jenkinsUrl: null,
      jenkinsToken: null
    };
    
    users.push(newUser);
    
    // Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Find user
    const user = users.find(user => user.username === username);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        jenkinsUrl: user.jenkinsUrl
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
});

// Set Jenkins token
router.post('/jenkins-token', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const userIndex = users.findIndex(user => user.id === decoded.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { jenkinsUrl, jenkinsToken } = req.body;
    
    if (!jenkinsUrl || !jenkinsToken) {
      return res.status(400).json({ message: 'Jenkins URL and token are required' });
    }
    
    // Update user
    users[userIndex].jenkinsUrl = jenkinsUrl;
    users[userIndex].jenkinsToken = jenkinsToken;
    
    res.json({
      message: 'Jenkins token set successfully',
      user: {
        id: users[userIndex].id,
        username: users[userIndex].username,
        jenkinsUrl: users[userIndex].jenkinsUrl
      }
    });
  } catch (error) {
    console.error('Error setting Jenkins token:', error);
    res.status(500).json({ message: 'Failed to set Jenkins token', error: error.message });
  }
});

module.exports = router;
