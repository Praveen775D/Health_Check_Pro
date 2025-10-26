const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePic,
  deleteProfilePic,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// ✅ GET user profile
router.get('/profile', authMiddleware, getUserProfile);

// ✅ PUT update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// ✅ POST upload profile pic
router.post('/upload', authMiddleware, upload.single('profilePic'), uploadProfilePic);

// ✅ DELETE profile picture
router.delete('/profile-pic', authMiddleware, deleteProfilePic);

module.exports = router;
