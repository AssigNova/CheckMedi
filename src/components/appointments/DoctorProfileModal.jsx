import React from "react";

function cleanDoctorName(name) {
  if (!name) return "";
  return name.replace(/^(Dr\.?\s*)+/i, "");
}

export default function DoctorProfileModal({ doctor, open, onClose, onBook }) {
  if (!open || !doctor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 md:px-0">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto p-0 md:p-0 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Left: Photo & Basic Info */}
          <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white md:w-1/3 p-8 md:py-12">
            <img
              src={doctor.photoUrl || "https://via.placeholder.com/120"}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Dr. {cleanDoctorName(doctor.name)}</h2>
            <div className="text-blue-700 font-semibold mb-1 text-center">{doctor.specialization || "-"}</div>
            <div className="text-gray-600 text-sm mb-2 text-center">{doctor.qualifications || "-"}</div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {doctor.languagesSpoken && doctor.languagesSpoken.length > 0 ? (
                doctor.languagesSpoken.map((lang, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {lang}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">-</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              <span className="text-gray-700 font-medium">{doctor.overallRating != null ? doctor.overallRating : 5}/5</span>
            </div>
            <div className="text-green-700 font-semibold text-lg mb-2">
              ₹{doctor.consultationFee != null ? doctor.consultationFee : "-"}
              <span className="text-xs font-normal text-gray-500"> per consult</span>
            </div>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
              onClick={onBook}
            >
              Book Appointment
            </button>
          </div>
          {/* Right: Details */}
          <div className="flex-1 p-6 md:p-10 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:gap-8 gap-2">
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Experience:</span>{" "}
                  {doctor.experience != null ? doctor.experience + " years" : "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Gender:</span> {doctor.gender || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Availability:</span> {doctor.availabilitySummary || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Phone:</span> {doctor.phone || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Address:</span> {doctor.address || "-"}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Affiliations:</span>{" "}
                  {doctor.affiliations?.length ? doctor.affiliations.join(", ") : "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Awards:</span> {doctor.awards?.length ? doctor.awards.join(", ") : "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Memberships:</span>{" "}
                  {doctor.memberships?.length ? doctor.memberships.join(", ") : "-"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Website:</span>{" "}
                  {doctor.socialLinks?.website ? (
                    <a href={doctor.socialLinks.website} className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">
                      {doctor.socialLinks.website}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">LinkedIn:</span>{" "}
                  {doctor.socialLinks?.linkedin ? (
                    <a
                      href={doctor.socialLinks.linkedin}
                      className="text-blue-600 underline ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doctor.socialLinks.linkedin}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-800">About:</span>
              <div className="text-gray-700 mt-1 whitespace-pre-line">{doctor.about || doctor.bio || "-"}</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .animate-fadeIn { animation: fadeIn 0.2s; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
