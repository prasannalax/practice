const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  appointmentId: String,
  sender: String, // doctor or patient name
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chat", chatSchema);