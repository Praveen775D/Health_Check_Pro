const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodGroup: { type: String, enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"], required: true },
  interestedInDonate: { type: Boolean, required: true },
  weight: { type: Number, required: true }, // in kg
  age: { type: Number, required: true }, // in years
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
