import React from "react";
import { Link } from "react-router-dom";

const EyeTest = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-indigo-600 dark:bg-indigo-800 p-6 text-center text-white">
        <h1 className="text-3xl font-bold">👁️ Eye Test</h1>
        <p className="mt-2 text-lg">Take different vision tests and check your eye health.</p>
      </header>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Vision Clarity Test */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">👓 Vision Clarity Test</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Check how clearly you can see objects at different distances.
          </p>
          <Link to="/vision-test">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
              Start Test
            </button>
          </Link>
        </div>

        {/* Color Blindness Test */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">🎨 Color Blindness Test</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Identify different colors and check for color blindness.
          </p>
          <Link to="/color-test">
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
              Take Test
            </button>
          </Link>
        </div>

        {/* Astigmatism Test */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">🔳 Astigmatism Test</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Check if you have astigmatism with a simple test.
          </p>
          <Link to="/astigmatism-test">
            <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition">
              Check Now
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EyeTest;
