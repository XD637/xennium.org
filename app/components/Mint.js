"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const recentMints = [
  { wallet: "0xA1...D2F3", image: "/collabs/minipixe.jpeg", time: "2 mins ago" },
  { wallet: "0xB2...E4G5", image: "/collabs/mint-nft.jpg", time: "5 mins ago" },
];

// Dummy data for NFTs
const nfts = [
  {
    title: "SpicyGnomes",
    creator: "By LittleBao",
    price: "40 $POL",
    link: "https://gnomes.littlebaonft.com",
    description:
      "SpicyGnomes is a unique NFT collection that brings gnomes to the blockchain, featuring rare and spicy designs.",
    image: "/collabs/mint-nft.jpg",
  },
  {
    title: "IdentityX Passport",
    creator: "By Xennium",
    price: "1 $XENX",
    link: "#",
    description:
      "A unique soulbound passport for Xennium, granting its holder exclusive identity verification and access within the Xennium ecosystem.",
    image: "/collabs/idxp.png",
  },
  {
    title: "MiniPixe",
    creator: "By pixeledcats",
    price: "10 $POL",
    link: "https://opensea.io/collection/minipixes",
    description:
      "MiniPixes are collection of #33 Pixeledcats with #33 max supply. Mint your Minipixes now!",
    image: "/collabs/minipixe.jpeg",
  },
];

const Mint = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        speed={500}
        className="w-full"
      >
        {nfts.map((nft, index) => (
          <SwiperSlide key={index}>
            <div>
              {/* NFT Card */}
              <div className="flex flex-col sm:flex-row items-center bg-[#252525] p-4 sm:p-6 rounded-lg">
                {/* Left Section - Image */}
                <div className="relative w-full sm:w-1/3 flex justify-center">
                  <span className="absolute top-2 left-1/2 transform -translate-x-1/2 sm:left-8 sm:translate-x-0 bg-black bg-opacity-50 text-white text-xs sm:text-sm px-2 py-1 rounded">
                    {nft.price}
                  </span>
                  <Image
                    src={nft.image}
                    alt={nft.title}
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>

                {/* Right Section - Text & Button */}
                <div className="w-full sm:w-2/3 mt-4 sm:mt-0 sm:pl-6 text-white text-center sm:text-left">
                  <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1">
                    {nft.title}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
                    {nft.creator}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    {nft.description}
                  </p>
                  <a
                    href={nft.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 sm:mt-3 inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm md:text-base font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto"
                  >
                    Mint {nft.title}
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Outside */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default Mint;
