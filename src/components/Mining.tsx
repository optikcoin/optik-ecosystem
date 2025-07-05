import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { Download, Send, Wallet, Zap, TrendingUp, Settings, Award, Pickaxe, Play, Pause, ExternalLink } from 'lucide-react';

export default function Mining() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const [isMining, setIsMining] = useState(false);
  const [hashRate, setHashRate] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [difficulty, setDifficulty] = useState(1.2);
  const [intensity, setIntensity] = useState("medium");
  const [selectedPool, setSelectedPool] = useState("main");

  const intensityMultiplier = {
    low: 0.25,
    medium: 0.5,
    high: 0.75,
    max: 1,
  }[intensity];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      interval = setInterval(() => {
        setHashRate((prev) => prev + Math.random() * 10 * intensityMultiplier);
        setEarnings((prev) => prev + Math.random() * 0.001 * intensityMultiplier);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMining, intensityMultiplier]);

  const handleConnectWallet = () => {
    if (!connected) setVisible(true);
  };

  const handleClaimRewards = () => {
    if (!connected) return handleConnectWallet();
    alert(`Claiming ${earnings.toFixed(6)} OPTK to your wallet: ${publicKey?.toBase58().slice(0, 8)}...`);
  };

  const handleWithdrawToWallet = () => {
    if (!connected) return handleConnectWallet();
    alert(`Withdrawing mining rewards to OPTIK wallet: ${publicKey?.toBase58().slice(0, 8)}...`);
  };

  const miningStats = [
    { label: 'Hash Rate', value: `${hashRate.toFixed(2)} MH/s`, icon: Zap },
    { label: 'Earnings Today', value: `${earnings.toFixed(6)} OPTK`, icon: TrendingUp },
    { label: 'Network Difficulty', value: difficulty.toFixed(2), icon: Settings },
    { label: 'Active Miners', value: '2,139', icon: Award },
  ];

  const miningPools = {
    main: { rewardRate: 0.0024 },
    community: { rewardRate: 0.0018 },
    solo: { rewardRate: 0.0035 },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <div className="bg-orange-600/20 p-4 rounded-full inline-flex mb-4">
          <Pickaxe className="w-10 h-10 text-orange-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Mine <span className="text-orange-400">OPTK</span> Tokens</h1>
        <p className="text-gray-400 mt-2">Support the network & earn rewards with your OPTIK wallet</p>
      </div>

      {!connected && (
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30 text-yellow-300">
          <div className="flex items-center justify-between">
            <span>Connect your OPTIK wallet to begin mining</span>
            <button
              onClick={handleConnectWallet}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              <Wallet className="inline w-5 h-5 mr-1" /> Connect
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">Mining Control</h2>
          <button
            onClick={() => setIsMining(!isMining)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center ${isMining ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {isMining ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />} {isMining ? 'Stop' : 'Start'} Mining
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {miningStats.map((stat, i) => (
            <div key={i} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white text-lg font-semibold">{stat.value}</p>
                </div>
                <stat.icon className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm">Mining Intensity</label>
            <select
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full mt-1 bg-gray-700 border border-gray-600 p-2 rounded-lg text-white"
            >
              <option value="low">Low (25%)</option>
              <option value="medium">Medium (50%)</option>
              <option value="high">High (75%)</option>
              <option value="max">Max (100%)</option>
            </select>
          </div>
          <div>
            <label className="text-gray-300 text-sm">Mining Pool</label>
            <select
              onChange={(e) => setSelectedPool(e.target.value)}
              className="w-full mt-1 bg-gray-700 border border-gray-600 p-2 rounded-lg text-white"
            >
              <option value="main">OPTK Main Pool</option>
              <option value="community">Community Pool</option>
              <option value="solo">Solo Mining</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-white font-bold mb-4">Rewards Summary</h3>
          <p className="text-green-400 text-xl font-bold mb-2">{earnings.toFixed(6)} OPTK</p>
          <button
            onClick={handleClaimRewards}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mb-3 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" /> Claim Rewards
          </button>
          <button
            onClick={handleWithdrawToWallet}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" /> Withdraw to Wallet
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-white font-bold mb-4">Wallet Info</h3>
          {connected ? (
            <>
              <p className="text-green-400">Connected:</p>
              <p className="text-white text-sm mb-2">{publicKey?.toBase58()}</p>
            </>
          ) : (
            <p className="text-gray-400">Wallet not connected</p>
          )}
          <button
            onClick={() => window.open('https://wallet.optikcoin.com', '_blank')}
            className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <ExternalLink className="w-5 h-5 mr-2" /> Open OPTIK Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
