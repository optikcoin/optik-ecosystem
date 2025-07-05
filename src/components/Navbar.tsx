import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, ArrowLeftRight, ChevronDown, User, Settings, LogOut, Download } from 'lucide-react';
import Logo from './Logo';
import CTAButton from './CTAButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'AI Assistants', href: '/gpt', icon: Brain },
    { name: 'DEX', href: '/dex', icon: ArrowLeftRight },
  ];

  const dropdownItems = [
    { name: 'Meme Creator', href: '/meme-creator', icon: null },
    { name: 'Analytics', href: '/analytics', icon: null },
    { name: 'AI Chat', href: '/chat', icon: null },
  ];

  const userMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Logout', href: '/logout', icon: LogOut },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWalletConnect = () => {
    // This would open the OptikWallet extension or redirect to download
    window.open('https://chrome.google.com/webstore/detail/optikcoin-wallet', '_blank');
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const mockWalletAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

  return (
    <nav className="bg-[#0F1113]/95 backdrop-blur-lg border-b border-[#007BFF]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="md" showText={true} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Navigation Items */}
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-[#007BFF]/20 text-[#007BFF] border border-[#007BFF]/30'
                        : 'text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5]'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Dropdown + Wallet Connect */}
            <div className="flex items-center space-x-4">
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5] transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0F1113]/95 backdrop-blur-lg border border-[#007BFF]/20 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="py-2">
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 ${
                              isActive(item.href)
                                ? 'bg-[#007BFF]/20 text-[#007BFF] border-l-2 border-[#007BFF]'
                                : 'text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5]'
                            }`}
                          >
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                    
                    {/* User Menu Section */}
                    {isWalletConnected && (
                      <>
                        <div className="border-t border-[#007BFF]/20"></div>
                        <div className="py-2">
                          <div className="px-4 py-2 text-xs text-[#A9B2BC] uppercase tracking-wide">
                            Account
                          </div>
                          {userMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center space-x-3 px-4 py-3 text-sm text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5] transition-all duration-200"
                              >
                                <Icon className="w-4 h-4" />
                                <span>{item.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* OptikWallet Download/Connect Button */}
              <CTAButton
                onClick={handleWalletConnect}
                variant={isWalletConnected ? "outline" : "primary"}
                size="sm"
                icon={<Download className="w-4 h-4" />}
                className="relative overflow-hidden group"
              >
                {isWalletConnected ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{truncateAddress(mockWalletAddress)}</span>
                  </span>
                ) : (
                  'Get OptikWallet'
                )}
              </CTAButton>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Wallet Connect */}
            <CTAButton
              onClick={handleWalletConnect}
              variant={isWalletConnected ? "outline" : "primary"}
              size="sm"
              icon={<Download className="w-4 h-4" />}
              className="!p-2"
            >
              <span className="sr-only">
                {isWalletConnected ? 'Connected' : 'Get OptikWallet'}
              </span>
            </CTAButton>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#A9B2BC] hover:text-[#F1F3F5] hover:bg-[#007BFF]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#007BFF] transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0F1113]/95 backdrop-blur-lg border-t border-[#007BFF]/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Main Navigation */}
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium items-center space-x-2 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-[#007BFF]/20 text-[#007BFF] border border-[#007BFF]/30'
                      : 'text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Dropdown Items in Mobile */}
            <div className="border-t border-[#007BFF]/20 pt-2 mt-2">
              <div className="px-3 py-2 text-xs text-[#A9B2BC] uppercase tracking-wide">
                More Options
              </div>
              {dropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium items-center space-x-2 transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-[#007BFF]/20 text-[#007BFF] border border-[#007BFF]/30'
                        : 'text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* OptikWallet Section */}
            <div className="border-t border-[#007BFF]/20 pt-2 mt-2">
              <div className="px-3 py-2 text-xs text-[#A9B2BC] uppercase tracking-wide">
                OptikWallet App
              </div>
              <button
                onClick={() => {
                  handleWalletConnect();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5] transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download OptikWallet</span>
              </button>
              
              {isWalletConnected && (
                <div className="px-3 py-2 text-sm text-green-400 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{truncateAddress(mockWalletAddress)}</span>
                </div>
              )}
            </div>

            {/* User Menu in Mobile */}
            {isWalletConnected && (
              <div className="border-t border-[#007BFF]/20 pt-2 mt-2">
                <div className="px-3 py-2 text-xs text-[#A9B2BC] uppercase tracking-wide">
                  Account
                </div>
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium items-center space-x-2 text-[#A9B2BC] hover:bg-[#007BFF]/10 hover:text-[#F1F3F5] transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dropdown Overlay for Mobile */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;