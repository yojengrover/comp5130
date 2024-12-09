const express = require('express');
const TempUser = require('../model/TempUser'); // Import the TempUser model
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user in the TempUser collection
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({ msg: 'Temporary user not found. Please try again.' });
    }

    // Check if the OTP matches
    if (tempUser.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP. Please try again.' });
    }

    // OTP is correct; delete the temporary user
    await TempUser.deleteOne({ email });

    res.status(200).json({ msg: 'OTP verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

module.exports = router;
