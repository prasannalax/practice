import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Book from "./pages/Book";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import History from "./pages/History";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/upcoming" element={<PatientDashboard />} />

        {/* Appointment related */}
        <Route path="/book" element={<Book />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />

        {/* Doctor specific */}
        <Route path="/history" element={<History />} />

        {/* Chat */}
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;