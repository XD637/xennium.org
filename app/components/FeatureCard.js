import { motion } from 'framer-motion'

function FeatureCard({ icon, text }) {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-3 bg-[#252525] p-3 rounded-lg w-full max-w-xs"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-purple-400">{icon}</span>
      <p className="text-gray-300 text-sm sm:text-base">{text}</p>
    </motion.div>
  )
}

export default FeatureCard
