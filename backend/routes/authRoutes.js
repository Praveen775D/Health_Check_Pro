const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const passport = require("passport");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Nodemailer Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * ✅ Google Signup & Login
 */
router.post("/google-signup", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Google Token is required" });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId, profilePic: picture });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ message: "Google Signup Successful", token: jwtToken });
  } catch (error) {
    console.error("Google Signup Error:", error);
    return res.status(500).json({ error: "Google Sign-Up Failed" });
  }
});
/**
 * ✅ Email & Password Signup
 */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

/**
 * ✅ Login with Email & Password
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!user.password) {
      return res.status(400).json({ error: "Please use Google Sign-In to login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

/**
 * ✅ Forgot Password - Send OTP
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found!" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await Otp.create({ email, otp, expiresAt });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    });

    console.log(`OTP Sent to ${email}: ${otp}`);
    return res.json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("OTP Sending Error:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

/**
 * ✅ Verify OTP
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (Date.now() > otpRecord.expiresAt) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ error: "OTP expired!" });
    }

    return res.json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ error: "OTP verification failed" });
  }
});

/**
 * ✅ Reset Password using OTP
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (Date.now() > otpRecord.expiresAt) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ error: "OTP expired!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    await Otp.deleteOne({ email });
    return res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ error: "Failed to reset password" });
  }
});

/**
 * ✅ Logout
 */
router.post("/logout", (req, res) => {
  try {
    res.json({ message: "User logged out successfully!" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: "Logout failed" });
  }
});

module.exports = router;
