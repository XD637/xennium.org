"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { loadFull } from "tsparticles";

// Dynamically import the Particles component to avoid server-side rendering
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Load full configuration for the particles engine
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "#1c1c1e" } },
        particles: {
          number: {
            value: 50,
            density: { enable: true, value_area: 800 },
          },
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
        retina_detect: true, // Enable retina detection for high-res screens
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default ParticlesBackground;
