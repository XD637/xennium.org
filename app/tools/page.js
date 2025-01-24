"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { HiSearch } from "react-icons/hi";
import Web3 from "web3";
import { isAddress } from "web3-validator";

const convertBigIntToString = (obj) => {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        newObj[key] = convertBigIntToString(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

export default function Tools() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const web3 = new Web3(process.env.NEXT_PUBLIC_POLYGON_RPC_URL);
  const XENX_TOKEN_ADDRESS = "0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0";
  const ERC20_ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const fetchDetails = async () => {
    try {
      setError("");
      if (isAddress(input)) {
        const tokenContract = new web3.eth.Contract(ERC20_ABI, XENX_TOKEN_ADDRESS);
        const balance = await tokenContract.methods.balanceOf(input).call();
        const balanceInXENX = web3.utils.fromWei(balance, "ether");

        const maticBalance = await web3.eth.getBalance(input);
        const maticInEth = web3.utils.fromWei(maticBalance, "ether");

        setResult(
          <div>
            <h3 className="text-xl font-semibold mb-2">Wallet Details</h3>
            <p className="break-words"><strong>Address:</strong> {input}</p>
            <p><strong>POL Balance:</strong> {maticInEth} POL</p>
            <p><strong>XENX Balance:</strong> {balanceInXENX} XENX</p>
          </div>
        );
        setShowModal(true);
      } else if (input.length === 66) {
        const tx = await web3.eth.getTransaction(input);
        if (tx) {
          const txDetails = convertBigIntToString(tx);
          setResult(
            <div>
              <h3 className="text-xl font-semibold mb-2">Transaction Details</h3>
              <p className="break-words"><strong>Hash:</strong> {txDetails.hash}</p>
              <p><strong>Block Number:</strong> {txDetails.blockNumber}</p>
              <p className="break-words"><strong>From:</strong> {txDetails.from}</p>
              <p className="break-words"><strong>To:</strong> {txDetails.to}</p>
              <p><strong>Value:</strong> {web3.utils.fromWei(txDetails.value, "ether")} POL</p>
            </div>
          );
          setShowModal(true);
        } else {
          setError("Transaction not found or invalid hash");
        }
      } else {
        setError("Invalid address or transaction hash");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Xennium Explorer</h1>
        <p className="text-sm text-gray-400 mb-6">
          Note: Tools are currently in beta. Please report any issues or feedback.
        </p>
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Enter address or transaction hash (e.g., 0x...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <HiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
          <button
            onClick={fetchDetails}
            className="w-40 mt-4 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </main>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-[#1e1e1e] p-6 rounded-lg shadow-lg text-gray-200 w-11/12 max-w-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              X
            </button>
            <div className="overflow-y-auto max-h-96">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
