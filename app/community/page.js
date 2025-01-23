"use client";

import Navbar from "../components/Navbar";
import CommunityHighlights from "../components/CommunityHighlights";
import Footer from "../components/Footer"; // Assuming you already have this component

export default function Community() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1c1c1e] to-[#2a2a2c] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white pt-8 sm:pt-10 animate-fade-in">
          Join Our Community
        </h1>
        <p className="text-sm sm:text-md lg:text-lg text-gray-400 mt-3 max-w-2xl mx-auto pb-8">
          Be a part of the growing Xennium community, where ideas come to life,
          and innovation thrives. Collaborate, share, and grow together.
        </p>
      </header>

      {/* Community Highlights */}
      <CommunityHighlights />

      {/* Footer */}
      <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
