const express = require('express');
const Message = require('../models/Message'); // Import the Message model
const router = express.Router();

// Route to save a message
router.post('/', async (req, res) => {
  const { sender, receiver, message } = req.body;

  if (!sender || !receiver || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully', data: savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
