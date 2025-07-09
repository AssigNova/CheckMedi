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

export default function ServicesSection() {
  const services = [
    { name: "Hospital", icon: FaHospital, url: "/hospitals-list" },
    { name: "Clinics", icon: FaClinicMedical },
    { name: "Medical Centre", icon: FaHospital },
    { name: "Personalized Dashboard", icon: GiHerbsBundle },
    { name: "AI-Health Assistant", icon: GiMedicinePills },
    { name: "Pet Treatments", icon: FaPaw },
    { name: "Pharmacy", icon: FaPrescriptionBottle, url: "/pharmacies-list" },
    { name: "Labs", icon: FaFlask },
    { name: "Medical Insurance", icon: FaShieldAlt },
    { name: "Health Marketplace", icon: FaMapMarkerAlt },
    { name: "Research Centre", icon: FaMicroscope },
    { name: "Donors", icon: FaHandHoldingHeart },
  ];

  return (
    <section className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-4 hide-scrollbar px-4">
          {services.map((service, idx) => (
            <a
              key={idx}
              href={service.url}
              className="flex flex-col items-center p-3 min-w-[100px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <service.icon className="h-6 w-6 text-blue-600 mb-1" />
              <span className="text-xs text-gray-700 text-center">{service.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
