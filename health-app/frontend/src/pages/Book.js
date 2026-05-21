import { useEffect, useState } from "react";
import axios from "axios";

function Book() {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const [doctors, setDoctors] = useState([]);

  const [data, setData] = useState({
    patientId: user?._id,
    patientName: user?.name,
    doctorId: "",      // ✅ NEW
    doctorName: "",
    date: "",
    time: "",
    problem: "",
    symptoms: ""
  });

  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleBook = async () => {
    try {
      if (!data.doctorName || !data.date || !data.time || !data.problem || !data.symptoms) {
        return alert("Please fill all fields");
      }

      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        data
      );

      alert(res.data.message);

      // reset form
      setData({
        patientId: user?._id,
        patientName: user?.name,
        doctorId: "",
        doctorName: "",
        date: "",
        time: "",
        problem: "",
        symptoms: ""
      });

      setSelectedTime("");

    } catch (err) {
      alert(err.response?.data?.message || "Error booking appointment");
    }
  };

  const timeSlots = ["10AM", "11AM", "12PM", "2PM", "3PM"];

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>🏥 MediCare</h2>
      </div>

      <div className="main">
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh"
        }}>
          <div className="card-box" style={{ width: "350px" }}>
            <h2 style={{ textAlign: "center" }}>📅 Book Appointment</h2>

            {/* ✅ DOCTOR SELECT FIXED */}
            <label>Select Doctor</label>
            <select
              value={data.doctorName}
              onChange={(e) => {
                const selected = doctors.find(d => d.name === e.target.value);

                setData({
                  ...data,
                  doctorName: selected.name,
                  doctorId: selected._id   // ✅ IMPORTANT
                });
              }}
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>

            {/* DATE */}
            <label>Select Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) =>
                setData({ ...data, date: e.target.value })
              }
            />

            {/* TIME */}
            <label>Select Time</label>
            <div className="slots">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setSelectedTime(t);
                    setData({ ...data, time: t });
                  }}
                  style={{
                    background: selectedTime === t ? "#2563eb" : "white",
                    color: selectedTime === t ? "white" : "#2563eb"
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* PROBLEM */}
            <label>Problem</label>
            <input
              value={data.problem}
              onChange={(e) =>
                setData({ ...data, problem: e.target.value })
              }
            />

            {/* SYMPTOMS */}
            <label>Symptoms</label>
            <input
              value={data.symptoms}
              onChange={(e) =>
                setData({ ...data, symptoms: e.target.value })
              }
            />

            <br />

            <button onClick={handleBook}>
              Book Appointment
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;