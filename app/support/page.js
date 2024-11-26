"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";

export default function Support() {
  const code = "0x20E6827DC9FC44C747f551A08aF8244bA14046a6";

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Support us with ETHs
        </h1>
        <p className="text-lg text-gray-300 italic">
          Be a reason to change the future.
        </p>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto">
          Provide ETHs, SepETHs, or even your own token to help us grow, 
          and become part of the Xennium community!
        </p>
      </main>

      {/* Code Snippet */}
      <section className="relative z-10 pt-12 px-8 sm:px-16 text-left mb-12">
        <CodeSnippet code={code} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
