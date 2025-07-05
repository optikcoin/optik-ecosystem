import React, { useState } from 'react';
import { Gift, Users, Calendar, CheckCircle, Clock, Star, Zap, Trophy } from 'lucide-react';

export default function Airdrop() {
  const [selectedAirdrop, setSelectedAirdrop] = useState(null);

  const activeAirdrops = [
    {
      id: 1,
      name: 'OPTK Genesis Airdrop',
      token: 'OPTK',
      amount: '500 OPTK',
      participants: 12847,
      maxParticipants: 50000,
      endDate: '2025-03-15',
      status: 'active',
      requirements: [
        'Hold minimum 100 OPTK tokens',
        'Complete social media tasks',
        'Refer 3 friends to the platform',
      ],
      description: 'Celebrate the launch of OptikCoinGPT with our genesis airdrop',
      icon: Gift,
      color: 'blue',
    },
    {
      id: 2,
      name: 'Community Builder Rewards',
      token: 'OPTK',
      amount: '250 OPTK',
      participants: 3421,
      maxParticipants: 10000,
      endDate: '2025-02-28',
      status: 'active',
      requirements: [
        'Join Discord server',
        'Create a meme coin on platform',
        'Share on Twitter with #OptikCoin',
      ],
      description: 'Rewards for active community members and creators',
      icon: Users,
      color: 'green',
    },
    {
      id: 3,
      name: 'Early Adopter Bonus',
      token: 'OPTK',
      amount: '1000 OPTK',
      participants: 892,
      maxParticipants: 2000,
      endDate: '2025-02-20',
      status: 'ending-soon',
      requirements: [
        'Be among first 2000 users',
        'Complete KYC verification',
        'Make first token swap',
      ],
      description: 'Exclusive rewards for our earliest supporters',
      icon: Star,
      color: 'purple',
    },
  ];

  const completedAirdrops = [
    {
      name: 'Beta Tester Rewards',
      amount: '100 OPTK',
      participants: 1500,
      claimed: true,
      date: '2025-01-15',
    },
    {
      name: 'Whitelist Airdrop',
      amount: '200 OPTK',
      participants: 5000,
      claimed: true,
      date: '2025-01-01',
    },
  ];

  const userStats = {
    totalEarned: '800 OPTK',
    airdropsParticipated: 5,
    referrals: 12,
    rank: 'Gold Member',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-600/20 border-green-500/30';
      case 'ending-soon':
        return 'text-orange-400 bg-orange-600/20 border-orange-500/30';
      case 'completed':
        return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
      default:
        return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-400 bg-blue-600/20';
      case 'green':
        return 'text-green-400 bg-green-600/20';
      case 'purple':
        return 'text-purple-400 bg-purple-600/20';
      default:
        return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-purple-600/20 p-4 rounded-full inline-flex mb-6">
          <Gift className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OPTK <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Airdrops</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Participate in airdrops to earn free OPTK tokens and exclusive rewards
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Earned</p>
              <p className="text-2xl font-bold text-green-400">{userStats.totalEarned}</p>
            </div>
            <div className="bg-green-600/20 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Participated</p>
              <p className="text-2xl font-bold text-blue-400">{userStats.airdropsParticipated}</p>
            </div>
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <Gift className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Referrals</p>
              <p className="text-2xl font-bold text-purple-400">{userStats.referrals}</p>
            </div>
            <div className="bg-purple-600/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Rank</p>
              <p className="text-lg font-bold text-yellow-400">{userStats.rank}</p>
            </div>
            <div className="bg-yellow-600/20 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Airdrops */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Active Airdrops</h2>
        <div className="space-y-6">
          {activeAirdrops.map((airdrop) => {
            const Icon = airdrop.icon;
            const progress = (airdrop.participants / airdrop.maxParticipants) * 100;
            
            return (
              <div
                key={airdrop.id}
                className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(airdrop.color)}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{airdrop.name}</h3>
                      <p className="text-gray-400">{airdrop.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(airdrop.status)}`}>
                      {airdrop.status === 'active' && <Clock className="w-3 h-3 inline mr-1" />}
                      {airdrop.status === 'ending-soon' && <Zap className="w-3 h-3 inline mr-1" />}
                      {airdrop.status.charAt(0).toUpperCase() + airdrop.status.slice(1).replace('-', ' ')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Reward Amount</p>
                    <p className="text-2xl font-bold text-green-400">{airdrop.amount}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Participants</p>
                    <p className="text-lg font-semibold text-white">
                      {airdrop.participants.toLocaleString()} / {airdrop.maxParticipants.toLocaleString()}
                    </p>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Ends</p>
                    <p className="text-lg font-semibold text-white">{airdrop.endDate}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {airdrop.requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  airdrop.status === 'ending-soon'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}>
                  {airdrop.status === 'ending-soon' ? 'Join Now - Ending Soon!' : 'Participate in Airdrop'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Airdrops */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Completed Airdrops</h2>
        <div className="space-y-4">
          {completedAirdrops.map((airdrop, index) => (
            <div
              key={index}
              className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{airdrop.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {airdrop.participants.toLocaleString()} participants • {airdrop.date}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-green-400 font-semibold">{airdrop.amount}</p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Claimed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Referral Program</h2>
          <p className="text-gray-300">Earn bonus OPTK tokens for every friend you refer</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="bg-purple-600/20 p-4 rounded-lg inline-flex mb-3">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Refer Friends</h3>
            <p className="text-gray-400 text-sm">Share your unique referral link</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-3">
              <Gift className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">Get 50 OPTK per successful referral</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600/20 p-4 rounded-lg inline-flex mb-3">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Unlock Tiers</h3>
            <p className="text-gray-400 text-sm">Higher tiers = bigger rewards</p>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Your Referral Link:</span>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Copy</button>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 mt-2">
            <code className="text-gray-300 text-sm">https://optikcoingpt.com/ref/abc123xyz</code>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
          Share Referral Link
        </button>
      </div>
    </div>
  );
}