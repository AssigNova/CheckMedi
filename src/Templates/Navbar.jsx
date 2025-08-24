import mediCheck from "../assets/MediCheck.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useContext } from "react";
import { useState } from "react";

export default function Navbar() {
  const { loggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfile = () => navigate("/profile");
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 bg-white text-gray-800 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src={mediCheck}
                  alt="CheckMedi Logo"
                />
                <span className="ml-2 text-xl font-bold text-blue-600">
                  CheckMedi
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button className="hover:text-blue-600">For Hospitals</button>
              <button className="hover:text-blue-600">For Pharmacy</button>
              <a href="/jobs" className="hover:text-blue-600">
                Jobs
              </a>

              {loggedIn ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"
              >
                {menuOpen ? (
                  // Close (X) Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t">
            <div className="flex flex-col space-y-4 px-6 py-4">
              <button className="hover:text-blue-600 text-left">
                For Hospitals
              </button>
              <button className="hover:text-blue-600 text-left">
                For Pharmacy
              </button>
              <a href="/jobs" className="hover:text-blue-600 text-left">
                Jobs
              </a>

              {loggedIn ? (
                <>
                  <button
                    onClick={handleProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 w-full"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-400 w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 w-full"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar Section */}
      <div className="bg-gray-100 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-0 md:flex md:items-center md:justify-center md:gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-gray-700 border 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 shadow-[3px_2px_0_#3B82F6] w-full md:w-1/3"
          />

          {/* Dropdowns */}
          <div className="grid grid-cols-3 gap-3 w-full md:flex md:w-auto md:gap-4">
            <select
              className="w-full px-3 py-2 rounded-md text-gray-700 border 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         shadow-[3px_2px_0_#3B82F6] text-sm md:text-base"
            >
              <option>Specialty</option>
              <option>Obstetrics & Gynecology</option>
              <option>Pediatrics</option>
            </select>

            <select
              className="w-full px-3 py-2 rounded-md text-gray-700 border 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         shadow-[3px_2px_0_#3B82F6] text-sm md:text-base"
            >
              <option>Location</option>
              <option>New York</option>
              <option>Los Angeles</option>
            </select>

            <select
              className="w-full px-3 py-2 rounded-md text-gray-700 border 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         shadow-[3px_2px_0_#3B82F6] text-sm md:text-base"
            >
              <option>Insurance</option>
              <option>Provider A</option>
              <option>Provider B</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full md:flex-row md:w-auto">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold 
                         hover:bg-blue-700 w-full md:w-auto"
            >
              Search
            </button>

            <button
              className="flex items-center justify-center gap-3 
                   bg-gradient-to-r from-purple-600 to-indigo-600 
                   text-white font-semibold px-6 py-2 rounded-md shadow-lg 
                   hover:shadow-xl hover:scale-105 transform transition-all 
                   duration-300 ease-in-out w-full md:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 
               2.293c-.63.63-.184 1.707.707 1.707H17m0 
               0a2 2 0 100 4 2 2 0 000-4zm-8 
               2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Shop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
