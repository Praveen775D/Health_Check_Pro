const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update user profile
router.put("/update", verifyToken, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Upload profile image
router.post("/upload-avatar", verifyToken, upload.single("avatar"), async (req, res) => {
  try {
    const base64Image = req.file.buffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { profilePic: imageUrl }, { new: true });
    res.json({ url: updatedUser.profilePic });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed" });
  }
});

module.exports = router;
