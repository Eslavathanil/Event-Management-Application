const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// GET /api/events
router.get("/", async (req, res) => {
  try {
    const { category, location, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (search) filter.name = { $regex: search, $options: "i" };

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
