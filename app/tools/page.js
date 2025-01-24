"use client";

import React from "react";
import Navbar from "../components/Navbar";
import ExplorerTool from "../components/ExplorerTool";

export default function Tools() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-gray-200">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Xennium Explorer</h1>
        <p className="text-sm text-gray-400 mb-6">
          Note: Tools are currently in beta. Please report any issues or feedback.
        </p>
        <ExplorerTool />
      </main>
    </div>
  );
}
