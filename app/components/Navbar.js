import { useState, useEffect } from "react";
import Link from "next/link";
import SignInSignOutButton from "./AuthButton"; // Assuming you have the SignInSignOutButton component

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
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
    { href: "/docs", label: "Docs" },
    { href: "/community", label: "Community" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between space-x-8 z-50 backdrop-blur-md bg-transparent text-white py-8 px-6 border-b-2 border-gray-800 rounded-b-lg transition-transform duration-300 ${
        scrollingDown ? "-translate-y-24" : "translate-y-0"
      }`}
    >
      {/* Left side: Xennium */}
      <div className="text-3xl font-extrabold pl-8"> {/* Increased font size to 3xl */}
        Xennium
      </div>

      {/* Middle: Navbar links centered */}
      <div className="flex flex-grow justify-center space-x-8 md:space-x-12">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-md font-medium hover:text-purple-500 transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side: SignIn/SignOut Button aligned */}
      <div className="flex items-center pr-8 md:pr-16">
        <SignInSignOutButton />
      </div>
    </nav>
  );
};

export default Navbar;
