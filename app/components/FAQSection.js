import React from 'react';

const FAQSection = () => {
  return (
    <section className="relative z-10 pt-16 px-8 sm:px-16 text-left mb-16 max-w-6xl m-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is Xennium?</summary>
          <p className="mt-2 text-gray-400">
            Xennium (XENX) is a novel token built on the Polygon network. It features the innovative LCTR (Last Coin Transfer Restriction) mechanism, designed to prevent user from spending their last token. Verified on <a href="https://polygonscan.com/token/0x0F29965ca5f1111B073EfA37A739Dd2faFab11E0" className="text-purple-400 hover:underline">polygonscan.</a>
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">What is the LCTR feature?</summary>
          <p className="mt-2 text-gray-400">
            LCTR stands for Last Coin Transfer Restriction. It prevents users from transferring their last XENX token, ensuring that every wallet always holds at least one coin. See the <a href="/docs" className="text-purple-400 hover:underline">docs.</a>
          </p>
        </details>
        <details className="bg-[#2a2a2a] p-4 rounded-lg shadow-md hover:bg-[#3a3a3a] transition-all">
          <summary className="text-lg text-white cursor-pointer select-none">How to get XENX?</summary>
          <p className="mt-2 text-gray-400">
            You can acquire XENX by joining our growing community, participating in events, and engaging with the ecosystem. Start by visiting our community page <a href="/community" className="text-purple-400 hover:underline">here.</a>
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQSection;