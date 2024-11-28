"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For lazy loading components
import { motion } from "framer-motion";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContractButton from "./components/Contract";

// Lazy load heavy components
const ParticlesBackground = dynamic(() => import("./components/Particle"), { ssr: false });
const Cube = dynamic(() => import("./components/Cube"));
const FeaturesSection = dynamic(() => import("./components/Card"));
const CodeSnippet = dynamic(() => import("./components/CodeSnippet"));

export default function Home() {
  const [code, setCode] = useState(""); // State to store the code snippet

  // Fetch code snippet
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch("/codes/xennium.txt");
        if (!response.ok) throw new Error("Failed to load code snippet.");
        const text = await response.text();
        setCode(text);
      } catch (error) {
        console.error(error.message);
        setCode("Code snippet could not be loaded.");
      }
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
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Xennium - Next Gen Crypto</title>
        <meta
          name="description"
          content="Discover Xennium Token (XENX), a unique ERC-20 token with innovative features for gamification, governance, and more."
        />
        <meta property="og:title" content="Xennium - Next Gen Crypto" />
        <meta
          property="og:description"
          content="Explore the futuristic features of Xennium Token (XENX)."
        />
        <meta property="og:image" content="/Xen.png" />
        <meta name="twitter:card" content="/Xen.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Xennium",
              "url": "https://xennium.org",
              "logo": "https://xennium.org/Xen.png",
              "description":
                "Xennium is ERC 20 Token with unique - Last coin cannot be spent - constraint.",
            }),
          }}
        />
      </Head>

      {/* Main Container */}
      <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
        {/* Particle Background */}
        <ParticlesBackground />

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
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 italic">
            &quot;The Last coin cannot be spent&quot;
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-md text-gray-400 mt-3 max-w-2xl mx-auto"
          >
            Xennium Token (XENX) is an ERC-20 token built on Ethereum. With its
            unique feature &apos;Last coin cannot be spent&apos;, XENX can be
            used in Gamification, Governance, Voting, Identification
            (shareholders), and endless ideas!
          </motion.p>
          <motion.div variants={fadeInUp}>
            <ContractButton />
          </motion.div>
        </motion.main>

        {/* Cube (Lazy Loaded) */}
        <div className="relative flex items-center justify-center h-[250px]">
          <Cube />
        </div>

        {/* Code Snippet Section */}
        <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10 text-center pt-3">
            Transparency
          </h2>
          <div>
            <CodeSnippet code={code} />
          </div>
        </section>

        {/* Features Section */}
        <div className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <FeaturesSection />
        </div>

        {/* Footer */}
        <div className="pt-40">
          <Footer />
        </div>
      </div>
    </>
  );
}
