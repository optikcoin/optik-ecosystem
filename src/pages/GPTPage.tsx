import React, { useState } from 'react';
import { Brain, MessageSquare, TrendingUp, Shield, Smile, Globe, Paintbrush, Zap, Star, Clock, Users } from 'lucide-react';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';
import OptikGeneralGPTModal from '../components/modals/OptikGeneralGPTModal';
import OptikTradingGPTModal from '../components/modals/OptikTradingGPTModal';
import OptikMemeGPTModal from '../components/modals/OptikMemeGPTModal';
import OptikSecureGPTModal from '../components/modals/OptikSecureGPTModal';
import OptikDeFiGPTModal from '../components/modals/OptikDeFiGPTModal';
import OptikWebDesignerGPTModal from '../components/modals/OptikWebDesignerGPTModal';
import OptikViralGPTModal from '../components/modals/OptikViralGPTModal';

const GPTPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const gptModels = [
    {
      id: 'general',
      name: 'OptikGeneral GPT',
      description: 'Your all-purpose AI assistant for general queries, research, and problem-solving.',
      icon: Brain,
      color: 'from-blue-400 to-cyan-400',
      features: ['General Knowledge', 'Research', 'Writing', 'Analysis'],
      usage: '2.4K queries today',
      rating: 4.9,
      price: 'Free'
    },
    {
      id: 'trading',
      name: 'OptikTrading GPT',
      description: 'Specialized AI for crypto trading analysis, market insights, and strategy optimization.',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-400',
      features: ['Market Analysis', 'Trading Signals', 'Risk Assessment', 'Portfolio Optimization'],
      usage: '1.8K queries today',
      rating: 4.8,
      price: '$19.99'
    },
    {
      id: 'meme',
      name: 'OptikMeme GPT',
      description: 'Creative AI for generating viral memes, social content, and community engagement.',
      icon: Smile,
      color: 'from-yellow-400 to-orange-400',
      features: ['Meme Generation', 'Social Content', 'Viral Strategies', 'Community Building'],
      usage: '3.2K queries today',
      rating: 4.7,
      price: '$14.99'
    },
    {
      id: 'secure',
      name: 'OptikSecure GPT',
      description: 'Security-focused AI for vulnerability assessment, smart contract auditing, and protection.',
      icon: Shield,
      color: 'from-red-400 to-pink-400',
      features: ['Security Audits', 'Vulnerability Detection', 'Smart Contract Review', 'Risk Analysis'],
      usage: '890 queries today',
      rating: 4.9,
      price: '$29.99'
    },
    {
      id: 'defi',
      name: 'OptikDeFi GPT',
      description: 'DeFi specialist AI for yield farming, liquidity provision, and protocol analysis.',
      icon: Globe,
      color: 'from-purple-400 to-indigo-400',
      features: ['Yield Optimization', 'Protocol Analysis', 'Liquidity Strategies', 'DeFi Education'],
      usage: '1.5K queries today',
      rating: 4.8,
      price: '$24.99'
    },
    {
      id: 'webdesigner',
      name: 'OptikWebDesigner GPT',
      description: 'Creative AI for web design, UI/UX optimization, and brand development.',
      icon: Paintbrush,
      color: 'from-pink-400 to-rose-400',
      features: ['UI/UX Design', 'Brand Development', 'Color Schemes', 'Layout Optimization'],
      usage: '1.1K queries today',
      rating: 4.6,
      price: '$19.99'
    },
    {
      id: 'viral',
      name: 'OptikViral GPT',
      description: 'Marketing-focused AI for viral content creation and social media optimization.',
      icon: Zap,
      color: 'from-cyan-400 to-blue-400',
      features: ['Viral Content', 'Social Media', 'Marketing Strategy', 'Engagement Optimization'],
      usage: '2.7K queries today',
      rating: 4.7,
      price: '$22.99'
    }
  ];

  const openModal = (modelId: string) => {
    setActiveModal(modelId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Assistant Hub
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Access our suite of specialized GPT models designed for every aspect of your DeFi journey.
          </p>
          
          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton 
              onClick={() => openModal('general')} 
              variant="primary" 
              size="lg"
              icon={<Brain className="w-5 h-5" />}
            >
              Try Free Assistant
            </CTAButton>
            <CTAButton to="/wallet" variant="outline" size="lg">
              Connect Wallet
            </CTAButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">7</div>
            <div className="text-gray-400">Specialized Models</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">13.2K</div>
            <div className="text-gray-400">Daily Queries</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">98.7%</div>
            <div className="text-gray-400">Accuracy Rate</div>
          </div>
        </div>

        {/* GPT Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {gptModels.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onClick={() => openModal(model.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 text-sm font-medium">{model.price}</div>
                    <div className="flex items-center text-yellow-400 text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {model.rating}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {model.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-black/30 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{model.usage}</span>
                  </div>
                  <MessageSquare className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional CTAs */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-lg border border-purple-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Trading?
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of traders using OptikCoin's AI assistants to make smarter decisions and maximize profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/dex" variant="primary" size="lg">
              Start Trading Now
            </CTAButton>
            <CTAButton 
              href="https://docs.optikcoin.com" 
              external 
              variant="outline" 
              size="lg"
            >
              View Documentation
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'general' && <OptikGeneralGPTModal onClose={closeModal} />}
      {activeModal === 'trading' && <OptikTradingGPTModal onClose={closeModal} />}
      {activeModal === 'meme' && <OptikMemeGPTModal onClose={closeModal} />}
      {activeModal === 'secure' && <OptikSecureGPTModal onClose={closeModal} />}
      {activeModal === 'defi' && <OptikDeFiGPTModal onClose={closeModal} />}
      {activeModal === 'webdesigner' && <OptikWebDesignerGPTModal onClose={closeModal} />}
      {activeModal === 'viral' && <OptikViralGPTModal onClose={closeModal} />}
    </div>
  );
};

export default GPTPage;