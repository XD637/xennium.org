"use client";

import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import ParticlesBackground from "../components/Particle";

export default function Community() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Particle */}
      <ParticlesBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content (Animated) */}
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-extrabold text-white"
        >
          Join Our Community
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg text-gray-300 italic">
          Connect with innovators, developers, and enthusiasts.
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-md text-gray-400 mt-3 max-w-2xl mx-auto pb-6"
        >
          Be a part of the growing Xennium community, where ideas come to life,
          and innovation thrives. Collaborate, share, and grow together.
        </motion.p>

        {/* Join Discord Button */}
        <motion.a
          variants={fadeInUp} // Ensure it uses the same animation variant
          aria-label="Join our Discord community"
          href="https://discord.gg/7KmMBrrJEz" // Replace with your Discord invite link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 border-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:border-gradient-to-br hover:scale-105 transition-all duration-300"
        >
          <span>Join Discord</span>
          <HiArrowRight className="w-5 h-5" /> {/* Arrow icon */}
        </motion.a>
      </motion.main>

      {/* Footer (No Animation) */}
      <Footer />
    </div>
  );
}
