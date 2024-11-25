import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaCubes } from "react-icons/fa";

const ContractButton = () => {
  return (
    <div className="flex flex-col items-center">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
              })}
            >
              {connected ? (
                <button
                  onClick={openAccountModal}
                  className="px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  Connected: {account.displayName}
                </button>
              ) : (
                <button
                  onClick={openConnectModal}
                  className="px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <span>Connect Wallet</span>
                  <FaCubes className="ml-2" /> {/* Positioned after the text */}
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default ContractButton;
