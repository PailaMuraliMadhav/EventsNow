import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f2f3f5] text-[#1a2340]">
      {/* The header has been removed from here. 
        It is now handled globally by the Navbar component. 
      */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#1a2340]">
          Campus Life, <span className="text-[#c7a008]">Reimagined</span>
        </h2>

        <p className="text-gray-700 max-w-xl mb-8">
          Discover campus events, join clubs, and make memories effortlessly.
          <br />
          Designed for students who never want to miss out.
        </p>

        {/* CTA Buttons - Kept them below the hero text for prominence */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/events"
            className="px-8 py-3 bg-[#1a2340] text-white font-semibold rounded-full hover:bg-[#2b3560] transition-all"
          >
            Explore Events
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 border border-[#c7a008] text-[#c7a008] font-semibold rounded-full hover:bg-[#c7a008] hover:text-white transition-all"
          >
            Join Free
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl">
          <div className="bg-[#ffffff] border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-bold text-[#1a2340]">
              Smart Discovery
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Find events that match your interests and schedule.
            </p>
          </div>

          <div className="bg-[#ffffff] border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-lg font-bold text-[#1a2340]">
              One-Click RSVP
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Register instantly and get reminders automatically.
            </p>
          </div>

          <div className="bg-[#ffffff] border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-lg font-bold text-[#1a2340]">Host Events</h3>
            <p className="text-gray-600 text-sm mt-1">
              Create and promote your club’s events with ease.
            </p>
          </div>
        </div>
      </main>

      {/* --- */}

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 bg-[#e9ebef] border-t border-[#d6d8de] mt-10">
        © 2025{" "}
        <span className="text-[#c7a008] font-semibold">EventsNow</span>. Made
        for students, by Murali paila.
      </footer>
    </div>
  );
}
