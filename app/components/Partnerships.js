'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const Partnerships = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white">
      SpicyGnomes
      </h2>
      <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base">
        By LittleBao
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start bg-[#252525] p-4 sm:p-6 rounded-lg">
        {/* Left Section - Image */}
        <div className="relative w-full sm:w-1/3 flex justify-center">
        <span className="absolute top-2 left-9 sm:left-6 bg-black bg-opacity-50 text-white text-xs sm:text-sm px-2 py-1 rounded">
  40 $POL
</span>


          <Image
            src="/collabs/mint-nft.jpg"
            alt="SpicyGnomes"
            width={180}
            height={180}
            className="rounded-lg"
          />
        </div>

        {/* Right Section - Text & Button */}
        <div className="w-full sm:w-2/3 mt-4 sm:mt-0 sm:pl-6 text-white text-center sm:text-left">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            SpicyGnomes is a unique NFT collection that brings gnomes to the blockchain, featuring rare and spicy designs.
          </p>
          <a
            href="https://gnomes.littlebaonft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center sm:justify-start bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm md:text-base font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Visit SpicyGnomes
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Partnerships
