import { useState } from "react";

export default function HealthAssistance() {
  const faqs = [
    {
      question: "What should I do if I have a fever?",
      answer:
        "Stay hydrated, get plenty of rest, and monitor your temperature. If your fever is above 102°F (38.9°C) or persists more than 3 days, consult a doctor immediately.",
    },
    {
      question: "How often should I go for a health check-up?",
      answer:
        "It depends on your age and health condition. Generally, adults should have a checkup once a year. People with chronic conditions may need more frequent visits.",
    },
    {
      question: "How can I boost my immunity naturally?",
      answer:
        "Eat a balanced diet, exercise regularly, get adequate sleep, and manage stress. Avoid smoking and limit alcohol. Vaccinations also play an important role.",
    },
    {
      question: "When should I visit the emergency room?",
      answer:
        "Seek emergency care if you experience chest pain, severe shortness of breath, sudden weakness, uncontrolled bleeding, or loss of consciousness.",
    },
    {
      question: "What are some ways to manage stress?",
      answer:
        "Practice deep breathing, meditation, yoga, or mindfulness. Engage in hobbies, spend time with loved ones, and maintain a healthy work-life balance.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-blue-100">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-sm">
          Health Assistance FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-blue-100 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-blue-800 hover:bg-blue-50"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
                <span className="ml-2 text-blue-500">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="p-4 bg-blue-50 text-gray-700 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
