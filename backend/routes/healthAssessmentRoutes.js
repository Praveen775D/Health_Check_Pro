// routes/healthAssessmentRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/healthAssessmentController");

// Admin adds 25 questions
router.post("/questions", controller.addQuestions);

// Get all questions
router.get("/questions", controller.getQuestions);

// User submits assessment
router.post("/submit", controller.submitAssessment);

// Get user score history
router.get("/history/:userId", controller.getScoreHistory);

module.exports = router;
