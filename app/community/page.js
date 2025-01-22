"use client";

import Navbar from "../components/Navbar";
import { HiArrowRight } from "react-icons/hi";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";

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

      {/* Call-to-Action Buttons */}
      <main className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
        <a
          aria-label="Jump to Discord highlight"
          href="#discord"
          className="flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
        >
          <span className="text-sm sm:text-md">Discord</span>
          <HiArrowRight className="w-5 h-5" />
        </a>

        <a
          aria-label="Jump to Telegram highlight"
          href="#telegram"
          className="flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
        >
          <span className="text-sm sm:text-md">Telegram</span>
          <HiArrowRight className="w-5 h-5" />
        </a>

        <a
          aria-label="Jump to Twitter highlight"
          href="#twitter"
          className="flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
        >
          <span className="text-sm sm:text-md">Twitter</span>
          <HiArrowRight className="w-5 h-5" />
        </a>
      </main>

      {/* Community Highlights */}
      <section className="px-8 sm:px-16 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            id="discord"
            className="flex flex-col items-center text-center scroll-mt-20"
          >
            <FaDiscord className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-white">Weekly Airdrops</h3>
            <p className="text-sm text-gray-400 mt-2">
              Participate in Contests and Airdrops. Get XENX in your wallet.
            </p>
          </div>
          <div
            id="telegram"
            className="flex flex-col items-center text-center scroll-mt-20"
          >
            <FaTelegram className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-white">Real-Time Updates</h3>
            <p className="text-sm text-gray-400 mt-2">
              Stay informed about the latest developments and announcements.
            </p>
          </div>
          <div
            id="twitter"
            className="flex flex-col items-center text-center scroll-mt-20"
          >
            <FaTwitter className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-white">Global Network</h3>
            <p className="text-sm text-gray-400 mt-2">
              Connect with community members from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
