import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Send OTP
  const sendOTP = async () => {
    if (!email) return setError("Please enter a valid email.");
    setError(""); setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage(data.message);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  // Step 2: Reset Password
  const verifyOTP = async () => {
    if (!otp || !newPassword) return setError("All fields are required.");
    setError(""); setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
        setMessage(data.message);
      } else {
        setError(data.message || "Invalid OTP or password.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-200 to-blue-200 p-4">
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 ease-in-out">

        {/* Left Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="text-center px-8 z-10 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-sm">Securely update your password using your email & OTP.</p>
          </div>
          <img
            src="/fg.png"
            alt="Forgot Password Illustration"
            className="absolute w-full h-full object-cover opacity-100"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white/80">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Forgot Password</h2>

          {error && <p className="text-red-600 text-sm text-center mb-2 animate-pulse">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center mb-2 animate-fade-in">{message}</p>}

          {step === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                onClick={sendOTP}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300"
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in-up">
              <label className="block text-gray-700 font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <label className="block text-gray-700 font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <button
                onClick={verifyOTP}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
              >
                Reset Password
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-in-up">
              <p className="text-green-600 font-medium">Password has been successfully reset!</p>
              <Link
                to="/login"
                className="mt-4 inline-block text-indigo-600 hover:underline"
              >
                Go to Login
              </Link>
            </div>
          )}

          <p className="mt-6 text-sm text-center text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-700 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;