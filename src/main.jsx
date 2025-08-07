import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorReports from "./pages/doctor/DoctorReports";
import DoctorRequestReport from "./pages/doctor/DoctorRequestReport";
import LabDashboard from "./pages/lab/LabDashboard";
import LabReportList from "./pages/lab/LabReportList";
import PatientReports from "./pages/patient/PatientReports";
import AdminLabList from "./pages/admin/AdminLabList";
import AdminAddLab from "./pages/admin/AdminAddLab";
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard.jsx";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/auth/Profile";
import Jobs from "./pages/Jobs.jsx";
import Navbar from "./UI/Navbar.jsx";
import Articles from "./pages/Articles.jsx";
import UpdateProfile from "./pages/auth/UpdateProfile.jsx";
import DashboardRouter from "./pages/DashboardRouter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import BookAppointmentPage from "./pages/patient/BookAppointmentPage.jsx";
import HospitalsListingPage from "./pages/Dummy/HospitalsListingPage.jsx";
import PharmaciesListingPage from "./pages/Dummy/PharmaciesPage.jsx";
import PatientPrescriptionsPage from "./pages/patient/PatientPrescriptionsPage.jsx";
import SinglePrescriptionPage from "./pages/patient/SinglePrescriptionPage.jsx";
import { apiUrl } from "./api";

// Loader for patient profile
const fetchPatientProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(apiUrl("api/user/profile"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Home />,
      // },

      //
      // Bill Section ------------------------------------------------------------------------------------------------
      //
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "article",
        element: <Articles />,
      },
      {
        path: "patient",
        element: <PatientDashboard />,
        loader: fetchPatientProfile,
      },
      {
        path: "doctor",
        element: <DoctorDashboard />,
      },
      {
        path: "doctor/reports",
        element: <DoctorReports />,
      },
      {
        path: "lab",
        element: <LabDashboard />,
      },
      {
        path: "doctor/request-report",
        element: <DoctorRequestReport />,
      },
      {
        path: "lab/reports",
        element: <LabReportList />,
      },
      {
        path: "patient/reports",
        element: <PatientReports />,
      },
      {
        path: "admin/labs",
        element: <AdminLabList />,
      },
      {
        path: "admin/add-lab",
        element: <AdminAddLab />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "pharmacy",
        element: <PharmacyDashboard />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "dashboard",
        element: <DashboardRouter />,
      },
      {
        path: "book-appointment",
        element: <BookAppointmentPage />,
      },
      {
        path: "hospitals-list",
        element: <HospitalsListingPage />,
      },
      {
        path: "pharmacies-list",
        element: <PharmaciesListingPage />,
      },
      {
        path: "prescriptions",
        element: <PatientPrescriptionsPage />,
      },
      {
        path: "single-prescription",
        element: <SinglePrescriptionPage />,
      },
      {
        path: "prescription/:id",
        element: <SinglePrescriptionPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
