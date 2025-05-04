import { useState } from "react";
import doctor from "../doctor.jpeg";
import {
  CalendarIcon,
  UserCircleIcon,
  DocumentTextIcon,
  HeartIcon,
  ClockIcon,
  VideoCameraIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [prescriptionFilter, setPrescriptionFilter] = useState("active");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-600">MedConnect</h2>
            <p className="text-sm text-gray-500">Patient Portal</p>
          </div>

          <nav className="mt-6 space-y-1">
            {[
              { id: "dashboard", icon: HeartIcon, label: "Health Dashboard" },
              { id: "appointments", icon: CalendarIcon, label: "Appointments" },
              { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions" },
              { id: "profile", icon: UserCircleIcon, label: "Profile" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Sarah!</h1>
            <p className="text-gray-600 mt-2">Your Health Summary: 2 upcoming appointments • 3 active prescriptions</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button className="bg-blue-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-blue-700 transition-colors">
              <span className="text-lg font-semibold">Book New Appointment</span>
              <CalendarIcon className="h-8 w-8" />
            </button>
            <button className="bg-green-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-green-700 transition-colors">
              <span className="text-lg font-semibold">Start Video Consultation</span>
              <VideoCameraIcon className="h-8 w-8" />
            </button>
            <button className="bg-purple-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-purple-700 transition-colors">
              <span className="text-lg font-semibold">Order Medicines</span>
              <TruckIcon className="h-8 w-8" />
            </button>
          </div>

          {/* Health Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Last BP Reading" value="120/80" trend="Normal" color="green" />
            <StatCard title="Active Medications" value="3" trend="All current" color="blue" />
            <StatCard title="Next Checkup" value="15 Days" trend="Cardiologist" color="purple" />
            <StatCard title="Wellness Score" value="92/100" trend="Excellent" color="orange" />
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <button className="text-blue-600 hover:text-blue-700">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Doctor</th>
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 flex items-center">
                      <img src={doctor} className="h-10 w-10 rounded-full mr-3" alt="Doctor" />
                      Dr. Ankit Sharma
                    </td>
                    <td>Today 3:00 PM</td>
                    <td>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Video</span>
                    </td>
                    <td>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Confirmed</span>
                    </td>
                    <td>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Join Now</button>
                    </td>
                  </tr>
                  {/* More appointment rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Patient Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-green-600 flex items-center">
                <ShieldCheckIcon className="h-8 w-8 mr-2" />
                Your Advantages
              </h2>
              <div className="space-y-4">
                <BenefitItem icon={ClockIcon} color="blue" title="Instant Access" text="24/7 availability of healthcare professionals" />
                <BenefitItem
                  icon={VideoCameraIcon}
                  color="purple"
                  title="Virtual Visits"
                  text="Consult from home with our secure video platform"
                />
                <BenefitItem
                  icon={TruckIcon}
                  color="green"
                  title="Fast Delivery"
                  text="Medicines delivered within 4 hours in metro cities"
                />
                <BenefitItem icon={ShieldCheckIcon} color="red" title="Data Security" text="HIPAA-compliant medical records protection" />
              </div>
            </div>

            {/* Active Prescriptions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-blue-600">Active Prescriptions</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPrescriptionFilter("active")}
                    className={`px-4 py-2 rounded-lg ${
                      prescriptionFilter === "active" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setPrescriptionFilter("history")}
                    className={`px-4 py-2 rounded-lg ${
                      prescriptionFilter === "history" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    History
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <PrescriptionItem medication="Metformin 500mg" dosage="Twice daily after meals" status="Active" refills="2 remaining" />
                {/* More prescription items */}
              </div>
            </div>
          </div>

          {/* Emergency Section */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Emergency Assistance</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Immediate connection to nearest emergency services</p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Emergency Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const BenefitItem = ({ icon: Icon, color, title, text }) => (
  <div className="flex items-start">
    <div className={`bg-${color}-100 p-2 rounded-lg mr-4`}>
      <Icon className={`h-6 w-6 text-${color}-600`} />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

const StatCard = ({ title, value, trend, color }) => (
  <div className={`bg-white p-4 rounded-xl border-l-4 border-${color}-600 shadow-sm`}>
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className={`text-sm text-${color}-600`}>{trend}</div>
  </div>
);

const PrescriptionItem = ({ medication, dosage, status, refills }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
    <div>
      <h4 className="font-semibold">{medication}</h4>
      <p className="text-sm text-gray-600">{dosage}</p>
    </div>
    <div className="text-right">
      <span className={`bg-green-100 text-green-600 px-2 py-1 rounded text-sm`}>{status}</span>
      <p className="text-sm text-gray-600 mt-1">{refills}</p>
    </div>
  </div>
);
