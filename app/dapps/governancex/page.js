"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Loader2 } from "lucide-react";
import ConnectWallet from "../../components/ConnectWallet";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const contractAddress = "0xYourGovernanceContractAddress"; // Replace with actual contract address

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_description", "type": "string" }
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_proposalId", "type": "uint256" },
      { "internalType": "bool", "name": "_vote", "type": "bool" }
    ],
    "name": "voteOnProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function GovernanceX() {
  const [creating, setCreating] = useState(false);
  const [voting, setVoting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [proposal, setProposal] = useState("");
  const { writeContract } = useWriteContract();
  const router = useRouter();

  const handleCreateProposal = async () => {
    if (!proposal) return;
    setCreating(true);
    setErrorMessage("");
    try {
      await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createProposal",
        args: [proposal],
      });
      console.log("Proposal created successfully!");
    } catch (error) {
      console.error("Proposal creation failed:", error);
      setErrorMessage(error instanceof Error ? error.message : "Proposal creation failed.");
    }
    setCreating(false);
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200 flex flex-col justify-between">
      <Navbar />

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-gray-400 hover:text-purple-500 transition pt-28 pl-10 md:block hidden"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 lg:px-10 gap-10 sm:gap-16 flex-grow">
        <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">GovernanceX</h1>

        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md text-center w-full max-w-md">
          <div className="mb-6">
            <ConnectWallet />
          </div>
          
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            placeholder="Enter your proposal description..."
            className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          />
          
          <button
            onClick={handleCreateProposal}
            disabled={creating}
            className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform mt-4"
          >
            {creating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Creating...</span>
              </>
            ) : (
              "Create Proposal"
            )}
          </button>

          {errorMessage && <p className="mt-3 text-purple-500 text-sm">{errorMessage}</p>}
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-700 w-full">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}