"use client";

export default function PrivacyPolicy() {
  const handleBackToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 sm:pt-8 gap-6 w-full">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-lg">
        Welcome to Xennium! Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
      </p>
      <section className="text-left max-w-12xl w-full">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p className="pb-6">
          We collect basic user information when you sign in using Google. This includes your name, email address, and profile picture. Additionally, we may collect information about your interactions with our platform to improve our services.
        </p>
        <p className="pb-6">
          Our platform may also collect metadata related to your usage patterns, such as the duration and frequency of access, for analytical purposes.
        </p>
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p className="pb-6">
          The information we collect is used to personalize your experience on Xennium and provide you with a seamless dApp experience. This includes customizing features, improving functionality, and offering relevant updates.
        </p>
        <p className="pb-6">
          We may also use anonymized data to develop insights, improve system performance, and enhance our services reliability and scalability.
        </p>
        <h2 className="text-2xl font-semibold">Data Sharing</h2>
        <p className="pb-6">
          We do not share your personal information with any third parties. Your data is stored securely and used solely for the intended purposes of the Xennium platform. We implement robust security measures to ensure your data remains protected.
        </p>
        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p className="pb-6">
          You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us.
        </p>
        <p className="pb-6">
          Additionally, you can request information about how your data is processed or opt out of data collection processes by contacting us directly.
        </p>
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="pb-6">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:contact@xennium.org" className="text-blue-500 underline">
            contact@xennium.org
          </a>
          .
        </p>
      </section>
      <button
        className="mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-700"
        onClick={handleBackToSignup}
      >
        Back to Signup
      </button>
    </main>
  );
}
