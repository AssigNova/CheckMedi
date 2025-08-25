export default function SearchBar() {
  return (
    <div className="bg-gray-100 p-4 shadow-sm">
      {/* <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">Find the medical expert around you</h2> */}
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
  );
}
