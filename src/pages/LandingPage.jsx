import { useState } from "react";
import mediCheck from "../MediCheck.png";
import {
  ArrowRightIcon,
  UserIcon,
  BeakerIcon,
  TruckIcon,
  VideoCameraIcon,
  ChatIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={mediCheck} />
              <span className="ml-2 text-xl font-bold text-blue-600">CheckMedi</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setActiveSection("features")} className="text-gray-600 hover:text-blue-600">
                Features
              </button>
              <button onClick={() => setActiveSection("solution")} className="text-gray-600 hover:text-blue-600">
                Our Solution
              </button>
              <button onClick={() => setActiveSection("dashboards")} className="text-gray-600 hover:text-blue-600">
                Dashboards
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing Healthcare
            <span className="text-blue-600 block mt-2">Through Digital Connection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bridging the gap between patients, doctors, and pharmacies with an integrated digital healthcare platform
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="/patient">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
                I am a Patient
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </a>
            <a href="/doctor">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center gap-2">
                Doctor's Cabin
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </a>
            <a href="/pharmacy">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 flex items-center gap-2">
                Pharmacy Store
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center px-4">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Medical Support Availability</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
            <div className="text-gray-600">Verified Healthcare Professionals</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">30min</div>
            <div className="text-gray-600">Average Delivery Time</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Comprehensive Healthcare Ecosystem</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: VideoCameraIcon, title: "Video Consultations", color: "blue" },
              { icon: ChatIcon, title: "Instant Messaging", color: "green" },
              { icon: BeakerIcon, title: "Digital Prescriptions", color: "purple" },
              { icon: TruckIcon, title: "Medicine Delivery", color: "pink" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className={`h-12 w-12 mb-4 text-${feature.color}-600`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">Secure and seamless integration with our healthcare network</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Unified Healthcare Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting all aspects of healthcare delivery through seamless digital integration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Patient Journey */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Patient Experience</h3>
              <p className="text-gray-600 mb-6">Empowering individuals with on-demand access to comprehensive healthcare services</p>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  24/7 Video Consultations
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  AI-Powered Symptom Checker
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Smart Prescription Tracking
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Integrated Health Records
                </li>
              </ul>
            </div>

            {/* Doctor Experience */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BriefcaseIcon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Doctor Enablement</h3>
              <p className="text-gray-600 mb-6">Advanced tools for modern medical practice and patient management</p>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Smart Appointment Scheduling
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Telemedicine Workflow Suite
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  AI-Assisted Diagnostics
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Continuing Education Portal
                </li>
              </ul>
            </div>

            {/* Pharmacy Network */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TruckIcon className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Pharmacy Integration</h3>
              <p className="text-gray-600 mb-6">Streamlined medication management and delivery ecosystem</p>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Instant Prescription Validation
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Smart Inventory Management
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Automated Delivery Tracking
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Integrated Payment Systems
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Explore Full Features
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Healthcare?</h2>
          <p className="text-xl mb-8">Join our network of healthcare innovators and revolutionize patient care</p>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">CheckMedi</h4>
            <p className="text-gray-400">Bridging the healthcare gap through technology</p>
          </div>
          {/* Add more footer columns */}
        </div>
      </footer>
    </div>
  );
}
