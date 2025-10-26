const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  hospital: String,
  profilePic: String,
  availability: [String], // List of available slots
});

module.exports = mongoose.model("Doctor", doctorSchema);
