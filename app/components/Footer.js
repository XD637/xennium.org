import { useState } from "react";
import { FaGithub, FaDiscord, FaTelegram } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/XD637/xenniumx", icon: <FaGithub /> },
    { href: "https://discord.gg/7KmMBrrJEz", icon: <FaDiscord /> },
    { href: "https://x.com/Xenniumx", icon: <FontAwesomeIcon icon={faXTwitter} /> },
    { href: "https://t.me/xenniumx", icon: <FaTelegram /> },
  ];

  const links = [
    {
      title: "Resources",
      items: [
        { href: "/docs", label: "Documentation" },
        { href: "/Xennium-Whitepaper.pdf", label: "Whitepaper" },
        { href: "/Xennium_Audit_Report.pdf", label: "Security Audit" },
      ],
    },
    {
      title: "Blockchain",
      items: [
        { href: "https://polygonscan.com/token/0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0", label: "Polygonscan" },
        { href: "https://quickswap.exchange/#/swap?currency0=ETH&currency1=0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0&swapIndex=1", label: "Quickswap" },
        { href: "https://www.geckoterminal.com/polygon_pos/pools/0x9dd30c51aa1980bd05dead5b7955124f17baa6c7", label: "GeckoTerminal" },
      ],
    },
    {
      title: "Products",
      items: [
        { href: "https://xenconnect.xyz", label: "XenConnect" },
        { href: "https://cryptoairdrops.fun", label: "CryptoAirdrops" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-and-conditions", label: "Terms & Conditions" },
        { href: "mailto:contact@xennium.org", label: "Contact Us" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#121212] text-gray-400 py-12 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4 mb-6 text-left text-sm sm:text-base">
          {links.map((section, idx) => (
            <div key={idx} className="mx-auto w-full sm:w-1/2 md:w-auto">
              <h3 className="text-white font-semibold text-lg mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className=" hover:text-purple-500 transition-all">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="w-full h-px bg-gray-700 my-4"></div>

        <p className="text-center text-xs text-gray-400">© {new Date().getFullYear()} Xennium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;