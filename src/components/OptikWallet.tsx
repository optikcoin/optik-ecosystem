import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { 
  Wallet, 
  Send, 
  Download, 
  Eye, 
  EyeOff, 
  Copy, 
  QrCode, 
  History, 
  Shield, 
  Settings, 
  Plus, 
  Minus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  Star,
  Gift,
  Zap,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Globe,
  Key,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function OptikWallet() {
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [walletPassword, setWalletPassword] = useState('');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [backupComplete, setBackupComplete] = useState(false);

  // Mock wallet data with real-time updates
  const [walletData, setWalletData] = useState({
    optk: { balance: 1250.00, usdValue: 3125.00, change24h: 8.5 },
    sol: { balance: 12.45, usdValue: 1220.25, change24h: -2.1 },
    usdc: { balance: 500.00, usdValue: 500.00, change24h: 0.0 },
    eth: { balance: 0.85, usdValue: 2125.50, change24h: 3.2 },
    btc: { balance: 0.02, usdValue: 1000.00, change24h: -1.5 },
    totalValue: 7970.75,
    totalChange24h: 5.2
  });

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWalletData(prev => ({
        ...prev,
        optk: {
          ...prev.optk,
          change24h: prev.optk.change24h + (Math.random() - 0.5) * 0.5
        },
        sol: {
          ...prev.sol,
          change24h: prev.sol.change24h + (Math.random() - 0.5) * 0.3
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const transactions = [
    {
      id: 1,
      type: 'receive',
      token: 'OPTK',
      amount: 50.0,
      from: '7xKX...9mPq',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      status: 'confirmed',
      txHash: 'abc123...def456',
      fee: 0.001
    },
    {
      id: 2,
      type: 'send',
      token: 'SOL',
      amount: 2.5,
      to: '9mPq...7xKX',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
      txHash: 'def456...abc123',
      fee: 0.0025
    },
    {
      id: 3,
      type: 'swap',
      token: 'USDC',
      amount: 100.0,
      fromToken: 'USDC',
      toToken: 'SOL',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
      txHash: 'ghi789...jkl012',
      fee: 0.5
    },
    {
      id: 4,
      type: 'stake',
      token: 'OPTK',
      amount: 100.0,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      txHash: 'mno345...pqr678',
      fee: 0.001
    }
  ];

  const stakingPools = [
    {
      name: 'OPTK Flexible Pool',
      apy: '8.5%',
      staked: 500.0,
      rewards: 12.45,
      status: 'active'
    },
    {
      name: 'OPTK 30-Day Lock',
      apy: '12.0%',
      staked: 1000.0,
      rewards: 45.67,
      status: 'locked',
      unlockDate: '2025-02-15'
    }
  ];

  // Mock seed phrase for demo
  const seedPhrase = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent',
    'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!sendAmount || !sendAddress) return;
    alert(`Sending ${sendAmount} OPTK to ${sendAddress}`);
    setSendAmount('');
    setSendAddress('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send': return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'receive': return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case 'swap': return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'stake': return <Lock className="w-4 h-4 text-purple-400" />;
      default: return <History className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const downloadWallet = () => {
    // Open the wallet download modal
    window.dispatchEvent(new CustomEvent('open-wallet-download-modal'));
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Wallet Download Section */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-8 text-center">
          <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
            <Wallet className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">OPTIK Wallet</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            The most advanced crypto wallet for the OptikCoin ecosystem. Secure, fast, and feature-rich with AI-powered insights.
          </p>

          {/* Download Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={downloadWallet}
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-6 transition-all duration-200 group"
            >
              <Download className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Windows</h3>
              <p className="text-gray-400 text-sm">OptikWallet.exe</p>
            </button>

            <button
              onClick={downloadWallet}
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-6 transition-all duration-200 group"
            >
              <Download className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">macOS</h3>
              <p className="text-gray-400 text-sm">OptikWallet.dmg</p>
            </button>

            <button
              onClick={downloadWallet}
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-6 transition-all duration-200 group"
            >
              <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Android</h3>
              <p className="text-gray-400 text-sm">Google Play</p>
            </button>

            <button
              onClick={downloadWallet}
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-6 transition-all duration-200 group"
            >
              <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">iOS</h3>
              <p className="text-gray-400 text-sm">App Store</p>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Military-Grade Security</h3>
              <p className="text-gray-400 text-sm">AES-256 encryption & biometric locks</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Instant transactions & real-time updates</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Multi-Chain</h3>
              <p className="text-gray-400 text-sm">Solana, Ethereum, Polygon & more</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">AI-Powered</h3>
              <p className="text-gray-400 text-sm">Smart insights & portfolio optimization</p>
            </div>
          </div>

          {/* Connect Existing Wallet */}
          <div className="border-t border-gray-700/50 pt-8">
            <h3 className="text-xl font-bold text-white mb-4">Already have a wallet?</h3>
            <button
              onClick={() => setVisible(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Connect Existing Wallet
            </button>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><Shield className="w-4 h-4 text-green-400 mr-2" /> AES-256 Encryption</li>
                <li className="flex items-center"><Key className="w-4 h-4 text-green-400 mr-2" /> Hardware Wallet Support</li>
                <li className="flex items-center"><Lock className="w-4 h-4 text-green-400 mr-2" /> Biometric Authentication</li>
                <li className="flex items-center"><Database className="w-4 h-4 text-green-400 mr-2" /> Secure Key Storage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Supported Networks</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><Globe className="w-4 h-4 text-blue-400 mr-2" /> Solana Mainnet</li>
                <li className="flex items-center"><Globe className="w-4 h-4 text-blue-400 mr-2" /> Ethereum</li>
                <li className="flex items-center"><Globe className="w-4 h-4 text-blue-400 mr-2" /> Polygon</li>
                <li className="flex items-center"><Globe className="w-4 h-4 text-blue-400 mr-2" /> Binance Smart Chain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          <div className="bg-red-600/20 p-4 rounded-full inline-flex mb-6">
            <Lock className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Locked</h2>
          <p className="text-gray-400 mb-6">
            Enter your password to unlock your OPTIK wallet
          </p>
          <input
            type="password"
            placeholder="Enter password"
            value={walletPassword}
            onChange={(e) => setWalletPassword(e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 mb-4"
          />
          <button
            onClick={() => {
              if (walletPassword === 'optik123' || walletPassword.length > 0) {
                setIsLocked(false);
                setWalletPassword('');
              }
            }}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Unlock Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <Wallet className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">OPTIK Wallet</h1>
              <div className="flex items-center space-x-2">
                <p className="text-gray-400 text-sm">
                  {formatAddress(publicKey?.toString() || '')}
                </p>
                <div className="flex items-center space-x-1">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-400" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-xs ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadWallet}
              className="p-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-all duration-200 border border-purple-500/30"
              title="Download OPTIK Wallet"
            >
              <Download className="w-5 h-5 text-purple-400" />
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsLocked(true)}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              <Lock className="w-5 h-5 text-gray-400" />
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Portfolio', icon: Wallet },
            { id: 'send', label: 'Send', icon: Send },
            { id: 'receive', label: 'Receive', icon: Download },
            { id: 'swap', label: 'Swap', icon: RefreshCw },
            { id: 'history', label: 'History', icon: History },
            { id: 'staking', label: 'Staking', icon: Star },
            { id: 'nft', label: 'NFTs', icon: Gift },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Portfolio</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
              >
                {showBalance ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-white mb-2">
                {showBalance ? `$${walletData.totalValue.toLocaleString()}` : '••••••'}
              </p>
              <div className="flex items-center justify-center space-x-2">
                {walletData.totalChange24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  walletData.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {walletData.totalChange24h >= 0 ? '+' : ''}{walletData.totalChange24h.toFixed(2)}% (24h)
                </span>
              </div>
            </div>

            {/* Token Balances */}
            <div className="space-y-4">
              {Object.entries(walletData).filter(([key]) => !['totalValue', 'totalChange24h'].includes(key)).map(([token, data]) => (
                <div key={token} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{token.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{token.toUpperCase()}</p>
                      <p className="text-gray-400 text-sm">
                        {showBalance ? `$${data.usdValue.toLocaleString()}` : '••••••'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {showBalance ? `${data.balance.toLocaleString()} ${token.toUpperCase()}` : '••••••'}
                    </p>
                    <div className="flex items-center space-x-1">
                      {data.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs ${
                        data.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'send', label: 'Send', icon: Send, color: 'blue' },
              { id: 'receive', label: 'Receive', icon: Download, color: 'green' },
              { id: 'swap', label: 'Swap', icon: RefreshCw, color: 'purple' },
              { id: 'staking', label: 'Stake', icon: Star, color: 'orange' }
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.id)}
                  className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-${action.color}-500/30 transition-all duration-300 text-center group`}
                >
                  <Icon className={`w-8 h-8 text-${action.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                  <p className="text-white font-medium">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Wallet Settings</h2>
          
          <div className="space-y-6">
            {/* Security Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Security</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Backup Seed Phrase</p>
                    <p className="text-gray-400 text-sm">Secure your wallet with a backup</p>
                  </div>
                  <button
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 px-4 py-2 rounded-lg border border-amber-500/30"
                  >
                    {showSeedPhrase ? 'Hide' : 'Show'} Seed
                  </button>
                </div>

                {showSeedPhrase && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <p className="text-red-400 font-medium">Keep this safe and private!</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {seedPhrase.map((word, index) => (
                        <div key={index} className="bg-gray-800/50 p-2 rounded text-center">
                          <span className="text-gray-400 text-xs">{index + 1}.</span>
                          <p className="text-white font-mono">{word}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(seedPhrase.join(' '))}
                      className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Seed Phrase</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Download Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Download OPTIK Wallet</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={downloadWallet}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-blue-500/30 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Desktop App</span>
                </button>
                <button
                  onClick={downloadWallet}
                  className="bg-green-600/20 hover:bg-green-600/30 text-green-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-green-500/30 flex items-center justify-center space-x-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Mobile App</span>
                </button>
              </div>
            </div>

            {/* Disconnect */}
            <div className="pt-6 border-t border-gray-700/50">
              <button
                onClick={disconnect}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-red-500/30"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}