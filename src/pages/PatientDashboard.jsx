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

import BenefitItem from "../components/BenefitItem";
import StatCard from "../components/StatCard";
import PrescriptionItem from "../components/PrescriptionItem";
import Appointment from "../components/Appointment";
import QuickActions from "../components/QuickActions";

import SideBar from "../Templates/SideBar";
import WrapperCard from "../Templates/WrapperCard";
import { color } from "framer-motion";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [prescriptionFilter, setPrescriptionFilter] = useState("active");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <SideBar
          values={[
            { id: "dashboard", icon: HeartIcon, label: "Health Dashboard" },
            { id: "appointments", icon: CalendarIcon, label: "Appointments" },
            { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions" },
            { id: "profile", icon: UserCircleIcon, label: "Profile" },
          ]}
          heading="CheckMedi"
          text="Patient Portal"
          onClickTab={setActiveTab}
          activeTab={activeTab}
        />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Sarah!</h1>
            <p className="text-gray-600 mt-2">Your Health Summary: 2 upcoming appointments • 3 active prescriptions</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickActions text="Book New Appointment" icon={CalendarIcon} color="blue" link="/" />
            <QuickActions text="Start Video Consultation" icon={VideoCameraIcon} color="green" link="/" />
            <QuickActions text="Order Medicines" icon={TruckIcon} color="purple" link="/" />
          </div>

          {/* Health Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Last BP Reading" value="120/80" trend="Normal" color="green" />
            <StatCard title="Active Medications" value="3" trend="All current" color="blue" />
            <StatCard title="Next Checkup" value="15 Days" trend="Cardiologist" color="purple" />
            <StatCard title="Wellness Score" value="92/100" trend="Excellent" color="orange" />
          </div>

          {/* Upcoming Appointments */}
          <WrapperCard heading={"Upcoming Appointments"} options={<button className="text-blue-600 hover:text-blue-700">View All</button>}>
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
                  <Appointment
                    values={[
                      { text: "Dr. Ankit Sharma", color: "" },
                      { text: "Today 3:00 PM", color: "" },
                      { text: "Video", color: "blue" },
                      { text: "Confirmed", color: "green" },
                    ]}
                  />
                  <Appointment
                    values={[
                      { text: "Dr. Anand Sethi", color: "" },
                      { text: "Today 5:00 PM", color: "" },
                      { text: "Video", color: "blue" },
                      { text: "Confirmed", color: "green" },
                    ]}
                  />
                  <Appointment
                    values={[
                      { text: "Dr. Ahrar", color: "" },
                      { text: "Today 5:00 PM", color: "" },
                      { text: "Video", color: "blue" },
                      { text: "Pending", color: "red" },
                    ]}
                  />
                  {/* More appointment rows */}
                </tbody>
              </table>
            </div>
          </WrapperCard>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 mt-12">
            {/* Patient Benefits */}
            <WrapperCard heading={"Your Advantages"} icon={ShieldCheckIcon} color={"text-green-600"}>
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
            </WrapperCard>

            {/* Active Prescriptions */}
            <WrapperCard
              heading={"Active Prescriptions"}
              color={"text-blue-600"}
              options={
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
              }
            >
              <div className="space-y-4">
                <PrescriptionItem medication="Metformin 500mg" dosage="Twice daily after meals" status="Active" refills="2 remaining" />
                {/* More prescription items */}
              </div>
            </WrapperCard>
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
