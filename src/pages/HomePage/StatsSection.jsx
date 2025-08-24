export default function StatsSection() {
  return (
    <div className="bg-[#e2e3e4] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">Key Healthcare Statistics</h3> */}
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Key Healthcare Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-blue-600 mb-4">24/7</div>
            <p className="text-gray-700 font-medium">
              Medical Support Availability
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-green-600 mb-4">5000+</div>
            <p className="text-gray-700 font-medium">
              Verified Healthcare Professionals
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-purple-600 mb-4">30min</div>
            <p className="text-gray-700 font-medium">Average Delivery Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
