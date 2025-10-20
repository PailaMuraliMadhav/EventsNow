import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f3f5] text-[#1a2340] px-4">
      <div className="bg-[#ffffff] border border-[#d6d8de] rounded-2xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Brand */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#e9ebef] w-1/2 p-10 border-r border-[#d6d8de]">
          <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white border-2 border-[#1a2340] shadow-sm">
            <img
              src="/vite.png" // replace with your logo path
              alt="EventsNow Logo"
              className="w-10 h-10"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold">
            <span className="text-[#1a2340]">Events</span>
            <span className="text-[#c7a008]">Now</span>
          </h1>
          <p className="text-gray-600 mt-2 text-center text-sm">
            Login to explore and manage your campus events.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1a2340]">
            Welcome Back 👋
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-[#d6d8de] bg-[#f8f9fb] text-[#1a2340] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a008]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border border-[#d6d8de] bg-[#f8f9fb] text-[#1a2340] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a008] pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a2340]/70 hover:text-[#c7a008] transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.97 9.97 0 0021 12c0-5-4-9-9-9S3 7 3 12c0 1.61.38 3.13 1.06 4.47"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.97 9.97 0 0021 12c0-5-4-9-9-9S3 7 3 12c0 1.61.38 3.13 1.06 4.47"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a2340] text-white py-3 rounded-full font-semibold hover:bg-[#2b3560] transition duration-300"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#c7a008] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
