const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token'); // Token sent in the headers
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};