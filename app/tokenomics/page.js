'use client'

import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { Users, Code, Lock } from 'lucide-react'
import { FaEthereum } from 'react-icons/fa'
import SocialFooter from '../components/SocialFooter'
import CustomSnippet from '../components/CustomSnippet'

const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract XenniumToken is ERC20, Ownable, ERC20Permit {
    uint256 private constant TOTAL_SUPPLY = 19_000_000_000 * 10**18; // 19 billion tokens MAX SUPPLY
    uint256 private constant COMMUNITY_RESERVE = 3_000_000_000 * 10**18; // 3 billion tokens reserved for the community
    uint256 private constant DEVELOPMENT_RESERVE = 1_000_000_000 * 10**18; // 1 billion tokens reserved for development

    constructor() 
        ERC20("Xennium", "XENX") 
        ERC20Permit("Xennium") 
        Ownable(msg.sender) 
    {
        _mint(address(this), TOTAL_SUPPLY);
        _transfer(address(this), msg.sender, DEVELOPMENT_RESERVE);
    }

    function _safeTransferCheck(address from, uint256 amount) internal view {
        require(balanceOf(from) - amount >= 1, "XENX: Cannot spend the last coin");
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(msg.sender, amount);
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _safeTransferCheck(from, amount);
        return super.transferFrom(from, to, amount);
    }

    function communityReserve() external pure returns (uint256) {
        return COMMUNITY_RESERVE;
    }
}
`

const tokenData = [
  {
    title: 'Total Supply',
    amount: '19,000,000,000 XENX',
    description: 'The maximum supply of XENX tokens is capped to ensure scarcity and long-term value.',
    icon: <FaEthereum size={22} className="text-purple-400" />,
  },
  {
    title: 'Community Reserve',
    amount: '3,000,000,000 XENX',
    description: 'Allocated for community incentives, airdrops, and engagement initiatives.',
    icon: <Users size={22} className="text-purple-400" />,
  },
  {
    title: 'Development Reserve',
    amount: '1,000,000,000 XENX',
    description: 'Reserved for core development, upgrades, and protocol expansion.',
    icon: <Code size={22} className="text-purple-400" />,
  },
  {
    title: 'LCTR Protocol',
    amount: '1 XENX required',
    description: 'A unique mechanism where users cannot transfer their final token to preserve on-chain presence.',
    icon: <Lock size={22} className="text-purple-400" />,
  },
]

export default function Tokenomics() {
  return (
    <>
      <Head>
        <title>XENX Tokenomics - Xennium</title>
        <meta name="description" content="Explore the tokenomics of XENX: Total supply, community reserve, development fund, and LCTR mechanism." />
        <meta property="og:title" content="XENX Tokenomics - Xennium" />
        <meta property="og:description" content="Learn about the XENX token supply, community allocation, and development reserves. Powered by the LCTR principle." />
        <meta name="twitter:title" content="XENX Tokenomics - Xennium" />
        <meta name="twitter:description" content="Understand how XENX is distributed. Join the Web3 revolution with Xennium." />
      </Head>

      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />

        <main className="flex flex-col items-center pt-32 sm:pt-40 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 gap-20">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2">Tokenomics</h1>
          <p className="text-gray-400 text-center mt-2  text-sm sm:text-base">
              Built on core community and development values, enforced with LCTR.
            </p>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-20 w-full max-w-6xl">

            {tokenData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#252525] p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                </div>
                <p className="text-purple-400 font-bold text-lg">{item.amount}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </section>

          <section className="w-full max-w-5xl text-center pt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Transparency</h2>
            </section>
      
              <CustomSnippet code={code} title="Solidity" />
        </main>

        <SocialFooter className="mt-24" />
      </div>
    </>
  )
}
