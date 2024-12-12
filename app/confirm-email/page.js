"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/confirm-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Email verified successfully!");
      router.push("/signin");
    } else {
      alert(data.message || "Verification failed.");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      <main className="flex flex-col items-center justify-center pt-24 sm:pt-32 px-4 sm:px-8 pb-20">
        <div className="relative p-4 rounded-md bg-[#2d2d2d] text-white border border-gray-700 shadow-lg w-full max-w-lg mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
            Confirm Your Email
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-gray-300">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter your verification code"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-transparent border-2 border-purple-500 rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
