const express = require('express');
const Message = require('../model/Message'); // Import the Message model
const router = express.Router();

// Route to save a message
router.post('/', async (req, res) => {
  const { sender, receiver, messageContent, timestamp } = req.body;

  // Validate required fields
  if (!sender || !receiver || !messageContent || !timestamp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new message
    const newMessage = new Message({
      sender,
      receiver,
      message: messageContent,
      timestamp//Save the timestamp
    });

    // Save to database
    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully', data: savedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Route to retrieve and delete a message for one-time display
router.get('/retrieve/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the message by ID
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Delete the message after retrieval
    await Message.findByIdAndDelete(id);

    res.status(200).json({ message: 'Message retrieved and deleted', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve message' });
  }
});

module.exports = router;
