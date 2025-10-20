import React, { useEffect, useState } from "react";
import api from "../api/axios";

// Event Card (clean, light, navy-gold theme)
function EventCard({ event, onClick }) {
  return (
    <div
      className="relative rounded-xl shadow-md border border-[#d6d8de] hover:shadow-lg transition cursor-pointer overflow-hidden bg-white"
      onClick={onClick}
      tabIndex={0}
      aria-label={event.title}
    >
      <img
        src={event.image || "https://source.unsplash.com/400x200/?event,party"}
        alt={event.title}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-[#1a2340] mb-1 truncate">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-1 truncate">
            {event.club} • {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="bg-[#c7a008]/20 text-[#1a2340] px-3 py-1 rounded-full text-xs font-semibold">
            {event.category}
          </span>
          <span className="bg-[#1a2340]/10 text-[#1a2340] px-3 py-1 rounded-full text-xs font-semibold">
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

// Small-screen hook
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isSmall;
}

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ club: "", category: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  const filtered = events.filter((e) => {
    return (
      (!filter.club || e.club === filter.club) &&
      (!filter.category || e.category === filter.category) &&
      (!filter.date ||
        new Date(e.date).toLocaleDateString() === filter.date) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const clubs = [...new Set(events.map((e) => e.club).filter(Boolean))];
  const categories = [...new Set(events.map((e) => e.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#f2f3f5] p-4 sm:p-8 text-[#1a2340]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-[#1a2340]">
          <span className="text-[#c7a008]">Upcoming</span> Events
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <input
            type="text"
            placeholder="Search events..."
            className="px-3 py-2 border border-[#c7a008] bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c7a008]/50 w-48 sm:w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 border border-[#d6d8de] bg-white rounded-lg text-sm"
            value={filter.club}
            onChange={(e) => setFilter((f) => ({ ...f, club: e.target.value }))}
          >
            <option value="">All Clubs</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-[#d6d8de] bg-white rounded-lg text-sm"
            value={filter.category}
            onChange={(e) =>
              setFilter((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="px-3 py-2 border border-[#d6d8de] bg-white rounded-lg text-sm"
            value={filter.date}
            onChange={(e) => setFilter((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No events found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => setSelected(event)}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
            <div
              className={`bg-white text-[#1a2340] rounded-2xl shadow-2xl w-full ${
                isSmallScreen
                  ? "max-w-[95vw] max-h-[90vh] p-4"
                  : "max-w-lg max-h-[90vh] p-6"
              } relative border border-[#c7a008]/30 overflow-y-auto`}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-[#c7a008] text-2xl"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                &times;
              </button>

              <img
                src={
                  selected.image ||
                  "https://source.unsplash.com/400x200/?event,party"
                }
                alt={selected.title}
                className="h-48 sm:h-56 w-full object-cover rounded mb-4"
              />

              <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-[#c7a008]/20 text-[#1a2340] px-2 py-1 rounded text-xs font-semibold">
                  {selected.category}
                </span>
                <span className="bg-[#1a2340]/10 text-[#1a2340] px-2 py-1 rounded text-xs font-semibold">
                  {selected.venue}
                </span>
                <span className="bg-gray-100 text-[#1a2340] px-2 py-1 rounded text-xs font-semibold">
                  {selected.club}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-4">
                {selected.description}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={selected.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#1a2340] text-white py-2 rounded-lg font-semibold hover:bg-[#2b3560] transition text-sm"
                >
                  Register
                </a>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    selected.title
                  )}&dates=${selected.date
                    .replace(/[-:]/g, "")
                    .replace(".000Z", "")}/${selected.date
                    .replace(/[-:]/g, "")
                    .replace(".000Z", "")}&details=${encodeURIComponent(
                    selected.description
                  )}&location=${encodeURIComponent(selected.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#c7a008] text-white py-2 rounded-lg font-semibold hover:bg-[#d4b11d] transition text-sm"
                >
                  Add to Google Calendar
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
