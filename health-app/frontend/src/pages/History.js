import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments", {
      params: {
        userId: user?._id,
        role: user?.role,
        name: user?.name
      }
    })
    .then(res => {
      // ✅ completed + rejected
      const filtered = res.data.filter(
        a => a.completed || a.status === "rejected"
      );
      setHistory(filtered);
    });
  }, []);

  return (
    <div className="main">
      <h2>📜 Patient History</h2>

      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        <div className="cards">
          {history.map(a => (
            <div key={a._id} className="card-box">
              <p><b>Patient:</b> {a.patientName}</p>
              <p><b>Date:</b> {a.date}</p>
              <p><b>Problem:</b> {a.problem}</p>
              <p>
                <b>Status:</b>{" "}
                {a.completed ? "Completed" : "Rejected"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;