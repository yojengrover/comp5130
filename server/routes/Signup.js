
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Assuming your model is in the models folder
const router = express.Router();

// Signup Route
router.post('/', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await user.save();
     res.status(201).json({ msg:"signup successfull" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
