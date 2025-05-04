import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/CheckMedi" element={<LandingPage />} />
        <Route path="/CheckMedi/patient" element={<PatientDashboard />} />
        <Route path="/CheckMedi/doctor" element={<DoctorDashboard />} />
        <Route path="/CheckMedi/pharmacy" element={<PharmacyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
