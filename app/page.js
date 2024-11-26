"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import CodeSnippet from "./components/CodeSnippet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cube from "./components/Cube";
import FeaturesSection from "./components/Card";
import ContractButton from "./components/Contract";

//const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
//import { loadFull } from "tsparticles";

export default function Home() {
  //const particlesInit = useCallback(async (engine) => {
    //await loadFull(engine);
  //}, []);

  const [code, setCode] = useState(""); // State to store the code snippet

  useEffect(() => {
    const fetchCode = async () => {
      const response = await fetch("/codes/xennium.txt");
      const text = await response.text();
      setCode(text);
    };
    fetchCode();
  }, []);

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
      {/* Navbar */}
      <Navbar />

      {/* Main Content (Animated) */}
      <motion.main 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6"
      >
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-extrabold text-white"
        >
          Xennium - Next Gen Crypto
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-gray-300 italic"
        >
          &quot;The Last coin cannot be spent&quot;
        </motion.p>
        <motion.p 
          variants={fadeInUp}
          className="text-md text-gray-400 mt-3 max-w-2xl mx-auto"
        >
          Xennium Token (XENX) is an ERC-20 token built on Ethereum. With its unique feature
          &apos;Last coin cannot be spent&apos;, XENX can be used in Gamification, Governance, Voting,
          Identification (shareholders), and endless ideas!
        </motion.p>
        <motion.div variants={fadeInUp}>
          <ContractButton />
        </motion.div>
      </motion.main>

      {/* Cube (No Animation) */}
      <div className="relative flex items-center justify-center h-[250px]">
        <Cube />
      </div>

      {/* Code Snippet (No Animation) */}
      <section className="relative z-10 pat-12 px-8 sm:px-16 text-left mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10 text-center">
          Transparency
        </h2>
        <div>
          <CodeSnippet code={code} />
        </div>
      </section>

      {/* Features Section (No Animation) */}
      <div className="relative z-10 pat-12 px-8 sm:px-16 text-left mb-12">
        <FeaturesSection />
      </div>

      {/* Footer */}
      <div className="pt-40">
        <Footer />
      </div>
    </div>
  );
}
