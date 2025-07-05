import React, { useState } from 'react';
import { 
  Wallet, Send, Download, CreditCard, TrendingUp, Eye, EyeOff, Plus, ArrowUpRight, 
  ArrowDownLeft, Copy, Shield, Zap, Settings, RefreshCw, QrCode, ExternalLink,
  ChevronDown, ChevronRight, Globe, Smartphone, Monitor, Wifi, WifiOff
} from 'lucide-react';
import { useWalletBalance } from '../hooks/useWalletBalance';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';

const WalletPage: React.FC = () => {
  const { balance, usdValue, transactions } = useWalletBalance();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const walletAddress = "3CxN7kUkhKHupxHTehyEHL9ZAA4ZNfDMHUjRS95i5Dfu";

  const networks = [
    { id: 'solana', name: 'Solana', icon: '◎', color: 'from-purple-500 to-pink-500' },
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'from-blue-500 to-cyan-500' },
    { id: 'polygon', name: 'Polygon', icon: '⬟', color: 'from-purple-600 to-indigo-600' },
    { id: 'bsc', name: 'BSC', icon: '◆', color: 'from-yellow-500 to-orange-500' }
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const tokens = [
    { 
      symbol: 'OPTIK', 
      name: 'OptikCoin', 
      balance: balance, 
      price: 2.45, 
      change: 12.5, 
      logo: '🔮',
      usdValue: balance * 2.45
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      balance: 8.45, 
      price: 98.50, 
      change: -2.1, 
      logo: '◎',
      usdValue: 8.45 * 98.50
    },
    { 
      symbol: 'USDC', 
      name: 'USD Coin', 
      balance: 1250.00, 
      price: 1.00, 
      change: 0.1, 
      logo: '💵',
      usdValue: 1250.00
    },
    { 
      symbol: 'RAY', 
      name: 'Raydium', 
      balance: 45.67, 
      price: 1.85, 
      change: 8.3, 
      logo: '⚡',
      usdValue: 45.67 * 1.85
    }
  ];

  const totalPortfolioValue = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  const quickActions = [
    { 
      icon: Send, 
      label: 'Send', 
      color: 'from-pink-500 to-rose-500', 
      action: () => window.open('/wallet', '_self'),
      description: 'Send tokens to another wallet'
    },
    { 
      icon: Download, 
      label: 'Receive', 
      color: 'from-blue-500 to-cyan-500', 
      action: () => window.open('/wallet', '_self'),
      description: 'Receive tokens from others'
    },
    { 
      icon: CreditCard, 
      label: 'Buy', 
      color: 'from-purple-500 to-indigo-500', 
      action: () => window.open('https://moonpay.com', '_blank'),
      description: 'Buy crypto with fiat'
    },
    { 
      icon: TrendingUp, 
      label: 'Swap', 
      color: 'from-green-500 to-emerald-500', 
      action: () => window.open('/dex', '_self'),
      description: 'Swap between tokens'
    }
  ];

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-blue-900 via-gray-900 to-blue-900">
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-x border-gray-700/30">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-b border-gray-700/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="sm" showText={false} />
              <div>
                <h1 className="text-lg font-bold text-white">OptikWallet</h1>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  <span className="text-xs text-gray-400">{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Network Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl px-3 py-2 transition-all duration-200"
                >
                  <span className="text-lg">{networks.find(n => n.id === selectedNetwork)?.icon}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showNetworkDropdown && (
                  <div className="absolute right-0 top-12 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-xl z-50 min-w-[160px]">
                    {networks.map((network) => (
                      <button
                        key={network.id}
                        onClick={() => {
                          setSelectedNetwork(network.id);
                          setShowNetworkDropdown(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          selectedNetwork === network.id ? 'bg-gray-700/50' : ''
                        }`}
                      >
                        <span className="text-lg">{network.icon}</span>
                        <span className="text-white text-sm">{network.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl transition-all duration-200">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-pink-600/10 to-blue-600/10 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Total Balance</h3>
                  <p className="text-gray-400 text-sm">All networks</p>
                </div>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-white mb-2">
                {showBalance ? formatNumber(totalPortfolioValue) : '••••••'}
              </div>
              <div className="text-green-400 text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +$2,156.45 (8.9%) today
              </div>
            </div>

            {/* Wallet Address */}
            <div className="bg-black/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs">Wallet Address</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={copyAddress}
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button className="text-pink-400 hover:text-pink-300 transition-colors">
                    <QrCode className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-white font-mono text-xs break-all">
                {walletAddress}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white text-sm font-medium mb-1">{action.label}</div>
                  <div className="text-gray-400 text-xs">{action.description}</div>
                </button>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-800/30 rounded-xl p-1">
            {[
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'activity', label: 'Activity' },
              { id: 'collectibles', label: 'NFTs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'portfolio' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Your Tokens</h3>
                <button className="text-pink-400 hover:text-pink-300 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              
              {tokens.map((token, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 hover:bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{token.logo}</div>
                      <div>
                        <div className="text-white font-semibold">{token.symbol}</div>
                        <div className="text-gray-400 text-sm">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {showBalance ? token.balance.toFixed(2) : '••••'}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {showBalance ? formatNumber(token.usdValue) : '••••'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className={`text-sm px-2 py-1 rounded ${
                      token.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {token.change > 0 ? '+' : ''}{token.change}%
                    </div>
                    <div className="text-gray-400 text-sm">
                      ${token.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Recent Activity</h3>
                <button className="text-pink-400 hover:text-pink-300 transition-colors text-sm">
                  View All
                </button>
              </div>
              
              {transactions.map((tx, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'
                      }`}>
                        {tx.type === 'send' ? (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{tx.description}</div>
                        <div className="text-gray-400 text-xs">{tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold text-sm ${
                        tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {tx.type === 'send' ? '-' : '+'}{tx.amount}
                      </div>
                      <div className="text-gray-400 text-xs">${tx.usdValue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'collectibles' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">No NFTs Found</h3>
              <p className="text-gray-400 text-sm mb-6">Your collectibles will appear here</p>
              <CTAButton 
                to="/dex" 
                variant="outline" 
                size="sm"
                className="mx-auto"
              >
                Explore NFTs
              </CTAButton>
            </div>
          )}

          {/* AI Features */}
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-lg border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">AI Assistant</h4>
                <p className="text-purple-300/80 text-xs">Get personalized insights</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <CTAButton to="/gpt" variant="outline" size="sm" className="text-xs">
                Portfolio Analysis
              </CTAButton>
              <CTAButton to="/analytics" variant="outline" size="sm" className="text-xs">
                Market Insights
              </CTAButton>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <h4 className="text-green-400 font-semibold text-sm">Wallet Secured</h4>
                <p className="text-green-300/80 text-xs">Your assets are protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="sticky bottom-0 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-t border-gray-700/30 p-4">
          <div className="grid grid-cols-4 gap-2">
            <CTAButton to="/wallet" variant="ghost" size="sm" className="flex-col !p-2">
              <Wallet className="w-5 h-5 mb-1" />
              <span className="text-xs">Wallet</span>
            </CTAButton>
            <CTAButton to="/dex" variant="ghost" size="sm" className="flex-col !p-2">
              <TrendingUp className="w-5 h-5 mb-1" />
              <span className="text-xs">Trade</span>
            </CTAButton>
            <CTAButton to="/gpt" variant="ghost" size="sm" className="flex-col !p-2">
              <Zap className="w-5 h-5 mb-1" />
              <span className="text-xs">AI</span>
            </CTAButton>
            <CTAButton to="/analytics" variant="ghost" size="sm" className="flex-col !p-2">
              <Shield className="w-5 h-5 mb-1" />
              <span className="text-xs">Security</span>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;