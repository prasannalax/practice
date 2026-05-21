const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,

  doctorId: String,   // ✅ IMPORTANT
  doctorName: String,

  date: String,
  time: String,

  problem: String,
  symptoms: String,

  status: {
    type: String,
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);