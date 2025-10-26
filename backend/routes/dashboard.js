const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const User = require('../models/User');

// GET: Fetch user's assessment data for the dashboard
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user profile data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the latest assessment results
    const latestAssessment = await Assessment.findOne({ userId })
      .sort({ date: -1 }) // Sort to get the most recent assessment
      .limit(1);

    if (!latestAssessment) {
      return res.status(404).json({ message: 'No assessment data found' });
    }

    // Combine user and assessment data
    const dashboardData = {
      user: user,
      latestAssessment: latestAssessment,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

module.exports = router;
