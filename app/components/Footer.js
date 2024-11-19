import { FaGithub } from 'react-icons/fa'; // GitHub icon
import { FaDiscord } from 'react-icons/fa'; // Discord icon
import { FaCube } from 'react-icons/fa'; // Etherscan/Ethereum icon

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-transparent text-gray-400 py-4 flex flex-col items-center justify-center z-10">
      {/* Social media links (GitHub, Discord, and Etherscan) */}
      <div className="flex space-x-6 mb-2">
        <a
          href="https://github.com/XD637/xenx/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transform transition-transform duration-300 hover:scale-110"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
            <FaGithub className="text-xl" />
          </div>
        </a>
        <a
          href="https://discord.gg/7KmMBrrJEz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transform transition-transform duration-300 hover:scale-110"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
            <FaDiscord className="text-xl" />
          </div>
        </a>
        <a
          href="https://amoy.polygonscan.com/token/0xab114351697f1f563d6aca9cf076e88e79546097"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transform transition-transform duration-300 hover:scale-110"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
            <FaCube className="text-xl" />
          </div>
        </a>
      </div>

      {/* Copyright message */}
      <p className="text-center text-sm text-gray-400 pt-7">
        © {new Date().getFullYear()} Xennium. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
