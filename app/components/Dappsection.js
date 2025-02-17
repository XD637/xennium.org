import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard'

function DAppSection({ number, title, description, path, available, featuresList, reversed }) {
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-5xl min-h-[250px] sm:min-h-[280px] ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <span
        className={`absolute text-[5rem] sm:text-[8rem] md:text-[10rem] font-bold text-gray-700 opacity-10 leading-none ${
          reversed ? 'right-2 sm:-mr-10' : 'left-2 sm:-ml-10'
        }`}
      >
        {number}
      </span>

      <div className="flex-1 text-left">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">{description}</p>
        {available ? (
          <button
            onClick={() => window.location.href = path}
            className="mt-4 sm:mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-5 sm:px-6 rounded-lg transition w-full sm:w-auto"
          >
            Launch DApp
          </button>
        ) : (
          <button
            className="mt-4 sm:mt-6 bg-gray-600 text-gray-300 font-bold py-2 px-5 sm:px-6 rounded-lg cursor-not-allowed w-full sm:w-auto"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-start gap-3 sm:gap-4">
        {featuresList.map((feature, index) => (
          <FeatureCard key={index} icon={feature.icon} text={feature.text} />
        ))}
      </div>
    </motion.div>
  )
}

export default DAppSection
