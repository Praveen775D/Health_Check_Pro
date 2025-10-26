import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        { name, email, phone, password },
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/google-login",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Google Signup Error:", error.response?.data);
      alert("Google Signup Failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    alert("Google Signup failed. Try again!");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-red-900 to-blue-700 p-4 overflow-y-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl h-auto md:h-[600px] relative">
        
        {/* Logo + Title at Top Left */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
          <img src="/Health_Check_Pro.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
          <span className="text-white text-base md:text-lg font-bold">Health Check Pro</span>
        </div>

        {/* Left Side with Sup.jpg */}
        <div className="hidden md:flex items-center justify-center relative bg-blue-900">
          <img
            src="/Sup.jpg"
            alt="Signup Background"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="relative z-10 text-center text-white bg-black bg-opacity-50 p-6 rounded-lg w-4/5">
            <h1 className="text-3xl font-bold">Join Health Check Pro</h1>
            <p className="mt-2 text-base">Create your account and start your wellness journey.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center w-full p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Sign Up</h2>

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>

            {/* Google Sign-Up */}
            <div className="mt-4 text-center">
              <p className="text-black">Or</p>
              <div className="flex justify-center mt-2">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
              </div>
            </div>

            {/* Login link */}
            <p className="mt-4 text-center text-black">
              Already have an account?
              <Link to="/login" className="text-blue-500 font-semibold"> Log In</Link>
            </p>

            {/* Back option aligned to bottom right */}
            <div className="mt-4 mb-4flex justify-end">
              <Link to="/" className="text-blue-600 hover:underline">
                ← Back
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
