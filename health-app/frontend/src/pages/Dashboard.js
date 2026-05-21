import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments", {
      params: {
        userId: user?._id,
        role: user?.role,
        name: user?.name
      }
    })
    .then(res => setAppointments(res.data));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // ================= PATIENT =================
  const pending = appointments.filter(a => a.status === "pending");
  const accepted = appointments.filter(a => a.status === "accepted");
  const total = appointments.length;
  const upcoming = accepted;

  // ✅ today's date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>🏥 MediCare</h2>

        <Link to="/dashboard">🏠 Dashboard</Link>

        {user?.role === "patient" && (
          <>
            <Link to="/doctors">👨‍⚕️ Doctors</Link>
            <Link to="/book">📅 Book Appointment</Link>
          </>
        )}

        <Link to="/appointments">📋 Appointments</Link>

        {/* ✅ History moved here */}
        {user?.role === "doctor" && (
          <Link to="/history">📜 Patient History</Link>
        )}

        <button onClick={logout}>🚪 Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="header">
          <h2>Welcome {user?.name || "User"} 👋</h2>
          <p>Role: {user?.role || "N/A"}</p>
        </div>

        {/* ================= PATIENT DASHBOARD ================= */}
        {user?.role === "patient" && (
          <>
            <div className="cards">

              <div className="card-box">
                <h3>🟡 Pending appointments</h3>
                <p>{pending.length}</p>
              </div>

              <div className="card-box">
                <h3>🟢 Ongoing appointments</h3>
                <p>{accepted.length}</p>
              </div>

              <div className="card-box">
                <h3>📊 Total appointments</h3>
                <p>{total}</p>
              </div>

            </div>

            <div style={{ marginTop: "30px" }}>
              <h2>Upcoming Appointments</h2>

              {upcoming.length === 0 ? (
                <div className="card-box" style={{ width: "300px" }}>
                  <p>No upcoming appointments</p>
                  <button onClick={() => window.location.href = "/book"}>
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div className="cards">
                  {upcoming.map(a => (
                    <div key={a._id} className="card-box">
                      <p><b>Doctor:</b> {a.doctorName}</p>
                      <p><b>Date:</b> {a.date}</p>
                      <p><b>Time:</b> {a.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= DOCTOR DASHBOARD ================= */}
        {user?.role === "doctor" && (
          <>
            {/* 🔝 TOP */}
            <div className="cards">

              <div className="card-box">
                <h3>📊 Total</h3>
                <p>{appointments.length}</p>
              </div>

              <div className="card-box">
                <h3>✅ Accepted</h3>
                <p>{appointments.filter(a => a.status === "accepted").length}</p>
              </div>

              <div className="card-box">
                <h3>🟡 Pending</h3>
                <p>{appointments.filter(a => a.status === "pending").length}</p>
              </div>

              <div className="card-box">
                <h3>✔️ Completed</h3>
                <p>{appointments.filter(a => a.completed).length}</p>
              </div>

            </div>

            {/* 📅 DATE FILTER */}
            <div style={{ marginTop: "20px" }}>
              <label>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* 📋 APPOINTMENTS */}
            <div style={{ marginTop: "20px" }}>
              <h2>Appointments</h2>

              {appointments
                .filter(a => a.status !== "rejected") // ❌ hide rejected
                .filter(a => {
                  const filterDate = selectedDate || today; // ✅ default today
                  return a.date === filterDate;
                })
                .sort((a, b) => a.time.localeCompare(b.time))
                .length === 0 ? (

                <div className="card-box" style={{ width: "300px" }}>
                  <p>No appointments are there today</p>
                </div>

              ) : (

                appointments
                  .filter(a => a.status !== "rejected")
                  .filter(a => {
                    const filterDate = selectedDate || today;
                    return a.date === filterDate;
                  })
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(a => (
                    <div key={a._id} className="card-box">

                      <p><b>Patient:</b> {a.patientName}</p>
                      <p><b>Date:</b> {a.date}</p>
                      <p><b>Time:</b> {a.time}</p>
                      <p><b>Problem:</b> {a.problem}</p>
                      <p><b>Status:</b> {a.status}</p>

                      {a.status === "accepted" && !a.completed && (
                        <button
                          style={{ background: "green" }}
                          onClick={async () => {
                            await axios.put(
                              `http://localhost:5000/api/appointments/complete/${a._id}`
                            );
                            window.location.reload();
                          }}
                        >
                          Mark Completed
                        </button>
                      )}

                    </div>
                  ))
              )}
            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default Dashboard;