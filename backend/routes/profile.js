const express = require('express');
const router = express.Router();
const User = require('../models/User');

// PUT: Update user profile
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, age, weight, bloodGroup, gender, donate, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age, weight, bloodGroup, gender, donate, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// GET: Retrieve user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error retrieving user profile:', error);
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
});

module.exports = router;
