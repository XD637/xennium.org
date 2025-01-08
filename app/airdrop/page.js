"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FaGithub, FaDiscord, FaTelegram } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function SocialLink({ href, label, icon, hoveredLink, setHoveredLink }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHoveredLink(label)}
      onMouseLeave={() => setHoveredLink(null)}
      aria-label={label}
      className="relative group"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:scale-110">
        {icon}
      </div>
      {hoveredLink === label && (
        <span className="absolute top-full mt-2 px-3 py-1 bg-black/70 text-white rounded-lg text-sm shadow-md">
          {label}
        </span>
      )}
    </a>
  );
}

export default function Airdrop() {
  const [formData, setFormData] = useState({
    verificationName: "",
    walletAddress: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
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
      href: "https://github.com/XD637/xenx/",
      label: "GitHub",
      icon: <FaGithub className="text-xl" />,
    },
    {
      href: "https://t.me/xennium",
      label: "Telegram",
      icon: <FaTelegram className="text-xl" />,
    },
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.verificationName.trim()) {
      errors.verificationName = "Verification name is required.";
    }
    if (!formData.walletAddress.trim()) {
      errors.walletAddress = "Wallet address is required.";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      errors.walletAddress = "Invalid wallet address format.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!captchaToken) {
      alert("Please complete the hCaptcha verification.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Form submitted successfully!");
        setFormData({ verificationName: "", walletAddress: "" });
        setCaptchaToken(null);
      } else {
        alert(data.message || "Error submitting form.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      <Navbar />
      <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 pt-24 sm:pt-32 gap-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white pt-8">XENX Airdrop</h1>
        <p className="text-md text-gray-400 mt-3 max-w-2xl mx-auto pb-6">
          Claim your <strong>10 XENX Tokens</strong> by following and joining our socials. <br />
          <span className="text-purple-500 font-bold">Limited to the first 100 users</span> Tokens will be manually verified and distributed. Import XENX Token and Verify after 24 hrs - <code className="text-purple-500 underline">0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0</code>.
        </p>
        <div className="flex flex-wrap justify-center space-x-6 mb-4 pb-6">
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.href}
              label={link.label}
              icon={link.icon}
              hoveredLink={hoveredLink}
              setHoveredLink={setHoveredLink}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#2a2a2c] p-6 rounded-lg shadow-lg space-y-6">
          <label className="block text-left text-gray-300">
            Verification Name (Required):
            <input
              type="text"
              name="verificationName"
              value={formData.verificationName}
              onChange={handleChange}
              required
              placeholder="Name of the one of the accounts you used to follow us"
              className={`w-full mt-2 px-4 py-2 text-black rounded-md border ${
                formErrors.verificationName ? "border-red-500" : "border-gray-700"
              } focus:ring-2 focus:ring-purple-500 outline-none`}
            />
            {formErrors.verificationName && <p className="text-red-500 text-sm mt-1">{formErrors.verificationName}</p>}
          </label>
          <label className="block text-left text-gray-300">
            Wallet Address (Required):
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              required
              className={`w-full mt-2 px-4 py-2 text-black rounded-md border ${
                formErrors.walletAddress ? "border-red-500" : "border-gray-700"
              } focus:ring-2 focus:ring-purple-500 outline-none`}
            />
            {formErrors.walletAddress && <p className="text-red-500 text-sm mt-1">{formErrors.walletAddress}</p>}
          </label>
          <div className="mt-4">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
              onError={(err) => {
                console.error("HCaptcha error:", err);
                alert("HCaptcha encountered an error. Please reload and try again.");
              }}
              onExpire={() => alert("HCaptcha token expired. Please verify again.")}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
