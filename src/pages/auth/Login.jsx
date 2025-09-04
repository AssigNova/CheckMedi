import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiUrl } from "../../api.js";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(apiUrl("api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.error || "Login failed");
      login(data);
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-400 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue to{" "}
          <span className="text-blue-600 font-semibold">CheckMedi</span>
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            className="w-full p-3 border border-indigo-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            className="w-full p-3 border border-indigo-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error & Success */}
        {/* {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 mb-2 text-sm">{success}</div>
        )} */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transform transition duration-300"
        >
          Login
        </button>

        {/* Extra Links */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/signup" className="text-indigo-600 hover:underline">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
}
