// models/HealthScore.js
const mongoose = require("mongoose");

const healthScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "HealthQuestion" },
      selectedOption: { type: String },
      score: { type: Number },
      category: { type: String },
    },
  ],
  totalScore: { type: Number },
  percentage: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthScore", healthScoreSchema);
