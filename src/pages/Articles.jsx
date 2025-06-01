export default function Articles() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-blue-100">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-sm">
          Health & Wellness Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">5 Tips for Managing Diabetes</h3>
            <p className="text-gray-700 mb-2 text-justify">
              Learn how to manage your diabetes with healthy eating, regular exercise, and medication adherence. Consult your doctor for a personalized plan.
            </p>
            <span className="text-sm text-gray-500">By Dr. A. Sharma | May 2025</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Understanding Hypertension</h3>
            <p className="text-gray-700 mb-2 text-justify">
              High blood pressure is a silent killer. Discover lifestyle changes and treatments that can help you control hypertension and reduce your risk of complications.
            </p>
            <span className="text-sm text-gray-500">By Dr. R. Patel | May 2025</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">The Importance of Regular Health Checkups</h3>
            <p className="text-gray-700 mb-2 text-justify">
              Routine checkups can help detect health issues early. Find out which screenings are recommended for your age and gender.
            </p>
            <span className="text-sm text-gray-500">By Dr. S. Gupta | May 2025</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">How to Prevent Common Infections</h3>
            <p className="text-gray-700 mb-2 text-justify">
              Simple hygiene practices, vaccinations, and a healthy lifestyle can protect you from many common infections.
            </p>
            <span className="text-sm text-gray-500">By Dr. M. Khan | May 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
