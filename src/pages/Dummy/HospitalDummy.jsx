import React from "react";
import { useParams } from "react-router-dom";
import hospitals from "../../data/hospitals";
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Bed,
  Stethoscope,
  Info,
  BriefcaseMedical,
} from "lucide-react";

const HospitalDummy = () => {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === Number(id));

  if (!hospital) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Hospital not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-400 to-black px-4 py-10">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {hospital.name}
        </h1>

        {/* Image */}
        {hospital.image && (
          <div className="mb-6">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-72 object-cover rounded-xl shadow"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Address:</span> {hospital.address}
          </div>

          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Rating:</span> {hospital.rating}
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="font-medium">Contact:</span> {hospital.contact}
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Hours:</span> {hospital.hours}
          </div>

          <div className="flex items-center gap-3">
            <Bed className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Beds:</span> {hospital.beds}
          </div>

          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-pink-600" />
            <span className="font-medium">Doctors:</span> {hospital.doctors}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 flex items-start gap-3 text-gray-700">
          <Info className="w-5 h-5 text-blue-600 mt-1" />
          <p>{hospital.description}</p>
        </div>

        {/* Specialties */}
        {hospital.specialties && hospital.specialties.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <BriefcaseMedical className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Specialties:</span>
            </div>
            <div className="flex flex-wrap mt-2">
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
        )}
      </div>
    </div>
  );
};

export default HospitalDummy;
