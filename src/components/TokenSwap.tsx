import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Settings, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import JupiterDEX from './JupiterDEX';

export default function TokenSwap() {
  const [activeTab, setActiveTab] = useState<'basic' | 'jupiter'>('jupiter');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
          <ArrowUpDown className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OPTK <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DEX</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Swap tokens instantly with the best rates across multiple DEXes
        </p>
      </div>

      {/* Swap Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2 max-w-md mx-auto">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('jupiter')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'jupiter'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Jupiter (Multi-DEX)</span>
          </button>
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'basic'
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Basic Swap</span>
          </button>
        </div>
      </div>

      {/* Swap Interface */}
      {activeTab === 'jupiter' ? (
        <JupiterDEX />
      ) : (
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Basic Swap</h2>
              <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* From Token */}
            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">From</span>
                  <span className="text-gray-400 text-sm">
                    Balance: 0.00
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="0.0"
                    className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
                  />
                  <select
                    className="bg-gray-600/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                    <option value="OPTK">OPTK</option>
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  className="p-2 bg-gray-700/50 hover:bg-blue-600/20 border border-gray-600/50 hover:border-blue-500/50 rounded-lg transition-all duration-200 group"
                >
                  <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                </button>
              </div>

              {/* To Token */}
              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">To</span>
                  <span className="text-gray-400 text-sm">
                    Balance: 0.00
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="0.0"
                    readOnly
                    className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
                  />
                  <select
                    className="bg-gray-600/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                    <option value="OPTK">OPTK</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Swap Details */}
            <div className="mt-6 p-4 bg-gray-700/20 rounded-lg border border-gray-600/20">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Rate</span>
                  <span>1 SOL = 98.45 USDC</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Network Fee</span>
                  <span>~0.001 SOL</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Price Impact</span>
                  <span className="text-green-400">{"< 0.1%"}</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-400 text-sm font-medium">Basic Swap Coming Soon</p>
                <p className="text-amber-300/80 text-xs mt-1">
                  Please use Jupiter DEX for now, which offers better rates across multiple exchanges.
                </p>
              </div>
            </div>

            {/* Swap Button */}
            <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25 opacity-50 cursor-not-allowed">
              <Zap className="w-5 h-5" />
              <span>Coming Soon</span>
            </button>
          </div>
        </div>
      )}

      {/* Jupiter Info */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-4">About Jupiter DEX</h3>
        <p className="text-gray-300 mb-4">
          Jupiter is the key liquidity aggregator for Solana, enabling the best prices and fastest execution across all major DEXes. Our integration provides:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Access to 15+ DEXes in a single interface</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Best price routing across all liquidity sources</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Low slippage for large trades with smart routing</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Trade any SPL token including OPTK and other meme coins</span>
          </li>
        </ul>
        <div className="mt-4 text-center">
          <a 
            href="https://jup.ag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            Learn more about Jupiter <RefreshCw className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}