import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate normalized cursor position (-1 to 1) relative to window center
  const normalizedX = (cursorPosition.x - windowSize.width / 2) / (windowSize.width / 2);
  const normalizedY = (cursorPosition.y - windowSize.height / 2) / (windowSize.height / 2);

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0.2, 0.4, 0.3],
          x: normalizedX * 50, // Adjust multiplier for movement range
          y: normalizedY * 50,
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 6, repeat: Infinity, repeatType: "reverse" },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400 rounded-full opacity-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0.7, 1.1, 0.9],
          opacity: [0.2, 0.5, 0.3],
          x: normalizedX * -40, // Negative multiplier for opposite direction
          y: normalizedY * -40,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          x: { type: "spring", stiffness: 40, damping: 15 },
          y: { type: "spring", stiffness: 40, damping: 15 },
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 opacity-20"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* Rest of your content remains the same */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Revolutionizing Healthcare
          <motion.span
            className="text-blue-600 block mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Through Digital Connection
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Bridging the gap between patients, doctors, and pharmacies with an integrated digital healthcare platform
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <a href="/dashboard">
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              I am a Patient
            </motion.button>
          </a>
          <a href="/dashboard">
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Doctor's Cabin
            </motion.button>
          </a>
          <a href="/dashboard">
            <motion.button
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Pharmacy Store
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
