"use client";
import Navbar from "../components/Navbar";
import Mint from "../components/Mint";

export default function MintPage() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center pt-32 sm:pt-40 px-4 sm:px-6 md:px-10 lg:px-20 gap-12 sm:gap-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center flex items-center gap-2">
            Exclusive NFTs
          </h1>
       <Mint/>

      </main>
      <footer className="mt-12 sm:mt-16 py-6 text-center text-gray-400 text-xs sm:text-sm border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Xennium. All rights reserved.</p>
        </footer>
    </div>
  );
}
