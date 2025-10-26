import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-white" : "light bg-white text-black"
      } min-h-screen transition-colors duration-500`}
    >
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
      <ThemeToggleSwitch isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Landing Section */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">

        {/* Background Video - shown only on sm+ screens */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback image - shown on mobile only */}
        <img
          src="/fallback.jpg"
          alt="Mobile Background"
          className="absolute inset-0 w-full h-full object-cover block sm:hidden"
        />

        {/* Overlay on top of both video & image */}
        <div className="absolute inset-0  opacity-60 z-0"></div>

        {/* Main content */}
        <div className="relative z-10 text-center px-6 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-400 mb-6">
            Welcome to <span className="text-white">Health Check Pro</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto mb-10">
            Your all-in-one health companion – track wellness, take quizzes,
            consult doctors, and get smart insights.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
            <Link to="/signup">
              <button className="text-sm sm:text-base px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition duration-300">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="text-sm sm:text-base px-6 py-3 border border-white text-white rounded-xl font-semibold hover:bg-white hover:text-red-600 transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
