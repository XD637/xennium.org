"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in app directory
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import Navbar from "../components/Navbar";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to check if we are on the client side
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert(
        "Please agree to the Privacy Policy and Terms & Conditions before submitting."
      );
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
        if (isClient) {
          router.push("/signin"); // Redirect after sign up
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred, please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-[#1c1c1e] text-gray-200">
      <Navbar />
      <main className="relative flex flex-col items-center justify-center pt-24 sm:pt-32 px-4 sm:px-8 pb-20">
        <div className="relative p-4 rounded-md bg-[#2d2d2d] text-white border border-gray-700 shadow-lg w-full max-w-lg mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
            Sign Up
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
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

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
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-md bg-[#1c1c1e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition duration-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="termsAndConditions"
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                required
                className="text-purple-500 focus:ring-0"
              />
              <label htmlFor="termsAndConditions" className="text-gray-300">
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  className="text-purple-500 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-purple-500 hover:underline"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-transparent border-2 border-purple-500 rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="flex items-center gap-2 my-4">
              <div className="h-px flex-grow bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px flex-grow bg-gray-600"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center px-4 py-2 bg-transparent border-2 border-purple-500 rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-105 transition-all duration-300"
            >
              Sign Up with Google
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-purple-500 hover:underline font-semibold"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
