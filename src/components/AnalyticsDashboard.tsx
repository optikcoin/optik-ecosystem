import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Eye, Volume2, Zap, Target, Settings } from 'lucide-react';
import InteractiveTradingChart from './InteractiveTradingChart';

export default function AnalyticsDashboard() {
  const [selectedToken, setSelectedToken] = useState('OPTK/SOL');

  const topTokens = [
    { symbol: 'OPTK', name: 'OptikCoin', price: '$0.0245', change: '+8.67%', volume: '$2.4M', positive: true },
    { symbol: 'SOL', name: 'Solana', price: '$98.45', change: '+5.67%', volume: '$2.4B', positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,345.67', change: '+2.34%', volume: '$8.9B', positive: true },
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,210.98', change: '-1.23%', volume: '$15.2B', positive: false },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.01%', volume: '$4.1B', positive: true },
  ];

  const marketMetrics = [
    { label: 'Total Volume 24h', value: '$847.2M', icon: BarChart3, change: '+12.5%' },
    { label: 'Active Pairs', value: '12,847', icon: Activity, change: '+156' },
    { label: 'Market Cap', value: '$1.67T', icon: DollarSign, change: '+2.8%' },
    { label: 'Unique Visitors', value: '89.4K', icon: Eye, change: '+5.2%' },
  ];

  return (
    <div className="space-y-6">
      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <p className="text-cyan-400 text-sm mt-1">{metric.change}</p>
                </div>
                <div className="bg-cyan-600/20 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Token Selector */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Select Trading Pair</h2>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Live Trading</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {topTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => setSelectedToken(`${token.symbol}/SOL`)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedToken === `${token.symbol}/SOL`
                  ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50 border border-gray-600/30'
              }`}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">{token.symbol.charAt(0)}</span>
              </div>
              <span>{token.symbol}/SOL</span>
              <span className={`text-xs ${token.positive ? 'text-green-400' : 'text-red-400'}`}>
                {token.change}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Trading Chart */}
      <InteractiveTradingChart selectedPair={selectedToken} />

      {/* Top Tokens Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Top Tokens</h2>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Real-time data</span>
          </div>
        </div>
        <div className="space-y-4">
          {topTokens.map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-cyan-600/20 hover:border-cyan-500/30"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{token.symbol.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{token.symbol}</p>
                  <p className="text-gray-400 text-sm">{token.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-white font-semibold">{token.price}</p>
                <div className="flex items-center space-x-1">
                  {token.positive ? (
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${token.positive ? 'text-cyan-400' : 'text-red-400'}`}>
                    {token.change}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-gray-400 text-sm">Volume</p>
                <p className="text-white font-medium">{token.volume}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}