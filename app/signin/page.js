"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in app directory
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import Navbar from "../components/Navbar";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false); // State to check if we are on the client side
  const [isSigningIn, setIsSigningIn] = useState(false); // State for signing-in status
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (directly use next-auth CredentialsProvider)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true); // Set signing-in state to true

    const res = await signIn("credentials", {
      redirect: false, // Prevent auto-redirect
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      alert(res.error); // Show error message if sign-in fails
    } else {
      alert("Sign In successful!");
      router.push("/"); // Redirect to home page after successful sign-in
    }

    setIsSigningIn(false); // Reset signing-in state
  };

  // Google sign-in handler
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!isClient) {
    return null; // Return nothing until we know we are on the client
  }

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center pt-32 sm:pt-38 lg:pt-32 px-4 sm:px-8 pb-20">
        <div className="relative p-4 rounded-md overflow-auto bg-[#2d2d2d] text-white border border-gray-700 shadow-lg w-full max-w-lg mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6">
            {isSigningIn ? "Signing In..." : "Sign In"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300">
                Email Address
              </label>
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

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-300">
                Password
              </label>
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-purple-500 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
              disabled={isSigningIn}
            >
              <span>{isSigningIn ? "Signing In..." : "Sign In"}</span>
            </button>

            {/* OR Separator */}
            <div className="flex items-center gap-2 my-4">
              <div className="h-px flex-grow bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px flex-grow bg-gray-600"></div>
            </div>

            {/* Google Sign-In Button */}
<button
  type="button"
  onClick={handleGoogleSignIn}
  className="flex items-center justify-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
>
  <span>Sign In with Google</span>
</button>

          </form>

          {/* Don't Have an Account */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-purple-500 hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
