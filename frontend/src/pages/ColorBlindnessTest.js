import React, { useState } from "react";

const ColorBlindnessTest = () => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Ishihara Test Image & Correct Answer
  const correctAnswer = "74"; 

  const checkAnswer = () => {
    if (answer === correctAnswer) {
      setMessage("✅ Correct! You have normal color vision.");
    } else {
      setMessage("❌ Incorrect! You might have color blindness.");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">🎨 Color Blindness Test</h1>
        <p className="mt-2 text-lg text-center">Identify the number in the Ishihara test image.</p>

        {/* Test Image */}
        <div className="mt-6">
          <img 
            src="/ishihara.jpg" 
            alt="Color Blindness Test" 
            className="w-64 rounded-lg shadow-lg"
          />
        </div>

        {/* User Input */}
        <div className="mt-4 flex flex-col items-center">
          <label className="text-lg font-semibold">Enter the number you see:</label>
          <input 
            type="text" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            className="mt-2 p-2 border rounded-lg text-black"
            placeholder="Enter number"
          />
          <button 
            onClick={checkAnswer} 
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
          >
            Check Answer
          </button>
        </div>

        {/* Result Message */}
        {message && (
          <div className="mt-4 text-lg font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ColorBlindnessTest;
