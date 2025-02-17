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

  const links = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    {
      href: "/dapps",
      label: (
        <>
          Dapps
          <sup
            style={{
              color: "#fff",
              padding: "1px 4px",
              borderRadius: "4px",
              fontSize: "10px",
              marginLeft: "3px",
            }}
          >
            Beta
          </sup>
        </>
      ),
    },
    {
      href: "https://airdrop.xennium.org/",
      label: (
        <>
          Airdrops
          <sup
            style={{
              color: "#fff",
              padding: "1px 4px",
              borderRadius: "4px",
              fontSize: "10px",
              marginLeft: "3px",
            }}
          >
            Limited
          </sup>
        </>
      ),
      target: "_blank", // Open in a new tab
      rel: "noopener noreferrer",
    },
  ];

  // Set isMobile based on window size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", checkMobile);
    checkMobile(); // Run on mount

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between space-x-8 z-50 backdrop-blur-md bg-transparent text-white py-8 px-6 border-b-2 border-gray-800 rounded-b-lg transition-transform duration-300 ${
          scrollingDown ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        {/* Left side: Xennium */}
        <div className="flex-1 text-4xl font-extrabold pl-8">Xennium</div>

        {/* Mobile: Hamburger Menu */}
        {isMobile && (
          <button
            className="md:hidden flex flex-col items-center pr-4 z-50"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close Menu" : "Open Menu"} // Add aria-label for accessibility
          >
            {sidebarOpen ? (
              <span className="text-3xl text-white">×</span>
            ) : (
              <>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </>
            )}
          </button>
        )}

        {/* Middle: Navbar links centered for larger screens */}
        {!isMobile && (
          <div className="flex flex-grow justify-center space-x-8 md:space-x-12">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.target || "_self"}
                rel={link.rel || ""}
                className="text-md font-medium hover:text-purple-500 transition-colors duration-300 flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side: Polygonscan icon and SignIn/SignOut Button */}
{!isMobile && (
  <div className="flex-1 flex justify-end items-center pr-8 md:pr-16 space-x-16 ">

    <SignInSignOutButton />
  </div>
)}

      </nav>

      {/* Sidebar for mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-8">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target={link.target || "_self"}
              rel={link.rel || ""}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center text-2xl font-medium text-white hover:text-purple-500 transition-colors duration-300"
            >
              {link.label}
              {/* Optional symbol for all links */}
              <span className="ml-2 text-sm text-purple-500">→</span>
            </Link>
          ))}
          <div className="mt-8">
            <SignInSignOutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
