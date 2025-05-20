import mediCheck from "../assets/MediCheck.png";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 bg-white text-gray-800 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section with Logo and Links */}
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={mediCheck} alt="CheckMedi Logo" />
              <span className="ml-2 text-xl font-bold text-blue-600">CheckMedi</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button className="hover:text-blue-600">For Hospitals</button>
              <button className="hover:text-blue-600">For Pharmacy</button>
              <button className="hover:text-blue-600">Jobs</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">Login / Signup</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar Section */}
      <div className="bg-gray-100 p-4 shadow-sm">
        {/* <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">Find the medical expert around you</h2> */}
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <select className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Specialty</option>
            <option>Obstetrics & Gynecology</option>
            <option>Pediatrics</option>
          </select>
          <select className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Location</option>
            <option>New York</option>
            <option>Los Angeles</option>
          </select>
          <select className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Insurance</option>
            <option>Provider A</option>
            <option>Provider B</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">Search</button>
        </div>
      </div>
    </>
  );
}
