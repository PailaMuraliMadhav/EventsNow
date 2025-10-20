import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setOtpSent(false);
    try {
      await api.post("/users/signup", { name, email, password, role });
      setOtpSent(true);
      setSuccess("OTP sent to your email. Please verify to complete signup.");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/users/verify-signup-otp", { email, otp });
      setSuccess("Signup complete! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f3f5] text-[#1a2340]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1a2340]">
          {otpSent ? "Verify OTP" : "Create Your Account"}
        </h2>

        {!otpSent ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a008]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a008]"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#c7a008] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#c7a008]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Role Selection */}
            <div className="flex justify-center gap-4 mt-2">
              {["student", "organizer"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-6 py-2 rounded-full font-semibold border transition-all ${
                    role === r
                      ? "bg-[#c7a008] text-white border-[#c7a008]"
                      : "bg-transparent border-gray-300 text-gray-700 hover:border-[#c7a008] hover:text-[#c7a008]"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-[#c7a008] text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#1a2340] text-white py-3 rounded-full font-semibold hover:bg-[#2b3560] transition-all mt-2"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7a008]"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-[#c7a008] text-sm text-center">{success}</p>
            )}
            <button
              type="submit"
              disabled={verifying}
              className="w-full bg-[#1a2340] text-white py-3 rounded-full font-semibold hover:bg-[#2b3560] transition-all"
            >
              {verifying ? "Verifying..." : "Verify OTP & Complete Signup"}
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c7a008] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
