import { useState } from "react";
import {
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scheduleView, setScheduleView] = useState("upcoming");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-600">MedConnect Pro</h2>
            <p className="text-sm text-gray-500">Doctor Portal</p>
          </div>

          <nav className="mt-6 space-y-1">
            {[
              { id: "overview", icon: ChartBarIcon, label: "Overview" },
              { id: "appointments", icon: CalendarIcon, label: "Appointments" },
              { id: "patients", icon: UserGroupIcon, label: "Patients" },
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. Smith</h1>
            <p className="text-gray-600 mt-2">Today's Summary: 5 appointments • 3 consultations • ₹42,800 earned</p>
          </div>

          {/* Dual Value Proposition Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Doctor Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center">
                <UserCircleIcon className="h-8 w-8 mr-2" />
                Your Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <ChartBarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expand Your Reach</h3>
                    <p className="text-gray-600 text-sm">Access patients across 25+ cities with our digital platform</p>
                  </div>
                </div>

                {/* More benefit items */}
                <BenefitItem
                  icon={ClockIcon}
                  color="green"
                  title="Streamlined Workflow"
                  text="Automated appointment scheduling and patient management"
                />
                <BenefitItem
                  icon={CurrencyDollarIcon}
                  color="purple"
                  title="Secure Payments"
                  text="Guaranteed payments with automatic payout system"
                />
                <BenefitItem
                  icon={ShieldCheckIcon}
                  color="yellow"
                  title="Professional Growth"
                  text="Continuing medical education courses and community"
                />
              </div>
            </div>

            {/* Patient Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-green-600 flex items-center">
                <UserGroupIcon className="h-8 w-8 mr-2" />
                Patient Advantages
              </h2>
              <div className="space-y-4">
                <BenefitItem icon={ClockIcon} color="blue" title="24/7 Access" text="Patients can consult anytime from anywhere" />
                <BenefitItem
                  icon={VideoCameraIcon}
                  color="purple"
                  title="Reduced Wait Times"
                  text="Average consultation wait time under 15 minutes"
                />
                <BenefitItem
                  icon={DocumentTextIcon}
                  color="green"
                  title="Digital Prescriptions"
                  text="Instant e-prescriptions with pharmacy integration"
                />
                <BenefitItem
                  icon={ShieldCheckIcon}
                  color="red"
                  title="Continuity of Care"
                  text="Complete medical history tracking and follow-ups"
                />
              </div>
            </div>
          </div>

          {/* Consultation Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Consultation Schedule</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setScheduleView("upcoming")}
                  className={`px-4 py-2 rounded-lg ${
                    scheduleView === "upcoming" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setScheduleView("past")}
                  className={`px-4 py-2 rounded-lg ${
                    scheduleView === "past" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Past Consultations
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4">Rahul Sharma</td>
                    <td>Today 3:00 PM</td>
                    <td>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Video</span>
                    </td>
                    <td>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Confirmed</span>
                    </td>
                    <td>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Start Consultation</button>
                    </td>
                  </tr>
                  {/* More rows */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Consultations" value="248" trend="+12% last month" color="blue" />
            <StatCard title="Patient Rating" value="4.9" trend="98% satisfaction" color="green" />
            <StatCard title="Earnings" value="₹2.4L" trend="Monthly average" color="purple" />
            <StatCard title="Follow-ups" value="32" trend="Active cases" color="orange" />
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
