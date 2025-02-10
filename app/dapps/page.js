"use client";

import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Dapps() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Xennium DApps - Explore and Build</title>
        <meta
          name="description"
          content="Discover and interact with Xennium's decentralized applications, including ExplorerX, TokenX, GovernanceX, and IdentityX."
        />
        <meta property="og:title" content="Xennium DApps - Explore and Build" />
        <meta
          property="og:description"
          content="Discover and interact with Xennium's decentralized applications, including ExplorerX, TokenX, GovernanceX, and IdentityX."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xennium.org/dapps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium DApps - Explore and Build" />
        <meta
          name="twitter:description"
          content="Discover and interact with Xennium's decentralized applications."
        />
      </Head>

      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        <Navbar />
        <main className="flex flex-col items-center pt-20 px-6 md:px-10 lg:px-20">

          {/* Grid for responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl pt-16">
            {[
              {
                title: "ExplorerX",
                description:
                  "Explore blockchain data, track transactions, and interact with the Xennium network.",
                path: "/dapps/explorerx",
                available: true,
              },
              {
                title: "TokenX",
                description:
                  "Create Xennium-like tokens with the Last Coin Transfer Restriction (LCTR) rule for secure and tamper-free transactions.",
                path: "/dapps/tokenx",
                available: true,
              },
              {
                title: "GovernanceX",
                description:
                  "Create proposals and vote on important decisions within the Xennium ecosystem.",
                available: false,
              },
              {
                title: "IdentityX",
                description:
                  "Create a unique NFT ID by holding the last Xennium coin in our community.",
                path: "/dapps/identityx",
                available: true,
              },
            ].map((dapp, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-md flex-1 text-center transform hover:scale-105 transition"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {dapp.title}
                </h2>
                <p className="text-sm md:text-base text-gray-400 mt-2">
                  {dapp.description}
                </p>
                {dapp.available ? (
                  <button
                    onClick={() => router.push(dapp.path)}
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
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>&copy; 2025 Xennium. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
