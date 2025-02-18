import React from 'react';

const FAQSection = () => {
  return (
    <section className="relative z-10 pt-16 px-8 sm:px-16 text-left mb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is Xennium?</summary>
          <p className="mt-2 text-gray-400">
            Xennium is an innovative token with the Last Coin Transfer Restriction (LCTR) feature, ensuring secure identity management and decentralized governance while offering multiple dApps.
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is the LCTR feature?</summary>
          <p className="mt-2 text-gray-400">
            The Last Coin Transfer Restriction (LCTR) locks the last coin in any wallet forever, preventing its transfer. This ensures integrity, identity verification, and governance participation.
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What dApps does Xennium offer?</summary>
          <p className="mt-2 text-gray-400">
            Xennium powers multiple dApps, including token creation, governance, identity management, and other decentralized applications built for a secure and scalable ecosystem.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQSection;
