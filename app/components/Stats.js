import React, { useState, useEffect } from 'react'
import { Users, Twitter, Github } from 'lucide-react'
import { motion } from 'framer-motion'

const GUILD_ID = '1308320261229117500'
const DISCORD_BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN'
const TWITTER_BEARER_TOKEN = 'YOUR_TWITTER_BEARER_TOKEN'
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'

const statsAPI = {
  discord: `https://discord.com/api/v9/guilds/${GUILD_ID}?with_counts=true`,
  twitter: 'https://api.twitter.com/2/users/by/username/Xenniumx?user.fields=public_metrics',
  github: 'https://api.github.com/repos/XD637/xennium.org',
}

export default function CommunityStats() {
  const [stats, setStats] = useState({ discord: 0, twitter: 0, github: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const responses = await Promise.all([
          fetch(statsAPI.discord, {
            headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
          }).then((res) => res.json()),
          fetch(statsAPI.twitter, {
            headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
          }).then((res) => res.json()),
          fetch(statsAPI.github, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
          }).then((res) => res.json()),
        ])

        setStats({
          discord: responses[0]?.approximate_member_count || 0,
          twitter: responses[1]?.data?.public_metrics?.followers_count || 0,
          github: responses[2]?.stargazers_count || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <motion.div
      className="flex flex-wrap gap-6 justify-center text-white bg-[#1a1a1a] p-6 rounded-2xl border border-gray-700 shadow-lg w-full max-w-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {[
        { icon: <Users size={24} />, label: 'Discord Members', count: stats.discord },
        { icon: <Twitter size={24} />, label: 'Twitter Followers', count: stats.twitter },
        { icon: <Github size={24} />, label: 'GitHub Stars', count: stats.github },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center bg-[#252525] p-4 rounded-xl shadow-md w-[150px]">
          <span className="text-purple-400">{item.icon}</span>
          <p className="text-lg font-bold">{item.count}</p>
          <p className="text-gray-400 text-sm">{item.label}</p>
        </div>
      ))}
    </motion.div>
  )
}
