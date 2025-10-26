const mongoose = require('mongoose');

const userAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submittedAt: { type: Date, default: Date.now },
  scores: {
    physical: Number,
    nutrition: Number,
    mental: Number,
    lifestyle: Number,
    biomarkers: Number
  },
  totalScore: Number,
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: String,
      correctAnswer: String,
      score: Number,
      category: String
    }
  ]
});

module.exports = mongoose.model('UserAssessment', userAssessmentSchema);
