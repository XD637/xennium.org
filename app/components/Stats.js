import React, { useEffect, useState } from 'react'
import { Users, Twitter } from 'lucide-react'
import { FaTelegramPlane } from 'react-icons/fa' // Import Telegram icon
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const staticStats = {
  discord: 99,
  twitter: 67,
  telegram: 12,
}

export default function CommunityStats() {
  const [stats, setStats] = useState({ discord: 0, twitter: 0, telegram: 0 })
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          discord: Math.min(prev.discord + 1, staticStats.discord),
          twitter: Math.min(prev.twitter + 1, staticStats.twitter),
          telegram: Math.min(prev.telegram + 1, staticStats.telegram),
        }))
      }, 50)

      return () => clearInterval(interval)
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap gap-6 justify-center text-white bg-[#1a1a1a] p-6 rounded-2xl border border-gray-700 shadow-lg w-full max-w-5xl"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {[
        { icon: <Users size={24} />, label: 'Discord', count: stats.discord },
        { icon: <Twitter size={24} />, label: 'Twitter', count: stats.twitter },
        { icon: <FaTelegramPlane size={24} />, label: 'Telegram', count: stats.telegram },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center bg-[#252525] p-4 rounded-xl shadow-md w-[150px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <span className="text-purple-400">{item.icon}</span>
          <p className="text-lg font-bold">{item.count}</p>
          <p className="text-gray-400 text-sm">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
