const express = require('express');
const Message = require('../model/Message'); // Adjust the path based on your project structure
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the message in one operation
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found or already viewed.' });
    }

    res.status(200).send(`
      <h1>Private Message</h1>
      <p>${message.message}</p>
    `);
  } catch (error) {
    console.error('Error retrieving message:', error);
    res.status(500).send('An error occurred while retrieving the message.');
  }
});

module.exports = router;

