import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PharmacyDashboard from "./pages/PharmacyDashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/patient",
        element: <PatientDashboard />,
      },
      {
        path: "/doctor",
        element: <DoctorDashboard />,
      },
      {
        path: "/pharmacy",
        element: <PharmacyDashboard />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/book-appointment",
        element: <BookAppointmentPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
