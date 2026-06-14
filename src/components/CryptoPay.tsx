"use client";

import { useAccount, useConnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

interface CryptoPayProps {
  amount: string;
  sellerAddress: string;
  escrowContract: string;
  onSuccess: (txHash: string) => void;
}

export default function CryptoPay({ amount, sellerAddress, escrowContract, onSuccess }: CryptoPayProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90"
      >
        🔗 Connect Wallet to Pay
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Total</span>
          <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">{amount} ETH</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Your wallet</span>
          <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        🔒 Payment held in smart contract escrow until you confirm delivery
      </p>
      <button className="w-full bg-gradient-to-r from-eth-blue to-eth-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
        Pay {amount} ETH →
      </button>
    </div>
  );
}
