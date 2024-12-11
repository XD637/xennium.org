"use client";

export default function TermsAndConditions() {
  const handleBackToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <main className="relative flex flex-col items-center text-center z-10 px-8 sm:px-16 sm:pt-8 gap-6 w-full">
      <h1 className="text-4xl font-bold">Terms and Conditions</h1>
      <p className="text-lg">
        Welcome to Xennium! By accessing or using our dApp, you agree to the following terms and conditions.
      </p>
      <section className="text-left max-w-12xl w-full">
        <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
        <p className="pb-6">
          By using Xennium, you acknowledge that you have read and understood these terms and agree to be bound by them. If you do not agree, you must discontinue using the platform.
        </p>
        <h2 className="text-2xl font-semibold">Use of the Service</h2>
        <p className="pb-6">
          Xennium is a decentralized application (dApp). You are responsible for ensuring the security of your account and private keys. We are not liable for any loss of access resulting from negligence or unauthorized activities.
        </p>
        <p className="pb-6">
          You agree not to use Xennium for any illegal activities, including fraud, hacking, or other actions that violate applicable laws.
        </p>
        <h2 className="text-2xl font-semibold">User Information</h2>
        <p className="pb-6">
          We collect user information through Google Sign-In. By using Xennium, you consent to this data collection and usage as outlined in our Privacy Policy. You are responsible for providing accurate and up-to-date information.
        </p>
        <h2 className="text-2xl font-semibold">Changes to Terms</h2>
        <p className="pb-6">
          We reserve the right to update these terms at any time. Continued use of the service after updates constitutes acceptance of the revised terms. Notifications regarding updates will be provided through the platform.
        </p>
        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p className="pb-6">
          Xennium is provided &quot;as is&quot; without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.
        </p>
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="pb-6">
          For questions or concerns about these terms, please reach out to us at{" "}
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
