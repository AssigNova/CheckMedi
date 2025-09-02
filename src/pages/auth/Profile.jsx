import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api";
import { User, Mail, Shield, CheckCircle, Clock } from "lucide-react"; //

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("api/user/profile"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading profile...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!profile) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {profile.name}
        </h2>
        <p className="text-center text-gray-500 mb-6">{profile.role}</p>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Name:</span> {profile.name}
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Email:</span> {profile.email}
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Role:</span> {profile.role}
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle
              className={`w-5 h-5 ${
                profile.isVerified ? "text-green-600" : "text-red-500"
              }`}
            />
            <span className="font-medium">Verified:</span>{" "}
            {profile.isVerified ? "Yes" : "No"}
          </div>
          <div className="flex items-center gap-3 col-span-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Created At:</span>{" "}
            {new Date(profile.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/update-profile")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
