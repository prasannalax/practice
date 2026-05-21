import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // 👈 IMPORTANT

      alert("Login Successful");
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})} />

        <button onClick={handleLogin}>Login</button>

        <p className="link" onClick={() => window.location.href="/register"}>
          Register
        </p>
      </div>
    </div>
  );
}

export default Login;

