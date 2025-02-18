"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import ExplorerTool from "../../components/ExplorerTool";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ExploreToolPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#121212] text-gray-200">
      <Navbar />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center text-gray-400 hover:text-purple-500 transition pt-28 pl-10"
      >
        <FaArrowLeft className="mr-2" />
        <span className="text-sm md:text-base">Back</span>
      </button>

      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 lg:px-10 gap-10 sm:gap-16 flex-grow">
        <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2 sm:gap-3">
          ExplorerX
        </h1>
        <p className="text-gray-400 text-center text-sm sm:text-base mt-2">
          Track transactions, Explore blockchain data, Powered by Xennium
        </p>
        <ExplorerTool />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700 mt-auto">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
