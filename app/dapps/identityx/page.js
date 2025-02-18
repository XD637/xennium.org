"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Loader2 } from "lucide-react";
import ConnectWallet from "../../components/ConnectWallet";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const contractAddress = "0x6144Bb0DaDDFa0949302DB4C5C5Ae8f360cd29CF"; // Replace with your contract address

const contractABI = [
  {
    "inputs": [],
    "name": "mintPassport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function MintPassport() {
  const [minting, setMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages
  const { writeContract } = useWriteContract();
  const router = useRouter();

  const handleMint = async () => {
    setMinting(true);
    setErrorMessage(""); // Reset error before minting
    try {
      await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "mintPassport",
      });
      console.log("Passport minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);

      // Ensure error is safely accessed
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Minting failed. Please try again.");
      }
    }
    setMinting(false);
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200 flex flex-col justify-between">
      <Navbar />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center text-gray-400 hover:text-purple-500 transition pt-28 pl-10"
      >
        <FaArrowLeft className="mr-2" />
        <span className="text-sm md:text-base">Back</span>
      </button>

      {/* Connect Button Outside the Container */}
      <div className="absolute top-6 right-6 pt-32">
        <ConnectWallet />
      </div>

      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 lg:px-10 gap-10 sm:gap-16 flex-grow">
        <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2 sm:gap-3">
          IdentityX
        </h1>
        <p className="text-gray-400 text-center text-sm sm:text-base mt-2">
          Mint our IDXP DID Passport for exclusive rights, Powered by Xennium.
        </p>
          

        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md text-center w-full max-w-md">
          <button
            onClick={handleMint}
            disabled={minting}
            className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {minting ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Minting...</span>
              </>
            ) : (
              "Mint Passport"
            )}
          </button>

          {/* Error Message Display */}
          {errorMessage && (
            <p className="mt-3 text-purple-500 text-sm">{errorMessage}</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700 w-full">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
