"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiArrowRight } from "react-icons/hi";

export default function Community() {
  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
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
          aria-label="Join our Discord community"
          href="https://discord.gg/7KmMBrrJEz" // Replace with your Discord invite link
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
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
