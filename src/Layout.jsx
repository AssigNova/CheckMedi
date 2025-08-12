// src/Layout.jsx
import App from "./App";
import Navbar from "./UI/Navbar";
import SideBar from "./UI/SideBar";
import SearchBar from "./UI/SearchBar";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function Layout() {
  const { user } = useContext(AuthContext);
  const role = user.role;

  const excludedRoles = ["Lab", "Pharmacy", "Admin"];
  let path = window.location.pathname;
  console.log(path);
  let sidebarClass = "w-64";

  const exemptedPaths = ["/", "/signup"];
  if (exemptedPaths.includes(path)) {
    sidebarClass = "w-0 hidden";
  }

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
    </div>
  );
}
