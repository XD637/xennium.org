import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const AddTokenButton = () => {
  const [showModal, setShowModal] = useState(false);

  const tokenAddress = '0x78c7088e5c3e6cff6a94b57cb3c1e2ec4a5b7587'; // Replace with your token's contract address
  const tokenSymbol = 'XENX'; // Replace with your token symbol
  const tokenDecimals = 18; // Replace with your token's decimals
  const tokenNetwork = {
    chainId: '0x89', // Polygon Mainnet chain ID
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'], // Reliable RPC URL for Polygon
    blockExplorerUrls: ['https://polygonscan.com/'], // Polygon block explorer
  };

  const addTokenToWallet = async () => {
    try {
      if (window.ethereum) {
        // Ensure the user is on the correct network
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (currentChainId !== tokenNetwork.chainId) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [tokenNetwork],
          });
        }

        // Add the token to the wallet
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
            },
          },
        });
        alert('Token added to wallet!');
      } else {
        alert('Please install MetaMask or another Ethereum wallet.');
      }
    } catch (error) {
      console.error('Error adding token to wallet:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mt-8 flex items-center space-x-3 px-4 py-2 bg-transparent border-2 border-purple-500 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
      >
        <span>Add Token</span>
        <FaArrowRight className="ml-2" /> {/* Positioned after the text */}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full text-center">
            {/* Manual Instructions */}
            <h2 className="text-xl font-bold text-purple-700 mb-4">Manual Token Addition</h2>
            <p className="mb-4 text-gray-700">
              To manually add the token to your wallet:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 mb-6">
              <li>Switch to the Polygon Mainnet network in your wallet.</li>
              <li>
                Copy the token address:{" "}
                <code className="bg-gray-200 text-purple-700 rounded px-2">
                  {tokenAddress}
                </code>
              </li>
              <li>Go to your wallet and import tokens with the copied address.</li>
            </ul>

            {/* Security Warning */}
            <h2 className="text-xl font-bold text-purple-700 mb-4">Learn about the scams</h2>
            <p className="text-gray-700 mb-6">
              Adding custom tokens may expose you to risks. Scammers may create tokens with similar names to legitimate ones, leading to potential phishing or scams. 
            </p>
            <p className="text-gray-700 font-semibold mb-6">
  MetaMask will warn you before adding suspicious tokens. Always verify the contract address from official sources. You can verify our token on -  
  <a 
    href="https://polygonscan.com/token/0x78c7088e5c3e6cff6a94b57cb3c1e2ec4a5b7587" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-purple-500 underline hover:text-purple-700"
  >
     PolygonScan
  </a>.
</p>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  addTokenToWallet();
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTokenButton;
