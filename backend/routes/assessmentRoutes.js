// routes/assessmentRoutes.js

const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');

// Submit Health Assessment
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;

    const scoreMap = {
      Physical: 0,
      Mental: 0,
      Nutrition: 0,
      Lifestyle: 0,
      Bio: 0
    };

    answers.forEach((ans) => {
      scoreMap[ans.category] += ans.points;
    });

    const overallScore = Object.values(scoreMap).reduce((a, b) => a + b, 0);

    const newAssessment = new Assessment({
      userId,
      answers,
      scores: {
        physical: scoreMap.Physical,
        mental: scoreMap.Mental,
        nutrition: scoreMap.Nutrition,
        lifestyle: scoreMap.Lifestyle,
        bio: scoreMap.Bio
      },
      overallScore
    });

    await newAssessment.save();

    res.status(201).json({ message: 'Assessment saved', assessment: newAssessment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
