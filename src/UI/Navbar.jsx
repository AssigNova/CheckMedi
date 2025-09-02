// import mediCheck from "../assets/MediCheck.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import logocheckmedi from "../assets/logocheckmedi.PNG";

const countries = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "USA", code: "US", flag: "🇺🇸" },
  { name: "UK", code: "GB", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Arab Emirates", code: "AE", flag: "AE" },
];

export default function Navbar() {
  const { loggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const role = user.role;

  let textColor = "text-blue-600";
  let bgColor = "bg-blue-600";
  let hoverColor = "bg-blue-600";

  if (role === "Lab") {
    textColor = "text-red-600";
    bgColor = "bg-red-600";
    hoverColor = "bg-red-700";
  } else if (role === "Pharmacy") {
    textColor = "text-yellow-600";
    bgColor = "bg-yellow-600";
    hoverColor = "bg-yellow-700";
  } else if (role === "Doctor") {
    textColor = "text-green-600";
    bgColor = "bg-green-600";
    hoverColor = "bg-green-700";
  }

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
          <div className="flex justify-between h-16 items-center">
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src={logocheckmedi}
                  alt="CheckMedi Logo"
                />
                <span className={`ml-2 text-xl font-bold ${textColor}`}>
                  CheckMedi
                </span>
              </div>
            </a>
            {/* Desktop Region Dropdown - left aligned with flag */}
            <div className="hidden md:flex items-center ml-5">
              <span className="text-2xl mr-2">{selectedCountry.flag}</span>
              <select
                value={selectedCountry.code}
                onChange={(e) =>
                  setSelectedCountry(
                    countries.find((c) => c.code === e.target.value)
                  )
                }
                className="border border-gray-300 rounded px-2 py-1 text-base font-semibold focus:outline-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden md:flex space-x-8">
              {!loggedIn && (
                <>
                  <button className={`hover:${textColor}`}>
                    For Hospitals
                  </button>
                  <button className={`hover:${textColor}`}>For Pharmacy</button>
                  <a className="text-center align-middle flex" href="/jobs">
                    <button className={`hover:${textColor}`}>Jobs</button>
                  </a>
                </>
              )}
              {loggedIn ? (
                <div className="flex justify-between">
                  <button
                    onClick={handleProfile}
                    className={`${bgColor} text-white px-4 py-2 rounded-md font-semibold hover:${hoverColor}`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-400 ml-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={handleLogin}
                    className={`${bgColor} text-white px-4 py-2 rounded-md font-semibold hover:${hoverColor}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 ml-2"
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
              {/* Mobile Region Dropdown */}
              <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">
                  Region
                </label>
                <select
                  value={selectedCountry.code}
                  onChange={(e) =>
                    setSelectedCountry(
                      countries.find((c) => c.code === e.target.value)
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full text-base font-semibold focus:outline-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {!loggedIn && (
                <>
                  <button className="hover:text-blue-600 text-left">
                    For Hospitals
                  </button>
                  <button className="hover:text-blue-600 text-left">
                    For Pharmacy
                  </button>
                  <a href="/jobs" className="hover:text-blue-600 text-left">
                    Jobs
                  </a>
                </>
              )}
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
    </>
  );
}
