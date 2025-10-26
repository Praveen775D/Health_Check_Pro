const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET: Fetch questions for a specific category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this category' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

module.exports = router;
