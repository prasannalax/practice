import { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div className="main">
      <h2>📋 Appointments</h2>

      {/* ❌ Hide rejected */}
      {appointments.filter(a => a.status !== "rejected").length === 0 ? (
        <p>No appointments</p>
      ) : (
        <div className="cards">

          {appointments
            .filter(a => a.status !== "rejected")
            .map(a => (
              <div key={a._id} className="card-box">

                {/* 👤 Names */}
                {user.role === "patient" ? (
                  <p><b>Doctor:</b> {a.doctorName}</p>
                ) : (
                  <p><b>Patient:</b> {a.patientName}</p>
                )}

                <p><b>Date:</b> {a.date}</p>
                <p><b>Time:</b> {a.time}</p>
                <p><b>Problem:</b> {a.problem}</p>
                <p><b>Status:</b> {a.status}</p>

                {/* ✅ DOCTOR ACTIONS */}
                {user.role === "doctor" && a.status === "pending" && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{ background: "green", marginRight: "10px" }}
                      onClick={async () => {
                        await axios.put(
                          `http://localhost:5000/api/appointments/status/${a._id}`,
                          { status: "accepted" }
                        );
                        window.location.reload();
                      }}
                    >
                      Accept
                    </button>

                    <button
                      style={{ background: "red" }}
                      onClick={async () => {
                        await axios.put(
                          `http://localhost:5000/api/appointments/status/${a._id}`,
                          { status: "rejected" }
                        );
                        window.location.reload();
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* 💬 CHAT */}
                <button
                  style={{ marginTop: "10px" }}
                  onClick={() => window.location.href = `/chat/${a._id}`}
                >
                  Chat 💬
                </button>

              </div>
            ))}

        </div>
      )}
    </div>
  );
}

export default Appointments;