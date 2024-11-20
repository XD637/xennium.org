"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadFull } from "tsparticles";

export default function Docs() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const [selectedSection, setSelectedSection] = useState("overview");

  // Sidebar Navigation Items
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "initialSupply", label: "Initial Supply" },
    { id: "minting", label: "Minting" },
    { id: "lastCoinRule", label: "Last Coin Rule" },
    { id: "functions", label: "Functions" },
  ];

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

      <div className="relative flex min-h-screen pt-16"> {/* Adjusted padding-top for space after navbar */}
        {/* Sidebar Container */}
        <div className="w-64 bg-[#2c2c2e] text-gray-300 p-4 fixed top-0 left-0 bottom-0 z-10">
          <h2 className="text-lg font-bold mb-4">Docs</h2>
          <nav>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedSection === section.id ? "bg-[#3c3c3e] text-white" : ""
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 ml-64 p-8 sm:p-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            {sections.find((section) => section.id === selectedSection)?.label}
          </h1>
          <div className="text-gray-300 space-y-4">
            {selectedSection === "overview" && (
              <p>
                The XenniumToken contract is an ERC20 token with additional
                functionalities, such as preventing spending the last token and
                allowing minting only by the owner.
              </p>
            )}
            {selectedSection === "initialSupply" && (
              <p>
                <strong>Initial Supply:</strong> The contract starts with a
                total supply of 19,000,000 tokens. 1,000,000 tokens are reserved
                for the owner, while the remaining supply is allocated to the
                contract.
              </p>
            )}
            {selectedSection === "minting" && (
              <p>
                <strong>Minting:</strong> The owner can mint additional tokens,
                but these are directly added to the contract&apos;s balance. This
                ensures controlled token distribution.
              </p>
            )}
            {selectedSection === "lastCoinRule" && (
              <p>
                <strong>Last Coin Rule:</strong> A unique feature of Xennium is
                that users cannot spend their last token. This is enforced by
                overriding the &apos;transfer&apos; and &apos;transferFrom&apos; methods.
              </p>
            )}
            {selectedSection === "functions" && (
              <ul className="list-disc list-inside">
                <li>
                  <code>transfer</code>: Transfers tokens between users while
                  adhering to the last coin rule.
                </li>
                <li>
                  <code>transferFrom</code>: Allows transfers on behalf of other
                  users with the same rule.
                </li>
                <li>
                  <code>mint</code>: Lets the owner mint additional tokens to
                  the contract.
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
