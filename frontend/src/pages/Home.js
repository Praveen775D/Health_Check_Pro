import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className="h-screen overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/HHome.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Navbar */}
      <header className="relative z-20 w-full flex items-center justify-between px-4 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/Health_Check_Pro.png"
            alt="Logo"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
          />
          <h1 className="text-lg md:text-2xl font-bold text-yellow-400">
            Health Check Pro
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["dashboard", "about", "services", "ContactUs", "profile"].map((item) => (
            <button
              key={item}
              onClick={() => navigate(`/${item}`)}
              className="hover:text-yellow-300 font-medium text-sm md:text-base"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-30">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-full h-screen bg-black z-20 flex flex-col items-center justify-center space-y-6 md:hidden"
        >
          {["dashboard", "about", "services", "ContactUs", "profile"].map((item) => (
            <button
              key={item}
              onClick={() => {
                navigate(`/${item}`);
                closeMenu();
              }}
              className="text-white text-xl font-semibold hover:text-yellow-300"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-20 px-4 md:px-12 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-extrabold text-yellow-300 text-center"
        >
          Your Personalized Health Tracker
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-sm md:text-lg text-center text-gray-200 max-w-3xl mx-auto"
        >
          Monitor your health, track your progress, and get fit with AI-powered insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={() => navigate("/services")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition text-sm md:text-base shadow-lg transform hover:scale-105"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Features */}
        <section className="mt-16">
          <h3 className="text-xl md:text-3xl font-semibold text-center text-green-300 mb-10">
            Why Choose Health Check Pro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureBox title="✅ AI-Based Health Monitoring" desc="Track your health with smart insights." color="text-pink-400" />
            <FeatureBox title="📊 Detailed Reports" desc="View progress & recommendations." color="text-yellow-400" />
            <FeatureBox title="🏆 Gamified Leaderboard" desc="Compete with friends & level up!" color="text-red-400" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 text-center">
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-2xl font-bold"
          >
            Ready to Challenge Yourself?
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <button
              onClick={() => navigate("./components/AssessmentForm")}
              className="mt-5 bg-black text-yellow-400 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition text-sm md:text-base shadow-lg transform hover:scale-105"
            >
              Take an Assessment
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

// Reusable Feature Component
const FeatureBox = ({ title, desc, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="p-4 md:p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center backdrop-blur-md"
  >
    <h4 className={`text-base md:text-lg font-bold ${color}`}>{title}</h4>
    <p className="mt-2 text-sm md:text-base text-gray-300">{desc}</p>
  </motion.div>
);

export default Home;
