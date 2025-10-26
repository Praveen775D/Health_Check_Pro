import React from "react";

const ThemeToggleSwitch = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="absolute top-6 right-6 z-20">
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm font-medium text-white">Dark Mode</span>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600"></div>
          <div
            className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-5" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggleSwitch;

