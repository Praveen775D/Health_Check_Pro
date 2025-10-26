const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  userName: String,
  age: Number,
  gender: String,
  mobile: String,
  email: String,
  slot: String, // Date & Time
});

module.exports = mongoose.model("Appointment", appointmentSchema);
