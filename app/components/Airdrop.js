"use client";

import { useState } from "react";
import { X, Gift } from "lucide-react"; // Close and Gift icons

export default function AirdropBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null; // Hide if dismissed

  return (
    <div
      className={`fixed bottom-4 right-4 sm:right-8 bg-gradient-to-r from-purple-500 to-purple-900 text-white 
      px-4 py-2 rounded-lg shadow-lg flex items-center transition-all duration-300 z-50 ${
        isHovered ? "w-auto opacity-100" : "w-12 opacity-80 sm:w-14"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <>
          <Gift size={18} className="mr-2" />
          <span className="text-sm">Airdrop Live!</span>
          <a
            href="https://airdrop.xennium.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white text-xs font-medium px-3 py-1 rounded-md ml-2 hover:scale-105 transition-transform"
          >
            Claim
          </a>
          <button onClick={() => setIsVisible(false)} className="text-white hover:text-gray-300 ml-2">
            <X size={16} />
          </button>
        </>
      ) : (
        <Gift size={18} />
      )}
    </div>
  );
}
