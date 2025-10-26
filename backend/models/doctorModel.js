const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  experience: String,
  phone: String,
  specialization: String,
  image: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
