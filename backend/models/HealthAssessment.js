// models/Assessment.js
const mongoose = require("mongoose");

const categoryScoreSchema = new mongoose.Schema({
  category: String,
  score: Number
});

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  categoryScores: [categoryScoreSchema], // Score per category
  overallScore: Number
});

module.exports = mongoose.model("Assessment", assessmentSchema);
