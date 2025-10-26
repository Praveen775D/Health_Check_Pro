import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userToken") !== null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/Health_Check_Pro.png"
            alt="Health Check Pro Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-xl md:text-2xl font-bold">Health Check Pro</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/home")} className="hover:text-yellow-400">Home</button>
              <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
              <Link to="/services" className="hover:text-yellow-400">Services</Link>
              <Link to="/appointment" className="hover:text-yellow-400">Book Appointment</Link>
              <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/")} className="hover:text-yellow-400">Home</button>
              <Link to="/about" className="hover:text-yellow-400">About</Link>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
              <Link to="/signup" className="hover:text-yellow-400">Register</Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              className="hidden md:block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 absolute top-full left-0 w-full flex flex-col text-center py-4 space-y-4">
          {isAuthenticated ? (
            <>
              <button onClick={() => { navigate("/home"); setIsOpen(false); }} className="hover:text-yellow-400">Home</button>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Dashboard</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Services</Link>
              <Link to="/appointment" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Book Appointment</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Profile</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate("/"); setIsOpen(false); }} className="hover:text-yellow-400">Home</button>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">About</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Register</Link>
            </>
          )}

          {/* Dark Mode Toggle (Mobile) */}
          {toggleDarkMode && (
            <button
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
