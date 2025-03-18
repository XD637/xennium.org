import { FaGithub, FaDiscord, FaTelegram } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const SocialFooter = () => {
  const socialLinks = [
    { href: "https://github.com/XD637/xenniumx", icon: <FaGithub /> },
    { href: "https://discord.gg/7KmMBrrJEz", icon: <FaDiscord /> },
    { href: "https://x.com/Xenniumx", icon: <FontAwesomeIcon icon={faXTwitter} /> },
    { href: "https://t.me/xenniumx", icon: <FaTelegram /> },
  ];

  return (
    <footer className="w-full bg-[#121212] text-gray-400 py-6 flex flex-col items-center">
      <div className="pt-6 flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
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
    </footer>
  );
};

export default SocialFooter;