import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TrendingUp, MessageSquare, ArrowRightLeft, Wallet, Rocket, BarChart3, CreditCard, FileText, Map, Pickaxe, Coins, Gift, Menu, X, ExternalLink, Brain, Download, Shield, CheckCircle, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';
import WalletDownloadModal from './WalletDownloadModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const { connected, publicKey, disconnect } = useWallet();

  // Listen for custom event to open wallet download modal
  useEffect(() => {
    const handleOpenWalletModal = () => {
      setShowWalletModal(true);
    };
    
    window.addEventListener('open-wallet-download-modal', handleOpenWalletModal);
    
    return () => {
      window.removeEventListener('open-wallet-download-modal', handleOpenWalletModal);
    };
  }, []);

  const navigationItems = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, type: 'internal' },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare, type: 'internal' },
    { id: 'ai-analytics', label: 'AI Analytics', icon: Brain, type: 'internal' },
    { id: 'creator', label: 'Meme Creator', icon: Rocket, type: 'internal' },
    { id: 'chart', label: 'Live Trading', icon: BarChart3, type: 'internal' },
    { id: 'swap', label: 'Token Swap', icon: ArrowRightLeft, type: 'internal' },
    { id: 'liquidity', label: 'Liquidity Pools', icon: Droplet, type: 'internal' },
    { id: 'wallet', label: 'OPTIK Wallet', icon: Wallet, type: 'internal' },
    { id: 'subscription', label: 'Subscribe', icon: CreditCard, type: 'internal' },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText, type: 'internal' },
    { id: 'roadmap', label: 'Roadmap', icon: Map, type: 'internal' },
    { id: 'mining', label: 'Mining', icon: Pickaxe, type: 'internal' },
    { id: 'staking', label: 'Staking', icon: Coins, type: 'internal' },
    { id: 'airdrop', label: 'Airdrop', icon: Gift, type: 'internal' },
    { id: 'telegram', label: 'Telegram', icon: ExternalLink, type: 'external', url: 'https://t.me/optikcoin' },
    { id: 'twitter', label: 'Twitter', icon: ExternalLink, type: 'external', url: 'https://twitter.com/optikcoin' },
  ];

  const handleMenuItemClick = (item: any) => {
    if (item.type === 'internal') {
      setActiveTab(item.id);
    } else if (item.type === 'external') {
      window.open(item.url, '_blank');
    }
    setIsMenuOpen(false);
  };

  const handleDownloadWallet = () => {
    // Open wallet download modal
    setShowWalletModal(true);
  };

  const handleKYCVerification = () => {
    setShowKYCModal(true);
    setShowWalletModal(false);
  };

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-cyan-800/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <img 
                  src="https://via.placeholder.com/40/0891b2/FFFFFF?text=OC" 
                  alt="OptikCoin Logo" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                    OptikCoin DEX
                  </h1>
                  <p className="text-xs text-gray-400">AI-Powered Trading Platform</p>
                </div>
              </div>
            </div>

            {/* Right Side - OPTK Balance, Wallet Options and Menu */}
            <div className="flex items-center space-x-3">
              {/* OPTK Balance - only show when connected */}
              {connected && (
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-400">OPTK Balance</p>
                  <p className="text-sm font-semibold text-cyan-400">1,250.00</p>
                </div>
              )}

              {/* OPTIK Wallet Download Button */}
              <button
                onClick={handleDownloadWallet}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Download OPTIK Wallet</span>
              </button>

              {/* Wallet Connect Button - Custom Styling */}
              <div className="wallet-adapter-dropdown">
                <WalletMultiButton className="!bg-gradient-to-r !from-cyan-600 !to-blue-600 hover:!from-cyan-700 hover:!to-blue-700 !text-white !px-4 !py-2 !rounded-lg !font-medium !transition-all !duration-200 !flex !items-center !space-x-2 !shadow-lg hover:!shadow-cyan-500/25 !border-0 !text-sm" />
              </div>

              {/* Connected Wallet Info */}
              {connected && publicKey && (
                <div className="hidden lg:flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg border border-cyan-600/30">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">
                    {formatWalletAddress(publicKey.toString())}
                  </span>
                </div>
              )}

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white p-2 rounded-lg transition-all duration-200 border border-cyan-600/30 hover:border-cyan-500/50"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay for mobile */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content - Fixed positioning and scrollable */}
            <div className="absolute right-4 top-16 w-80 bg-gray-800/95 backdrop-blur-md border border-cyan-700/30 rounded-xl shadow-2xl z-50 lg:w-72 max-h-[calc(100vh-5rem)] flex flex-col">
              <div className="p-4 flex-shrink-0">
                {/* Wallet Status in Menu */}
                {connected && publicKey && (
                  <div className="mb-4 p-3 bg-cyan-600/10 border border-cyan-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-cyan-400 text-sm font-medium">Wallet Connected</span>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">
                      {formatWalletAddress(publicKey?.toString())}
                    </p>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white mb-4 border-b border-cyan-700/30 pb-2">
                  Navigation
                </h3>
              </div>
              
              {/* Scrollable Navigation Items */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id && item.type === 'internal';
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuItemClick(item)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                        {item.type === 'external' && (
                          <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Social Links Section */}
                <div className="mt-6 pt-4 border-t border-cyan-700/30">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Connect With Us</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open('https://t.me/optikcoin', '_blank')}
                      className="flex-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-cyan-500/30"
                    >
                      Telegram
                    </button>
                    <button
                      onClick={() => window.open('https://twitter.com/optikcoin', '_blank')}
                      className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-blue-500/30"
                    >
                      Twitter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* OPTIK Wallet Download Modal */}
      <WalletDownloadModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />

      {/* KYC Verification Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/95 backdrop-blur-md border border-green-700/30 rounded-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-600/20 p-4 rounded-full inline-flex mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">KYC Verification</h2>
              <p className="text-gray-400">Complete your identity verification to access premium features</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Why KYC?</h3>
                <ul className="text-green-300/80 text-sm space-y-1">
                  <li>• Enhanced security and fraud protection</li>
                  <li>• Access to premium trading features</li>
                  <li>• Higher transaction limits</li>
                  <li>• Compliance with regulatory requirements</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300 text-sm">Identity Document</span>
                  <span className="text-yellow-400 text-sm">Required</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300 text-sm">Proof of Address</span>
                  <span className="text-yellow-400 text-sm">Required</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300 text-sm">Selfie Verification</span>
                  <span className="text-yellow-400 text-sm">Required</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('KYC verification process started! You will be redirected to our secure verification partner.');
                  setShowKYCModal(false);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Start KYC Verification</span>
              </button>

              <button
                onClick={() => setShowKYCModal(false)}
                className="w-full bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-gray-500/30"
              >
                Maybe Later
              </button>
            </div>

            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-400 text-xs text-center">
                <strong>Privacy:</strong> Your personal information is encrypted and stored securely. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}