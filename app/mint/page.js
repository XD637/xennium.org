"use client";
import Navbar from "../components/Navbar";
import Mint from "../components/Mint";
import Head from "next/head";
import SocialFooter from "../components/SocialFooter";

export default function MintPage() {
  return (
    <>
    <Head>
        <title>Mint Exclusive Xennium NFTs</title>
        <meta name="description" content="Mint rare Xennium NFTs and be part of the Web3 revolution. Limited edition, exclusive digital collectibles." />
        <meta name="keywords" content="Xennium, NFTs, minting, Web3, blockchain, digital collectibles, crypto art" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mint Exclusive Xennium NFTs" />
        <meta property="og:description" content="Own rare and exclusive Xennium NFTs. Join the future of digital collectibles today." />

        <meta property="og:url" content="https://xennium.org/mint" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mint Exclusive Xennium NFTs" />
        <meta name="twitter:description" content="Mint rare Xennium NFTs and join the digital revolution. Limited edition, high-value crypto assets." />
       
      </Head>
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 md:px-10 lg:px-20 gap-12 sm:gap-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2">
            Exclusive NFTs
          </h1>
       <Mint/>

      </main>
      {/* Footer */}
              <SocialFooter className="mt-12 mx-auto w-full" />
    </div>
    </>
  );
}
