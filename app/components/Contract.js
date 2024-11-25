import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal"; // Import the QRCodeModal
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaCubes } from "react-icons/fa";


const ContractButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletConnectProvider, setWalletConnectProvider] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWithWallet = async (wallet) => {
    try {
      let provider;

      if (wallet === "metamask" && window.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const ethProvider = new ethers.BrowserProvider(window.ethereum);
        provider = ethProvider;
        setWalletAddress(accounts[0]);
      } else if (wallet === "coinbase" && window.coinbase) {
        const accounts = await window.coinbase.request({
          method: "eth_requestAccounts",
        });
        const ethProvider = new ethers.BrowserProvider(window.coinbase);
        provider = ethProvider;
        setWalletAddress(accounts[0]);
      } else if (wallet === "phantom" && window.solana?.isPhantom) {
        const { publicKey } = await window.solana.connect();
        setWalletAddress(publicKey.toString());
        provider = new ethers.JsonRpcProvider("https://api.mainnet-beta.solana.com");
      } else if (wallet === "walletconnect") {
        try {
          const wcProvider = new WalletConnectProvider({
            rpc: {
              1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
            },
            qrcodeModal: QRCodeModal,
          });

          wcProvider.on("disconnect", () => {
            console.log("WalletConnect disconnected.");
            cleanupWalletConnectProvider();
          });

          await wcProvider.enable();
          const wcBrowserProvider = new ethers.BrowserProvider(wcProvider);

          const signer = wcBrowserProvider.getSigner();
          const address = await signer.getAddress();

          setWalletConnectProvider(wcProvider);
          provider = wcBrowserProvider;
          setWalletAddress(address);
        } catch (error) {
          if (error.message && error.message.includes("User closed modal")) {
            setErrorMessage(null);
            return;
          } else {
            setErrorMessage("Connection failed: " + error.message);
            return;
          }
        }
      } else {
        alert("Unsupported wallet or wallet not installed.");
        return;
      }

      setIsConnected(true);
      setIsModalOpen(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Connection failed: " + error.message);
      setIsConnected(false);
    }
  };

  const cleanupWalletConnectProvider = () => {
    if (walletConnectProvider) {
      try {
        walletConnectProvider.disconnect();
      } catch (error) {
        console.warn("Error during WalletConnect cleanup:", error.message);
      }
      setWalletConnectProvider(null);
    }
  };

  const disconnectWallet = () => {
    cleanupWalletConnectProvider();
    setWalletAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    if (!isModalOpen && walletConnectProvider) {
      cleanupWalletConnectProvider();
    }
  }, [isModalOpen]);

  return (
    <div className="relative flex flex-col items-center text-center">
      {isConnected ? (
        <button
          onClick={disconnectWallet}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span>
            Connected: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Reload..."}
          </span>
        </button>
      ) : (
        <>

<button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
>
  <span className="flex items-center gap-2">
    Connect Wallet <FaCubes size={18} />
  </span>
</button>


          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            center
            showCloseIcon={false} // Hide default close icon
            classNames={{
              modal: "custom-modal",
            }} 
          >
            {/* Custom Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 z-50 p-1"
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          
          <img
            src="/basic-icons/x.svg" // Path to your custom SVG
            alt="Close"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              filter: "invert(1)", 
            }}
          />
        </button>

            <div
              className="p-6 rounded-lg text-white space-y-4"
              style={{
                background: "linear-gradient(145deg, #1b1b1b, #232323)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
              }}
            >
              <h2 className="text-2xl font-semibolds mb-4 text-center pt-2 pb-2">Connect Wallet<i class="bi bi-arrow-right-short"></i></h2>
              {errorMessage && (
                <div className="text-white text-center mb-4">{errorMessage}</div>
              )}
              <div className="flex flex-col gap-4 items-center">
                {[
                  { wallet: "metamask", color: "#f6851b", logo: "/wallet-logos/metamask-logo.svg", name: "MetaMask" },
                  { wallet: "walletconnect", color: "#3999fc", logo: "/wallet-logos/walletconnect-logo.svg", name: "WalletConnect" },
                  { wallet: "coinbase", color: "#0052FF", logo: "/wallet-logos/coinbase-logo.svg", name: "Coinbase Wallet" },
                  { wallet: "phantom", color: "#AB9FF2", logo: "/wallet-logos/phantom-logo.svg", name: "Phantom Wallet" },
                ].map(({ wallet, color, logo, name }) => (
                  <button
                    key={wallet}
                    onClick={() => connectWithWallet(wallet)}
                    className="flex items-center gap-2 w-56 px-4 py-3 text-white rounded-lg transition-all duration-300"
                    style={{ backgroundColor: "transparent", border: `1px solid transparent` }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = color)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    <img src={logo} alt={name} className="h-6 w-6" />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ContractButton;
