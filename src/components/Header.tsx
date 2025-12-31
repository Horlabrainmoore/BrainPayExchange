'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';

export default function Header() {
  const { address, connect, disconnect, isConnected } = useWallet();

  const shortAddress = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : '';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-900/90 backdrop-blur border-b border-gray-800">
      <Link href="/" className="text-2xl font-bold text-purple-400">
        BrainPay Runes
      </Link>

      <div className="flex items-center gap-6">
        {isConnected ? (
          <>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Connected:</span>
              <span className="font-mono text-sm">{shortAddress}</span>
            </div>
            <Link
              href={`/address/${address}`}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
              My Portfolio
            </Link>
            <button
              onClick={disconnect}
              className="text-sm underline hover:text-gray-400 transition"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={connect}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            Connect Unisat Wallet
          </button>
        )}
      </div>
    </header>
  );
}