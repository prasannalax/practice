const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");

require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Home route (optional but useful)
app.get("/", (req, res) => {
  res.send("Healthcare API is running 🚀");
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/users", require("./routes/userRoutes")); // 👈 IMPORTANT (NEW)
app.use("/api/chat", chatRoutes);
// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

