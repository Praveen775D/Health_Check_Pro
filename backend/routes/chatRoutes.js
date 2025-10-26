const express = require("express");
const Chat = require("../models/Chat");

const router = express.Router();

// Get chat history
router.get("/history", async (req, res) => {
  const chatHistory = await Chat.find();
  res.json(chatHistory);
});

// Save chat message
router.post("/save", async (req, res) => {
  const { userMessage, aiResponse } = req.body;
  const newChat = new Chat({ userMessage, aiResponse });
  await newChat.save();
  res.json({ message: "Chat saved!" });
});

// Delete a single message
router.delete("/delete/:id", async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.json({ message: "Message deleted!" });
});

// Clear entire chat history
router.delete("/clear", async (req, res) => {
  await Chat.deleteMany({});
  res.json({ message: "Chat history cleared!" });
});

module.exports = router;
