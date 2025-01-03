import React, { useMemo } from "react";
import {
  FaGamepad,
  FaGavel,
  FaVoteYea,
  FaIdBadge,
  FaInfinity,
  FaTools,
} from "react-icons/fa";

const FeaturesSection = () => {
  // Memoize the FEATURES array to avoid unnecessary re-renders
  const FEATURES = useMemo(
    () => [
      {
        icon: <FaGamepad className="text-purple-500" />,
        title: "Gamification",
        description: "Incorporate XENX into gaming for unique mechanics like loyality systems.",
      },
      {
        icon: <FaGavel className="text-purple-500" />,
        title: "Governance",
        description: "Empower decision-making with decentralized governance tools.",
      },
      {
        icon: <FaVoteYea className="text-purple-500" />,
        title: "Voting",
        description: "Use XENX for transparent and secure voting mechanisms.",
      },
      {
        icon: <FaIdBadge className="text-purple-500" />,
        title: "Identification",
        description: "Identify shareholders and participants with XENX tokens.",
      },
      {
        icon: <FaTools className="text-purple-500" />,
        title: "Customization",
        description: "Tailor XENX for different industries and use cases.",
      },
      {
        icon: <FaInfinity className="text-purple-500" />,
        title: "Endless Ideas",
        description: "Unlock limitless possibilities with innovative applications.",
      },
     
    ],
    []
  );

  return (
    <section className="features-section relative z-10 py-12 px-4 sm:px-8 text-center bg-transparent backdrop-blur-none rounded-lg mx-auto max-w-7xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 relative z-10">Features</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="feature-card group relative p-6 rounded-md overflow-auto bg-[#2d2d2d] text-white border border-gray-700 shadow-lg transform transition-transform duration-200 hover:scale-105 mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-lg rounded-md z-0" />
            <div className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full text-white mx-auto mb-4 relative z-10">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{feature.title}</h3>
            <p className="text-gray-400 text-sm relative z-10">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
