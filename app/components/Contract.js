import { useState, useEffect } from "react";
import { FaCubes } from "react-icons/fa";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const ContractButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAddress = accounts[0];
        setWalletAddress(currentAddress);
        setIsConnected(true);

        const ethProvider = new ethers.JsonRpcProvider(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        );
        setProvider(ethProvider);

        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Wallet connection failed:", error.message || error);
        alert("Connection failed: " + (error.message || "Unknown error"));
      }
    } else {
      // Use WalletConnect for mobile or unsupported wallets
      try {
        const walletConnectProvider = new WalletConnectProvider({
          rpc: {
            1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, // Mainnet
            11155111: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, // Sepolia testnet
          },
        });

        await walletConnectProvider.enable();
        const wcProvider = new ethers.BrowserProvider(walletConnectProvider);
        const signer = wcProvider.getSigner();

        const accounts = await signer.getAddress();
        setWalletAddress(accounts);
        setProvider(wcProvider);
        setIsConnected(true);
      } catch (error) {
        console.error("WalletConnect failed:", error.message || error);
        alert("WalletConnect failed: " + (error.message || "Unknown error"));
      }
    }
  };

  const disconnectWallet = () => {
    if (provider instanceof WalletConnectProvider) {
      provider.disconnect().catch((err) => console.error("Error disconnecting WalletConnect:", err));
    }
    setWalletAddress(null);
    setIsConnected(false);
    setProvider(null);
  };
  

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const checkConnection = async () => {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);

          const ethProvider = new ethers.JsonRpcProvider(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
          );
          setProvider(ethProvider);
        }
      };
      checkConnection();
    }
  }, []);

  return (
    <div className="relative flex items-center">
      {isConnected ? (
        <button
          onClick={disconnectWallet}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span>
            Connected: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Reload..."}
          </span>
          <FaCubes />
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span>Connect Wallet</span>
          <FaCubes />
        </button>
      )}
    </div>
  );
};

export default ContractButton;
