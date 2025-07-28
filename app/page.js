"use client";

import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CustomButton from "./components/CustomButton";
import Mint from "./components/Mint";
import Cube from "./components/Cube";
import Testimonials from "./components/Testimonials";
import Transparency from "./components/Transparency";

// Lazy load heavy components
const FAQSection = dynamic(() => import("./components/FAQSection"));
const Leaderboard = dynamic(() => import("./components/Leaderboard"));
// Lazy load heavy components
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });


export default function Home() {

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Xennium Token - Next Gen Crypto with LCTR</title>
        <link rel="canonical" href="https://xennium.org/" />
        <meta name="description" content="Xennium Token (XENX) is a revolutionary crypto token with Last Coin Transfer Restriction (LCTR), enabling secure governance, decentralized identity, and innovative utilities." />
        <meta name="keywords" content="Xennium, Xennium Token, XENX, crypto, cryptocurrency, blockchain, Web3, governance, decentralized identity" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Xennium Token - The Future of Crypto" />
        <meta property="og:description" content="Discover Xennium Token (XENX) – a next-generation cryptocurrency designed for governance, identity, and secure transactions with LCTR." />
        <meta property="og:image" content="/Xen.png" />
        <meta property="og:url" content="https://xennium.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium Token - Next Gen Crypto" />
        <meta name="twitter:description" content="Explore Xennium Token (XENX) and its groundbreaking Last Coin Transfer Restriction (LCTR) for decentralized governance and identity solutions." />
        <link rel="icon" href="/favicon.ico" sizes="any" />


        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Xennium",
            "url": "https://xennium.org/",
            "description": "Xennium Token (XENX) is a revolutionary crypto with Last Coin Transfer Restriction (LCTR)."
          })}
        </script>
      </Head>

      {/* Main Container */}
      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        {/* Navbar */}
        <Navbar />



        {/* Hero Section */}
        <HeroSection />

        <CustomButton name="GET $XENX" route="https://airdrop.xennium.org" />

        {/* Cube Section */}
        <div className="relative flex items-center justify-center h-[250px]">
          <Cube />
        </div>


        <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 text-center pt-8">
            Weekly Leaderboard
          </h2>
          <Leaderboard />
        </section>

        {/* Transparency Section */}
        <Transparency />


        {/* Mint Section */}
        <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-10 text-center pt-8">
            Featured Mints
          </h2>
          <Mint />
        </section>


        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <div className='pt-4'><FAQSection /></div>

        {/* Footer */}
        <Footer className="mt-12 mx-auto w-full" />

      </div>
    </>
  );
}
