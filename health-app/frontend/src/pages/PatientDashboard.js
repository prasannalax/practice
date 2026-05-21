import { useEffect, useState } from "react";
import axios from "axios";

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`http://localhost:5000/api/appointments/upcoming/${user._id}`)
      .then((res) => setUpcoming(res.data))
      .catch((err) => console.log(err));
  }, [user?._id]);

  return (
    <div className="layout">
      <div className="main">
        <h2>Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <div className="card-box" style={{ width: "300px" }}>
            <p>No upcoming appointments</p>
            <button onClick={() => (window.location.href = "/book")}>
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="cards">
            {upcoming.map((appt) => (
              <div key={appt._id} className="card-box">
                <p><b>Doctor:</b> {appt.doctorName}</p>
                <p><b>Date:</b> {appt.date}</p>
                <p><b>Time:</b> {appt.time}</p>
                <p><b>Problem:</b> {appt.problem}</p>
                <p><b>Symptoms:</b> {appt.symptoms}</p>
                <p><b>Status:</b> {appt.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;