import React from 'react';
import { Calendar, CheckCircle, Clock, Rocket, Target, Users, Zap, Globe } from 'lucide-react';

export default function Roadmap() {
  const roadmapItems = [
    {
      quarter: 'Q1 2025',
      title: 'Platform Launch',
      status: 'completed',
      items: [
        'OptikCoinGPT platform beta release',
        'Basic meme coin creation tools',
        'AI assistant integration',
        'Community building and testing',
      ],
      icon: Rocket,
      color: 'green',
    },
    {
      quarter: 'Q2 2025',
      title: 'OPTK Token Launch',
      status: 'in-progress',
      items: [
        'OPTK token generation and distribution',
        'Liquidity pool establishment',
        'Staking and rewards system',
        'Advanced trading analytics',
      ],
      icon: Zap,
      color: 'blue',
    },
    {
      quarter: 'Q3 2025',
      title: 'Advanced Features',
      status: 'planned',
      items: [
        'Mobile application release',
        'Cross-chain token support',
        'Advanced AI market predictions',
        'Institutional partnerships',
      ],
      icon: Target,
      color: 'purple',
    },
    {
      quarter: 'Q4 2025',
      title: 'Ecosystem Expansion',
      status: 'planned',
      items: [
        'DAO governance implementation',
        'NFT integration and marketplace',
        'Global expansion and localization',
        'Enterprise solutions launch',
      ],
      icon: Globe,
      color: 'orange',
    },
    {
      quarter: 'Q1 2026',
      title: 'Innovation & Scale',
      status: 'future',
      items: [
        'AI-powered automated trading',
        'Metaverse integration',
        'Layer 2 scaling solutions',
        'Strategic acquisitions',
      ],
      icon: Users,
      color: 'pink',
    },
  ];

  const milestones = [
    { date: 'Jan 2025', event: 'Platform Beta Launch', completed: true },
    { date: 'Feb 2025', event: 'First 1,000 Users', completed: true },
    { date: 'Mar 2025', event: 'OPTK Token Launch', completed: false },
    { date: 'Apr 2025', event: '10,000 Tokens Created', completed: false },
    { date: 'Jun 2025', event: 'Mobile App Release', completed: false },
    { date: 'Sep 2025', event: '100,000 Active Users', completed: false },
    { date: 'Dec 2025', event: 'DAO Governance Live', completed: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-600/20 border-green-500/30';
      case 'in-progress':
        return 'text-blue-400 bg-blue-600/20 border-blue-500/30';
      case 'planned':
        return 'text-purple-400 bg-purple-600/20 border-purple-500/30';
      case 'future':
        return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
      default:
        return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-400 bg-green-600/20';
      case 'blue':
        return 'text-blue-400 bg-blue-600/20';
      case 'purple':
        return 'text-purple-400 bg-purple-600/20';
      case 'orange':
        return 'text-orange-400 bg-orange-600/20';
      case 'pink':
        return 'text-pink-400 bg-pink-600/20';
      default:
        return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
          <Calendar className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OptikCoinGPT <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Roadmap</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our journey to revolutionize meme coin creation and decentralized trading
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Current Phase: Q2 2025</h2>
            <p className="text-blue-300">OPTK Token Launch & Advanced Features Development</p>
          </div>
          <div className="bg-blue-600/20 p-3 rounded-lg">
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="mt-4 bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">Progress</span>
            <span className="text-blue-400 text-sm font-medium">65%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-8">
        {roadmapItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < roadmapItems.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-24 bg-gray-600/50"></div>
              )}
              
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className={`p-3 rounded-full ${getIconColor(item.color)} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.quarter}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status === 'completed' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                        {item.status === 'in-progress' && <Clock className="w-3 h-3 inline mr-1" />}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-center text-gray-300">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            item.status === 'completed' ? 'bg-green-400' :
                            item.status === 'in-progress' ? 'bg-blue-400' :
                            'bg-gray-500'
                          }`}></div>
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Milestones */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                milestone.completed
                  ? 'bg-green-600/10 border-green-500/30 hover:bg-green-600/20'
                  : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${
                  milestone.completed ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {milestone.date}
                </span>
                {milestone.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              <p className={`text-sm ${
                milestone.completed ? 'text-white' : 'text-gray-300'
              }`}>
                {milestone.event}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision Statement */}
      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          To become the leading platform for intelligent, secure, and community-driven meme coin creation, 
          empowering creators worldwide while protecting investors through advanced AI and blockchain technology.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="bg-purple-600/20 px-4 py-2 rounded-full">
            <span className="text-purple-300 font-medium">Innovation</span>
          </div>
          <div className="bg-blue-600/20 px-4 py-2 rounded-full">
            <span className="text-blue-300 font-medium">Security</span>
          </div>
          <div className="bg-green-600/20 px-4 py-2 rounded-full">
            <span className="text-green-300 font-medium">Community</span>
          </div>
          <div className="bg-orange-600/20 px-4 py-2 rounded-full">
            <span className="text-orange-300 font-medium">Accessibility</span>
          </div>
        </div>
      </div>

      {/* Community Involvement */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Our Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community Feedback</h3>
            <p className="text-gray-400 text-sm">
              Your input shapes our roadmap. Join our Discord to share ideas and vote on features.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-4 rounded-lg inline-flex mb-4">
              <Target className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Beta Testing</h3>
            <p className="text-gray-400 text-sm">
              Be among the first to test new features and help us improve the platform.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600/20 p-4 rounded-lg inline-flex mb-4">
              <Rocket className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Early Access</h3>
            <p className="text-gray-400 text-sm">
              OPTK holders get priority access to new features and exclusive benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}