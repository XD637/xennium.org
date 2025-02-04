import { useState } from "react";
import { FaGithub, FaDiscord, FaTelegram } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"; // Import X (Twitter) icon
import Link from "next/link";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    {
      href: "https://github.com/XD637/xenniumx",
      label: "GitHub",
      icon: <FaGithub className="text-xl" />,
    },
    {
      href: "https://discord.gg/7KmMBrrJEz",
      label: "Discord",
      icon: <FaDiscord className="text-xl" />,
    },
    {
      href: "https://twitter.com/Xenniumx",
      label: "X(Twitter)",
      icon: <FontAwesomeIcon icon={faXTwitter} className="text-xl" />,
    },
    {
      href: "https://t.me/xennium",
      label: "Telegram",
      icon: <FaTelegram className="text-xl" />,
    },
  ];

  const footerLinks = [
    {
      href: "/privacy-policy",
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
    <footer className="relative w-full bg-transparent text-gray-400 py-8 flex flex-col items-center justify-center">
      {/* Social media links */}
      <div className="flex space-x-6 mb-6">
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
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
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
      <div className="flex flex-wrap justify-center space-x-6 text-sm mb-4">
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hover:text-gray-200 hover:underline transition-all duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Line Break */}
      <div className="w-full h-px bg-gray-700 my-2"></div>

      {/* Copyright message */}
      <p className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Xennium. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
