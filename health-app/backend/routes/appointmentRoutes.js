const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

const {
  bookAppointment,
  updateStatus,
  markCompleted
} = require("../controllers/appointmentController");

// ✅ GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  const { userId, role, name } = req.query;

  let data;

  if (role === "patient") {
    data = await require("../models/Appointment").find({ patientId: userId });
  } else {
    data = await require("../models/Appointment").find({ doctorName: name });
  }

  res.json(data);
});
router.get("/upcoming/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    // ✅ Get future appointments with status pending or accepted
    const today = new Date();
    const appointments = await Appointment.find({
      patientId,
      status: { $in: ["pending", "accepted"] },
      date: { $gte: today.toISOString().split("T")[0] } // only future dates
    }).sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching upcoming appointments" });
  }
});
// ✅ BOOK
router.post("/book", bookAppointment);

// ✅ 🔥 IMPORTANT (THIS FIXES YOUR ERROR)
router.put("/status/:id", updateStatus);

// ✅ COMPLETE
router.put("/complete/:id", markCompleted);

module.exports = router;