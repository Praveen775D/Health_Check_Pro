const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new doctor (for testing)
router.post("/add", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json({ message: "Doctor added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding doctor" });
  }
});

module.exports = router;
