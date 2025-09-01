// src/Layout.jsx
import App from "./App";
import Chatbot from "./components/Chatbot";
import Navbar from "./UI/Navbar";
import SideBar from "./UI/SideBar";
import SearchBar from "./UI/SearchBar";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";

export default function Layout() {
  const { user } = useContext(AuthContext);
  const role = user.role;
  const [sidebarClass, setSidebarClass] = useState("w-64");
  const excludedRoles = ["Lab", "Pharmacy", "Admin"];
  const exemptedPaths = ["/", "/signup", "/login", "/shop"];
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (exemptedPaths.includes(location.pathname)) {
      setSidebarClass("w-0 hidden");
    } else {
      setSidebarClass("w-64");
    }
  }, [user, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar: always on top, full width */}
      <header>
        <Navbar />
      </header>

      {/* Main section: sidebar + page content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {!excludedRoles.includes(role) && (
          <aside className={sidebarClass}>
            <SideBar />
          </aside>
        )}

        {/* Page content */}
        <main className="flex-1">
          <App />
        </main>
      </div>
      {/* Floating Chatbot Button */}
      <button
        style={{
          position: "fixed",
          bottom: 20,
          right: 30,
          zIndex: 9999,
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: 28,
          cursor: "pointer",
        }}
        onClick={() => setShowChatbot(true)}
        aria-label="Open Chatbot">
        💬
      </button>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
}
