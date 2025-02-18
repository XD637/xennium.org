import React from 'react';

const FAQSection = () => {
  return (
    <section className="relative z-10 pt-16 px-8 sm:px-16 text-left mb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is Xennium Token?</summary>
          <p className="mt-2 text-gray-400">
            Xennium Token (XENX) is a next-gen cryptocurrency designed with innovative features like decentralized governance and the Last Coin Transfer Restriction (LCTR) to empower secure identity management and decision-making.
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">How do I participate in governance?</summary>
          <p className="mt-2 text-gray-400">
            Hold Xennium Tokens and vote on community-driven proposals. Your token holdings give you a voice in shaping the future of the Xennium ecosystem.
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is the LCTR feature?</summary>
          <p className="mt-2 text-gray-400">
            The Last Coin Transfer Restriction (LCTR) ensures that the final token in circulation cannot be transferred, maintaining integrity and preserving governance and identity functions.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQSection;
