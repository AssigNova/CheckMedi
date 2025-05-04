import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import LandingPage from "./pages/LandingPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "",
      //   element: <Home />,
      // },

      //
      // Bill Section ------------------------------------------------------------------------------------------------
      //
      {
        path: "LandingPage",
        element: <LandingPage />,
      },
      {
        path: "patient",
        element: <PatientDashboard />,
      },
      {
        path: "doctor",
        element: <DoctorDashboard />,
      },
      {
        path: "pharmacy",
        element: <PharmacyDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
