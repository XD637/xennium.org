'use client'

import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, Rocket, Shield, Users } from 'lucide-react'

const features = {
  ExplorerX: [
    { icon: <Rocket size={20} />, text: 'Real-time blockchain data' },
    { icon: <Shield size={20} />, text: 'Secure and transparent' },
    { icon: <Users size={20} />, text: 'User-friendly insights' },
  ],
  TokenX: [
    { icon: <CheckCircle size={20} />, text: 'Create secure tokens' },
    { icon: <Shield size={20} />, text: 'LCTR-enabled protection' },
    { icon: <Rocket size={20} />, text: 'Fast and efficient' },
  ],
  GovernanceX: [
    { icon: <Users size={20} />, text: 'Community-driven' },
    { icon: <Shield size={20} />, text: 'Tamper-proof voting' },
    { icon: <Rocket size={20} />, text: 'Empower decision-making' },
  ],
  IdentityX: [
    { icon: <Shield size={20} />, text: 'Decentralized identity' },
    { icon: <CheckCircle size={20} />, text: 'LCTR-based security' },
    { icon: <Users size={20} />, text: 'Unique NFT verification' },
  ],
}

function DAppSection({ title, description, path, available, featuresList, reverse }) {
  const router = useRouter()
  return (
    <motion.div 
      className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-8 bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm md:text-base text-gray-400 mt-2">{description}</p>
        {available ? (
          <button
            onClick={() => router.push(path)}
            className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition text-sm md:text-base"
          >
            Launch DApp
          </button>
        ) : (
          <button
            className="mt-6 bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded-lg cursor-not-allowed text-sm md:text-base"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center gap-4">
        {featuresList.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-3 bg-[#252525] p-3 rounded-lg w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-purple-400">{feature.icon}</span>
            <p className="text-gray-300 text-sm">{feature.text}</p>
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
      reverse: false,
    },
    {
      title: 'TokenX',
      description: 'Easily create Xennium-compatible tokens with LCTR security.',
      path: '/dapps/tokenx',
      available: true,
      featuresList: features.TokenX,
      reverse: true,
    },
    {
      title: 'GovernanceX',
      description: 'Participate in decentralized governance by proposing and voting.',
      available: false,
      featuresList: features.GovernanceX,
      reverse: false,
    },
    {
      title: 'IdentityX',
      description: 'Secure your decentralized identity by minting an NFT ID with LCTR.',
      path: '/dapps/identityx',
      available: true,
      featuresList: features.IdentityX,
      reverse: true,
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
          {dAppsList.map((dapp, index) => (
            <DAppSection key={index} {...dapp} />
          ))}
        </main>
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Xennium. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
