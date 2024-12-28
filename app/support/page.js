"use client";

import dynamic from "next/dynamic"; // Dynamic import for CustomSnippet
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa";

// Lazy load CustomSnippet
const CustomSnippet = dynamic(() => import("../components/CustomSnippet"), {
  ssr: false,
});

// Static Content
const code = "0x20E6827DC9FC44C747f551A08aF8244bA14046a6";

export default function Support() {
  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Support us with ETHs
        </h1>
        <p className="text-lg text-gray-300 italic">
          Be a reason to change the future.
        </p>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Provide us POLs, ETHs, or any token to help us grow, and become part of
          the Xennium community!
        </p>
      </main>

      {/* Code Snippet */}
      <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
        <CustomSnippet code={code} title="Wallet Address" />
      </section>

      <p className="relative text-md text-center text-gray-400 mt-3 max-w-2xl mx-auto">
        OR
      </p>

      {/* Gitcoin Donate Section */}
      <div className="relative flex flex-col items-center mb-12 pb-12">
        <a
          href="https://explorer.gitcoin.co/#/projects/0xeae1d90a0c580802fcfb7a53d29708ddd36dfb9f0d3f2a6816b595bc38e545a6"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          <span>Donate via Gitcoin Builder</span>
          <FaArrowRight className="text-lg" />
        </a>
      </div>
    </div>
  );
}
