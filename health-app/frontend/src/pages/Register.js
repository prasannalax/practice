import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: "",
    workingHours: ""
  });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      alert(res.data.message);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Name"
          onChange={e => setData({...data, name: e.target.value})} />

        <input placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <select onChange={e => setData({...data, role: e.target.value})}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {data.role === "doctor" && (
          <>
            {/* ✅ DROPDOWN */}
            <select
              onChange={e => setData({...data, specialization: e.target.value})}
            >
              <option value="">Select Specialization</option>
              <option>General Physician</option>
              <option>Cardiologist</option>
              <option>Dermatologist</option>
              <option>Neurologist</option>
              <option>Orthopedic</option>
              <option>Pediatrician</option>
              <option>Gynecologist</option>
              <option>Psychiatrist</option>
              <option>ENT Specialist</option>
              <option>Ophthalmologist</option>
              <option>Dentist</option>
            </select>

            <input placeholder="Working Hours (10AM - 5PM)"
              onChange={e => setData({...data, workingHours: e.target.value})} />
          </>
        )}

        <button onClick={handleRegister}>Register</button>

        <p className="link" onClick={() => window.location.href="/"}>
          Login
        </p>
      </div>
    </div>
  );
}

export default Register;