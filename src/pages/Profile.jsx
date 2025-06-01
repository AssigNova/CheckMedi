import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const res = await fetch("/api/user/profile", {
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

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!profile) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        <div className="mb-4">
          <strong>Name:</strong> {profile.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {profile.email}
        </div>
        <div className="mb-4">
          <strong>Role:</strong> {profile.role}
        </div>
        <div className="mb-4">
          <strong>Verified:</strong> {profile.isVerified ? "Yes" : "No"}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 mt-4"
          onClick={() => navigate("/update-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
