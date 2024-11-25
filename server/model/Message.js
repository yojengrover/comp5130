const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // Email of the sender
    receiver: { type: String, required: true }, // Email of the receiver
    message: { type: String, required: true }, // The actual message content
    timestamp: { type: Date, default: Date.now }, // Timestamp of the message
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;