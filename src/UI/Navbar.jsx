import mediCheck from "../assets/MediCheck.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useContext } from "react";

export default function Navbar() {
  const { loggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
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
          {/* Top Section with Logo and Links */}
          <div className="flex justify-between h-16 items-center">
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={mediCheck} alt="CheckMedi Logo" />
                <span className={`ml-2 text-xl font-bold ${textColor}`}>CheckMedi</span>
              </div>
            </a>
            <div className="hidden md:flex space-x-8">
              {!loggedIn && (
                <>
                  <button className={`hover:${textColor}`}>For Hospitals</button>
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
                    className={`${bgColor} text-white px-4 py-2 rounded-md font-semibold hover:${hoverColor}`}>
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-400 ml-2">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button onClick={handleLogin} className={`${bgColor} text-white px-4 py-2 rounded-md font-semibold hover:${hoverColor}`}>
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 ml-2">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
