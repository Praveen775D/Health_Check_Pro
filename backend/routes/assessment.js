const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

module.exports = router;
const UserAssessment = require('../models/UserAssessment');
const Question = require('../models/Question');

router.post('/submit', async (req, res) => {
  try {
    const { userId, responses } = req.body;
    const categories = ['physical', 'nutrition', 'mental', 'lifestyle', 'biomarkers'];
    let totalScore = 0;
    let scores = { physical: 0, nutrition: 0, mental: 0, lifestyle: 0, biomarkers: 0 };
    let answers = [];

    for (const category of categories) {
      const userAnswers = responses[category] || [];

      for (const answer of userAnswers) {
        const question = await Question.findById(answer.questionId);
        const isCorrect = question.correctAnswer === answer.selectedOption;
        const score = isCorrect ? 10 : 0;

        answers.push({
          questionId: answer.questionId,
          selectedOption: answer.selectedOption,
          correctAnswer: question.correctAnswer,
          score,
          category
        });

        scores[category] += score;
        totalScore += score;
      }
    }

    const result = await UserAssessment.create({
      userId,
      scores,
      totalScore,
      answers
    });

    res.status(200).json({ message: 'Assessment saved!', result });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting assessment' });
  }
});
// GET latest assessment for a user
router.get('/latest/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const latest = await UserAssessment.findOne({ userId }).sort({ submittedAt: -1 });
  
      if (!latest) return res.status(404).json({ message: 'No assessment found' });
  
      res.status(200).json(latest);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching latest assessment' });
    }
  });
  // GET all assessments of a user
router.get('/history/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const assessments = await UserAssessment.find({ userId }).sort({ submittedAt: -1 });
  
      res.status(200).json(assessments);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch assessment history' });
    }
  });
  // GET detailed view of a single assessment
router.get('/view/:assessmentId', async (req, res) => {
    try {
      const result = await UserAssessment.findById(req.params.assessmentId).populate('userId');
      if (!result) return res.status(404).json({ message: 'Assessment not found' });
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching scorecard' });
    }
  });

const UserAssessment = require("../models/UserAssessment");

// API to get user score history
router.get("/history", async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user is authenticated
    const assessments = await UserAssessment.find({ userId }).sort({ submittedAt: -1 });
    
    const scoreHistory = assessments.map((assessment) => ({
      date: assessment.submittedAt,
      totalScore: assessment.totalScore,
    }));
    
    res.json({ scoreHistory });
  } catch (err) {
    res.status(500).json({ error: "Error fetching score history" });
  }
});

module.exports = router;
