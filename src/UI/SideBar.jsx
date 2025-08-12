import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  VideoCameraIcon,
  HeartIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

export default function SideBar({ values, heading, text, onClickTab, activeTab }) {
  const { user } = useContext(AuthContext);
  const role = user.role;

  let sideBarClass;
  if (role === "Doctor") {
    heading = "CheckMedi-DocDash";
    values = [
      { id: "overview", icon: ChartBarIcon, label: "Overview", link: "/dashboard" },
      { id: "appointments", icon: CalendarIcon, label: "Appointments", link: "/appointmentList" },
      { id: "patients", icon: UserGroupIcon, label: "Patients", link: "/doctorPatientPage" },
      { id: "AddReport", icon: UserGroupIcon, label: "Request Report", link: "/doctorRequestReport" },
      { id: "reports", icon: DocumentTextIcon, label: "Reports", link: "/doctor/reports" },
      { id: "profile", icon: UserCircleIcon, label: "Profile", link: "/profile" },
    ];
    text = "Doctor Portal";
  } else if (role === "Patient") {
    heading = "CheckMedi-Patient";
    values = [
      { id: "dashboard", icon: HeartIcon, label: "Health Dashboard", link: "/dashboard" },
      { id: "book-appointment", icon: CalendarIcon, label: "Book Appointment", link: "/book-appointment" },
      { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions", link: "/prescriptions" },
      { id: "reports", icon: DocumentTextIcon, label: "Reports", link: "/patient/reports" },
      { id: "profile", icon: UserCircleIcon, label: "Profile", link: "/profile" },
    ];
    text = "Patient Portal";
  } else if (role === "Pharmacy") {
    heading = "CheckMedi-Pharmacy";
  } else if (role === "Lab") {
    heading = "CheckMedi-Labs";
    values = [
      { id: "dashboard", icon: HeartIcon, label: "Health Dashboard" },
      { id: "book-appointment", icon: CalendarIcon, label: "Book Appointment", link: "/book-appointment" },
      { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions", link: "/prescriptions" },
      { id: "reports", icon: DocumentTextIcon, label: "Reports", link: "/patient/reports" },
      { id: "profile", icon: UserCircleIcon, label: "Profile" },
    ];
    text = "Patient Portal";
  } else if (role === "Admin") {
    heading = "CheckMedi-Admin";
    values = [
      { id: "dashboard", icon: ChartBarIcon, label: "Dashboard", link: "/admin/dashboard" },
      { id: "manage-labs", icon: DocumentTextIcon, label: "Manage Labs", link: "/admin/labs" },
      { id: "add-lab", icon: DocumentTextIcon, label: "Add Lab", link: "/admin/add-lab" },
    ];

    text = "Admin Portal";
  } else {
    heading = "CheckMedi";
    sideBarClass = "hidden";
    values = [];
  }

  let textColor = "text-blue-600";
  let bgColor = "bg-blue-600";
  let hoverColor = "bg-blue-600";

  if (role === "Lab") {
    textColor = "text-red-600";
    bgColor = "bg-red-600";
    hoverColor = "bg-red-700";
  } else if (role === "Pharmacy") {
    textColor = "text-yellow-600";
    bgColor = "bg-yellow-600";
    hoverColor = "bg-yellow-700";
  } else if (role === "Doctor") {
    textColor = "text-green-600";
    bgColor = "bg-green-600";
    hoverColor = "bg-green-700";
  }

  return (
    <>
      <div className={`w-64 bg-white h-screen shadow-lg fixed rounded-2xl ${sideBarClass}`}>
        <div className="p-6 border-b">
          <h2 className={`text-xl font-bold ${textColor}`}>{heading}</h2>
          <p className="text-sm text-gray-500">{text}</p>
        </div>

        <nav className="mt-6 space-y-1">
          {values.map((item) =>
            item.link ? (
              <a
                key={item.id}
                href={item.link}
                className={`w-full flex items-center px-6 py-3 text-sm no-underline ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}>
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                onClick={() => onClickTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}>
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
    </>
  );
}
