import React from 'react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-gray-200">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
        <p className="text-sm mt-4">Sign-in before continuing...</p>
      </div>
    </div>
  );
};

export default SignIn;
