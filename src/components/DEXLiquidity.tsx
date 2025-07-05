import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Droplet, Plus, Minus, AlertCircle, Info, RefreshCw } from 'lucide-react';

// Token list with common Solana tokens
const TOKENS = [
  { symbol: 'SOL', name: 'Solana', logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
  { symbol: 'USDC', name: 'USD Coin', logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
  { symbol: 'OPTK', name: 'OptikCoin', logoURI: 'https://via.placeholder.com/40/0891b2/FFFFFF?text=OC' },
];

// Pool data (mock)
const POOLS = [
  { 
    id: 'pool1',
    token1: TOKENS[0], 
    token2: TOKENS[1], 
    tvl: '$2,450,000',
    apr: '12.5%',
    volume24h: '$345,000',
    myLiquidity: '$0',
    token1Amount: '12,500',
    token2Amount: '1,230,000'
  },
  { 
    id: 'pool2',
    token1: TOKENS[0], 
    token2: TOKENS[2], 
    tvl: '$850,000',
    apr: '24.8%',
    volume24h: '$125,000',
    myLiquidity: '$0',
    token1Amount: '4,300',
    token2Amount: '34,500,000'
  },
  { 
    id: 'pool3',
    token1: TOKENS[1], 
    token2: TOKENS[2], 
    tvl: '$650,000',
    apr: '18.2%',
    volume24h: '$95,000',
    myLiquidity: '$0',
    token1Amount: '650,000',
    token2Amount: '26,000,000'
  },
];

export default function DEXLiquidity() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [activeTab, setActiveTab] = useState<'pools' | 'add' | 'remove'>('pools');
  const [selectedPool, setSelectedPool] = useState(POOLS[0]);
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddLiquidity = () => {
    if (!connected) {
      setVisible(true);
      return;
    }
    
    if (!token1Amount || !token2Amount) {
      alert('Please enter both token amounts');
      return;
    }

    setIsLoading(true);
    // TODO: Add actual add liquidity logic here
  };

  const handleRemoveLiquidity = () => {
    if (!connected) {
      setVisible(true);
      return;
    }
    setIsLoading(true);
  };  // TODO: Add actual remove liquidity logic here};

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
          <Droplet className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Liquidity <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Pools</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Provide liquidity to earn trading fees and rewards
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2 max-w-md mx-auto">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('pools')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'pools'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>Pools</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'add'
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Liquidity</span>
          </button>
          <button
            onClick={() => setActiveTab('remove')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'remove'
                ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Minus className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Pools List */}
      {activeTab === 'pools' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Available Liquidity Pools</h2>
            <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Pool</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">TVL</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">APR</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">24h Volume</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">My Liquidity</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {POOLS.map((pool) => (
                  <tr key={pool.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <img src={pool.token1.logoURI} alt={pool.token1.symbol} className="w-6 h-6 rounded-full" />
                          <img src={pool.token2.logoURI} alt={pool.token2.symbol} className="w-6 h-6 rounded-full absolute -bottom-1 -right-1" />
                        </div>
                        <span className="text-white font-medium">{pool.token1.symbol}-{pool.token2.symbol}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-white">{pool.tvl}</td>
                    <td className="px-4 py-4 text-right text-green-400">{pool.apr}</td>
                    <td className="px-4 py-4 text-right text-white">{pool.volume24h}</td>
                    <td className="px-4 py-4 text-right text-white">{pool.myLiquidity}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPool(pool);
                            setActiveTab('add');
                          }}
                          className="p-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all duration-200"
                          title="Add Liquidity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPool(pool);
                            setActiveTab('remove');
                          }}
                          className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-200"
                          title="Remove Liquidity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pool Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Total Value Locked</h3>
              <p className="text-3xl font-bold text-blue-400">$3,950,000</p>
              <p className="text-gray-400 text-sm mt-2">Across all liquidity pools</p>
            </div>
            
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">24h Trading Volume</h3>
              <p className="text-3xl font-bold text-green-400">$565,000</p>
              <p className="text-gray-400 text-sm mt-2">+12.5% from yesterday</p>
            </div>
            
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">Total Fees Earned</h3>
              <p className="text-3xl font-bold text-purple-400">$28,250</p>
              <p className="text-gray-400 text-sm mt-2">By liquidity providers (last 30 days)</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Liquidity */}
      {activeTab === 'add' && (
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Add Liquidity</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img src={selectedPool.token1.logoURI} alt={selectedPool.token1.symbol} className="w-6 h-6 rounded-full" />
                  <img src={selectedPool.token2.logoURI} alt={selectedPool.token2.symbol} className="w-6 h-6 rounded-full absolute -bottom-1 -right-1" />
                </div>
                <span className="text-white font-medium">{selectedPool.token1.symbol}-{selectedPool.token2.symbol}</span>
              </div>
            </div>
            
            {/* Pool Info */}
            <div className="bg-gray-700/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">TVL</span>
                <span className="text-white">{selectedPool.tvl}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">APR</span>
                <span className="text-green-400">{selectedPool.apr}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ratio</span>
                <span className="text-white">1 {selectedPool.token1.symbol} = {(parseInt(selectedPool.token2Amount.replace(/,/g, '')) / parseInt(selectedPool.token1Amount.replace(/,/g, ''))).toFixed(2)} {selectedPool.token2.symbol}</span>
              </div>
            </div>
            
            {/* Token 1 Input */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Input {selectedPool.token1.symbol}</span>
                <span className="text-gray-400 text-sm">Balance: 0.00</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                <input
                  type="text"
                  placeholder="0.0"
                  value={token1Amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setToken1Amount(value);
                    // Calculate token2 amount based on pool ratio
                    if (value) {
                      const ratio = parseInt(selectedPool.token2Amount.replace(/,/g, '')) / parseInt(selectedPool.token1Amount.replace(/,/g, ''));
                      setToken2Amount((parseFloat(value) * ratio).toFixed(6));
                    } else {
                      setToken2Amount('');
                    }
                  }}
                  className="flex-1 bg-transparent text-xl font-semibold text-white placeholder-gray-500 focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-gray-600/50 px-3 py-2 rounded-lg">
                  <img src={selectedPool.token1.logoURI} alt={selectedPool.token1.symbol} className="w-5 h-5 rounded-full" />
                  <span className="text-white">{selectedPool.token1.symbol}</span>
                </div>
              </div>
            </div>
            
            {/* Token 2 Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Input {selectedPool.token2.symbol}</span>
                <span className="text-gray-400 text-sm">Balance: 0.00</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                <input
                  type="text"
                  placeholder="0.0"
                  value={token2Amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setToken2Amount(value);
                    // Calculate token1 amount based on pool ratio
                    if (value) {
                      const ratio = parseInt(selectedPool.token1Amount.replace(/,/g, '')) / parseInt(selectedPool.token2Amount.replace(/,/g, ''));
                      setToken1Amount((parseFloat(value) * ratio).toFixed(6));
                    } else {
                      setToken1Amount('');
                    }
                  }}
                  className="flex-1 bg-transparent text-xl font-semibold text-white placeholder-gray-500 focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-gray-600/50 px-3 py-2 rounded-lg">
                  <img src={selectedPool.token2.logoURI} alt={selectedPool.token2.symbol} className="w-5 h-5 rounded-full" />
                  <span className="text-white">{selectedPool.token2.symbol}</span>
                </div>
              </div>
            </div>
            
            {/* Info Box */}
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start space-x-3 mb-6">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 text-sm font-medium">Liquidity Provider Info</p>
                <p className="text-blue-300/80 text-xs mt-1">
                  By adding liquidity, you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time, and can be claimed by withdrawing your liquidity.
                </p>
              </div>
            </div>
            
            {/* Add Liquidity Button */}
            <button
              onClick={handleAddLiquidity}
              disabled={!token1Amount || !token2Amount || isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Adding Liquidity...</span>
                </>
              ) : !connected ? (
                <span>Connect Wallet</span>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add Liquidity</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Remove Liquidity */}
      {activeTab === 'remove' && (
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Remove Liquidity</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img src={selectedPool.token1.logoURI} alt={selectedPool.token1.symbol} className="w-6 h-6 rounded-full" />
                  <img src={selectedPool.token2.logoURI} alt={selectedPool.token2.symbol} className="w-6 h-6 rounded-full absolute -bottom-1 -right-1" />
                </div>
                <span className="text-white font-medium">{selectedPool.token1.symbol}-{selectedPool.token2.symbol}</span>
              </div>
            </div>
            
            {/* Your Liquidity */}
            <div className="bg-gray-700/20 rounded-lg p-4 mb-6">
              <h3 className="text-white font-medium mb-3">Your Liquidity</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Pool Share</span>
                <span className="text-white">0.00%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">{selectedPool.token1.symbol}</span>
                <span className="text-white">0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{selectedPool.token2.symbol}</span>
                <span className="text-white">0.00</span>
              </div>
            </div>
            
            {/* Amount to Remove */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Amount to Remove</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="100"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-medium">100%</span>
              </div>
            </div>
            
            {/* You Will Receive */}
            <div className="bg-gray-700/20 rounded-lg p-4 mb-6">
              <h3 className="text-white font-medium mb-3">You Will Receive</h3>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <img src={selectedPool.token1.logoURI} alt={selectedPool.token1.symbol} className="w-5 h-5 rounded-full" />
                  <span className="text-gray-400">{selectedPool.token1.symbol}</span>
                </div>
                <span className="text-white">0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img src={selectedPool.token2.logoURI} alt={selectedPool.token2.symbol} className="w-5 h-5 rounded-full" />
                  <span className="text-gray-400">{selectedPool.token2.symbol}</span>
                </div>
                <span className="text-white">0.00</span>
              </div>
            </div>
            
            {/* Warning */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start space-x-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-400 text-sm font-medium">No Liquidity Found</p>
                <p className="text-amber-300/80 text-xs mt-1">
                  You don't have any liquidity in this pool yet. Add liquidity first to receive LP tokens.
                </p>
              </div>
            </div>
            
            {/* Remove Liquidity Button */}
            <button
              onClick={handleRemoveLiquidity}
              disabled={true}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Minus className="w-5 h-5" />
              <span>Remove Liquidity</span>
            </button>
          </div>
        </div>
      )}

      {/* Coming Soon Features */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-3">Farming Rewards</h3>
            <p className="text-gray-400">Earn additional OPTK tokens by staking your LP tokens in farming pools</p>
          </div>
          
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-3">Concentrated Liquidity</h3>
            <p className="text-gray-400">Provide liquidity in specific price ranges for higher capital efficiency</p>
          </div>
          
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-3">Limit Orders</h3>
            <p className="text-gray-400">Set buy or sell orders at specific price points automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}