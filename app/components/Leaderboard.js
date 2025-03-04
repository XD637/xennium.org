'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

const fakeLeaders = [
  { wallet: '0x20E...46a6', balance: '999,988,476' },
  { wallet: '0xF3B...23a3', balance: '4,099' },
  { wallet: '0xADf...f14D', balance: '3,000' },
  { wallet: '0xD72...1352', balance: '999' },
  { wallet: '0x9dD...A6c7', balance: '997' },
]

const Leaderboard = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
        <Crown size={24} className="text-yellow-400" />
        Top Holders
      </h2>
      <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base">
        By Xennium
      </p>

      <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {fakeLeaders.map((user, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-between bg-[#252525] p-2 sm:p-3 md:p-4 rounded-lg ${
              index < 3 ? 'border-l-4 border-yellow-400' : ''
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-300">#{index + 1}</span>
              <span className="text-xs sm:text-sm md:text-base text-gray-200">{user.wallet}</span>
            </div>
            <span className="text-purple-400 font-semibold text-xs sm:text-sm md:text-base">
              {user.balance} XENX
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
