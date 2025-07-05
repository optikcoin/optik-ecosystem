import React, { useState } from 'react';
import { Coins, TrendingUp, Lock, Unlock, Calendar, Award, Shield, Zap } from 'lucide-react';

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('flexible');

  const stakingPools = [
    {
      id: 'flexible',
      name: 'Flexible Staking',
      apy: '8.5%',
      lockPeriod: 'None',
      minStake: '100 OPTK',
      description: 'Stake and unstake anytime with competitive rewards',
      icon: Unlock,
      color: 'green',
    },
    {
      id: '30day',
      name: '30-Day Lock',
      apy: '12.0%',
      lockPeriod: '30 Days',
      minStake: '500 OPTK',
      description: 'Higher rewards for 30-day commitment',
      icon: Calendar,
      color: 'blue',
    },
    {
      id: '90day',
      name: '90-Day Lock',
      apy: '18.5%',
      lockPeriod: '90 Days',
      minStake: '1,000 OPTK',
      description: 'Maximum rewards for long-term stakers',
      icon: Lock,
      color: 'purple',
    },
  ];

  const stakingStats = [
    { label: 'Total Staked', value: '12.5M OPTK', icon: Coins },
    { label: 'Staking Ratio', value: '45.2%', icon: TrendingUp },
    { label: 'Active Stakers', value: '8,947', icon: Award },
    { label: 'Avg APY', value: '13.2%', icon: Zap },
  ];

  const userStaking = [
    {
      pool: 'Flexible Staking',
      amount: '2,500 OPTK',
      rewards: '12.45 OPTK',
      apy: '8.5%',
      status: 'Active',
    },
    {
      pool: '30-Day Lock',
      amount: '5,000 OPTK',
      rewards: '45.67 OPTK',
      apy: '12.0%',
      status: 'Locked (15 days left)',
    },
  ];

  const getPoolColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-400 bg-green-600/20 border-green-500/30';
      case 'blue':
        return 'text-blue-400 bg-blue-600/20 border-blue-500/30';
      case 'purple':
        return 'text-purple-400 bg-purple-600/20 border-purple-500/30';
      default:
        return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
          <Coins className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OPTK <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Staking</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Stake your OPTK tokens to earn rewards and support the network
        </p>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stakingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Staking Pools */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Staking Pools</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {stakingPools.map((pool) => {
            const Icon = pool.icon;
            const isSelected = selectedPool === pool.id;
            return (
              <div
                key={pool.id}
                onClick={() => setSelectedPool(pool.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? getPoolColor(pool.color)
                    : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50'
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`inline-flex p-3 rounded-lg mb-3 ${
                    isSelected ? `bg-${pool.color}-600/20` : 'bg-gray-600/20'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isSelected ? `text-${pool.color}-400` : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{pool.name}</h3>
                  <p className="text-2xl font-bold text-green-400">{pool.apy}</p>
                  <p className="text-gray-400 text-sm">APY</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lock Period:</span>
                    <span className="text-white">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Stake:</span>
                    <span className="text-white">{pool.minStake}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mt-4">{pool.description}</p>
              </div>
            );
          })}
        </div>

        {/* Staking Form */}
        <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
          <h3 className="text-xl font-bold text-white mb-4">Stake OPTK Tokens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount to Stake</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="0.0"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 pr-16 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  OPTK
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-400">Available: 10,250 OPTK</span>
                <button className="text-blue-400 hover:text-blue-300">Max</button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Selected Pool</label>
              <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3">
                <p className="text-white font-medium">
                  {stakingPools.find(p => p.id === selectedPool)?.name}
                </p>
                <p className="text-green-400 text-sm">
                  {stakingPools.find(p => p.id === selectedPool)?.apy} APY
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Estimated Daily Rewards:</span>
              <span className="text-blue-400 font-medium">
                {stakeAmount ? (parseFloat(stakeAmount) * 0.085 / 365).toFixed(4) : '0.0000'} OPTK
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-300">Estimated Annual Rewards:</span>
              <span className="text-green-400 font-medium">
                {stakeAmount ? (parseFloat(stakeAmount) * 0.085).toFixed(2) : '0.00'} OPTK
              </span>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
            Stake Tokens
          </button>
        </div>
      </div>

      {/* User Staking Positions */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Staking Positions</h2>
        <div className="space-y-4">
          {userStaking.map((position, index) => (
            <div
              key={index}
              className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{position.pool}</h3>
                    <div className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium">
                      {position.apy} APY
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Staked Amount</p>
                      <p className="text-white font-medium">{position.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Earned Rewards</p>
                      <p className="text-green-400 font-medium">{position.rewards}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status</p>
                      <p className="text-white font-medium">{position.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Actions</p>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          Claim
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-xs">
                          Unstake
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staking Benefits */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Staking Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-600/20 p-4 rounded-lg inline-flex mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">
              Earn passive income with competitive APY rates up to 18.5%
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Network Security</h3>
            <p className="text-gray-400 text-sm">
              Help secure the OptikCoin network and earn rewards for your contribution
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-4 rounded-lg inline-flex mb-4">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Exclusive Benefits</h3>
            <p className="text-gray-400 text-sm">
              Access premium features and priority support as a staker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}