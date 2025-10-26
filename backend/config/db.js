const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/healthCheckPro"; // Update if needed

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("✅ MongoDB Connected");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
    }
  } else {
    console.log("⚠️ MongoDB already connected, skipping connection.");
  }
};

module.exports = connectDB;
