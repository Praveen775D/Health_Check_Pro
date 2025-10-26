import React, { useState } from "react";

const ColorTest = () => {
  // Ishihara test plates and correct answers
  const testImages = [
    { src: "/ishihara1.jpg", correct: "9" },
    { src: "/ishihara2.jpg", correct: "12" },
    { src: "/ishihara3.jpg", correct: "8" },
    { src: "/ishihara4.jpg", correct: "5" }
  ];

  // State to store user inputs
  const [responses, setResponses] = useState(Array(testImages.length).fill(""));
  const [score, setScore] = useState(null);

  // Handle input change
  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  // Evaluate test results
  const evaluateResults = () => {
    let correctCount = 0;
    testImages.forEach((test, index) => {
      if (responses[index] === test.correct) correctCount++;
    });

    const calculatedScore = (correctCount / testImages.length) * 100;
    setScore(calculatedScore);
  };

  // Determine result message
  const getResultMessage = () => {
    if (score === null) return "";

    if (score >= 90) {
      return "✅ Excellent! You have perfect color vision.";
    } else if (score >= 60) {
      return "⚠️ You may have mild color vision deficiency. Be cautious in certain situations.";
    } else {
      return "❌ You may have strong color blindness. Please consult an eye doctor.";
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 text-center">🎨 Color Blindness Test</h1>
        <p className="mt-4 text-lg text-center">Test your ability to distinguish colors by entering the number you see.</p>

        {/* Instructions */}
        <div className="mt-6 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">📌 Instructions:</h2>
          <ul className="mt-2 text-gray-700 dark:text-gray-300 text-sm list-disc pl-6">
            <li>Look at each image and enter the number you see in the box below.</li>
            <li>If you cannot see a number, leave it blank or write "None".</li>
            <li>Click **Submit** to check your results.</li>
          </ul>
        </div>

        {/* Test Images with User Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {testImages.map((test, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
              <img src={test.src} alt={`Color Test ${index + 1}`} className="w-40 h-40 rounded-lg shadow-md" />
              <input
                type="text"
                placeholder="Enter number"
                className="mt-3 px-4 py-2 w-32 border border-gray-400 dark:border-gray-600 rounded-lg text-center text-black"
                value={responses[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={evaluateResults}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>

        {/* Result Display */}
        {score !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">Your Score: {score.toFixed(2)}%</h2>
            <p className="mt-2 text-lg">{getResultMessage()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorTest;
