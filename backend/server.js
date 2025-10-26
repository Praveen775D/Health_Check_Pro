const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Google OAuth Setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Models
const User = require("./models/User");

// ✅ Route Imports
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questions");
const healthRoutes = require("./routes/healthAssessmentRoutes");

// ✅ Mount Routes
app.use("/api", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessment", healthRoutes);

// ✅ Google Login Route
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId: ticket.getUserId(),
        profilePic: picture,
      });
      await user.save();
    }

    const jwt = require("jsonwebtoken");
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error("❌ Google login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Logout Route
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully!" });
});

// ✅ Test Users Route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

// ✅ Start Server (ONLY ONCE!)
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
