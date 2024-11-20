"use client";
import { useCallback } from "react";
import dynamic from "next/dynamic";
import CodeSnippet from "./components/CodeSnippet";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cube from "./components/Cube";
import FeaturesSection from "./components/Card";
import ContractButton from "./components/Contract";





const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });
import { loadFull } from "tsparticles";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract XenniumToken is ERC20, Ownable, ERC20Permit {
    uint256 private constant INITIAL_SUPPLY = 19_000_000 * 10**18; // 19 million tokens
    uint256 private constant OWNER_RESERVE = 1_000_000 * 10**18;  // 1 million tokens reserved for the owner

    // Declare event for minting
    event TokensMinted(address indexed to, uint256 amount);

    constructor() ERC20("Xennium", "XENX") ERC20Permit("Xennium") Ownable(msg.sender) {
        _mint(msg.sender, OWNER_RESERVE); // Reserve 1 million tokens for the owner
        _mint(address(this), INITIAL_SUPPLY - OWNER_RESERVE); // Mint remaining supply to the contract
    }

    // Prevent the last coin from being spent (Xennium special rule)
    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "XENX: Cannot spend the last coin");
    }

    // Override transfer with last coin check
    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    // Override transferFrom with last coin check
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }

    // Allow the owner to mint new tokens only to the contract's balance
    function mint(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
        emit TokensMinted(address(this), amount);
    }
}
`;

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1c1c1e" } },
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.5 },
            size: { value: 4, random: true },
            move: { enable: true, speed: 1 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1.5,
            },
          },
          retina_detect: true,
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Xennium - Next Gen Crypto
        </h1>
        <p className="text-lg text-gray-300 italic">
        &quot;The Last coin cannot be spent&quot;
        </p>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Xennium Token (XENX) is an ERC-20 token built on Ethereum. With its unique feature
          &apos;Last coin cannot be spent&apos;, XENX can be used in Gamification, Governance, Voting,
          Identification (shareholders), and endless ideas!
        </p>
        <div>
        <ContractButton />
        </div>
        
      </main>

      {/* Cube */}
      <div className="relative flex items-center justify-center h-[250px]">
        <Cube />
      </div>

      {/* Code Snippet */}
      <section className="relative z-10 pat-12 px-8 sm:px-16 text-left mb-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10 tex text-center">Transparency</h2>
        <CodeSnippet code={code} />
      </section>
      <FeaturesSection />

      {/* Footer */}
      <div className="pt-40">
        <Footer />
      </div>
    </div>
  );
}
