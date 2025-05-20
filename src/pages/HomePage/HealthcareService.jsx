import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaVideo, FaUserMd } from "react-icons/fa";

export default function HealthcareService() {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Find Doctors Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-fit p-4 rounded-xl mb-6">
              <FaMapMarkerAlt className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Doctors Near You</h3>
            <p className="text-gray-600 mb-6">Select preferred doctor and time slots to book an in-clinic or video consultation</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Find Doctors Now
            </motion.button>
          </motion.div>

          {/* Online Doctors Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-fit p-4 rounded-xl mb-6">
              <FaVideo className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Doctors Online Now</h3>
            <p className="text-gray-600 mb-6">Tell us your health concern and we'll connect you with a top doctor in 60 seconds</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Start Consulting
            </motion.button>
          </motion.div>

          {/* Medical Professional Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-fit p-4 rounded-xl mb-6">
              <FaUserMd className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Medical Professional?</h3>
            <p className="text-gray-600 mb-6">Join our network of healthcare providers and expand your practice</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Already registered?
            <a href="/login" className="text-blue-600 hover:underline ml-2">
              Sign in here
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
