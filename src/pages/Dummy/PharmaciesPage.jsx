import { useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaTruck, FaPills, FaFirstAid, FaShoppingCart } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";

const PharmaciesListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  // Dummy pharmacy data
  const pharmacies = [
    {
      id: 1,
      name: "MediQuick Pharmacy",
      address: "123 Wellness Avenue, Health City",
      rating: 4.8,
      deliveryTime: "30 min",
      deliveryFee: "Free over $50",
      services: ["Prescription Delivery", "OTC Medications", "Health Consultations"],
      description: "24-hour pharmacy with same-day delivery and medication counseling",
      contact: "+1 (555) 123-4567",
      hours: "Open 24/7",
      specialties: ["Pediatric", "Geriatric", "Chronic Care"],
      distance: "1.2 miles",
    },
    {
      id: 2,
      name: "CarePlus Pharmacy",
      address: "456 Medical Lane, Care District",
      rating: 4.6,
      deliveryTime: "1 hour",
      deliveryFee: "$5.99 flat",
      services: ["Compounding", "Vaccinations", "Health Screenings"],
      description: "Full-service pharmacy with compounding services and immunization clinic",
      contact: "+1 (555) 987-6543",
      hours: "Mon-Fri: 8am-10pm, Sat-Sun: 9am-8pm",
      specialties: ["Compounding", "Immunizations"],
      distance: "0.8 miles",
    },
    {
      id: 3,
      name: "Express Rx",
      address: "789 Health Street, Medical Hub",
      rating: 4.9,
      deliveryTime: "20 min",
      deliveryFee: "Free",
      services: ["Express Delivery", "Online Prescriptions", "Telehealth"],
      description: "Fastest prescription delivery in the city with digital health services",
      contact: "+1 (555) 456-7890",
      hours: "Mon-Sat: 7am-11pm, Sun: 8am-10pm",
      specialties: ["Express Delivery", "Digital Health"],
      distance: "2.5 miles",
    },
    {
      id: 4,
      name: "Wellness Apothecary",
      address: "321 Herbal Road, Wellness District",
      rating: 4.7,
      deliveryTime: "2 hours",
      deliveryFee: "$4.99",
      services: ["Natural Remedies", "Vitamins & Supplements", "Holistic Consultations"],
      description: "Specializing in natural and holistic health solutions",
      contact: "+1 (555) 234-5678",
      hours: "Mon-Fri: 9am-8pm, Sat: 10am-6pm, Sun: Closed",
      specialties: ["Natural Medicine", "Holistic"],
      distance: "3.1 miles",
    },
  ];

  const deliveryOptions = ["all", "Under 30 min", "Under 1 hour", "Same-day", "Free Delivery"];

  // Filter pharmacies
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) || pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDelivery =
      deliveryFilter === "all" ||
      (deliveryFilter === "Under 30 min" && pharmacy.deliveryTime === "20 min") ||
      (deliveryFilter === "Under 1 hour" && pharmacy.deliveryTime === "30 min") ||
      (deliveryFilter === "Free Delivery" && pharmacy.deliveryFee.includes("Free"));

    return matchesSearch && matchesDelivery;
  });

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with illustration */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <GiMedicinePills className="h-20 w-20 text-blue-200 opacity-70" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">Find Your Pharmacy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with trusted pharmacies for fast prescription delivery and health products
          </p>
        </div>

        {/* Search and Filters - Horizontal Layout */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search pharmacies, medications, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Options</label>
            <select
              className="block w-full py-4 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
            >
              {deliveryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All Delivery Options" : option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Nearby Pharmacies <span className="text-blue-600">({filteredPharmacies.length})</span>
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button className="px-3 py-1 text-sm rounded-md bg-white shadow-sm">Distance</button>
              <button className="px-3 py-1 text-sm rounded-md">Rating</button>
              <button className="px-3 py-1 text-sm rounded-md">Delivery Time</button>
            </div>
          </div>
        </div>

        {/* Pharmacy List - Horizontal Cards */}
        <div className="space-y-6">
          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                expandedId === pharmacy.id ? "ring-2 ring-blue-500" : "hover:shadow-xl"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Pharmacy Basic Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
                      <div className="flex items-center bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full">
                        <FaStar className="h-4 w-4 mr-1" />
                        <span className="text-sm font-semibold">{pharmacy.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mt-2">
                      <FaMapMarkerAlt className="h-4 w-4 mr-2 text-blue-500" />
                      <p className="text-sm">{pharmacy.address}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {pharmacy.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDetails(pharmacy.id)}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    {expandedId === pharmacy.id ? "Show Less" : "More Details"}
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${expandedId === pharmacy.id ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 p-6 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <FaTruck className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Delivery</h4>
                      <p className="text-sm text-gray-600">
                        {pharmacy.deliveryTime} • {pharmacy.deliveryFee}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaClock className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Hours</h4>
                      <p className="text-sm text-gray-600">{pharmacy.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 p-6 flex flex-col justify-center">
                  <button className="mb-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <FaShoppingCart className="h-5 w-5 mr-2" />
                    Order Prescription
                  </button>
                  <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors">
                    Contact Pharmacy
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedId === pharmacy.id && (
                <div className="border-t border-gray-200 p-6 bg-white animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Services Offered</h4>
                      <ul className="space-y-2">
                        {pharmacy.services.map((service, idx) => (
                          <li key={idx} className="flex items-center">
                            <FaPills className="h-4 w-4 text-blue-500 mr-2" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FaPhone className="h-4 w-4 text-blue-500 mr-2" />
                          <span>{pharmacy.contact}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="h-4 w-4 text-blue-500 mr-2" />
                          <span>{pharmacy.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-4 w-4 text-blue-500 mr-2" />
                          <span>{pharmacy.distance} away</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">About This Pharmacy</h4>
                      <p className="text-gray-600">{pharmacy.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPharmacies.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <FaFirstAid className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No pharmacies found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any pharmacies matching your criteria. Try adjusting your filters.
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSearchQuery("");
                setDeliveryFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Featured Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Pharmacy Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaTruck, title: "Fast Delivery", desc: "Get medications in under 30 minutes" },
              { icon: FaPills, title: "Prescription Refills", desc: "Easy online refill requests" },
              { icon: FaFirstAid, title: "Medication Counseling", desc: "Expert advice from pharmacists" },
              { icon: GiMedicinePills, title: "Specialty Medications", desc: "Compounding & specialty drugs" },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaciesListingPage;
