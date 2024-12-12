// App.js
"use client";

import { useEffect, useState } from "react";
import '@rainbow-me/rainbowkit/styles.css'; // Import RainbowKit styles
import { getDefaultConfig } from '@rainbow-me/rainbowkit'; // Import at the top
import { WagmiProvider } from 'wagmi'; // Import Wagmi provider
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'; // Import chains from Wagmi
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"; // Import React Query provider
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { SessionProvider } from "next-auth/react"; // Import SessionProvider here

const App = ({ children, session }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const rainbowConfig = getDefaultConfig({
      appName: 'Xennium',
      projectId: '3841a0406d66a8b07e27422fa585bc6d', // Replace with your actual project ID
      chains: [mainnet, polygon, optimism, arbitrum, base], // Add more chains if needed
      ssr: true, // Enable SSR (Server Side Rendering) if needed
    });
    setConfig(rainbowConfig); // Set the config when it is available
  }, []);

  if (!config) return null; // Wait until config is loaded before rendering

  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#7b3fe4', // Custom accent color
              accentColorForeground: 'white', // Custom foreground color
              borderRadius: 'medium', // Custom border radius
            })}
            chains={config.chains}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default App;
