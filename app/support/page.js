"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadFull } from "tsparticles";

export default function Support() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const code ="0x20E6827DC9FC44C747f551A08aF8244bA14046a6";

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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Support us with ETHs</h1>
        <p className="text-lg text-gray-300 italic">
          Be a reason to change the future.
        </p>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Provide Eths, SepEths or even your own token to prosper us,
          And be a part of our Xennium community!
        </p>
      </main>

      
      {/* Code Snippet */}
      <section className="relative z-10 pat-12 px-8 sm:px-16 text-left mb-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10 tex text-center"></h2>
        <CodeSnippet code={code} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
