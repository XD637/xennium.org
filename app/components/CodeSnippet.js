"use client";
import { useState } from "react";
import { HiClipboardCopy } from "react-icons/hi";
import { FaEthereum } from "react-icons/fa";  // Ethereum icon

const CodeSnippet = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);  // Reset after 2 seconds
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
        className="absolute top-2 right-2 p-2 bg-transparent text-white rounded-md border border-gray-600"
      >
        <HiClipboardCopy 
          className={`text-alg ${copied ? "text-black" : "text-white"}`} 
        /> {/* White by default, black when copied */}
      </button>
    </div>
  );
};

export default CodeSnippet;
