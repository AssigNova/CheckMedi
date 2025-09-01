import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [slide, setSlide] = useState(0);

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

  useEffect(() => {
    if (slide === 0) {
      const timer = setTimeout(() => setSlide(1), 5000);
      return () => clearTimeout(timer);
    }
  }, [slide]);

  const normalizedX =
    (cursorPosition.x - windowSize.width / 2) / (windowSize.width / 2);
  const normalizedY =
    (cursorPosition.y - windowSize.height / 2) / (windowSize.height / 2);

  return (
    <section className="py-10 px-2 sm:py-16 sm:px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {slide === 0 ? (
        <>
          {/* Background Circles - smaller and repositioned on mobile */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-300 rounded-full opacity-30"
            animate={{
              x: normalizedX * 30,
              y: normalizedY * 30,
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-28 h-28 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-indigo-400 rounded-full opacity-20"
            animate={{
              x: normalizedX * -25,
              y: normalizedY * -25,
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 15 },
              y: { type: "spring", stiffness: 40, damping: 15 },
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 opacity-20"
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Content */}
          <div className="max-w-6xl mx-auto text-center relative z-10 px-1 sm:px-2">
            <motion.h1
              className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Revolutionizing Healthcare
              <motion.span
                className="text-blue-600 block mt-2 text-lg sm:text-3xl md:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Through Digital Connection
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto px-1 sm:px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Bridging the gap between patients, doctors, and pharmacies with an
              integrated digital healthcare platform.
            </motion.p>

            {/* Buttons - stack vertically on mobile, horizontally on sm+ */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-1 sm:px-4 w-full sm:w-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <a href="/dashboard" className="w-full sm:w-auto">
                <motion.button
                  className="w-full bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I am a Patient
                </motion.button>
              </a>
              <a href="/dashboard" className="w-full sm:w-auto">
                <motion.button
                  className="w-full bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Doctor's Cabin
                </motion.button>
              </a>
              <a href="/dashboard" className="w-full sm:w-auto">
                <motion.button
                  className="w-full bg-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pharmacy Store
                </motion.button>
              </a>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[300px] sm:h-[400px]">
          <img
            src="/src/assets/MediCheck.png"
            alt="Healthcare"
            className="max-h-full max-w-full rounded-xl shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
