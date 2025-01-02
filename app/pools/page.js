"use client";

import Navbar from "../components/Navbar";
import { HiArrowRight } from "react-icons/hi";

export default function Pools() {
  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-6xl sm:text-5xl font-extrabold text-white pt-32">
          Coming Soon
        </h1>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto pb-6">
          Our Pools feature is under development and will be available soon! Stay tuned for updates and exciting features.
        </p>

        {/* Track Our Pools Button */}
        <a
          aria-label="Track our pools"
          href="https://www.geckoterminal.com/polygon_pos/pools/0x651e2be0982bdf74c0c92b07220bdbc0377c4a89"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 border-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:border-gradient-to-br hover:scale-105 transition-all duration-300"
        >
          <span>Track Our Pools</span>
          <HiArrowRight className="w-5 h-5" />
        </a>
      </main>
    </div>
  );
}
