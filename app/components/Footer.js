import { useState } from "react";
import { FaGithub, FaDiscord, FaCube } from "react-icons/fa";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    {
      href: "https://github.com/XD637/xenx/",
      label: "GitHub",
      icon: <FaGithub className="text-xl" />,
    },
    {
      href: "https://discord.gg/7KmMBrrJEz",
      label: "Discord",
      icon: <FaDiscord className="text-xl" />,
    },
    {
      href: "https://amoy.polygonscan.com/token/0xab114351697f1f563d6aca9cf076e88e79546097",
      label: "Etherscan",
      icon: <FaCube className="text-xl" />,
    },
  ];

  const footerLinks = [
    {
      href: "/privacy",
      label: "Privacy Policy",
    },
    {
      href: "/terms-and-conditions",
      label: "Terms and Conditions",
    },
    {
      href: "mailto:contact@xennium.org",
      label: "Contact Us",
    },
  ];

  return (
    <footer className="absolute bottom-0 w-full bg-transparent text-gray-400 py-4 flex flex-col items-center justify-center z-10">
      {/* Social media links */}
      <div className="flex space-x-6 mb-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative group"
          >
            {/* Icon Button */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
              {link.icon}
            </div>

            {/* Floating Label */}
            {hoveredLink === link.label && (
              <span className="absolute top-full mt-2 px-3 py-1 bg-black/70 text-white rounded-lg text-sm shadow-md">
                {link.label}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Footer navigation links */}
      <div className="flex space-x-6 mb-4 text-sm">
        {footerLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="hover:text-gray-200 hover:underline transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Copyright message */}
      <p className="text-center text-sm text-gray-400 pt-4">
        © {new Date().getFullYear()} Xennium. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
