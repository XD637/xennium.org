"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CustomSnippet from "../../components/CustomSnippet"; // Import CustomSnippet component

export default function TokenCreatorPage() {
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supplyLimit, setSupplyLimit] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const contractCode = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

    contract ${tokenName || "MyToken"}Token is ERC20, Ownable, ERC20Permit {
        uint256 private constant TOTAL_SUPPLY = ${supplyLimit || "1000"} * 10**18; // Default supply if not provided

        constructor() 
            ERC20("${tokenName || "MyToken"}", "${symbol || "MTK"}") 
            ERC20Permit("${tokenName || "MyToken"}") 
            Ownable(msg.sender) 
        {
            // Mint the total supply to the contract
            _mint(address(this), TOTAL_SUPPLY);

            // Transfer all tokens except one to the owner
            uint256 amountToTransfer = TOTAL_SUPPLY - 1;
            _transfer(address(this), msg.sender, amountToTransfer);
        }

        // Last Coin Transfer Restriction (LCTR) Principle
        function _safeTransferCheck(address from, uint256 amount) internal view {
            require(balanceOf(from) - amount >= 1, "LCTR: Cannot spend the last coin");
        }

        // Override transfer with LCTR check
        function transfer(address to, uint256 amount) public override returns (bool) {
            _safeTransferCheck(msg.sender, amount);
            return super.transfer(to, amount);
        }

        // Override transferFrom with LCTR check
        function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
            _safeTransferCheck(from, amount);
            return super.transferFrom(from, to, amount);
        }
    }`;

    setGeneratedCode(contractCode);
  }, [tokenName, symbol, supplyLimit]); // Watch all inputs for changes

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col md:flex-row items-start justify-center min-h-screen px-6 md:px-10 lg:px-20 space-y-8 md:space-y-0 py-6 pt-28">
        {/* Left Section - Form Fields */}
        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 pt-28">
            TokenX
          </h1>
          <p className="text-sm md:text-base text-gray-400 text-center mb-6">
            Create your own Xennium-like token with Last Coin Transfer Restriction (LCTR).
          </p>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Token Name"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="px-4 py-3 w-full max-w-xs mx-auto border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="px-4 py-3 w-full max-w-xs mx-auto border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            placeholder="Max Supply (in tokens)"
            value={supplyLimit}
            onChange={(e) => setSupplyLimit(e.target.value)}
            className="px-4 py-3 w-full max-w-xs mx-auto border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Right Section - Generated Code */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 pt-28">
          {generatedCode && (
            <CustomSnippet code={generatedCode} title="Token Contract Code" />
          )}
        </div>
      </main>

      <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; 2025 Xennium. All rights reserved.</p>
      </footer>
    </div>
  );
}
