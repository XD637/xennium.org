"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Dapps() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center pt-16 px-6 md:px-10 lg:px-20">

        {/* Grid for responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl pt-20">
          {/* Xennium Explorer */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-md flex-1 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              ExplorerX
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              The Xennium Explorer allows users to explore blockchain data, track transactions, and interact with the network efficiently.
            </p>
            <button
              onClick={() => router.push("/dapps/explorerx")}
              className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition text-sm md:text-base"
            >
              Launch Dapp
            </button>
          </div>

          {/* Xennium Token Creator */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-md flex-1 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              TokenX
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              Create Xennium-like tokens with the Last Coin Transfer Restriction (LCTR) rule for secure and tamper-free transactions.
            </p>
            <button
              onClick={() => router.push("/dapps/tokenx")}
              className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition text-sm md:text-base"
            >
              Launch Dapp
            </button>
          </div>

          {/* GovernanceX */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-md flex-1 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              GovernanceX
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              Create proposals and vote on important decisions within the Xennium ecosystem.
            </p>
            <button
              className="mt-6 bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded-lg cursor-not-allowed text-sm md:text-base"
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* IdentificationX */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-md flex-1 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              IdentificationX
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              Create a unique NFT ID by holding the last Xennium coin in our community.
            </p>
            <button
              className="mt-6 bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded-lg cursor-not-allowed text-sm md:text-base"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
        
      </main>
        {/* Footer */}
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
