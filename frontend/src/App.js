import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Pages & Components
import ContactUs from './components/ContactUs';
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DoctorsList from "./pages/DoctorsList";
import BookAppointment from "./pages/BookAppointment";
import EyeTest from "./pages/EyeTest";
import VisionTest from "./pages/VisionTest";
import ColorTest from "./pages/ColorTest";
import AstigmatismTest from "./pages/Astigmatism";
import AppointmentPage from "./pages/AppointmentPage";
import About from "./pages/About";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import SafetyCheck from "./pages/SafetyCheck";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardPage from "./pages/DashboardPage";
import SymptomsCheck from "./pages/SymptomsCheck";
import AIChatbot from "./components/AIChatbot";
import ProtectedRoute from "./components/ProtectedRoute";


import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      const newSocket = new WebSocket("ws://localhost:5000");
      newSocket.onopen = () => {
        console.log("Connected to WebSocket server");
        newSocket.send(JSON.stringify({ type: "auth", user }));
      };
      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Message from server:", message);
      };
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      newSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };
      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className={`App ${theme}`}>
          <Routes>
            <Route path="/" element={<LandingPage toggleTheme={setTheme} currentTheme={theme} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/eye-test" element={<EyeTest />} />
            <Route path="/VisionTest" element={<VisionTest />} />
            <Route path="/color-test" element={<ColorTest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/astigmatism-test" element={<AstigmatismTest />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/symptoms-check" element={<ProtectedRoute><SymptomsCheck /></ProtectedRoute>} />
            <Route path="/safety-check" element={<ProtectedRoute><SafetyCheck /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><AIChatbot /></ProtectedRoute>} />
      
            <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;