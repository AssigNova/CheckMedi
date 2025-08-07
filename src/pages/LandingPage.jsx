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

import StatsSection from "./HomePage/StatsSection";
import FeaturesSection from "./HomePage/FeaturesSection";
import HeroSection from "./HomePage/HeroSection";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import ServicesSection from "./HomePage/ServicesSection";
import HowItWorksSection from "./HomePage/HowItWorksSection";
import HealthcareService from "./HomePage/HealthcareService";
import ConsultationPlans from "./HomePage/ConsultationPlans";
import ProductSlider from "./HomePage/ProductSlider";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Services Section */}
      <ServicesSection />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Ads */}
      <ProductSlider />

      {/* Healthcare Service Section */}
      <HealthcareService />

      {/* Consultation Plans */}
      <ConsultationPlans />

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
