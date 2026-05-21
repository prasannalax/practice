const Appointment = require("../models/Appointment");

// ✅ BOOK APPOINTMENT
exports.bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      doctorId,
      doctorName,
      date,
      time,
      problem,
      symptoms
    } = req.body;

    // ❌ prevent double booking
    const exists = await Appointment.findOne({
      doctorName,
      date,
      time,
      status: { $ne: "rejected" }
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const newAppointment = new Appointment({
      patientId,
      patientName,
      doctorId,
      doctorName,
      date,
      time,
      problem,
      symptoms
    });

    await newAppointment.save();

    // ✅ SUCCESS RESPONSE
    res.json({ message: "Booked successfully", appointment: newAppointment });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error booking appointment" });
  }
};

// ✅ ACCEPT / REJECT
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", appointment });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating status" });
  }
};

// ✅ COMPLETE
exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    res.json({ message: "Marked as completed", appointment });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error marking completed" });
  }
};