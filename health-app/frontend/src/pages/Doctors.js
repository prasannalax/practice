import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/doctors")
      .then(res => setDoctors(res.data));
  }, []);

  const filteredDoctors = filter
    ? doctors.filter(d => d.specialization === filter)
    : doctors;

  return (
    <div className="main">
      <h2>Doctors List</h2>

      {/* ✅ FILTER DROPDOWN */}
      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All Specializations</option>
        <option>General Physician</option>
        <option>Cardiologist</option>
        <option>Dermatologist</option>
        <option>Neurologist</option>
        <option>Orthopedic</option>
      </select>

      <div className="cards">
        {filteredDoctors.map(doc => (
          <div key={doc._id} className="card-box">
            <h3>{doc.name}</h3>
            <p><b>Specialization:</b> {doc.specialization}</p>
            <p><b>Working Time:</b> {doc.workingHours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;