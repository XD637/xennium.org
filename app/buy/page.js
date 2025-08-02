"use client";

import { useState, useEffect } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import Navbar from "../components/Navbar";
import SocialFooter from "../components/SocialFooter";

const TOKEN_SALE_ADDRESS = "0xDa2a0052c1F68231B76D799643D1400b857037f2";
const TOKEN_RATE = 1000; // 1 POL = 1000 XENX
const MIN_POL = 0.001;

export default function BuyPage() {
    const { address, isConnected } = useAccount();
    const [polAmount, setPolAmount] = useState("");
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionState, setTransactionState] = useState("idle"); // idle, sending, sent, confirmed

    const { data, sendTransaction, isLoading, isSuccess, isError, error: txError } = useSendTransaction();
    const { data: balance } = useBalance({ address });

    // Handle transaction state changes
    useEffect(() => {
        if (data && !isSuccess && !isError) {
            // Transaction hash received but not confirmed yet
            setTransactionState("sent");
        } else if (isSuccess && data) {
            // Transaction confirmed
            setTransactionState("confirmed");
            setIsProcessing(false);
        } else if (isError) {
            // Transaction failed
            setTransactionState("idle");
            setIsProcessing(false);
        }
    }, [data, isSuccess, isError]);

    const handleBuy = (e) => {
        e.preventDefault();
        setError("");
        setIsProcessing(true);
        setTransactionState("sending");

        if (!polAmount || isNaN(polAmount) || Number(polAmount) < MIN_POL) {
            setError("Enter at least 0.001 POL");
            setIsProcessing(false);
            setTransactionState("idle");
            return;
        }

        try {
            // Send POL to contract - it automatically sends XENX back
            sendTransaction({
                to: TOKEN_SALE_ADDRESS,
                value: parseEther(polAmount),
            });
        } catch (err) {
            console.error("Transaction Error:", err);
            setError(err.message || "Transaction failed. Please try again.");
            setIsProcessing(false);
            setTransactionState("idle");
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-gray-200 flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 mt-32">
                <div className="w-full max-w-md bg-[#18181b] border border-[#232323] rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">Buy XENX</h1>

                    <div className="mb-6 text-center">
                        <div className="text-xl text-gray-300 mb-2">
                            1 POL = <span className="text-[#00ffa3] font-bold">1,000 XENX</span>
                        </div>
                        <div className="text-sm text-gray-400">Minimum: 0.001 POL</div>
                    </div>

                    {!isConnected ? (
                        <div className="text-center text-gray-400 py-8">
                            <div className="text-4xl mb-4">🔒</div>
                            <p>Connect your wallet to buy XENX tokens</p>
                        </div>
                    ) : (
                        <form onSubmit={handleBuy} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Amount (POL)</label>
                                <input
                                    type="number"
                                    min={MIN_POL}
                                    step="0.001"
                                    value={polAmount}
                                    onChange={(e) => setPolAmount(e.target.value)}
                                    className="w-full rounded-lg bg-[#232323] border border-[#333] text-white px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#00ffa3] placeholder:text-gray-500"
                                    placeholder="0.01"
                                />
                            </div>

                            <div className="bg-[#232323] rounded-lg p-4 text-center">
                                <span className="text-gray-400">You will receive:</span>
                                <div className="text-xl font-bold text-[#00ffa3] mt-1">
                                    {polAmount && !isNaN(polAmount) ? (Number(polAmount) * TOKEN_RATE).toLocaleString() : 0} XENX
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-6 rounded-lg bg-[#00ffa3] hover:bg-[#00cc82] text-[#18181b] font-bold text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={isProcessing || isLoading}
                            >
                                {(isProcessing || isLoading) ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#18181b] border-t-transparent mr-2"></div>
                                        Processing...
                                    </div>
                                ) : "Buy XENX"}
                            </button>

                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {isError && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                                    Transaction failed. {txError?.message && (
                                        <div className="mt-1 text-xs opacity-80 break-all">{txError.message}</div>
                                    )}
                                </div>
                            )}

                            {transactionState === "sent" && (
                                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-blue-400 text-sm text-center">
                                    <div className="font-medium">Transaction Sent!</div>
                                    <div className="text-xs mt-1 opacity-80">Waiting for confirmation...</div>
                                </div>
                            )}

                            {transactionState === "confirmed" && data && (
                                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm text-center">
                                    <div className="font-medium">Transaction Confirmed!</div>
                                    <a
                                        href={`https://polygonscan.com/tx/${data}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-300 hover:text-green-200 underline text-xs mt-1 inline-block"
                                    >
                                        View on PolygonScan
                                    </a>
                                </div>
                            )}
                        </form>
                    )}

                    <div className="mt-6 pt-4 border-t border-[#232323] text-center">
                        <p className="text-xs text-gray-400 mb-1">Contract Address:</p>
                        <code className="text-[#8247e5] text-xs font-mono break-all">{TOKEN_SALE_ADDRESS}</code>
                    </div>
                </div>
            </main>
            <SocialFooter />
        </div>
    );
}
