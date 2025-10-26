import React from "react";
import "./DarkModeButton.css"; 

const DarkModeButton = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle fixed top-16 right-6 p-2 bg-gray-800 text-white rounded-lg">
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeButton;
