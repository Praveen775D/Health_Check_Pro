const fs = require("fs");
const pdfParse = require("pdf-parse");
const Assignment = require("../models/AssignmentModel");

// Function to extract questions and store in MongoDB
const uploadPdf = async (req, res) => {
  try {
    // Get the uploaded file
    const pdfPath = req.file.path;

    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);

    // Extract text content
    const text = data.text;

    // Convert text into questions (Assuming questions are numbered)
    const questions = text.split("\n").filter((line) => line.match(/^\d+\./));

    // Save to MongoDB
    const assignment = new Assignment({
      title: req.body.title,
      questions,
    });

    await assignment.save();

    res.json({ message: "Assignment uploaded successfully!", assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadPdf };
