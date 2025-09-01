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
  FaSpa,
  FaMedkit,
  FaLeaf,
} from "react-icons/fa";
import { GiMedicinePills, GiHerbsBundle } from "react-icons/gi";

export const services = [
  { name: "Hospital", icon: FaHospital, url: "/hospitals-list" },
  { name: "Clinics", icon: FaClinicMedical, url: "/pharmacies-list" },
  { name: "Medical Centre", icon: FaHospital, url: "/pharmacies-list" },
  {
    name: "Personalized Dashboard",
    icon: GiHerbsBundle,
    url: "/pharmacies-list",
  },
  // {
  //   name: "AI-Health Assistant",
  //   icon: GiMedicinePills,
  //   url: "/pharmacies-list",
  // },
  { name: "Vet Treatments", icon: FaPaw, url: "/pharmacies-list" },
  { name: "Pharmacy", icon: FaPrescriptionBottle, url: "/pharmacies-list" },
  { name: "Labs", icon: FaFlask, url: "/pharmacies-list" },
  { name: "Ayurvedic", icon: FaLeaf, url: "/pharmacies-list" },
  { name: "Unani", icon: FaMedkit, url: "/pharmacies-list" },
  { name: "Spa & Wellness", icon: FaSpa, url: "/pharmacies-list" },
  { name: "Medical Insurance", icon: FaShieldAlt, url: "/pharmacies-list" },
  {
    name: "Health Marketplace",
    icon: FaMapMarkerAlt,
    url: "/pharmacies-list",
  },
  { name: "Research Centre", icon: FaMicroscope, url: "/pharmacies-list" },
  { name: "Donors", icon: FaHandHoldingHeart, url: "/pharmacies-list" },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div
          className="overflow-x-auto pb-2 mb-4 max-w-[100vw] w-[100vw] sm:max-w-full sm:w-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex min-w-0 gap-4 sm:gap-6 hide-scrollbar px-2 sm:px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
            {services.map((service, idx) => (
              <a
                key={idx}
                href={service.url}
                className="flex-shrink-0 flex flex-col items-center justify-center p-3 sm:p-4 min-w-[32vw] max-w-[34vw] sm:min-w-[100px] sm:max-w-[120px] bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
              >
                <service.icon className="h-7 w-7 text-blue-600 mb-2" />
                <span className="text-xs sm:text-sm text-gray-700 text-center font-medium">
                  {service.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
