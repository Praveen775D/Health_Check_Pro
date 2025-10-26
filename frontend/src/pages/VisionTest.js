import React, { useState, useEffect, useCallback } from "react";

const VisionTest = () => {
  const snellenImage = "snellen_chart.jpg";
  const instructionImage = "vis.jpg";
  const totalRows = 10; // Total rows in the Snellen chart
  
  const [currentStep, setCurrentStep] = useState("instructions");
  const [currentRow, setCurrentRow] = useState(0);
  const [userResponses, setUserResponses] = useState(Array(totalRows).fill(""));
  const [finalScore, setFinalScore] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mode, setMode] = useState("text"); // 'text' or 'voice'
  const [timer, setTimer] = useState(10);
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    if (recording && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (recording && timer === 0) {
      handleNext();
    }
  }, [recording, timer]);

  const handleNext = useCallback(() => {
    if (currentRow < totalRows - 1) {
      setCurrentRow(currentRow + 1);
      setTimer(10);
    } else {
      setCurrentStep("results");
      calculateScore();
    }
  }, [currentRow]);

  const handleStartTest = () => {
    setCurrentStep("test");
  };

  const handleChange = (e) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentRow] = e.target.value;
    setUserResponses(updatedResponses);
  };

  const startRecording = () => {
    setRecording(true);
    setSpeechText("🎤 Listening...");
    
    setTimeout(() => {
      const simulatedSpeech = "ABCDEF"; // Simulated speech recognition result
      setSpeechText(simulatedSpeech);
      const updatedResponses = [...userResponses];
      updatedResponses[currentRow] = simulatedSpeech;
      setUserResponses(updatedResponses);
      setRecording(false);
      handleNext();
    }, 5000);
  };

  const calculateScore = () => {
    let correctCount = userResponses.filter(response => response.length > 0).length;
    let score = Math.round((correctCount / totalRows) * 100);
    setFinalScore(score);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 pt-20">
      {currentStep === "instructions" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">📜 Instructions</h1>
          <p className="text-lg">📏 Stand 6 feet away from the screen.</p>
          <p className="text-lg">🖐️ Cover One Eye and read the letters.</p>
          <p className="text-lg">🎤 Speak or Type the letters row-by-row.</p>
          <p className="text-lg">✅ Click Start to begin the test.</p>
          <img src={instructionImage} alt="Instructions" className="my-4 w-64" />
          <button onClick={handleStartTest} className="mt-4 bg-blue-500 px-6 py-2 rounded">🚀 Start Test</button>
        </div>
      )}

      {currentStep === "test" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Vision Clarity Test</h1>
          <img src={snellenImage} alt="Snellen Chart" className="w-96 h-auto mb-4" />
          <p className="text-lg font-bold">Row {currentRow + 1}</p>
          
          <div className="flex gap-4 mb-4">
            <button onClick={() => setMode("text")} className={`px-4 py-2 rounded ${mode === "text" ? "bg-blue-500" : "bg-gray-700"}`}>📝 Text Mode</button>
            <button onClick={() => setMode("voice")} className={`px-4 py-2 rounded ${mode === "voice" ? "bg-blue-500" : "bg-gray-700"}`}>🎤 Voice Mode</button>
          </div>

          {mode === "text" && (
            <input type="text" className="p-2 text-black rounded w-64 text-center" value={userResponses[currentRow]} onChange={handleChange} placeholder="Type the letters..." />
          )}

          {mode === "voice" && (
            <div>
              <button onClick={startRecording} className={`mt-4 px-6 py-3 rounded ${recording ? "bg-red-600" : "bg-green-500"}`} disabled={recording}>{recording ? "🎙️ Recording..." : "🎤 Start Speaking"}</button>
              <p className="text-lg mt-2">{speechText}</p>
              <p className="text-sm text-gray-400">Time left: {timer} sec</p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button onClick={handleNext} className="bg-blue-500 px-4 py-2 rounded">Next</button>
            <button onClick={() => setCurrentRow(0)} className="bg-yellow-500 px-4 py-2 rounded">🔄 Repeat</button>
          </div>
        </div>
      )}

      {currentStep === "results" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">✅ Test Completed</h1>
          <p className="text-2xl font-bold">Your Score: {finalScore}%</p>
          {finalScore >= 90 ? <p className="text-green-400">Excellent Vision! ✅</p> : finalScore >= 60 ? <p className="text-yellow-400">Good, but consider an eye check-up! 👓</p> : <p className="text-red-500">Poor vision! ⚠️ Visit an eye specialist!</p>}
          <button onClick={() => { setCurrentStep("instructions"); setUserResponses(Array(totalRows).fill("")); setCurrentRow(0); setFinalScore(null); }} className="mt-4 bg-green-500 px-6 py-2 rounded">🔄 Retake Test</button>
        </div>
      )}
    </div>
  );
};

export default VisionTest;