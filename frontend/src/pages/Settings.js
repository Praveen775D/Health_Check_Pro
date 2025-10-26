import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("english"); // State for language
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const buttonStyle = "py-2 px-4 mb-2 rounded-lg shadow-md font-medium transition duration-300 w-full text-white";

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  const toggleMobileMode = () => {
    setIsMobileMode(!isMobileMode);
    document.body.classList.toggle("mobile", !isMobileMode);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.body.style.fontSize = size === "large" ? "18px" : "16px"; // Adjust font size
  };

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing session or tokens)
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    document.body.setAttribute('lang', e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/settings-bg.jpg')` }}>
      {/* Mobile Header */}
      <div className="md:hidden bg-black bg-opacity-70 p-4 flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">Settings</h2>
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-64 bg-black bg-opacity-80 text-white p-4 z-10"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

            <Link to="/profile">
              <button className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}>Profile</button>
            </Link>

            <Link to="/home">
              <button className={`${buttonStyle} bg-green-600 hover:bg-green-700`}>Home</button>
            </Link>

            <Link to="/leaderboard">
              <button className={`${buttonStyle} bg-purple-600 hover:bg-purple-700`}>Leaderboard</button>
            </Link>

            <Link to="/appointments">
              <button className={`${buttonStyle} bg-pink-600 hover:bg-pink-700`}>Appointments</button>
            </Link>

            {/* Logout Button */}
            <button
              className={`${buttonStyle} bg-red-600 hover:bg-red-700 mt-4`}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto text-white bg-black bg-opacity-60">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Settings</h2>

          {/* Dark Mode Toggle */}
          <div className="mb-4">
            <label htmlFor="darkMode" className="block text-lg mb-2">Dark Mode</label>
            <input
              type="checkbox"
              id="darkMode"
              className="w-5 h-5"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>

          {/* Mobile/Desktop Mode Toggle */}
          <div className="mb-4">
            <label htmlFor="mobileMode" className="block text-lg mb-2">Mobile Mode</label>
            <input
              type="checkbox"
              id="mobileMode"
              className="w-5 h-5"
              checked={isMobileMode}
              onChange={toggleMobileMode}
            />
          </div>

          {/* Font Size Option */}
          <div className="mb-4">
            <label htmlFor="fontSize" className="block text-lg mb-2">Font Size</label>
            <select
              id="fontSize"
              className="w-full p-2 rounded-lg text-black"
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
            >
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Language Selection */}
          <div className="mb-4">
            <label htmlFor="language" className="block text-lg mb-2">Language</label>
            <select
              id="language"
              className="w-full p-2 rounded-lg text-black"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="bengali">Bengali</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>
              <option value="gujarati">Gujarati</option>
              <option value="marathi">Marathi</option>
            </select>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center items-center">
            <button
              className="py-2 px-4 bg-red-600 text-white rounded-lg shadow-md w-full hover:bg-red-700 transition duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
