// components/SignInSignOutButton.js
"use client";
import { useSession, signOut } from "next-auth/react"; // Import session handling from NextAuth.js
import Link from "next/link";

const SignInSignOutButton = () => {
  const { data: session } = useSession(); // Get session data from NextAuth

  return (
    <Link
      href={session ? "#" : "/signin"} // If session exists, don't link to signin
      onClick={session ? signOut : undefined} // Call signOut if session exists
      className="absolute top-6 right-6 z-60 px-4 py-1 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
      style={{
        pointerEvents: "auto",
        position: "absolute",
        top: "30px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {session ? "Sign Out" : "Sign In"}
    </Link>
  );
};

export default SignInSignOutButton;
