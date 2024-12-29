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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white pt-32">
          Support us with ETHs
        </h1>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Provide us POLs, ETHs, or any token to help us grow, and become part of
          the Xennium community!
        </p>
      </main>

      {/* Code Snippet */}
      <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
        <CustomSnippet code={code} title="Wallet Address" />
      </section>
    </div>
  );
}
