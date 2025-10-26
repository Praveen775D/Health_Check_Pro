// controllers/healthAssessmentController.js
const HealthQuestion = require("../models/HealthAssessment");
const HealthScore = require("../models/HealthScore");
const User = require("../models/User");

// 1. Add questions (admin only)
exports.addQuestions = async (req, res) => {
  try {
    const questions = req.body; // Array of question objects
    const saved = await HealthQuestion.insertMany(questions);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await HealthQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Submit answers and calculate score
exports.submitAssessment = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    let total = 0;

    const answerRecords = await Promise.all(
      answers.map(async (ans) => {
        const question = await HealthQuestion.findById(ans.questionId);
        const selected = question.options.find((opt) => opt.text === ans.selectedOption);
        const score = selected ? selected.score : 0;
        total += score;
        return {
          questionId: question._id,
          selectedOption: ans.selectedOption,
          score,
          category: question.category,
        };
      })
    );

    const percentage = (total / (answers.length * 10)) * 100; // max 10 per question

    const healthScore = new HealthScore({
      userId,
      answers: answerRecords,
      totalScore: total,
      percentage,
    });

    const savedScore = await healthScore.save();
    res.status(200).json(savedScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get score history
exports.getScoreHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await HealthScore.find({ userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
