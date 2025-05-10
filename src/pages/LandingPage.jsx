import { ArrowRightIcon, UserIcon, BriefcaseIcon, TruckIcon, CheckCircleIcon } from "@heroicons/react/outline";

import {
  FaHospital,
  FaClinicMedical,
  FaPaw,
  FaPrescriptionBottle,
  FaFlask,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaMicroscope,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { GiMedicinePills, GiHerbsBundle } from "react-icons/gi";

import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";
import HowItWorksSection from "../components/HowItWorksSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <Navbar />

      {/* Services Section */}
      <ServicesSection />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
