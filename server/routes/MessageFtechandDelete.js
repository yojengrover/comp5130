const express = require('express');
const Message = require('../models/Message'); // Adjust the path based on your project structure
const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Find and delete the message in one operation
    const message = await Message.findOneAndDelete({ token });

    if (!message) {
      return res.status(404).json({ error: 'This message has already been viewed or does not exist.' });
    }

    res.status(200).json({ content: message.content });
  } catch (error) {
    console.error('Error retrieving message:', error);
    res.status(500).json({ error: 'Failed to retrieve message.' });
  }
});

module.exports = router;

