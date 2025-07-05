import React, { useState, useEffect } from 'react';
import {
  Rocket, Code, DollarSign, Shield, Zap, Upload, Sparkles, AlertTriangle,
  Globe, TrendingUp, Bot, Megaphone, Check, CreditCard, Lock, X, Download, MessageCircle
} from 'lucide-react';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';
import TelegramVerification from '../components/TelegramVerification';

export default function OptikMemeCreator() {
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [showTelegramVerification, setShowTelegramVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '',
    decimals: '9',
    image: null as File | null,
    websiteUrl: '',
    telegramUrl: '',
    twitterUrl: '',
    liquidityPoolSol: '',
    liquidityPoolTokens: ''
  });

  // Add-on states
  const [includeWebsiteBuilder, setIncludeWebsiteBuilder] = useState(false);
  const [includeViralGPT, setIncludeViralGPT] = useState(false);
  const [includeSocialMediaPosts, setIncludeSocialMediaPosts] = useState(false);
  const [includeAdvancedLLM, setIncludeAdvancedLLM] = useState(false);
  const [includePromotionGPT, setIncludePromotionGPT] = useState(false);
  const [isUltimateBundleSelected, setIsUltimateBundleSelected] = useState(false);

  // Handle Ultimate Bundle selection
  useEffect(() => {
    if (isUltimateBundleSelected) {
      setIncludeWebsiteBuilder(true);
      setIncludeViralGPT(true);
      setIncludeSocialMediaPosts(true);
      setIncludeAdvancedLLM(true);
      setIncludePromotionGPT(true);
    }
  }, [isUltimateBundleSelected]);

  // Handle individual add-on deselection
  useEffect(() => {
    if (isUltimateBundleSelected && (!includeWebsiteBuilder || !includeViralGPT || !includeSocialMediaPosts || !includeAdvancedLLM || !includePromotionGPT)) {
      setIsUltimateBundleSelected(false);
    }
  }, [includeWebsiteBuilder, includeViralGPT, includeSocialMediaPosts, includeAdvancedLLM, includePromotionGPT, isUltimateBundleSelected]);

  // Calculate total cost
  const calculateTotalCost = () => {
    if (isUltimateBundleSelected) {
      return 799.99;
    }
    
    let total = 499.99; // Base price
    if (includeWebsiteBuilder) total += 99.99;
    if (includeViralGPT) total += 99.99;
    if (includeSocialMediaPosts) total += 99.99;
    if (includeAdvancedLLM) total += 99.99;
    if (includePromotionGPT) total += 99.99;
    
    return total;
  };

  const addOns = [
    {
      id: 'websiteBuilder',
      name: 'Optik Website Builder AI',
      description: 'AI-powered website creation for your meme coin project',
      price: 99.99,
      icon: Globe,
      state: includeWebsiteBuilder,
      setState: setIncludeWebsiteBuilder,
    },
    {
      id: 'viralGPT',
      name: 'Optik Viral GPT',
      description: 'Advanced viral marketing strategies and campaign planning',
      price: 99.99,
      icon: TrendingUp,
      state: includeViralGPT,
      setState: setIncludeViralGPT,
    },
    {
      id: 'socialMediaPosts',
      name: 'Viral Social Media Posts',
      description: 'AI-generated viral content for all major social platforms',
      price: 99.99,
      icon: Megaphone,
      state: includeSocialMediaPosts,
      setState: setIncludeSocialMediaPosts,
    },
    {
      id: 'advancedLLM',
      name: 'Optik GPT Advanced LLM',
      description: 'Predictive trading analysis and advanced market strategies',
      price: 99.99,
      icon: Bot,
      state: includeAdvancedLLM,
      setState: setIncludeAdvancedLLM,
    },
    {
      id: 'promotionGPT',
      name: 'Meme Coin Promotion GPT',
      description: 'Comprehensive promotion and community building tools',
      price: 99.99,
      icon: Sparkles,
      state: includePromotionGPT,
      setState: setIncludePromotionGPT,
    },
  ];

  const steps = [
    { id: 1, title: 'Token Details', icon: Sparkles },
    { id: 2, title: 'Smart Contract', icon: Code },
    { id: 3, title: 'Liquidity Pool', icon: DollarSign },
    { id: 4, title: 'Launch', icon: Rocket },
  ];

  const handleVerificationComplete = (verified: boolean, id: string) => {
    setIsVerified(verified);
    setVerificationId(id);
    setShowTelegramVerification(false);
    
    if (verified) {
      // Proceed with token creation
      handleCreateToken();
    }
  };

  const handleCreateToken = async () => {
    setIsCreating(true);
    try {
      // Simulate token creation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock contract address
      const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      // Show success message
      alert(`🚀 Token created successfully!\n\nContract Address: ${contractAddress}\n\nYour token is now live on the blockchain!`);
      
      // Download token information
      const tokenInfo = {
        name: tokenData.name,
        symbol: tokenData.symbol,
        contractAddress,
        totalSupply: tokenData.totalSupply,
        decimals: tokenData.decimals,
        createdAt: new Date().toISOString(),
        verificationId: verificationId,
        totalCost: calculateTotalCost(),
        addOns: {
          websiteBuilder: includeWebsiteBuilder,
          viralGPT: includeViralGPT,
          socialMediaPosts: includeSocialMediaPosts,
          advancedLLM: includeAdvancedLLM,
          promotionGPT: includePromotionGPT
        }
      };
      
      // Create and download token info file
      const blob = new Blob([JSON.stringify(tokenInfo, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tokenData.symbol}-token-info.json`;
      a.click();
      
      // Reset form
      setTokenData({
        name: '',
        symbol: '',
        description: '',
        totalSupply: '',
        decimals: '9',
        image: null,
        websiteUrl: '',
        telegramUrl: '',
        twitterUrl: '',
        liquidityPoolSol: '',
        liquidityPoolTokens: ''
      });
      setStep(1);
      setIsVerified(false);
      setVerificationId('');
    } catch (error: any) {
      alert(`Failed to create token: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLaunchToken = () => {
    // Show Telegram verification modal before proceeding
    setShowTelegramVerification(true);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Token Name</label>
                <input
                  type="text"
                  placeholder="e.g., DogeCoin Supreme"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Token Symbol</label>
                <input
                  type="text"
                  placeholder="e.g., DOGES"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData({...tokenData, symbol: e.target.value})}
                  className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Description</label>
              <textarea
                placeholder="Describe your meme coin's purpose and community..."
                value={tokenData.description}
                onChange={(e) => setTokenData({...tokenData, description: e.target.value})}
                rows={4}
                className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Total Supply</label>
                <input
                  type="text"
                  placeholder="1000000000"
                  value={tokenData.totalSupply}
                  onChange={(e) => setTokenData({...tokenData, totalSupply: e.target.value})}
                  className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Decimals</label>
                <select
                  value={tokenData.decimals}
                  onChange={(e) => setTokenData({...tokenData, decimals: e.target.value})}
                  className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20"
                >
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="18">18</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Token Image</label>
              <div className="border-2 border-dashed border-[#007BFF]/20 rounded-lg p-8 text-center hover:border-[#007BFF]/50 transition-colors duration-200">
                <Upload className="w-12 h-12 text-[#A9B2BC] mx-auto mb-4" />
                <p className="text-[#A9B2BC] mb-2">Upload your token image</p>
                <p className="text-[#A9B2BC] text-sm">PNG, JPG up to 2MB</p>
                <input 
                  type="file" 
                  id="image-upload"
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setTokenData({...tokenData, image: e.target.files?.[0] || null})}
                />
                <label htmlFor="image-upload" className="mt-4 inline-block bg-[#007BFF]/20 hover:bg-[#007BFF]/30 text-[#007BFF] px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                  Choose File
                </label>
                {tokenData.image && (
                  <p className="mt-2 text-green-400 text-sm">{tokenData.image.name}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#F1F3F5] mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-[#007BFF]" />
                Smart Contract Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0F1113]/50 rounded-lg">
                  <div>
                    <p className="text-[#F1F3F5] font-medium">Mint Authority</p>
                    <p className="text-[#A9B2BC] text-sm">Control token minting after launch</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#007BFF]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007BFF]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0F1113]/50 rounded-lg">
                  <div>
                    <p className="text-[#F1F3F5] font-medium">Freeze Authority</p>
                    <p className="text-[#A9B2BC] text-sm">Ability to freeze token accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#007BFF]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007BFF]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0F1113]/50 rounded-lg">
                  <div>
                    <p className="text-[#F1F3F5] font-medium">Anti-Bot Protection</p>
                    <p className="text-[#A9B2BC] text-sm">Protect against malicious sniping bots</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#007BFF]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007BFF]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400 font-medium">Security Recommendations</p>
                  <p className="text-amber-300/80 text-sm mt-1">
                    We recommend enabling anti-bot protection and disabling mint authority after launch for maximum trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#F1F3F5] mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Liquidity Pool Setup
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Initial SOL Liquidity</label>
                  <input
                    type="text"
                    placeholder="10.0"
                    value={tokenData.liquidityPoolSol}
                    onChange={(e) => setTokenData({...tokenData, liquidityPoolSol: e.target.value})}
                    className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-[#A9B2BC] text-xs mt-1">Minimum 5 SOL required</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F1F3F5] mb-2">Token Allocation (%)</label>
                  <input
                    type="text"
                    placeholder="80"
                    value={tokenData.liquidityPoolTokens}
                    onChange={(e) => setTokenData({...tokenData, liquidityPoolTokens: e.target.value})}
                    className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-lg px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-[#A9B2BC] text-xs mt-1">% of total supply for liquidity</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">OPTK Backing Benefits</h4>
                <ul className="text-green-300/80 text-sm space-y-1">
                  <li>• Additional liquidity backing from OPTK reserves</li>
                  <li>• Enhanced price stability during launch</li>
                  <li>• Protection against initial volatility</li>
                  <li>• Increased trading confidence</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Launch Package Included</p>
                  <p className="text-blue-300/80 text-sm mt-1">
                    Your payment includes minimum liquidity funding and launch support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#F1F3F5] mb-2">Ready to Launch!</h3>
              <p className="text-[#A9B2BC]">Your meme coin is configured and ready for deployment</p>
            </div>

            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#F1F3F5] mb-4">Launch Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#A9B2BC]">Token Name:</span>
                  <span className="text-[#F1F3F5]">{tokenData.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9B2BC]">Symbol:</span>
                  <span className="text-[#F1F3F5]">{tokenData.symbol || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9B2BC]">Total Supply:</span>
                  <span className="text-[#F1F3F5]">{tokenData.totalSupply || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9B2BC]">Base Launch Cost:</span>
                  <span className="text-green-400 font-semibold">$499.99</span>
                </div>
              </div>
            </div>

            {/* Optional Add-ons Section */}
            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#F1F3F5] mb-4">Optional AI-Powered Add-ons</h4>
              
              {/* Ultimate Bundle Option */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="ultimateBundle"
                      checked={isUltimateBundleSelected}
                      onChange={(e) => setIsUltimateBundleSelected(e.target.checked)}
                      className="w-5 h-5 text-purple-600 bg-[#0F1113] border-[#007BFF] rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div>
                      <label htmlFor="ultimateBundle" className="text-lg font-semibold text-[#F1F3F5] cursor-pointer">
                        Ultimate Creator Bundle
                      </label>
                      <p className="text-purple-300 text-sm">Get all AI tools + monthly access</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">$799.99</p>
                    <p className="text-purple-300 text-sm">+ $99.99/month</p>
                  </div>
                </div>
              </div>

              {/* Individual Add-ons */}
              <div className="space-y-3">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  return (
                    <div key={addon.id} className="flex items-center justify-between p-3 bg-[#0F1113]/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={addon.id}
                          checked={addon.state}
                          onChange={(e) => addon.setState(e.target.checked)}
                          disabled={isUltimateBundleSelected}
                          className="w-4 h-4 text-blue-600 bg-[#0F1113] border-[#007BFF] rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                        />
                        <Icon className="w-5 h-5 text-[#007BFF]" />
                        <div>
                          <label htmlFor={addon.id} className="text-[#F1F3F5] font-medium cursor-pointer">
                            {addon.name}
                          </label>
                          <p className="text-[#A9B2BC] text-sm">{addon.description}</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-semibold">${addon.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total Cost Display */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#F1F3F5]">Total Cost:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-400">${calculateTotalCost().toFixed(2)}</span>
                    {isUltimateBundleSelected && (
                      <p className="text-green-300 text-sm">+ $99.99/month recurring</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram Verification Notice */}
            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#007BFF] font-medium">Telegram Verification Required</p>
                  <p className="text-[#007BFF]/80 text-sm mt-1">
                    For security and compliance, payment verification will be conducted via our Telegram bot.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Important Notice</p>
                  <p className="text-red-300/80 text-sm mt-1">
                    Once launched, certain token parameters cannot be changed. Please review all settings carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-900 via-blue-900 via-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-4">
            OptikMeme Creator
          </h1>
          <p className="text-xl text-[#A9B2BC] max-w-3xl mx-auto mb-8">
            Create and launch your own meme coin with AI-powered tools and professional support.
          </p>
          
          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/gpt" variant="outline" size="lg">
              Get AI Assistance
            </CTAButton>
            <CTAButton 
              onClick={() => window.open('https://chrome.google.com/webstore/detail/optikcoin-wallet', '_blank')}
              variant="secondary" 
              size="lg"
              icon={<Download className="w-5 h-5" />}
            >
              Get OptikWallet
            </CTAButton>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.id;
              const isCompleted = step > stepItem.id;
              
              return (
                <div key={stepItem.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#007BFF] border-[#007BFF] text-white' 
                      : isCompleted 
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-[#007BFF]/20 text-[#A9B2BC]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-[#007BFF]' : isCompleted ? 'text-green-400' : 'text-[#A9B2BC]'}`}>
                      Step {stepItem.id}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-[#F1F3F5]' : 'text-[#A9B2BC]'}`}>
                      {stepItem.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-[#007BFF]/20'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-[#0F1113]/50 to-[#0F1113]/80 backdrop-blur-sm border border-[#007BFF]/20 rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#F1F3F5] mb-2">
              {steps.find(s => s.id === step)?.title}
            </h2>
            <p className="text-[#A9B2BC]">
              {step === 1 && "Configure your meme coin's basic properties"}
              {step === 2 && "Set up smart contract security features"}
              {step === 3 && "Configure liquidity pool and funding"}
              {step === 4 && "Review and launch your token with optional AI tools"}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#007BFF]/20">
            <CTAButton
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              variant="outline"
              size="md"
            >
              Previous
            </CTAButton>
            
            {step < 4 ? (
              <CTAButton
                onClick={() => setStep(Math.min(4, step + 1))}
                variant="primary"
                size="md"
              >
                Next Step
              </CTAButton>
            ) : (
              <CTAButton 
                onClick={handleLaunchToken}
                disabled={isCreating}
                variant="primary"
                size="lg"
                icon={isCreating ? <Loader className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
              >
                {isCreating ? 'Creating Token...' : `Launch Token ($${calculateTotalCost().toFixed(2)})`}
              </CTAButton>
            )}
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="mt-8 bg-purple-600/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F1F3F5]">AI Meme Coin Assistant</h3>
              <p className="text-purple-300/80 text-sm">Get personalized advice for your token</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <CTAButton to="/gpt" variant="outline" size="sm" className="w-full">
              💡 Generate viral token name ideas
            </CTAButton>
            <CTAButton to="/gpt" variant="outline" size="sm" className="w-full">
              🚀 Optimize tokenomics for growth
            </CTAButton>
            <CTAButton to="/gpt" variant="outline" size="sm" className="w-full">
              🛡️ Security best practices
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Telegram Verification Modal */}
      {showTelegramVerification && (
        <TelegramVerification
          onVerificationComplete={handleVerificationComplete}
          onClose={() => setShowTelegramVerification(false)}
          amount={calculateTotalCost()}
          currency="USD"
        />
      )}
    </div>
  );
}