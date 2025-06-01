import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mediCheckImg from "../assets/MediCheck.png";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const sliderImages = [mediCheckImg, img1, img2, img3];

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);
  const [direction, setDirection] = useState(1);

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
    const interval = setInterval(() => {
      setPrevImage(currentImage);
      setCurrentImage((prev) => {
        setDirection(1);
        return (prev + 1) % sliderImages.length;
      });
    }, 6500);
    return () => clearInterval(interval);
  }, [currentImage]);

  // Calculate normalized cursor position (-1 to 1) relative to window center
  const normalizedX = (cursorPosition.x - windowSize.width / 2) / (windowSize.width / 2);
  const normalizedY = (cursorPosition.y - windowSize.height / 2) / (windowSize.height / 2);

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated Background Image Slider with Slide Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentImage}
            src={sliderImages[currentImage]}
            alt="Healthcare background"
            className="w-full h-full object-fill object-center absolute inset-0"
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 0.9 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.9 }}
            transition={{ x: { type: "tween", duration: 1 }, opacity: { duration: 1 } }}
          />
        </AnimatePresence>
        {/* Overlay for content visibility */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-black rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: [0.08, 0.12, 0.1],
          x: normalizedX * 50,
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
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-black rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: [0.06, 0.1, 0.08],
          x: normalizedX * -40,
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
        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* Rest of your content remains the same */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
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
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-white"
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
          <a href="/patient">
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              I am a Patient
            </motion.button>
          </a>
          <a href="/doctor">
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Doctor's Cabin
            </motion.button>
          </a>
          <a href="/pharmacy">
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
