'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { MessageCircle, Twitter, Send, Users } from 'lucide-react'
import { Compass } from 'lucide-react'

const communityPlatforms = {
  Discord: [
    { icon: <Users size={24} />, text: 'Engage with the community' },
    { icon: <MessageCircle size={24} />, text: 'Get exclusive airdrops' },
    { icon: <Send size={24} />, text: 'Live discussions & support' },
  ],
  Twitter: [
    { icon: <Users size={24} />, text: 'Stay updated with Xennium' },
    { icon: <Twitter size={24} />, text: 'Follow for the latest news' },
    { icon: <MessageCircle size={24} />, text: 'Join trending conversations' },
  ],
  Telegram: [
    { icon: <Send size={24} />, text: 'Instant crypto updates' },
    { icon: <MessageCircle size={24} />, text: 'Connect with traders' },
    { icon: <Users size={24} />, text: 'Private community chats' },
  ],
}

function CommunitySection({ number, title, description, link, featuresList, reversed }) {
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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Join {title}
        </a>
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

export default function Community() {
  return (
    <>
      <Head>
        <title>Xennium Community - Connect & Engage</title>
      </Head>
      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />
        <main className="flex flex-col items-center pt-40 px-6 md:px-10 lg:px-20 gap-16">
          <h1 className="text-6xl font-bold text-white text-center flex items-center gap-3">
            Join Our Community <Compass size={12} className="text-gray-700" />
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Connect with Xennium enthusiasts across different platforms.
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
          ].map((platform, index) => (
            <CommunitySection key={index} number={index + 1} reversed={index % 2 !== 0} {...platform} />
          ))}
        </main>
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Xennium. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
