const express = require('express');
const nodemailer = require('nodemailer');
const TempUser = require('../model/TempUser'); // Import the TempUser model
const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'isaac.botsford@ethereal.email',
    pass: 'JWJgu2EeRU7uayUytC',
  },
});

// Generate OTP Route
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save email and OTP in the TempUser collection
    let tempUser = await TempUser.findOne({ email });

    if (tempUser) {
      // Update OTP for existing temp user
      tempUser.otp = otp;
    } else {
      // Create new temp user
      tempUser = new TempUser({ email, otp });
    }

    await tempUser.save();

    // Send the OTP via email
    const mailOptions = {
      from: '"PrivNote" <no-reply@privnote.com>', // Sender address
      to: email, // Recipient's email
      subject: 'Your OTP for PrivNote', // Subject
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`, // Plain text body
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'OTP sent successfully to your email!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to generate or send OTP. Please try again.');
  }
});

module.exports = router;
