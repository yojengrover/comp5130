const express = require('express');
const authMiddleware = require('../middleware/auth'); // Adjust the path as needed
const router = express.Router();

router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;
