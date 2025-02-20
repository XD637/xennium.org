"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Rocket, Shield, Users, CheckCircle } from 'lucide-react';
import DAppSection from '../components/Dappsection';


const features = {
  TokenX: [
    { icon: <CheckCircle size={20} />, text: 'Create secure tokens' },
    { icon: <Shield size={20} />, text: 'LCTR-enabled protection' },
    { icon: <Rocket size={20} />, text: 'Fast and efficient' },
  ],
  ExplorerX: [
    { icon: <Rocket size={20} />, text: 'Real-time blockchain data' },
    { icon: <Shield size={20} />, text: 'Secure and transparent' },
    { icon: <Users size={20} />, text: 'User-friendly insights' },
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
};

export default function Dapps() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const dAppsList = [
    { title: 'TokenX', description: 'Easily create Xennium-compatible tokens with LCTR security.', path: '/dapps/tokenx', available: true, featuresList: features.TokenX },
    { title: 'ExplorerX', description: 'Analyze blockchain data and explore the Xennium network.', path: '/dapps/explorerx', available: true, featuresList: features.ExplorerX },
    { title: 'GovernanceX', description: 'Participate in decentralized governance by proposing and voting.', available: false, featuresList: features.GovernanceX },
    { title: 'IdentityX', description: 'Secure your decentralized identity by minting an NFT ID with LCTR.', path: '/dapps/identityx', available: false, featuresList: features.IdentityX },
  ];

  return (
    <>
      <Head>
        <title>Xennium DApps - Explore, Build, and Innovate</title>
      </Head>
      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />
        <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 lg:px-10 gap-10 sm:gap-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2 sm:gap-3">
            Explore DApps
          </h1>
          <p className="text-gray-400 text-center text-sm sm:text-base mt-2">
            Discover decentralized applications, Powered by Xennium.
          </p>
          {dAppsList.map((dapp, index) => (
            <DAppSection key={index} number={index + 1} reversed={index % 2 !== 0} {...dapp} />
          ))}
        </main>
        <footer className="mt-12 sm:mt-16 py-6 text-center text-gray-400 text-xs sm:text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Xennium. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
