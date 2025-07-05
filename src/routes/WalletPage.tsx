import React from 'react';
import OptikWalletDownload from '../components/OptikWalletDownload';
import OptikWallet from '../components/OptikWallet';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletPage() {
  const { connected } = useWallet();

  return (
    <div className="container mx-auto px-4 py-8">
      {connected ? <OptikWallet /> : <OptikWalletDownload />}
    </div>
  );
}