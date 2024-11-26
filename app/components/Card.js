import React from "react";
import { FaGamepad, FaGavel, FaVoteYea, FaIdBadge, FaInfinity, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaGamepad />,
      title: "Gamification",
      description: "Incorporate XENX into gaming for unique mechanics and rewards.",
    },
    {
      icon: <FaGavel />,
      title: "Governance",
      description: "Empower decision-making with decentralized governance tools.",
    },
    {
      icon: <FaVoteYea />,
      title: "Voting",
      description: "Use XENX for transparent and secure voting mechanisms.",
    },
    {
      icon: <FaIdBadge />,
      title: "Identification",
      description: "Identify shareholders and participants with XENX tokens.",
    },
    {
      icon: <FaInfinity />,
      title: "Endless Ideas",
      description: "Unlock limitless possibilities with innovative applications.",
    },
    {
      icon: <FaTools />,
      title: "Customization",
      description: "Tailor XENX for different industries and use cases.",
    },
  ];

  // Motion Variants for smoother end animation
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.8, 0.25, 1], // Ease-out curve for smoother end
        delay: 0.1, // Small delay for smooth entry
      },
    },
  };

  return (
    <section className="relative z-10 py-12 px-4 sm:px-8 text-center bg-transparent backdrop-blur-none rounded-lg mx-auto max-w-7xl">
      {/* Section Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10">Features</h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative p-6 rounded-md overflow-auto bg-[#2d2d2d] text-white border border-gray-700 shadow-lg transform transition-transform duration-200 hover:scale-105 mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={featureVariants}
            viewport={{ once: false, amount: 0.3 }} // Trigger animation on every scroll
          >
            {/* Glossy Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-lg rounded-md z-0"></div>

            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full text-white mx-auto mb-4 relative z-10">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{feature.title}</h3>

            {/* Description */}
            <p className="text-gray-400 text-sm relative z-10">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
