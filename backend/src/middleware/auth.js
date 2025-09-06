const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Received token:', token ? token.substring(0, 10) + '...' : 'No token'); // Log first 10 chars
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token payload:', decoded); // Log full payload
    if (!decoded.id) {
      console.error('Token payload missing id');
      return res.status(401).json({ error: 'Invalid token payload' });
    }
    req.user = { id: decoded.id }; // Ensure req.user has id
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};