const jwt = require('jsonwebtoken');

// Secret key for JWT (in production, this would be in environment variables)
const JWT_SECRET = 'jenkins-tracker-secret-key';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request
    req.user = decoded;
    
    // For this demo, we'll add Jenkins credentials to the request
    // In a real app, these would be retrieved from a database
    const user = global.users?.find(u => u.id === decoded.id);
    if (user) {
      req.user.jenkinsUrl = user.jenkinsUrl;
      req.user.jenkinsToken = user.jenkinsToken;
    }
    
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
};
