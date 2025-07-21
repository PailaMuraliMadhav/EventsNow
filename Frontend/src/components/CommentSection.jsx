import { useState, useEffect } from "react";
import axios from "../api/axios";

const CommentSection = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/events/${eventId}`);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");

    try {
      await axios.post(`/events/${eventId}/comment`, { text }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setText("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Write a comment..."
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Post
        </button>
      </form>
      <ul className="space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="p-2 border rounded">
            <p className="text-sm">{c.text}</p>
            <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
