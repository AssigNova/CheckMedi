export default function SearchBar() {
  return (
    <div className="bg-gray-100 p-4 shadow-sm">
      {/* <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">Find the medical expert around you</h2> */}
      <div className="flex items-center justify-center gap-4">
        {/* <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          /> */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md text-gray-700 border focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3 shadow-[3px_2px_0_#3B82F6]"
        />
        <select className="px-4 py-2 rounded-md text-gray-700 border  focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[3px_2px_0_#3B82F6]">
          <option>Specialty</option>
          <option>Obstetrics & Gynecology</option>
          <option>Pediatrics</option>
        </select>
        <select className="px-4 py-2 rounded-md text-gray-700 border  focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[3px_2px_0_#3B82F6]">
          <option>Location</option>
          <option>New York</option>
          <option>Los Angeles</option>
        </select>
        <select className="px-4 py-2 rounded-md text-gray-700 border  focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[3px_2px_0_#3B82F6]  ">
          <option>Insurance</option>
          <option>Provider A</option>
          <option>Provider B</option>
        </select>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">Search</button>
        {/* <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700">
            Shop
          </button> */}
        <button
          class="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-md
               shadow-lg hover:shadow-xl hover:scale-105
               transform transition-all duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Shop
        </button>
      </div>
    </div>
  );
}
