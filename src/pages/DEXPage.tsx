import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, TrendingUp, TrendingDown, BarChart3, Activity, Zap, Shield, 
  Search, Filter, Star, Eye, Volume2, Clock, DollarSign, Percent, 
  ChevronUp, ChevronDown, RefreshCw, Settings, Bookmark, Share2,
  Play, Pause, SkipForward, SkipBack, Maximize2, Copy, ExternalLink
} from 'lucide-react';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';

interface TradingPair {
  id: string;
  baseToken: string;
  quoteToken: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  holders: number;
  transactions24h: number;
  logo: string;
  verified: boolean;
  trending: boolean;
  new: boolean;
}

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  value: number;
  time: string;
  wallet: string;
}

const DEXPage: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'price' | 'change' | 'liquidity'>('volume');
  const [filterBy, setFilterBy] = useState<'all' | 'trending' | 'new' | 'verified'>('all');
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const mockTradingPairs: TradingPair[] = [
    {
      id: '1',
      baseToken: 'OPTIK',
      quoteToken: 'ETH',
      symbol: 'OPTIK/ETH',
      price: 0.00101,
      change24h: 12.5,
      volume24h: 1200000,
      liquidity: 2400000,
      marketCap: 245000000,
      fdv: 300000000,
      holders: 15847,
      transactions24h: 2456,
      logo: '🔮',
      verified: true,
      trending: true,
      new: false
    },
    {
      id: '2',
      baseToken: 'OPTIK',
      quoteToken: 'USDT',
      symbol: 'OPTIK/USDT',
      price: 2.46,
      change24h: 8.9,
      volume24h: 2100000,
      liquidity: 3100000,
      marketCap: 245000000,
      fdv: 300000000,
      holders: 15847,
      transactions24h: 3421,
      logo: '🔮',
      verified: true,
      trending: false,
      new: false
    },
    {
      id: '3',
      baseToken: 'MEME',
      quoteToken: 'OPTIK',
      symbol: 'MEME/OPTIK',
      price: 0.0045,
      change24h: 156.7,
      volume24h: 890000,
      liquidity: 450000,
      marketCap: 12000000,
      fdv: 50000000,
      holders: 3421,
      transactions24h: 8934,
      logo: '🐸',
      verified: false,
      trending: true,
      new: true
    },
    {
      id: '4',
      baseToken: 'DOGE',
      quoteToken: 'OPTIK',
      symbol: 'DOGE/OPTIK',
      price: 0.0234,
      change24h: -5.2,
      volume24h: 567000,
      liquidity: 890000,
      marketCap: 89000000,
      fdv: 120000000,
      holders: 8934,
      transactions24h: 1567,
      logo: '🐕',
      verified: true,
      trending: false,
      new: false
    },
    {
      id: '5',
      baseToken: 'PEPE',
      quoteToken: 'OPTIK',
      symbol: 'PEPE/OPTIK',
      price: 0.000012,
      change24h: 89.3,
      volume24h: 1890000,
      liquidity: 1200000,
      marketCap: 45000000,
      fdv: 78000000,
      holders: 12456,
      transactions24h: 15678,
      logo: '🐸',
      verified: false,
      trending: true,
      new: true
    }
  ];

  const mockTrades: Trade[] = [
    {
      id: '1',
      type: 'buy',
      amount: 1250,
      price: 2.45,
      value: 3062.50,
      time: '2m ago',
      wallet: '0x742d...4c1A'
    },
    {
      id: '2',
      type: 'sell',
      amount: 890,
      price: 2.44,
      value: 2171.60,
      time: '5m ago',
      wallet: '0x8a3f...7b9c'
    },
    {
      id: '3',
      type: 'buy',
      amount: 2100,
      price: 2.46,
      value: 5166.00,
      time: '8m ago',
      wallet: '0x9f4e...3d8a'
    }
  ];

  const filteredPairs = mockTradingPairs.filter(pair => {
    const matchesSearch = pair.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pair.baseToken.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'trending' && pair.trending) ||
                         (filterBy === 'new' && pair.new) ||
                         (filterBy === 'verified' && pair.verified);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'volume': return b.volume24h - a.volume24h;
      case 'price': return b.price - a.price;
      case 'change': return b.change24h - a.change24h;
      case 'liquidity': return b.liquidity - a.liquidity;
      default: return 0;
    }
  });

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return price.toExponential(3);
    return price.toFixed(price < 1 ? 6 : 2);
  };

  useEffect(() => {
    if (mockTradingPairs.length > 0) {
      setSelectedPair(mockTradingPairs[0]);
    }
  }, []);

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time price updates
        console.log('Refreshing data...');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-900 via-blue-900 via-gray-900 to-blue-900">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            OptikDEX <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">Pro</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Advanced decentralized exchange with real-time analytics, AI-powered insights, and professional trading tools.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search and Filters */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tokens, pairs, or contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
              >
                <option value="all">All Tokens</option>
                <option value="trending">🔥 Trending</option>
                <option value="new">✨ New</option>
                <option value="verified">✅ Verified</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
              >
                <option value="volume">Volume</option>
                <option value="price">Price</option>
                <option value="change">Change</option>
                <option value="liquidity">Liquidity</option>
              </select>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`border border-gray-600/50 rounded-xl px-4 py-3 text-white transition-colors ${
                isAutoRefresh ? 'bg-pink-600/20 border-pink-500/50' : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            </button>
            
            <CTAButton to="/gpt" variant="outline" size="sm" icon={<Zap className="w-4 h-4" />}>
              AI Insights
            </CTAButton>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Token List */}
          <div className="xl:col-span-3">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">Live Pairs</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Live
                    </div>
                    <span className="text-gray-400 text-sm">{filteredPairs.length} pairs</span>
                  </div>
                </div>
                
                {/* Timeframe Selector */}
                <div className="flex gap-2">
                  {(['1h', '24h', '7d', '30d'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        timeframe === tf
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-medium">Token</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Price</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Change</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Volume</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Liquidity</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Market Cap</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPairs.map((pair, index) => (
                      <tr
                        key={pair.id}
                        onClick={() => setSelectedPair(pair)}
                        className={`border-b border-gray-700/30 hover:bg-gray-700/20 cursor-pointer transition-colors ${
                          selectedPair?.id === pair.id ? 'bg-pink-500/10 border-pink-500/30' : ''
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <span className="text-2xl">{pair.logo}</span>
                              {pair.verified && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">{pair.symbol}</span>
                                {pair.trending && <span className="text-orange-400 text-xs">🔥</span>}
                                {pair.new && <span className="text-green-400 text-xs">NEW</span>}
                              </div>
                              <div className="text-gray-400 text-sm">{pair.baseToken}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-white font-semibold">${formatPrice(pair.price)}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className={`flex items-center justify-end gap-1 ${
                            pair.change24h > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {pair.change24h > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="font-semibold">{pair.change24h > 0 ? '+' : ''}{pair.change24h.toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-white font-semibold">{formatNumber(pair.volume24h)}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-white font-semibold">{formatNumber(pair.liquidity)}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-white font-semibold">{formatNumber(pair.marketCap)}</div>
                          <div className="text-gray-400 text-sm">FDV: {formatNumber(pair.fdv)}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                              <Star className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-400 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <CTAButton
                              to="/wallet"
                              variant="primary"
                              size="sm"
                              className="!px-3 !py-1 !text-xs"
                            >
                              Trade
                            </CTAButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Pair Details */}
            {selectedPair && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{selectedPair.logo}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedPair.symbol}</h3>
                      <p className="text-gray-400 text-sm">{selectedPair.baseToken}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-400 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-semibold">${formatPrice(selectedPair.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className={`font-semibold ${selectedPair.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedPair.change24h > 0 ? '+' : ''}{selectedPair.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Volume</span>
                    <span className="text-white font-semibold">{formatNumber(selectedPair.volume24h)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidity</span>
                    <span className="text-white font-semibold">{formatNumber(selectedPair.liquidity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-white font-semibold">{formatNumber(selectedPair.marketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Holders</span>
                    <span className="text-white font-semibold">{selectedPair.holders.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Transactions</span>
                    <span className="text-white font-semibold">{selectedPair.transactions24h.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <CTAButton
                    to="/wallet"
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<ArrowLeftRight className="w-4 h-4" />}
                  >
                    Trade {selectedPair.baseToken}
                  </CTAButton>
                  <CTAButton
                    to="/gpt"
                    variant="outline"
                    size="md"
                    className="w-full"
                    icon={<BarChart3 className="w-4 h-4" />}
                  >
                    AI Analysis
                  </CTAButton>
                </div>
              </div>
            )}

            {/* Recent Trades */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-pink-400" />
                Recent Trades
              </h3>
              <div className="space-y-3">
                {mockTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.amount.toLocaleString()} OPTIK
                        </div>
                        <div className="text-gray-400 text-xs">{trade.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-semibold">${trade.price}</div>
                      <div className="text-gray-400 text-xs">{formatNumber(trade.value)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <CTAButton
                to="/analytics"
                variant="outline"
                size="sm"
                className="w-full mt-4"
              >
                View All Trades
              </CTAButton>
            </div>

            {/* Market Stats */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                Market Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Volume 24h</span>
                  <span className="text-white font-semibold">$5.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Liquidity</span>
                  <span className="text-white font-semibold">$24.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Pairs</span>
                  <span className="text-white font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Transactions</span>
                  <span className="text-white font-semibold">32,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Unique Traders</span>
                  <span className="text-white font-semibold">8,934</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <CTAButton
                  to="/analytics"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={<TrendingUp className="w-4 h-4" />}
                >
                  Advanced Analytics
                </CTAButton>
                <CTAButton
                  to="/gpt"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  icon={<Zap className="w-4 h-4" />}
                >
                  AI Market Insights
                </CTAButton>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Security Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <Zap className="w-3 h-3 text-green-400 mr-2" />
                  AI-powered fraud detection
                </li>
                <li className="flex items-center">
                  <Zap className="w-3 h-3 text-green-400 mr-2" />
                  Smart contract audited
                </li>
                <li className="flex items-center">
                  <Zap className="w-3 h-3 text-green-400 mr-2" />
                  Non-custodial trading
                </li>
                <li className="flex items-center">
                  <Zap className="w-3 h-3 text-green-400 mr-2" />
                  Real-time monitoring
                </li>
              </ul>
              <CTAButton 
                to="/gpt" 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                icon={<Shield className="w-4 h-4" />}
              >
                Security Analysis
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-600/10 to-blue-600/10 backdrop-blur-lg border border-pink-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of traders using OptikDEX for secure, fast, and profitable cryptocurrency trading with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton 
              to="/wallet" 
              variant="primary" 
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700"
            >
              Connect Wallet & Trade
            </CTAButton>
            <CTAButton 
              to="/gpt" 
              variant="outline" 
              size="lg"
              icon={<Zap className="w-5 h-5" />}
            >
              Get AI Trading Signals
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DEXPage;