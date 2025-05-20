import { UserIcon, BriefcaseIcon, TruckIcon, CheckCircleIcon } from "@heroicons/react/outline";

export default function HowItWorksSection() {
  const sections = [
    {
      title: "Patient Experience",
      color: "blue",
      icon: UserIcon,
      description: "Empowering individuals with on-demand access to comprehensive healthcare services",
      points: ["24/7 Video Consultations", "AI-Powered Symptom Checker", "Smart Prescription Tracking", "Integrated Health Records"],
    },
    {
      title: "Doctor Enablement",
      color: "green",
      icon: BriefcaseIcon,
      description: "Advanced tools for modern medical practice and patient management",
      points: ["Smart Appointment Scheduling", "Telemedicine Workflow Suite", "AI-Assisted Diagnostics", "Continuing Education Portal"],
    },
    {
      title: "Pharmacy Integration",
      color: "purple",
      icon: TruckIcon,
      description: "Streamlined medication management and delivery ecosystem",
      points: [
        "Instant Prescription Validation",
        "Smart Inventory Management",
        "Automated Delivery Tracking",
        "Integrated Payment Systems",
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our unified healthcare ecosystem connects patients, doctors, and pharmacies seamlessly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-blue-500"
            >
              <div className={`flex items-center justify-center w-16 h-16 bg-${section.color}-100 rounded-full mx-auto mb-6`}>
                <section.icon className={`h-10 w-10 text-${section.color}-600`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-${section.color}-600 text-center`}>{section.title}</h3>
              <p className="text-gray-700 mb-6 text-center">{section.description}</p>
              <ul className="text-gray-600 space-y-3">
                {section.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-indigo-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
