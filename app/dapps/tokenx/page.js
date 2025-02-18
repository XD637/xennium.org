"use client";
import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import CustomSnippet from "../../components/CustomSnippet"; // Import CustomSnippet component
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function TokenCreatorPage() {
  const router = useRouter();
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supplyLimit, setSupplyLimit] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [lctrEnabled, setLctrEnabled] = useState(false);  // State to manage LCTR checkbox
  const [permitEnabled, setPermitEnabled] = useState(false);  // State to manage ERC20Permit checkbox

  const codeRef = useRef(null);

  const generateContract = () => {
    if (!tokenName || !symbol || !supplyLimit) {
      setError("Please fill in all fields before generating the contract.");
      return;
    }

    setError(""); // Clear previous errors

    let contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ${tokenName}Token is ERC20, Ownable ${permitEnabled ? ", ERC20Permit" : ""} {
    uint256 private constant TOTAL_SUPPLY = ${supplyLimit} * 10**18;

    constructor(address recipient, address initialOwner)
        ERC20("${tokenName}", "${symbol}")
        ${permitEnabled ? `ERC20Permit("${tokenName}")` : ""}
        Ownable(initialOwner)
    {
        _mint(recipient, TOTAL_SUPPLY);
    }

    ${lctrEnabled ? ` 
    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "LCTR: Cannot spend the last coin");
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }` : ""}

}`;
    
    console.log("Generated Contract Code: ", contractCode); // Add this to debug

    setGeneratedCode(contractCode);

    // Scroll to generated code
    setTimeout(() => {
      codeRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200 flex flex-col items-center">
      <Navbar />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-gray-400 hover:text-purple-500 transition pt-28 pl-10 md:block hidden"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 lg:px-10 gap-10 sm:gap-16">
        <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2 sm:gap-3">
          TokenX 
        </h1>

        {/* Form Inputs */}
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Token Name"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="px-4 py-3 w-full border border-gray-700 bg-gray-800 text-white rounded text-center"
          />
          <input
            type="text"
            placeholder="Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="px-4 py-3 w-full border border-gray-700 bg-gray-800 text-white rounded text-center"
          />
          <input
            type="number"
            placeholder="Max Supply (in tokens)"
            value={supplyLimit}
            onChange={(e) => setSupplyLimit(e.target.value)}
            className="px-4 py-3 w-full border border-gray-700 bg-gray-800 text-white rounded text-center"
          />

          {/* LCTR Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={lctrEnabled}
              onChange={(e) => setLctrEnabled(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-600 rounded"
            />
            <label className="ml-2 text-gray-400 text-sm">
              Enable Last Coin Transfer Restriction (LCTR)
            </label>
          </div>

          {/* ERC20Permit Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={permitEnabled}
              onChange={(e) => setPermitEnabled(e.target.checked)}
              className="h-4 w-4 text-purple-600 border-gray-600 rounded"
            />
            <label className="ml-2 text-gray-400 text-sm">
              Enable ERC20Permit (for gasless transactions)
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Generate Button */}
        <button
          onClick={generateContract}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Generate Contract
        </button>

        {/* Generated Code Section */}
        <div ref={codeRef} className="w-full max-w-3xl pt-10 pb-10">
          {generatedCode && <CustomSnippet code={generatedCode} title="Token Contract Code" />}
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
