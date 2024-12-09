const mongoose = require('mongoose');

// Schema for temporary users
const tempUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true }, // Store the OTP for verification
});

// Model
const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
