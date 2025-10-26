import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed. Please try again.");
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
      console.error("Google Login Error:", error.response?.data);
      alert("Google Login Failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    alert("Google login failed. Try again!");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-red-900 to-blue-700 p-4 overflow-y-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl h-auto md:h-[550px] relative">
        
        {/* Logo & Title */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
          <img src="/Health_Check_Pro.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
          <span className="text-yellow text-base md:text-lg font-bold">Health Check Pro</span>
        </div>

        {/* Left Side - Welcome Section (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-center relative bg-blue-900">
          <img
            src="/log1.png"
            alt="Welcome"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="relative z-10 text-center text-white bg-black bg-opacity-50 p-6 rounded-lg w-4/5">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="mt-2 text-base">Log in to continue your journey.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center w-full p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Log in</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="block text-gray-600 text-sm md:text-base">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-600 text-sm md:text-base">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300 text-sm md:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link to="/forgot-password" className="text-blue-500 text-xs md:text-sm mt-1 inline-block">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition text-sm md:text-base"
              >
                Log in
              </button>
            </form>

            {/* Google Sign-In */}
            <div className="mt-4 text-center">
              <p className="text-black text-sm md:text-base">Or</p>
              <div className="flex justify-center mt-2">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
              </div>
            </div>

            {/* Signup link */}
            <p className="mt-4 text-center text-black text-sm md:text-base">
              Don’t have an account?
              <Link to="/signup" className="text-blue-500 font-semibold"> Sign Up</Link>
            </p>

            {/* Back link */}
            <div className="mt-4 text-center">
              <Link to="/" className="text-blue-600 hover:underline text-sm md:text-base">
                ← Back
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
