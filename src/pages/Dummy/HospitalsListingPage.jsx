import { useState } from "react";
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaHospital,
  FaBed,
  FaUserMd,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HospitalsListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const navigate = useNavigate();

  // Dummy hospital data
  const hospitals = [
    {
      id: 1,
      name: "MediCare General Hospital",
      image: "/images/medicare.webp", // Add your image path here
      address: "123 Wellness Avenue, Health City",
      rating: 4.7,
      specialties: ["Cardiology", "Orthopedics", "Neurology"],
      description:
        "Award-winning hospital with state-of-the-art facilities and expert medical staff",
      contact: "+1 (555) 123-4567",
      hours: "24/7 Emergency Services",
      beds: 350,
      doctors: 120,
    },
    {
      id: 2,
      name: "Sunrise Children's Hospital",
      image: "/images/sunraise.jpg",
      address: "456 Pediatric Lane, Care District",
      rating: 4.9,
      specialties: ["Pediatrics", "Neonatology", "Pediatric Surgery"],
      description:
        "Specialized care for children with family-centered approach",
      contact: "+1 (555) 987-6543",
      hours: "Mon-Sat: 8am-8pm, Sun: 9am-5pm",
      beds: 200,
      doctors: 85,
    },
    {
      id: 3,
      name: "Metropolitan Heart Institute",
      address: "789 Cardiac Street, Medical Hub",
      rating: 4.8,
      specialties: ["Cardiology", "Cardiac Surgery", "Vascular Medicine"],
      description:
        "Leading cardiac care center with advanced diagnostic technologies",
      contact: "+1 (555) 456-7890",
      hours: "24/7 Cardiac Emergency",
      beds: 180,
      doctors: 65,
      image: "/images/metro.jpg",
    },
    {
      id: 4,
      name: "OrthoPlus Center",
      address: "321 Mobility Road, Health District",
      rating: 4.6,
      specialties: ["Orthopedics", "Sports Medicine", "Rehabilitation"],
      description:
        "Specialized orthopedic care with advanced surgical techniques",
      contact: "+1 (555) 234-5678",
      hours: "Mon-Fri: 7am-9pm, Sat-Sun: 8am-6pm",
      beds: 150,
      doctors: 50,
      image: "/images/orthoplus.jpg",
    },
    {
      id: 5,
      name: "NeuroCare Institute",
      address: "654 Brain Avenue, Neuro Center",
      rating: 4.9,
      specialties: ["Neurology", "Neurosurgery", "Neurorehabilitation"],
      description:
        "Comprehensive neurological care with cutting-edge treatments",
      contact: "+1 (555) 345-6789",
      hours: "24/7 Neuro Emergency",
      beds: 220,
      doctors: 75,
      image: "/images/neurocare.jpg",
    },
    {
      id: 6,
      name: "City General Hospital",
      address: "987 Main Street, Downtown",
      rating: 4.5,
      specialties: ["General Surgery", "Internal Medicine", "Emergency Care"],
      description:
        "Full-service hospital providing comprehensive healthcare services",
      contact: "+1 (555) 567-8901",
      hours: "24/7 Full Services",
      beds: 500,
      doctors: 200,
      image: "/images/city.jpeg",
    },
  ];

  const specialties = [
    "all",
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "Surgery",
    "Oncology",
    "Emergency Care",
    "Rehabilitation",
  ];

  // Filter hospitals based on search and specialty
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === "all" ||
      hospital.specialties.some(
        (s) => s.toLowerCase() === specialtyFilter.toLowerCase()
      );

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Hospitals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-rated healthcare facilities with specialized services
            and expert medical staff
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search hospitals or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Specialty
              </label>
              <select
                className="block w-full py-4 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredHospitals.length}{" "}
            {filteredHospitals.length === 1 ? "Hospital" : "Hospitals"} Found
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by <span className="font-semibold">Highest Rating</span>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Hospital Image */}
              <div className="h-48 w-full relative flex items-center justify-center bg-gray-100">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {hospital.rating}{" "}
                    <FaStar className="inline-block -mt-0.5" />
                  </span>
                </div>
              </div>

              {/* Hospital Info */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center bg-green-50 text-green-800 px-2 py-1 rounded-full">
                    <FaStar className="h-4 w-4 mr-1" />
                    <span className="text-sm font-semibold">
                      {hospital.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="h-4 w-4 mr-2 text-blue-500" />
                  <p className="text-sm">{hospital.address}</p>
                </div>

                <p className="text-gray-700 mb-4">{hospital.description}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-900">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap mt-1">
                    {hospital.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <FaBed className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Beds</p>
                      <p className="font-semibold">{hospital.beds}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUserMd className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Doctors</p>
                      <p className="font-semibold">{hospital.doctors}</p>
                    </div>
                  </div>
                </div>

                {/* Contact & Hours */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaPhone className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{hospital.contact}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{hospital.hours}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex space-x-3">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => navigate(`/hospital/${hospital.id}`)}
                  >
                    View Details
                  </button>
                  <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <FaHospital className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hospitals found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            <button
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => {
                setSearchQuery("");
                setSpecialtyFilter("all");
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsListingPage;
