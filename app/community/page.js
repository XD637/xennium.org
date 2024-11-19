"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiArrowRight } from "react-icons/hi"; // Importing Heroicons Arrow Right icon

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadFull } from "tsparticles";

export default function Community() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1c1c1e" } },
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.5 },
            size: { value: 4, random: true },
            move: { enable: true, speed: 1 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1.5,
            },
          },
          retina_detect: true,
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Join Our Community</h1>
        <p className="text-lg text-gray-300 italic">
          Connect with innovators, developers, and enthusiasts.
        </p>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Be a part of the growing Xennium community, where ideas come to life,
          and innovation thrives. Collaborate, share, and grow together.
        </p>

        {/* Join Discord Button */}
        <a
          href="https://discord.gg/7KmMBrrJEz" // Replace with your Discord invite link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-24 flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span>Join Discord</span>
          <HiArrowRight className="w-5 h-5" /> {/* Arrow icon */}
        </a>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
