'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, Rocket, Shield, Users } from 'lucide-react'
import { Compass } from 'lucide-react'

const features = {
  ExplorerX: [
    { icon: <Rocket size={24} />, text: 'Real-time blockchain data' },
    { icon: <Shield size={24} />, text: 'Secure and transparent' },
    { icon: <Users size={24} />, text: 'User-friendly insights' },
  ],
  TokenX: [
    { icon: <CheckCircle size={24} />, text: 'Create secure tokens' },
    { icon: <Shield size={24} />, text: 'LCTR-enabled protection' },
    { icon: <Rocket size={24} />, text: 'Fast and efficient' },
  ],
  GovernanceX: [
    { icon: <Users size={24} />, text: 'Community-driven' },
    { icon: <Shield size={24} />, text: 'Tamper-proof voting' },
    { icon: <Rocket size={24} />, text: 'Empower decision-making' },
  ],
  IdentityX: [
    { icon: <Shield size={24} />, text: 'Decentralized identity' },
    { icon: <CheckCircle size={24} />, text: 'LCTR-based security' },
    { icon: <Users size={24} />, text: 'Unique NFT verification' },
  ],
}

function DAppSection({ number, title, description, path, available, featuresList, reversed }) {
  const router = useRouter()

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center gap-10 bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-5xl min-h-[280px] ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Super Large Number - Alternating Positions */}
      <span
        className={`absolute text-[12rem] font-bold text-gray-700 opacity-10 leading-none ${
          reversed ? 'right-0 -mr-20' : 'left-0 -ml-20'
        }`}
      >
        {number}
      </span>

      <div className="flex-1 text-left">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 mt-2">{description}</p>
        {available ? (
          <button
            onClick={() => router.push(path)}
            className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Launch DApp
          </button>
        ) : (
          <button
            className="mt-6 bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded-lg cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-start gap-4">
        {featuresList.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 bg-[#252525] p-3 rounded-lg w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-purple-400">{feature.icon}</span>
            <p className="text-gray-300">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Dapps() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      signIn(undefined, { callbackUrl: '/dapps' })
    } else {
      setLoading(false)
    }
  }, [session, status])

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-gray-200">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
          <p className="text-sm mt-4">Sign-in before continuing...</p>
        </div>
      </div>
    )
  }

  const dAppsList = [
    {
      title: 'ExplorerX',
      description: 'Analyze blockchain data, track transactions, and explore the Xennium network.',
      path: '/dapps/explorerx',
      available: true,
      featuresList: features.ExplorerX,
    },
    {
      title: 'TokenX',
      description: 'Easily create Xennium-compatible tokens with LCTR security.',
      path: '/dapps/tokenx',
      available: true,
      featuresList: features.TokenX,
    },
    {
      title: 'GovernanceX',
      description: 'Participate in decentralized governance by proposing and voting.',
      available: false,
      featuresList: features.GovernanceX,
    },
    {
      title: 'IdentityX',
      description: 'Secure your decentralized identity by minting an NFT ID with LCTR.',
      path: '/dapps/identityx',
      available: true,
      featuresList: features.IdentityX,
    },
  ]

  return (
    <>
      <Head>
        <title>Xennium DApps - Explore, Build, and Innovate</title>
      </Head>
      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />
        <main className="flex flex-col items-center pt-40 px-6 md:px-10 lg:px-20 gap-16">
        <h1 className="text-6xl font-bold text-white text-center flex items-center gap-3">
  Explore DApps <Compass size={12} className="text-gray-700" />
</h1>
<p className="text-gray-400 text-center mt-2">
  Discover decentralized applications powered by Xennium.
</p>
          {dAppsList.map((dapp, index) => (
            <DAppSection key={index} number={index + 1} reversed={index % 2 !== 0} {...dapp} />
          ))}
        </main>
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Xennium. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
