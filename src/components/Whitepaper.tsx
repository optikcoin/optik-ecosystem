import React from 'react';
import { FileText, Download, ExternalLink, Shield, Zap, TrendingUp, Users, Coins } from 'lucide-react';

export default function Whitepaper() {
  const sections = [
    {
      id: 'abstract',
      title: 'Abstract',
      content: 'OptikCoinGPT represents a revolutionary approach to meme coin creation and trading, combining artificial intelligence with decentralized finance to democratize token creation while maintaining security and preventing malicious activities.',
    },
    {
      id: 'introduction',
      title: 'Introduction',
      content: 'The cryptocurrency landscape has evolved rapidly, with meme coins representing a significant portion of market activity. However, the current ecosystem lacks comprehensive tools for safe, intelligent token creation and trading.',
    },
    {
      id: 'technology',
      title: 'Technology Stack',
      content: 'Built on Solana blockchain using Rust and Anchor framework, OptikCoinGPT leverages advanced AI algorithms for market analysis, bot detection, and smart contract security auditing.',
    },
    {
      id: 'tokenomics',
      title: 'OPTK Tokenomics',
      content: 'OPTK serves as the native utility token with a total supply of 1 billion tokens. Distribution includes 40% for liquidity backing, 25% for development, 20% for community rewards, 10% for team, and 5% for advisors.',
    },
    {
      id: 'security',
      title: 'Security Framework',
      content: 'Multi-layered security approach including AI-powered bot detection, smart contract auditing, anti-rug pull mechanisms, and real-time monitoring of suspicious activities.',
    },
    {
      id: 'roadmap',
      title: 'Development Roadmap',
      content: 'Q1 2025: Platform launch and OPTK token release. Q2 2025: Advanced AI features and mobile app. Q3 2025: Cross-chain integration. Q4 2025: DAO governance implementation.',
    },
  ];

  const keyFeatures = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Advanced protection against bots, rug pulls, and malicious contracts',
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Intelligent assistance for token creation and market analysis',
    },
    {
      icon: TrendingUp,
      title: 'Market Analytics',
      description: 'Real-time data and insights for informed trading decisions',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community with DAO governance',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
          <FileText className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OptikCoinGPT <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Whitepaper</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
          A comprehensive guide to the future of intelligent meme coin creation and decentralized trading
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/25">
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 border border-gray-600/50 hover:border-gray-500/50">
            <ExternalLink className="w-5 h-5" />
            <span>View on GitHub</span>
          </button>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-lg flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPTK Token Info */}
      <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="bg-green-600/20 p-4 rounded-full inline-flex mb-4">
            <Coins className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">OPTK Token</h2>
          <p className="text-gray-300">The native utility token powering the OptikCoinGPT ecosystem</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Total Supply</h3>
            <p className="text-2xl font-bold text-green-400">1,000,000,000</p>
            <p className="text-gray-400 text-sm">OPTK Tokens</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Liquidity Backing</h3>
            <p className="text-2xl font-bold text-blue-400">40%</p>
            <p className="text-gray-400 text-sm">Reserved for backing</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Community Rewards</h3>
            <p className="text-2xl font-bold text-purple-400">20%</p>
            <p className="text-gray-400 text-sm">For community incentives</p>
          </div>
        </div>
      </div>

      {/* Whitepaper Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-blue-600/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {index + 1}
              </span>
              {section.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Technical Specifications */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Blockchain</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Solana Network</li>
              <li>• SPL Token Standard</li>
              <li>• Anchor Framework</li>
              <li>• Rust Programming Language</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">AI & Security</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Machine Learning Bot Detection</li>
              <li>• Smart Contract Auditing</li>
              <li>• Real-time Risk Assessment</li>
              <li>• Behavioral Analysis Engine</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-amber-400 font-semibold mb-3">Important Disclaimer</h3>
        <p className="text-amber-300/80 text-sm leading-relaxed">
          This whitepaper is for informational purposes only and does not constitute investment advice. 
          Cryptocurrency investments carry significant risks, and past performance does not guarantee future results. 
          Please conduct your own research and consult with financial advisors before making investment decisions.
        </p>
      </div>

      {/* Version Info */}
      <div className="text-center text-gray-500 text-sm">
        <p>OptikCoinGPT Whitepaper v1.0 | Last Updated: January 2025</p>
      </div>
    </div>
  );
}