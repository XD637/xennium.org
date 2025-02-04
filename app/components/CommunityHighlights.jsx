"use client";

import { HiArrowRight } from "react-icons/hi";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";

export default function CommunityHighlights() {
  return (
    <section className="px-8 sm:px-16 mt-12 sm:mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {/* Discord Highlight */}
        <div
          id="discord"
          className="flex flex-col items-center text-center scroll-mt-20"
        >
          <FaDiscord className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-white">Weekly Airdrops</h3>
          <p className="text-sm text-gray-400 mt-2">
            Participate in Contests and Airdrops. Get XENX in your wallet.
          </p>
          <a
            aria-label="Join Discord"
            href="https://discord.gg/7KmMBrrJEz"
            className="mt-4 flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
          >
            <span className="text-sm sm:text-md">Join Discord</span>
            <HiArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Telegram Highlight */}
        <div
          id="telegram"
          className="flex flex-col items-center text-center scroll-mt-20"
        >
          <FaTelegram className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-white">Real-Time Updates</h3>
          <p className="text-sm text-gray-400 mt-2">
            Stay informed about the latest developments and announcements.
          </p>
          <a
            aria-label="Join Telegram"
            href="https://t.me/xennium"
            className="mt-4 flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
          >
            <span className="text-sm sm:text-md">Join Telegram</span>
            <HiArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Twitter Highlight */}
        <div
          id="twitter"
          className="flex flex-col items-center text-center scroll-mt-20"
        >
          <FaTwitter className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold text-white">Global Network</h3>
          <p className="text-sm text-gray-400 mt-2">
            Connect with community members from around the world.
          </p>
          <a
            aria-label="Follow on Twitter"
            href="https://twitter.com/Xenniumx"
            className="mt-4 flex items-center space-x-3 px-6 py-3 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
          >
            <span className="text-sm sm:text-md">Follow on Twitter</span>
            <HiArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
