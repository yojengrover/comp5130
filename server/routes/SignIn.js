const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Ensure your User model is correctly referenced
const router = express.Router();

// Signin Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log("email" + email + ", " + password);
  try {
    // Check if the user exists
    const user = await User.findOne({email});
    console.log(user.email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    // const payload = { userId: user._id };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace with environment variable for production

    // Respond with token and user details
    res.status(200).json({ user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
