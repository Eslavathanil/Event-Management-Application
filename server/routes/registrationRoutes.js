const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST /api/registrations — register for an event
router.post("/", protect, async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.availableSeats <= 0) return res.status(400).json({ message: "Event is sold out" });

    const exists = await Registration.findOne({ userId: req.user._id, eventId });
    if (exists) return res.status(400).json({ message: "Already registered" });

    const registration = await Registration.create({ userId: req.user._id, eventId });
    event.availableSeats -= 1;
    await event.save();

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/registrations/:eventId — cancel registration
router.delete("/:eventId", protect, async (req, res) => {
  try {
    const registration = await Registration.findOneAndDelete({
      userId: req.user._id,
      eventId: req.params.eventId,
    });
    if (!registration) return res.status(404).json({ message: "Registration not found" });

    await Event.findByIdAndUpdate(req.params.eventId, { $inc: { availableSeats: 1 } });
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/registrations/me — get my registrations
router.get("/me", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id }).populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
