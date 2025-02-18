import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

const ConnectWallet = () => {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [chain, setChain] = useState(null);
  const [library, setLibrary] = useState(null);

  // Fetch balance when account, chain, or library changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (account && library) {
        const balanceInWei = await library.getBalance(account.address);
        const balanceInEth = parseFloat(library.utils.formatEther(balanceInWei));
        setBalance(balanceInEth);
      }
    };

    if (account && chain && library) {
      fetchBalance();
    }
  }, [account, chain, library]);

  // Update state when connectedAccount, connectedChain, or connectedLibrary changes
  const handleConnect = (connectedAccount, connectedChain, connectedLibrary, mounted) => {
    const ready = mounted;
    const connected = ready && connectedAccount && connectedChain;

    if (connected) {
      setAccount(connectedAccount);
      setChain(connectedChain);
      setLibrary(connectedLibrary);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ConnectButton>
        {({ account: connectedAccount, chain: connectedChain, openAccountModal, openChainModal, openConnectModal, library: connectedLibrary, mounted }) => {
          handleConnect(connectedAccount, connectedChain, connectedLibrary, mounted);

          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
              })}
            >
              {connectedAccount && connectedChain ? (
                <div>
                  <button
                    onClick={openAccountModal}
                    aria-label={`Connected to ${connectedAccount.displayName}`}
                    className="px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    Connected: {connectedAccount.displayName}
                  </button>
                  <div className="mt-2 text-white">
                    <p>Balance: {balance ? balance.toFixed(4) : "Loading..."}</p>
                    <p>Chain: {connectedChain.name}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={openConnectModal}
                  aria-label="Connect wallet"
                  aria-live="assertive"
                  className="mt-8 flex items-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 border-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:border-gradient-to-br hover:scale-105 transition-all duration-300"
                >
                  <span>Connect Wallet</span>
                  <FaArrowRight className="ml-2" />
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton>
    </div>
  );
};

export default ConnectWallet;
