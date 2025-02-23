"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ImSpinner2 } from "react-icons/im"; // Import spinner icon
import Navbar from "../components/Navbar";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(""); // Error message state
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError(res.error); // Show error message in UI
    } else {
      router.push("/dapps"); // Redirect silently on success
    }

    setIsSigningIn(false);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dapps" });
  };

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="relative flex flex-col items-center justify-center pt-32 sm:pt-38 lg:pt-32 px-4 sm:px-8 pb-20">
        <div className="relative p-4 rounded-md overflow-auto bg-[#2d2d2d] text-white border border-gray-700 shadow-lg w-full max-w-lg mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
            {isSigningIn ? "Signing In..." : "Sign In"}
          </h1>

          {error && <p className="text-purple-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-purple-500 hover:underline text-sm font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningIn}
            >
              {isSigningIn ? <ImSpinner2 className="animate-spin text-xl" /> : <span>Sign In</span>}
            </button>

            <div className="flex items-center gap-2 my-4">
              <div className="h-px flex-grow bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px flex-grow bg-gray-600"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
            >
              <span>Sign In with Google</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don’t have an account?{" "}
              <a href="/signup" className="text-purple-500 hover:underline font-semibold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
