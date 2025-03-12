"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react"; // Import useSession
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Lazy load heavy components
const Cube = dynamic(() => import("./components/Cube"), { ssr: false });
const HeroSection = dynamic(() => import("./components/HeroSection"), { ssr: false });
const CustomButton = dynamic(() => import("./components/CustomButton"));
const FAQSection = dynamic(() => import("./components/FAQSection"), { ssr: false});
const Leaderboard = dynamic(() => import("./components/Leaderboard"), { ssr: false});

export default function Home() {
  const { data: session } = useSession(); // Check for session

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
            "description": "Xennium Token (XENX) is a revolutionary crypto token with Last Coin Transfer Restriction (LCTR)."
          })}
        </script>
      </Head>

      {/* Main Container */}
      <div className="relative min-h-screen bg-[#121212] text-gray-200">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />
        
        {/* Conditional Button */}
        {session ? (
          <CustomButton name="Mint Now" route="/mint" />
        ) : (
          <CustomButton name="Get Started" route="/signin" />
        )}

        {/* Cube Section */}
        <div className="relative flex items-center justify-center h-[250px]">
          <Cube />
        </div>

        <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12 text-center pt-8">
            Weekly Leaderboard
          </h2>
          <Leaderboard/>
        </section>

        {/* FAQ Section */}
        <div className='pt-4'><FAQSection/></div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
