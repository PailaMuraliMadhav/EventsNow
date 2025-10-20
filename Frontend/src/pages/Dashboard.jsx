import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myEvents, setMyEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === "organizer") {
      api
        .get(`/events?createdBy=${user.id || user._id}`)
        .then((res) => setMyEvents(res.data))
        .finally(() => setLoading(false));
    } else {
      api
        .get(`/users/${user.id || user._id}/registrations`)
        .then((res) => setRegistered(res.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user)
    return (
      <div className="p-8 text-center text-lg text-gray-400">
        Please <Link to="/login" className="text-orange-400 hover:underline">log in</Link> to view your dashboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h2>

        {user.role === "organizer" ? (
          <OrganizerView
            myEvents={myEvents}
            loading={loading}
            setMyEvents={setMyEvents}
            navigate={navigate}
          />
        ) : (
          <AttendeeView
            registered={registered}
            loading={loading}
            setRegistered={setRegistered}
          />
        )}
      </div>
    </div>
  );
}

// Organizer Dashboard View
function OrganizerView({ myEvents, loading, setMyEvents, navigate }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h3 className="text-2xl font-bold text-white">Your Events</h3>
        <Link
          to="/create-event"
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
        >
          + Create Event
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-lg">Loading your events...</div>
      ) : myEvents.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          <p>You haven't created any events yet.</p>
          <Link to="/create-event" className="text-orange-400 hover:underline mt-2 inline-block">
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isOrganizer={true}
              setMyEvents={setMyEvents}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Attendee Dashboard View
function AttendeeView({ registered, loading, setRegistered }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-8">Your Registered Events</h3>

      {loading ? (
        <div className="text-center text-gray-400 text-lg">Loading registered events...</div>
      ) : registered.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          <p>You haven't registered for any events yet.</p>
          <Link to="/events" className="text-orange-400 hover:underline mt-2 inline-block">
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registered.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isOrganizer={false}
              setRegistered={setRegistered}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Unified Event Card for both views
function EventCard({ event, isOrganizer, setMyEvents, setRegistered, navigate }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/events/${event._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyEvents((prev) => prev.filter((e) => e._id !== event._id));
    } catch (err) {
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleUnregister = async () => {
    if (!window.confirm("Are you sure you want to unregister from this event?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/events/${event._id}/unregister`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistered((prev) => prev.filter((e) => e._id !== event._id));
    } catch (err) {
      alert("Failed to unregister. Please try again.");
    }
  };

  return (
    <div className="relative bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Gradient Header */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-pink-500" />

      <div className="p-6">
        <h4 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h4>
        <p className="text-gray-300 text-sm mb-1">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-300 text-sm mb-4">
          📍 {event.venue}
        </p>

        {isOrganizer ? (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-event", { state: { event } })}
              className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleUnregister}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
            >
              Unregister
            </button>
            <Link
              to={`/events/${event._id}`}
              className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition text-sm text-center"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
