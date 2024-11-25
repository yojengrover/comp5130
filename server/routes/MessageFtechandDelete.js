const express = require('express');
const Message = require('../models/Message'); // Import the Message model
const router = express.Router();

// Route to fetch and delete a message after it's fetched
router.post('/fetchAndDelete', async (req, res) => {
  const { sender, receiver } = req.body;

  if (!sender || !receiver) {
    return res.status(400).json({ error: 'Sender and receiver are required' });
  }

  try {
    // Find the message by sender and receiver
    const message = await Message.findOne({ sender, receiver });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Send the message as the response
    const messageData = {
      sender: message.sender,
      receiver: message.receiver,
      message: message.message,
      timestamp: message.timestamp,
    };

    // Delete the message after it is fetched
    await Message.deleteOne({ _id: message._id });

    // Send success response with the message data
    res.status(200).json({ message: 'Message fetched and deleted successfully', data: messageData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch or delete message' });
  }
});

module.exports = router;
