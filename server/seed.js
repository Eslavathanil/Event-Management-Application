const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const events = [
  { name: "Tech Summit 2026", organizer: "Bellcorp", location: "San Francisco", date: "2026-03-15", description: "A premier technology conference featuring keynotes from industry leaders.", capacity: 500, availableSeats: 120, category: "Technology", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600" },
  { name: "Design Thinking Workshop", organizer: "Creative Labs", location: "New York", date: "2026-04-10", description: "An immersive workshop on design thinking principles.", capacity: 50, availableSeats: 12, category: "Workshop", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600" },
  { name: "Startup Pitch Night", organizer: "VentureX", location: "Austin", date: "2026-03-28", description: "Watch 20 startups pitch their ideas to top investors.", capacity: 200, availableSeats: 0, category: "Business", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600" },
  { name: "AI & Machine Learning Expo", organizer: "DataMinds", location: "San Francisco", date: "2026-05-20", description: "Explore the latest in AI and ML with live demos.", capacity: 300, availableSeats: 85, category: "Technology", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600" },
  { name: "Music Festival 2026", organizer: "SoundWave", location: "Los Angeles", date: "2026-06-15", description: "Three-day outdoor music festival with top artists.", capacity: 5000, availableSeats: 2300, category: "Entertainment", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600" },
  { name: "Yoga & Wellness Retreat", organizer: "MindBody Co", location: "Denver", date: "2026-04-05", description: "Weekend retreat for mindfulness and yoga.", capacity: 30, availableSeats: 8, category: "Health", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" },
];

const seedDB = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(events);
    console.log("Database seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
