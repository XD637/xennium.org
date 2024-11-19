import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaBook, FaUsers, FaEthereum, FaCubes } from "react-icons/fa"; // Updated icons

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);

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
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/docs", label: "Docs", icon: <FaBook /> },
    { href: "/community", label: "Community", icon: <FaUsers /> },
    { href: "/support", label: "Support", icon: <FaEthereum /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 z-50 backdrop-blur-md bg-transparent text-white py-2 px-4 rounded-lg transition-transform duration-300 ${
          scrollingDown ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        {/* Navbar links */}
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative group"
          >
            {/* Icon Button */}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110"
            >
              {link.icon}
            </div>

            {/* Floating Label */}
            {hoveredLink === link.label && (
              <span className="absolute top-full mt-2 px-3 py-1 bg-black/70 text-white rounded-lg text-sm shadow-md">
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
