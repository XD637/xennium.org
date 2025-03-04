"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCube } from "react-icons/fa"; // Import the icon
import SignInSignOutButton from "./AuthButton"; // Assuming you have the SignInSignOutButton component

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY) {
        setScrollingDown(true); // Scrolling down
      } else {
        setScrollingDown(false); // Scrolling up
      }
      setPrevScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const quickswapUrl = "https://quickswap.exchange/#/swap?currency0=ETH&currency1=0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0&swapIndex=2";
  const polygonscanUrl = "https://polygonscan.com/token/0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0";

  const links = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/community", label: "Community" },
    {
      href: "/dapps",
      label: (
        <>
          Dapps
          <sup className="text-xs  text-white px-1 rounded ml-1">Beta</sup>
        </>
      ),
    },
    {
      href: "https://airdrop.xennium.org/",
      label: (
        <>
          Airdrops
          <sup className="text-xs  text-white px-1 rounded ml-1">Limited</sup>
        </>
      ),
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between z-50 backdrop-blur-md bg-transparent text-white py-6 px-6 border-b border-gray-800 transition-transform duration-300 ${
          scrollingDown ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        <div className="flex-1 text-5xl font-extrabold pl-4">Xennium</div>

        {isMobile && (
          <button
            className="md:hidden pr-4 z-50"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close Menu" : "Open Menu"}
          >
            {sidebarOpen ? <span className="text-3xl">×</span> : "☰"}
          </button>
        )}

        {!isMobile && (
          <div className="flex flex-grow justify-center space-x-8">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.target || "_self"}
                rel={link.rel || ""}
                className="text-md font-medium hover:text-purple-500 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {!isMobile && (
          <div className="flex-1 flex justify-end items-center space-x-8 pr-4">
          {/* Buy XENX Link */}
          <Link
            href={quickswapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-purple-400 hover:text-purple-300 border border-purple-400 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Get XENX
          </Link>
        
          <SignInSignOutButton />
        </div>
        
        )}
      </nav>

      {/* Sidebar for Mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-8">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target={link.target || "_self"}
              rel={link.rel || ""}
              onClick={() => setSidebarOpen(false)}
              className="text-2xl font-medium text-white hover:text-purple-500"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Buy XENX & Polygonscan */}
          <Link
            href={quickswapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-purple-400 hover:text-purple-300 border border-purple-400 px-4 py-2 rounded-lg"
          >
            Get XENX
          </Link>

          <div className="mt-8 pt-20">
            <SignInSignOutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
