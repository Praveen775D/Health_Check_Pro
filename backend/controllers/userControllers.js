const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// ✅ GET /api/user/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ PUT /api/user/profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, gender, bloodGroup, donation, age, weight, height } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        gender,
        bloodGroup,
        donation,
        age,
        weight,
        height,
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error("Error in updateUserProfile:", err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// ✅ POST /api/user/upload
const uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete old profile pic if exists
    if (user.profilePic) {
      const oldPath = path.join(__dirname, '..', 'uploads', user.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    user.profilePic = req.file.filename;
    await user.save();

    res.json({ message: 'Profile picture updated successfully', profilePic: user.profilePic });
  } catch (err) {
    console.error("Error in uploadProfilePic:", err);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
};

// ✅ DELETE /api/user/profile-pic
const deleteProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.profilePic) {
      const filePath = path.join(__dirname, '..', 'uploads', user.profilePic);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    user.profilePic = "";
    await user.save();

    res.json({ message: 'Profile picture removed successfully' });
  } catch (err) {
    console.error("Error in deleteProfilePic:", err);
    res.status(500).json({ message: 'Failed to delete profile picture' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfilePic,
  deleteProfilePic,
};
