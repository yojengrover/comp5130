const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const Message = require('../model/Message'); // Import the Message model
const router = express.Router();

// Route to save a message and send a custom email
router.post('/', async (req, res) => {
  const { sender, receiver, messageContent, timestamp } = req.body;

  // Validate required fields
  if (!sender || !receiver || !messageContent || !timestamp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new message in the database
    const newMessage = new Message({
      sender,
      receiver,
      message: messageContent,
      timestamp,
    });

    // Save to database
    const savedMessage = await newMessage.save();

    // Generate a custom link (e.g., `http://yourdomain.com/message/<id>`)
    const messageLink = `http://yourdomain.com/message/${savedMessage._id}`;

    // Configure the Nodemailer transporter
    
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'isaac.botsford@ethereal.email',
        pass: 'JWJgu2EeRU7uayUytC'
    }
});

    // Email options
    const mailOptions = {
      from: `"${sender}" <your-email@gmail.com>`, // Sender name and email
      to: receiver, // Receiver email
      subject: 'You have a new private message',
      html: `
        <h1>You have a new message!</h1>
        <p>${sender} has sent you a private message.</p>
        <p>Click the link below to view your message. This link can only be used once:</p>
        <a href="${messageLink}" target="_blank">${messageLink}</a>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Message saved and email sent successfully',
      data: savedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message or send email' });
  }
});

module.exports = router;
