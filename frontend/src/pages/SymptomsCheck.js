import React, { useState } from "react";

const SymptomsCheck = () => {
  const [symptoms, setSymptoms] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!symptoms.trim()) return alert("Please enter symptoms!");

    setLoading(true);
    // Simulating AI response
    setTimeout(() => {
      setSuggestions([
        "Drink plenty of fluids",
        "Get enough rest",
        "Consult a doctor if symptoms persist",
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
        Symptoms Check
      </h1>
      <p className="text-gray-600 mb-4">
        Enter your symptoms to receive health recommendations.
      </p>
      
      <textarea
        className="w-full md:w-2/3 p-3 border border-gray-400 rounded-md"
        rows="4"
        placeholder="E.g., fever, headache, cough..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        onClick={handleCheck}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Check Symptoms"}
      </button>

      {/* Suggestions Output */}
      {suggestions && (
        <div className="mt-6 w-full md:w-2/3 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Suggestions:</h2>
          <ul className="list-disc list-inside text-gray-600">
            {suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymptomsCheck;
