import { Event } from "../models/event.model.js";
import cloudinary from "../utils/cloudinary.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageUrl = result.secure_url;
    }

    const event = new Event({
      ...req.body,
      image: imageUrl,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("comments.user", "name");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add comment to an event
export const addCommentToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    event.comments.push(comment);
    await event.save();

    // Optionally return updated comments
    const updatedEvent = await Event.findById(req.params.id).populate("comments.user", "name");
    res.status(201).json(updatedEvent.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
