const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ["Medication", "Exercise", "Checkup"], required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;
