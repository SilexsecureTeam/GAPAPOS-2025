import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Added icons for show/hide
import backgroundImage from "../assets/background.png";
import logo from "../assets/dashboardlogo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Logo at Top-Right */}
      <div className="flex justify-center items-center md:absolute top-4 left-4 p-4 sm:p-6">
        <img
          src={logo}
          alt="Gapa Auto POS Logo"
          className="w-40 h-40 sm:w-20 sm:h-20 md:h-30 md:w-30 object-contain"
        />
      </div>

      {/* Sign-In Form */}
      <div className="flex items-center justify-start md:justify-center flex-1">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#1E1E1E] mb-2">
              Welcome Back
            </h1>
            <p className="text-sm  text-gray-500">
              Sign in to access your Gapa Auto POS dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Email address /Username"
                className="mt-1 w-full px-3 py-2 bg-[#D9D9D9] border border-[#D3D3D3] focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 bg-[#D9D9D9] border border-[#D3D3D3] focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#56418C] text-white py-2 hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
