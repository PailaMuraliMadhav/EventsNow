import React from "react";
// Removed Link and useLocation imports to resolve "not in Router context" error
// import { Link, useLocation } from "react-router-dom";
// Note: We use <a> tags and window.location.pathname for navigation instead of Link and useLocation.

function Navbar() {
  // Use window.location.pathname to check the current path without React Router hooks
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Using localStorage for mock user authentication status
  const user = JSON.parse(localStorage.getItem("user"));

  // Helper to determine active link class
  const getLinkClasses = (path) => {
    // Check if the current path starts with the link's path (e.g., /events/123)
    const isActive =
      currentPath.startsWith(path) || (path === "/" && currentPath === "/");

    // Base classes for navigation links
    const baseClasses =
      "text-[#1a2340] hover:text-[#c7a008] transition duration-150 font-medium";

    return `${baseClasses} ${
      isActive
        ? "text-[#c7a008] font-semibold" // Active link color (Orange/Gold)
        : "text-[#1a2340]" // Default link color (Dark Blue/Gray)
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Using window.location.href ensures a full state reset after logout
    window.location.href = "/";
  };

  return (
    // Applied new header styling: light background, wide padding, shadow
    <nav className="flex items-center justify-between px-6 sm:px-12 py-4 bg-[#ffffff] border-b border-[#d6d8de] shadow-sm sticky top-0 z-10">
      {/* Logo and Name (Left side) - Switched Link to <a> */}
      <a href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#1a2340]">
          {/* Placeholder Icon (as /vite.png is inaccessible) */}
          <img
            src="/vite.png" // replace with your logo path
            alt="EventsNow Logo"
            className="w-5 h-5"
          />
        </div>
        <h1 className="text-xl font-bold">
          <span className="text-[#1a2340]">Events</span>
          <span className="text-[#c7a008]">Now</span>
        </h1>
      </a>

      {/* Navigation/Action Buttons (Right side) */}
      <div className="flex items-center space-x-4">
        {/* Events Link */}
        <a
          href="/events"
          className={getLinkClasses("/events") + " hidden sm:inline"}
        >
          Events
        </a>

        {/* Conditional Auth Links */}
        {!user ? (
          // Logged Out State: Log In and Sign Up buttons
          <>
            {/* Log In Link */}
            <a
              href="/login"
              className={getLinkClasses("/login") + " hidden md:inline"}
            >
              Log In
            </a>
            {/* Sign Up Link (Primary CTA) */}
            <a
              href="/signup"
              className="px-4 py-2 text-sm bg-[#c7a008] text-white font-semibold rounded-full hover:bg-[#a58607] transition-all"
            >
              Sign Up
            </a>
          </>
        ) : (
          // Logged In State: Dashboard and Logout button
          <>
            {/* Dashboard Link */}
            <a
              href="/dashboard"
              className={getLinkClasses("/dashboard") + " hidden sm:inline"}
            >
              Dashboard
            </a>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
