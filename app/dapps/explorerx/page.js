"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import ExplorerTool from "../../components/ExplorerTool";

export default function ExploreToolPage() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-6 md:px-10 lg:px-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          ExplorerX
        </h1>
        <p className="text-sm md:text-base text-gray-400 mb-6 text-center max-w-lg">
          The Xennium Explorer helps users track transactions, explore blockchain data, and interact with the network.
        </p>
        <ExplorerTool />
      </main>
        {/* Footer */}
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
