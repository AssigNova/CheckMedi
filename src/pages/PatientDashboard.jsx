import { useState, useEffect } from "react";
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
import axios from "axios";
import { apiUrl } from "../api";

import BenefitItem from "../components/BenefitItem";
import StatCard from "../components/StatCard";
import PrescriptionItem from "../components/PrescriptionItem";
import Appointment from "../components/Appointment";
import QuickActions from "../components/QuickActions";
import AppointmentList from "../components/AppointmentList";

import SideBar from "../Templates/SideBar";
import WrapperCard from "../Templates/WrapperCard";

export default function PatientDashboard({ profile }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [prescriptionFilter, setPrescriptionFilter] = useState("active");
  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [errorPrescriptions, setErrorPrescriptions] = useState("");

  // Use profile for health summary instead of patientProfile
  const healthSummary = profile?.healthSummary || {};

  useEffect(() => {
    async function fetchPrescriptions() {
      setLoadingPrescriptions(true);
      setErrorPrescriptions("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(apiUrl(`api/prescriptions/patient/${profile._id}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(res.data);
      } catch (err) {
        setErrorPrescriptions(err.response?.data?.error || "Failed to load prescriptions");
      } finally {
        setLoadingPrescriptions(false);
      }
    }
    if (profile?._id) fetchPrescriptions();
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <SideBar
          values={[
            { id: "dashboard", icon: HeartIcon, label: "Health Dashboard" },
            { id: "book-appointment", icon: CalendarIcon, label: "Book Appointment", link: "/book-appointment" },
            { id: "prescriptions", icon: DocumentTextIcon, label: "Prescriptions", link: "/prescriptions" },
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {profile.name}!</h1>
            <p className="text-gray-600 mt-2">
              Email: {profile.email} | Role: {profile.role}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickActions text="Book New Appointment" icon={CalendarIcon} color="blue" link="/book-appointment" />
            <QuickActions text="Start Video Consultation" icon={VideoCameraIcon} color="green" link="/" />
            <QuickActions text="Order Medicines" icon={TruckIcon} color="purple" link="/" />
          </div>

          {/* Health Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Last BP Reading" value={healthSummary.lastBpReading || "N/A"} trend="Normal" color="green" />
            <StatCard
              title="Active Medications"
              value={healthSummary.activeMedicationsCount?.toString() || "N/A"}
              trend="All current"
              color="blue"
            />
            <StatCard
              title="Next Checkup"
              value={healthSummary.nextCheckupDate ? `${healthSummary.nextCheckupDate} (${healthSummary.nextCheckupType})` : "N/A"}
              trend={healthSummary.nextCheckupType || ""}
              color="purple"
            />
            <StatCard title="Wellness Score" value={healthSummary.wellnessScore || "N/A"} trend="Excellent" color="orange" />
          </div>

          {/* Upcoming Appointments */}
          <WrapperCard heading={"Upcoming Appointments"} options={<button className="text-blue-600 hover:text-blue-700">View All</button>}>
            {/* Replace static Appointment rows with dynamic AppointmentList */}
            <AppointmentList role="Patient" />
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
                {loadingPrescriptions ? (
                  <div>Loading prescriptions...</div>
                ) : errorPrescriptions ? (
                  <div className="text-red-500">{errorPrescriptions}</div>
                ) : prescriptions.length === 0 ? (
                  <div>No prescriptions found.</div>
                ) : (
                  prescriptions
                    .filter((p) =>
                      prescriptionFilter === "active"
                        ? new Date(p.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // last 30 days as active
                        : new Date(p.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    )
                    .map((p, idx) => (
                      <PrescriptionItem
                        key={p._id || idx}
                        doctor={p.doctorId?.name || "-"}
                        date={p.date}
                        pharmacy={p.pharmacyId?.name || "-"}
                        medicines={p.medicines}
                        notes={p.notes}
                        status={prescriptionFilter === "active" ? "Active" : "History"}
                      />
                    ))
                )}
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
