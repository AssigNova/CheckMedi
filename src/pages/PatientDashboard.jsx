import { useState, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
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
import AppointmentList from "../components/AppointmentList";

import SideBar from "../Templates/SideBar";
import WrapperCard from "../Templates/WrapperCard";

export default function PatientDashboard() {
  const { patientData } = useLoaderData();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [prescriptionFilter, setPrescriptionFilter] = useState("active");
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsLoading, setPrescriptionsLoading] = useState(true);
  const [prescriptionsError, setPrescriptionsError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setPrescriptionsLoading(true);
      setPrescriptionsError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/prescriptions/patient/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        setPrescriptionsError(error.message);
      } finally {
        setPrescriptionsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (navigation.state === "loading") {
    return <p>Loading patient data...</p>;
  }

  // Error handling can be improved with a dedicated errorElement in the route
  if (!patientData) {
    return <p>Error loading patient data. Please try again later.</p>;
  }

  // patientData is the profile object from the loader, containing healthSummary and other profile fields.
  const {
    firstName,
    email,
    role,
    healthSummary
    // any other fields like lastName, dateOfBirth, etc. can be destructured here if needed directly
  } = patientData;

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
            { id: "book-appointment", icon: CalendarIcon, label: "Book Appointment", link: "/book-appointment" },
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {firstName || 'Patient'}!</h1>
            <p className="text-gray-600 mt-2">
              Email: {email || 'N/A'} | Role: {role || 'N/A'}
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
            <StatCard title="Last BP Reading" value={healthSummary?.lastBpReading || "N/A"} trend="Normal" color="green" />
            <StatCard
              title="Active Medications"
              value={healthSummary?.activeMedicationsCount?.toString() || "N/A"}
              trend="All current"
              color="blue"
            />
            <StatCard
              title="Next Checkup"
              value={
                healthSummary ? `${healthSummary.nextCheckupDate} (${healthSummary.nextCheckupType})` : "N/A"
              }
              trend={healthSummary?.nextCheckupType || ""}
              color="purple"
            />
            <StatCard
              title="Wellness Score"
              value={healthSummary?.wellnessScore || "N/A"}
              trend="Excellent"
              color="orange"
            />
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
                {prescriptionsLoading ? (
                  <p>Loading prescriptions...</p>
                ) : prescriptionsError ? (
                  <p className="text-red-500">Error: {prescriptionsError}</p>
                ) : (() => {
                  const filteredPrescriptions = prescriptions.filter(p =>
                    prescriptionFilter === "active" ? p.status === "Active" : p.status !== "Active"
                  );

                  if (filteredPrescriptions.length === 0) {
                    return <p>No {prescriptionFilter} prescriptions found.</p>;
                  }

                  return filteredPrescriptions.map((p) => (
                    <PrescriptionItem
                      key={p._id}
                      medication={p.medicationName || "N/A"}
                      dosage={p.dosage || "N/A"}
                      status={p.status || "N/A"}
                      refills={p.refillsRemaining?.toString() || "N/A"}
                    />
                  ));
                })()}
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
