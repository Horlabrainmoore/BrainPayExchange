import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "@/context/WalletContext"; // ← ADD
import Header from "@/components/Header"; // ← ADD

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "BrainPay Runes Explorer",
  description: "Real-time Bitcoin Runes tracker — balances, txs, mints",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen pt-20`}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <Header />
            {children}
          </WalletProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}