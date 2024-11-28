"use client";
import { useState } from "react";
import { HiCheck } from "react-icons/hi"; // Check icon
import { FaEthereum } from "react-icons/fa"; // Ethereum icon
import Image from "next/image";

const CodeSnippet = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative p-4 rounded-md overflow-auto bg-[#2d2d2d] text-white border border-gray-700 shadow-lg w-full max-w-3xl mx-auto">
      {/* Header for the snippet */}
      <div className="flex items-center mb-2 text-white text-lg font-semibold">
        <FaEthereum className="mr-2 text-[#8A2BE2]" /> {/* Ethereum icon in violet */}
        Solidity
      </div>

      <pre className="text-xs font-mono whitespace-pre-wrap">{code}</pre>

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 flex items-center gap-1 p-2 bg-transparent text-white rounded-md transition-all duration-200 hover:bg-gray-800"
      >
        {copied ? (
          <>
            <HiCheck className="text-white w-4 h-4" /> {/* White tick icon */}
          </>
        ) : (
          <>
            <Image
              src="/basic-icons/copy.svg"
              width={10}
              height={10}
              alt="Copy"
              className="w-4 h-4 filter invert" // Smaller size and white color
            /> {/* Custom SVG icon */}
          </>
        )}
      </button>
    </div>
  );
};

export default CodeSnippet;
