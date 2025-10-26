const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  category: String
});

module.exports = mongoose.model("Question", QuestionSchema);
