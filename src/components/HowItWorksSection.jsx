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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Unified Healthcare Ecosystem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting all aspects of healthcare delivery through seamless digital integration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-${section.color}-100`}
            >
              <div className={`bg-${section.color}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <section.icon className={`h-10 w-10 text-${section.color}-600`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 text-${section.color}-600`}>{section.title}</h3>
              <p className="text-gray-600 mb-6">{section.description}</p>
              <ul className="text-gray-600 space-y-3 text-left">
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
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Explore Full Features
          </button>
        </div>
      </div>
    </section>
  );
}
