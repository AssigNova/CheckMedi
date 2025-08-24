import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaStethoscope } from "react-icons/fa";

export default function ConsultationPlans() {
  return (
    <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Unlimited Online Doctor Consultations
              <span className="block text-blue-600 mt-4 text-3xl md:text-4xl">
                Plans starting at just ₹16.250/month
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-gray-700">
                  Instant access to 3000+ doctors
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-gray-700">24/7 availability</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-gray-700">Free follow-ups</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                Read the benefits of online Consultation
                <span className="text-xl">→</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
              >
                How online consult works
                <span className="text-xl">→</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100"
          >
            <div className="bg-blue-100 w-fit p-4 rounded-xl mb-6">
              <FaClock className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Free Daily Consultation Window
            </h3>
            <p className="text-gray-600 mb-6">
              Get free online consultation with top doctors every day
            </p>

            <div className="bg-yellow-50 p-6 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-3">
                <FaStethoscope className="text-blue-600 text-xl" />
                <span className="font-semibold text-gray-900">
                  5:00 PM - 6:00 PM
                </span>
              </div>
              <p className="text-gray-600">
                Limited slots available - Book your appointment in advance
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700"
            >
              Book Free Slot Now
            </motion.button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600"
        >
          Don't let the lockdown delay your health concerns. Safe and secure
          online consultations.
        </motion.p>
      </motion.div>
    </div>
  );
}
