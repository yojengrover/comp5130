const express = require('express');
const nodemailer = require('nodemailer');
const Message = require('../model/Message'); // Import the Message model
const router = express.Router();

router.post('/', async (req, res) => {
  const { sender, receiver, messageContent, timestamp } = req.body;

  if (!sender || !receiver || !messageContent || !timestamp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save message to the database
    const newMessage = new Message({
      sender,
      receiver,
      message: messageContent,
      timestamp,
    });

    const savedMessage = await newMessage.save();

    const messageLink = `http://localhost:8000/message/${savedMessage._id}`;
    console.log('Generated message link:', messageLink);
  
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'isaac.botsford@ethereal.email',
        pass: 'JWJgu2EeRU7uayUytC',
      },
    });
  
    // Verify SMTP connection
    await transporter.verify();
    console.log('SMTP server is ready to send emails.');
  
    // Email options
    const mailOptions = {
      from: `"${sender}" <no-reply@yourdomain.com>`,
      to: receiver,
      subject: 'You have a new private message',
      html: `
        <h1>You have a new message!</h1>
        <p>${sender} has sent you a private message.</p>
        <p>Click the link below to view your message. This link can only be used once:</p>
        <a href="${messageLink}" target="_blank">${messageLink}</a>
      `,
    };
  
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  
    res.status(201).json({
      message: 'Message saved and email sent successfully',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to save message or send email' });
  }
})

module.exports = router;
