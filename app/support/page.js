"use client";

import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";
import ParticlesBackground from "../components/Particle";

export default function Support() {
  const code = "0x20E6827DC9FC44C747f551A08aF8244bA14046a6";

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

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
          Support us with ETHs
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-300 italic"
        >
          Be a reason to change the future.
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-md text-gray-400 mt-3 max-w-2xl mx-auto"
        >
          Provide ETHs, SepETHs, or even your own token to help us grow, 
          and become part of the Xennium community!
        </motion.p>
      </motion.main>

      {/* Code Snippet (No Animation) */}
      <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
        <CodeSnippet code={code} />
      </section>

      {/* Footer (No Animation) */}
      <Footer />
    </div>
  );
}
