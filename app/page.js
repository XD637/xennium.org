"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContractButton from "./components/Contract";
import HeroSection from "./components/HeroSection"; // Import the new component

// Lazy load heavy components
const Cube = dynamic(() => import("./components/Cube"), { ssr: false });
const FeaturesSection = dynamic(() => import("./components/Card"), { ssr: false });
const CodeSnippet = dynamic(() => import("./components/CodeSnippet"), { ssr: false });

export default function Home() {
  const [code, setCode] = useState(""); // State for code snippet

  // Fetch code snippet with caching
  useEffect(() => {
    const cacheKey = "xenniumCode";

    // Clear cache once
    localStorage.removeItem(cacheKey);

    const fetchCode = async () => {
      try {
        const response = await fetch("/codes/xennium.txt");
        if (!response.ok) {
          throw new Error(`Failed to load code snippet: ${response.statusText}`);
        }
        const text = await response.text();
        setCode(text);
        localStorage.setItem(cacheKey, text); // Cache the latest version
      } catch (error) {
        console.error("Error loading code snippet:", error);
        setCode("Code snippet could not be loaded.");
      }
    };

    fetchCode();
  }, []);

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Xennium Token - Next Gen Crypto with LCTR</title>
        <meta
          name="description"
          content="Xennium Token (XENX) is a revolutionary crypto token with Last Coin Transfer Restriction (LCTR), enabling secure governance, decentralized identity, and innovative utilities."
        />
        <meta name="keywords" content="Xennium, Xennium Token, XENX, crypto, cryptocurrency, blockchain, Web3, governance, decentralized identity" />
        <meta property="og:title" content="Xennium Token - The Future of Crypto" />
        <meta
          property="og:description"
          content="Discover Xennium Token (XENX) – a next-generation cryptocurrency designed for governance, identity, and secure transactions with LCTR."
        />
        <meta property="og:image" content="/Xen.png" />
        <meta property="og:url" content="https://xennium.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium Token - Next Gen Crypto" />
        <meta
          name="twitter:description"
          content="Explore Xennium Token (XENX) and its groundbreaking Last Coin Transfer Restriction (LCTR) for decentralized governance and identity solutions."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xennium",
              url: "https://xennium.org",
              logo: "https://xennium.org/Xen.png",
              description:
                "Xennium Token (XENX) introduces the Last Coin Transfer Restriction (LCTR), revolutionizing the way crypto assets are used for governance and identity.",
            }),
          }}
        />
      </Head>

      {/* Main Container */}
      <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />
        <ContractButton />

        {/* Cube Section */}
        <div className="relative flex items-center justify-center h-[250px]">
          <Cube />
        </div>

        {/* Code Snippet Section */}
        <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 text-center">
           Transparency
          </h2>
          <CodeSnippet code={code} />
        </section>

        {/* Features Section */}
        <div className="relative z-10 pt-8 px-8 sm:px-16 mb-12">
          <FeaturesSection />
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
