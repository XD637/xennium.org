"use client";
import { useSession, signOut } from "next-auth/react"; // Import session handling from NextAuth.js
import Link from "next/link";

const SignInSignOutButton = () => {
  const { data: session } = useSession(); // Get session data from NextAuth

  return (
    <>
      {/* Desktop Button */}
      <Link
        href={session ? "#!" : "/signin"} // If session exists, don't link to signin
        onClick={session ? signOut : undefined} // Call signOut if session exists
        className="absolute top-[35px] right-[20px] z-[1000] px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
        style={{
          pointerEvents: "auto",
        }}
      >
        {session ? "Sign Out" : "Sign In"}
      </Link>

      {/* Mobile Button */}
      <div className="relative flex justify-center items-center top-20">
        <Link
          href={session ? "#!" : "/signin"} // If session exists, don't link to signin
          onClick={session ? signOut : undefined} // Call signOut if session exists
          className="z-[1000] px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
          style={{
            pointerEvents: "auto",
          }}
        >
          {session ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </>
  );
};

export default SignInSignOutButton;
