"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollingDown(scrollY > prevScrollY.current);
      prevScrollY.current = scrollY;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "#", label: "Tokenomics" },
    { href: "/mint", label: "Mint" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between z-50 backdrop-blur-md bg-transparent text-white py-6 px-6 border-b border-gray-800 transition-transform duration-300 ${
          scrollingDown ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        {/* Brand Name */}
        <div className="flex-1 text-5xl font-extrabold pl-4">Xennium</div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="md:hidden pr-4 z-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close Menu" : "Open Menu"}
          >
            {sidebarOpen ? <span className="text-3xl">×</span> : "☰"}
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex flex-grow justify-center space-x-16">
            {links.map(({ href, label, target }, index) => (
              <Link
                key={index}
                href={href}
                target={target || "_self"}
                className="text-md font-medium hover:text-purple-500 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Buttons */}
        {!isMobile && (
          <div className="flex-1 flex justify-end items-center space-x-8 pr-4">
            <Link
              href="https://airdrop.xennium.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md font-semibold text-purple-400 hover:text-purple-300 border border-purple-400 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              GET $XENX
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-8">
          {links.map(({ href, label, target }, index) => (
            <Link
              key={index}
              href={href}
              target={target || "_self"}
              onClick={() => setSidebarOpen(false)}
              className="text-2xl font-medium text-white hover:text-purple-500"
            >
              {label}
            </Link>
          ))}
          {/* Mobile Get $XENX Button */}
          <Link
            href="https://airdrop.xennium.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-purple-400 hover:text-purple-300 border border-purple-400 px-4 py-2 rounded-lg"
          >
            GET $XENX
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
