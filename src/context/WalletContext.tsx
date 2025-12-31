'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('brainpay_wallet_address');
    if (saved) setAddress(saved);
  }, []);

  const connect = async () => {
    if (typeof window === 'undefined' || typeof (window as any).unisat === 'undefined') {
      alert('Unisat wallet extension not detected. Install from https://unisat.io');
      window.open('https://unisat.io', '_blank');
      return;
    }

    try {
      const unisat = (window as any).unisat;
      const accounts: string[] = await unisat.requestAccounts();
      if (accounts.length === 0) throw new Error('No accounts');

      const newAddress = accounts[0];
      setAddress(newAddress);
      localStorage.setItem('brainpay_wallet_address', newAddress);
    } catch (err) {
      console.error(err);
      alert('Wallet connection failed or rejected');
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('brainpay_wallet_address');
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, isConnected: !!address }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
}