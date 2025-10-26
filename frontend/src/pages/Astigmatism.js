import React, { useState, useEffect } from "react";

const AstigmatismTest = () => {
  const [step, setStep] = useState(1);
  const [response, setResponse] = useState("");
  const [result, setResult] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("astigmatismHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setResponse(speechText);
      analyzeResponse(speechText);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const analyzeResponse = (text) => {
    const lowerText = text.toLowerCase();
    let newResult = "";
    if (lowerText.includes("darker") || lowerText.includes("blurrier")) {
      newResult = "⚠️ Possible astigmatism detected. Consider consulting an eye specialist.";
    } else {
      newResult = "✅ Your vision seems normal. If you experience discomfort, consult an optometrist.";
    }
    setResult(newResult);
    updateHistory(text, newResult);
    speakResult(newResult);
    setProgress(100);
  };

  const updateHistory = (userInput, testResult) => {
    const newEntry = { input: userInput, result: testResult, timestamp: new Date().toLocaleString() };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("astigmatismHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("astigmatismHistory");
  };

  const speakResult = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center justify-center p-6 transition-all`}>
      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded-md shadow-md hover:bg-gray-800 transition">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      

      {step === 1 ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Introduction to Astigmatism Test</h1>
          <img src="/in_agm.jpg" alt="Introduction" className="w-3/4 rounded-lg shadow-lg my-4" />
          <button onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-3 text-lg rounded-md mt-4">Start Test</button>
        </div>
      ) : (
        <div className="relative flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">Astigmatism Test</h1>
          <p className="mb-4 text-lg text-gray-300">Look at the chart below. Do some lines appear darker or blurrier?</p>
          <img src="/Ast.png" alt="Astigmatism Test Chart" className="w-80 mb-6 shadow-lg rounded-lg" />
          <input type="text" className="p-3 text-lg w-80 text-black rounded-md mb-3" placeholder="Type your response..." value={response} onChange={(e) => {
              setResponse(e.target.value);
              analyzeResponse(e.target.value);
            }}
          />
          <button onClick={startListening} className="bg-blue-500 px-5 py-3 text-lg rounded-md text-white hover:bg-blue-600 transition">
            {isListening ? "🎙️ Listening..." : "Use Voice Input 🎙"}
          </button>
          {result && (
            <div className="mt-4 bg-gray-800 p-4 rounded-md text-center text-xl text-yellow-400">
              <p className="font-semibold">{result}</p>
            </div>
          )}
          <div className="mt-4 w-80 bg-gray-300 h-4 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all" style={{ width: `${progress}%` }}></div>
          </div>

          {history.length > 0 && (
            <div className="mt-6 w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-red-400 mb-3">📜 Test History</h2>
              {history.map((entry, index) => (
                <div key={index} className="mb-3 p-3 border-b border-gray-600 text-lg text-white">
                  <p><strong>Input:</strong> {entry.input}</p>
                  <p><strong>Result:</strong> {entry.result}</p>
                  <p className="text-sm text-gray-400">{entry.timestamp}</p>
                </div>
              ))}
              <button onClick={clearHistory} className="bg-red-600 text-white px-6 py-3 rounded-md text-lg mt-4">Clear History</button>
            </div>
          )}

          <div className="mt-6 text-lg">
            <label className="mr-2">🌍 Select Language:</label>
            <select className="p-3 rounded-md bg-gray-700 text-white" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstigmatismTest;