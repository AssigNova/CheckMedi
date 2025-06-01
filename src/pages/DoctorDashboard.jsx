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

import BenefitItem from "../components/BenefitItem";
import Appointment from "../components/Appointment";
import AppointmentList from "../components/AppointmentList";
import StatCard from "../components/StatCard";
import SideBar from "../Templates/SideBar";
import WrapperCard from "../Templates/WrapperCard";

export default function DoctorDashboard({ profile }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [scheduleView, setScheduleView] = useState("upcoming");

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <SideBar
          values={[
            { id: "overview", icon: ChartBarIcon, label: "Overview" },
            { id: "appointments", icon: CalendarIcon, label: "Appointments" },
            { id: "patients", icon: UserGroupIcon, label: "Patients" },
            { id: "profile", icon: UserCircleIcon, label: "Profile" },
          ]}
          heading="CheckMedi"
          text="Doctor Portal"
          onClickTab={setActiveTab}
          activeTab={activeTab}
        />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. {profile.name}</h1>
            <p className="text-gray-600 mt-2">
              Email: {profile.email} | Role: {profile.role}
            </p>
          </div>

          {/* Dual Value Proposition Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <WrapperCard heading={"Your Benefits"} color={"text-blue-600"} icon={UserCircleIcon}>
              <div className="space-y-4">
                {/* More benefit items */}
                <BenefitItem
                  icon={ChartBarIcon}
                  color="blue"
                  title="Expand Your Reach"
                  text="Access patients across 25+ cities with our digital platform"
                />
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
            </WrapperCard>

            {/* Patient Benefits */}
            <WrapperCard heading={"Patient Advanced"} color={"text-green-600"} icon={UserGroupIcon}>
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
            </WrapperCard>
          </div>

          {/* Consultation Schedule */}
          <WrapperCard
            heading={"Consultation Schedule"}
            options={
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
            }
          >
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
                  <Appointment
                    values={[
                      { text: "Rahul Sharma", color: "" },
                      { text: "Today 3:00 PM", color: "" },
                      { text: "Video", color: "blue" },
                      { text: "Confirmed", color: "green" },
                    ]}
                  />
                  <Appointment
                    values={[
                      { text: "Ankit Sharma", color: "" },
                      { text: "Today 4:00 PM", color: "" },
                      { text: "Video", color: "blue" },
                      { text: "Pending", color: "red" },
                    ]}
                  />
                  {/* More rows */}
                </tbody>
              </table>
            </div>
          </WrapperCard>

          {/* My Appointments Section */}
          <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
          <AppointmentList role="Doctor" />

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
