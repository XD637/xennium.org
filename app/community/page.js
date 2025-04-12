'use client'

import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { MessageCircle, Twitter, Send, Users } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'  // Import GitHub icon from react-icons
import SocialFooter from '../components/SocialFooter'


const communityPlatforms = {
  Discord: [
    { icon: <Users size={20} />, text: 'Engage with the community' },
    { icon: <MessageCircle size={20} />, text: 'Get exclusive airdrops' },
    { icon: <Send size={20} />, text: 'Live discussions & support' },
  ],
  Twitter: [
    { icon: <Users size={20} />, text: 'Stay updated with Xennium' },
    { icon: <Twitter size={20} />, text: 'Follow for the latest news' },
    { icon: <MessageCircle size={20} />, text: 'Join trending conversations' },
  ],
  Telegram: [
    { icon: <Send size={20} />, text: 'Instant crypto updates' },
    { icon: <MessageCircle size={20} />, text: 'Connect with traders' },
    { icon: <Users size={20} />, text: 'Private community chats' },
  ],
  GitHub: [  // Add GitHub platform with its features
    { icon: <FaGithub size={20} />, text: 'Explore the source code' },
    { icon: <Users size={20} />, text: 'Contribute to the project' },
    { icon: <Send size={20} />, text: 'Get XENX for the contribution' },
  ],
}

function CommunitySection({ number, title, description, link, featuresList, reversed }) {
  return (
    <motion.div
      className={`relative flex flex-col sm:flex-row items-center gap-6 bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-5xl min-h-[260px] ${
        reversed ? 'sm:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <span
        className={`absolute text-[6rem] sm:text-[10rem] font-bold text-gray-700 opacity-10 leading-none ${
          reversed ? 'right-0 -mr-10 sm:-mr-20' : 'left-0 -ml-10 sm:-ml-20'
        }`}
      >
        {number}
      </span>

      <div className="flex-1 text-left">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 sm:mt-6 inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition"
        >
          Join {title}
        </a>
      </div>

      <div className="flex-1 flex flex-col items-start gap-3 sm:gap-4">
        {featuresList.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 bg-[#252525] p-2 sm:p-3 rounded-lg w-full max-w-md"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-purple-400">{feature.icon}</span>
            <p className="text-gray-300 text-sm sm:text-base">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Community() {
  return (
    <>
      <Head>
  <title>Xennium Community - Connect & Engage</title>
  <meta name="description" content="Join the Xennium community on Discord, Twitter, Telegram, and GitHub. Stay updated, connect, and engage with like-minded individuals." />
  <meta name="keywords" content="Xennium, crypto community, Web3, blockchain, Discord, Twitter, Telegram, GitHub, airdrops" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Xennium Community - Connect & Engage" />
  <meta property="og:description" content="Be part of the Xennium community. Join discussions, get airdrops, and stay updated on all things Web3." />
  <meta property="og:url" content="https://xennium.org/community" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Xennium Community - Connect & Engage" />
  <meta name="twitter:description" content="Join Xennium on Discord, Twitter, Telegram, and GitHub. Connect & engage with the Web3 community." />
</Head>

      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />
        <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 md:px-10 lg:px-20 gap-12 sm:gap-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2">
            Join Our Community
          </h1>
          <p className="text-gray-400 text-center mt-2 text-sm sm:text-base">
            Join the Xennium community early to get exclusive airdrops and  rewards.
          </p>

          {[ 
            {
              title: 'Discord',
              description: 'Engage in discussions, receive airdrops, and connect with the team.',
              link: 'https://discord.gg/7KmMBrrJEz',
              featuresList: communityPlatforms.Discord,
            },
            {
              title: 'Twitter',
              description: 'Stay updated with Xennium news, trends, and announcements.',
              link: 'https://x.com/Xenniumx',
              featuresList: communityPlatforms.Twitter,
            },
            {
              title: 'Telegram',
              description: 'Join real-time discussions and get the latest Xennium updates.',
              link: 'https://t.me/xennium',
              featuresList: communityPlatforms.Telegram,
            },
            {
              title: 'GitHub',  // Add GitHub section
              description: 'Explore the code, contribute, and track progress.',
              link: 'https://github.com/XD637/xennium.org',
              featuresList: communityPlatforms.GitHub,
            },
          ].map((platform, index) => (
            <CommunitySection key={index} number={index + 1} reversed={index % 2 !== 0} {...platform} />
          ))}
        </main>

        
        
        {/* Footer */}
        <SocialFooter className="mt-12 mx-auto w-full" />
      </div>
    </>
  )
}
