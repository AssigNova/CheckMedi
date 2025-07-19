import React, { useState } from "react";
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

import BenefitItem from "../../components/common/BenefitItem";
import Appointment from "../../components/appointments/Appointment";
import AppointmentList from "../../components/appointments/AppointmentList";
import StatCard from "../../components/common/StatCard";
import SideBar from "../../Templates/SideBar";
import WrapperCard from "../../Templates/WrapperCard";
import DoctorPatientsPage from "./DoctorPatientsPage";

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

          {/* My Appointments Section */}
          <AppointmentList role="Doctor" setScheduleView={setScheduleView} scheduleView={scheduleView} />

          {/* Render DoctorPatientsPage when 'patients' tab is active */}
          {activeTab === "patients" && <DoctorPatientsPage doctorId={profile._id} />}

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
