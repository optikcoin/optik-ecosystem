import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  ReferenceLine, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Volume2, DollarSign, 
  Activity, Eye, ChevronDown, BarChart2, CandlestickChart,
  RefreshCw, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, 
  Maximize, Minimize, Settings, List, AlertCircle
} from 'lucide-react';

export default function TradingChart() {
  const [selectedToken, setSelectedToken] = useState('OPTK/SOL');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('candle');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(true);
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('0.00');
  const [showDepth, setShowDepth] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState(['MA', 'Volume']);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  const tokens = [
    { pair: 'OPTK/SOL', name: 'OptikCoin', price: 0.0245, change: 5.67, volume: '$2.4M', positive: true },
    { pair: 'OPTK/USDT', name: 'OptikCoin', price: 0.0892, change: 5.67, volume: '$2.1M', positive: true },
    { pair: 'ETH/USDT', name: 'Ethereum', price: 2222.64, change: -0.23, volume: '$24.01B', positive: false },
    { pair: 'BTC/USDT', name: 'Bitcoin', price: 100697.60, change: -0.24, volume: '$29.28B', positive: false },
  ];

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  const chartTypes = [
    { id: 'candle', name: 'Candlestick', icon: CandlestickChart },
    { id: 'line', name: 'Line', icon: TrendingUp },
    { id: 'area', name: 'Area', icon: BarChart2 },
    { id: 'bar', name: 'Bar', icon: BarChart2 },
  ];

  const indicators = [
    { id: 'MA', name: 'Moving Average' },
    { id: 'EMA', name: 'Exponential Moving Average' },
    { id: 'MACD', name: 'MACD' },
    { id: 'RSI', name: 'RSI' },
    { id: 'BB', name: 'Bollinger Bands' },
    { id: 'Volume', name: 'Volume' },
  ];

  // Generate realistic trading data
  useEffect(() => {
    setIsLoading(true);
    
    const generateData = () => {
      const data = [];
      let basePrice = 0.0245;
      const now = new Date();
      
      for (let i = 100; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000); // 1 minute intervals
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility;
        basePrice = Math.max(0.001, basePrice * (1 + change));
        
        data.push({
          time: timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          price: parseFloat(basePrice.toFixed(6)),
          open: parseFloat((basePrice * (1 - Math.random() * 0.005)).toFixed(6)),
          close: parseFloat(basePrice.toFixed(6)),
          high: parseFloat((basePrice * (1 + Math.random() * 0.01)).toFixed(6)),
          low: parseFloat((basePrice * (1 - Math.random() * 0.01)).toFixed(6)),
          volume: Math.floor(Math.random() * 1000000) + 500000,
          ma20: parseFloat((basePrice * (1 + (Math.random() - 0.5) * 0.01)).toFixed(6)),
          ema20: parseFloat((basePrice * (1 + (Math.random() - 0.5) * 0.008)).toFixed(6)),
          upperBand: parseFloat((basePrice * 1.05).toFixed(6)),
          lowerBand: parseFloat((basePrice * 0.95).toFixed(6)),
          rsi: Math.floor(Math.random() * 100),
        });
      }
      return data;
    };

    const data = generateData();
    setChartData(data);
    setIsLoading(false);
    
    // Update data every 5 seconds
    const interval = setInterval(() => {
      const newData = generateData();
      setChartData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedToken, timeframe]);

  // Calculate total when price or amount changes
  useEffect(() => {
    if (price && amount) {
      setTotal((parseFloat(price) * parseFloat(amount)).toFixed(6));
    } else {
      setTotal('0.00');
    }
  }, [price, amount]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;

  const marketStats = [
    { label: '24h Volume', value: '$2.4M', icon: Volume2, change: '+15.2%' },
    { label: 'Market Cap', value: '$45.2M', icon: DollarSign, change: '+8.7%' },
    { label: 'Holders', value: '12,847', icon: Activity, change: '+234' },
    { label: 'Watchers', value: '3,421', icon: Eye, change: '+89' },
  ];

  const buyOrders = [
    { price: 0.0244, amount: 1250, total: 30.5 },
    { price: 0.0243, amount: 2100, total: 51.03 },
    { price: 0.0242, amount: 890, total: 21.54 },
    { price: 0.0241, amount: 1560, total: 37.6 },
  ];

  const sellOrders = [
    { price: 0.0246, amount: 980, total: 24.11 },
    { price: 0.0247, amount: 1340, total: 33.1 },
    { price: 0.0248, amount: 750, total: 18.6 },
    { price: 0.0249, amount: 2200, total: 54.78 },
  ];

  const toggleIndicator = (id: string) => {
    if (selectedIndicators.includes(id)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== id));
    } else {
      setSelectedIndicators([...selectedIndicators, id]);
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              {selectedIndicators.includes('MA') && (
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#10B981"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="5 5"
                />
              )}
              {selectedIndicators.includes('EMA') && (
                <Line
                  type="monotone"
                  dataKey="ema20"
                  stroke="#F59E0B"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="3 3"
                />
              )}
              {selectedIndicators.includes('BB') && (
                <>
                  <Line
                    type="monotone"
                    dataKey="upperBand"
                    stroke="#9333EA"
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBand"
                    stroke="#9333EA"
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="3 3"
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
              {selectedIndicators.includes('MA') && (
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#10B981"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="5 5"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Bar 
                dataKey="price" 
                fill="#3B82F6" 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'candle':
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              barCategoryGap={1}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#9CA3AF' }}
                formatter={(value: any, name: string) => {
                  return [`${parseFloat(value).toFixed(6)}`, name];
                }}
              />
              {/* Render candlesticks */}
              {chartData.map((entry, index) => {
                const isUp = entry.close >= entry.open;
                return (
                  <React.Fragment key={`candle-${index}`}>
                    {/* Wick */}
                    <line
                      x1={index + 0.5}
                      x2={index + 0.5}
                      y1={entry.low}
                      y2={entry.high}
                      stroke={isUp ? '#10B981' : '#EF4444'}
                      strokeWidth={1}
                    />
                    {/* Body */}
                    <rect
                      x={index + 0.2}
                      y={isUp ? entry.open : entry.close}
                      width={0.6}
                      height={Math.abs(entry.close - entry.open)}
                      fill={isUp ? '#10B981' : '#EF4444'}
                    />
                  </React.Fragment>
                );
              })}
              {selectedIndicators.includes('MA') && (
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#10B981"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="5 5"
                />
              )}
              {selectedIndicators.includes('EMA') && (
                <Line
                  type="monotone"
                  dataKey="ema20"
                  stroke="#F59E0B"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="3 3"
                />
              )}
              {selectedIndicators.includes('Volume') && (
                <Bar
                  dataKey="volume"
                  fill="#6B7280"
                  opacity={0.3}
                  barSize={20}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Selector and Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tokens.map((token) => (
            <button
              key={token.pair}
              onClick={() => setSelectedToken(token.pair)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedToken === token.pair
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              <span>{token.pair}</span>
              <span className={`text-xs ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                timeframe === tf
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Price Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span>{selectedToken}</span>
              <div className="flex items-center space-x-1">
                {priceChange >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
                <span className={`text-lg ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                </span>
              </div>
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              ${currentPrice.toFixed(6)}
            </p>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="text-right">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
              <p className="text-green-400 font-medium">LIVE</p>
              <p className="text-green-300/80 text-xs">Real-time data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                </div>
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          {/* Chart Type Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {chartTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      chartType === type.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                    title={type.name}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
              
              <div className="relative">
                <button
                  onClick={() => setShowIndicators(!showIndicators)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                  title="Indicators"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                {showIndicators && (
                  <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 z-10 w-64">
                    <h4 className="text-white font-medium mb-2">Indicators</h4>
                    <div className="space-y-2">
                      {indicators.map((indicator) => (
                        <div key={indicator.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`indicator-${indicator.id}`}
                            checked={selectedIndicators.includes(indicator.id)}
                            onChange={() => toggleIndicator(indicator.id)}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`indicator-${indicator.id}`} className="text-gray-300 text-sm">
                            {indicator.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200" title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200" title="Fullscreen">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-96" ref={chartContainerRef}>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              renderChart()
            )}
          </div>
        </div>

        {/* Order Book and Trade Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Order Book</h3>
            <div className="flex items-center space-x-2">
              <button 
                className={`px-3 py-1 text-xs rounded-full ${showDepth ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'}`}
                onClick={() => setShowDepth(!showDepth)}
              >
                Depth
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Sell Orders */}
          <div className="space-y-1 mb-4">
            {sellOrders.map((order, index) => (
              <div key={index} className="flex justify-between items-center p-1 bg-red-500/10 rounded hover:bg-red-500/20 cursor-pointer">
                <span className="text-red-400 font-mono text-sm">{order.price.toFixed(4)}</span>
                <span className="text-white text-sm">{order.amount}</span>
                <span className="text-gray-400 text-sm">{order.total}</span>
              </div>
            ))}
          </div>
          
          {/* Current Price */}
          <div className="py-2 px-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Last Price</span>
              <span className="text-blue-400 font-bold">${currentPrice.toFixed(6)}</span>
            </div>
          </div>
          
          {/* Buy Orders */}
          <div className="space-y-1 mb-6">
            {buyOrders.map((order, index) => (
              <div key={index} className="flex justify-between items-center p-1 bg-green-500/10 rounded hover:bg-green-500/20 cursor-pointer">
                <span className="text-green-400 font-mono text-sm">{order.price.toFixed(4)}</span>
                <span className="text-white text-sm">{order.amount}</span>
                <span className="text-gray-400 text-sm">{order.total}</span>
              </div>
            ))}
          </div>
          
          {/* Order Form */}
          {showOrderForm && (
            <div className="border border-gray-700/50 rounded-lg p-4">
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 text-center rounded-l-lg ${
                    orderSide === 'buy' 
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-700/50 text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setOrderSide('buy')}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 py-2 text-center rounded-r-lg ${
                    orderSide === 'sell' 
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30' 
                      : 'bg-gray-700/50 text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setOrderSide('sell')}
                >
                  Sell
                </button>
              </div>
              
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-1 text-center text-sm ${
                    orderType === 'limit' 
                      ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </button>
                <button
                  className={`flex-1 py-1 text-center text-sm ${
                    orderType === 'market' 
                      ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setOrderType('market')}
                >
                  Market
                </button>
                <button
                  className={`flex-1 py-1 text-center text-sm ${
                    orderType === 'stop' 
                      ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setOrderType('stop')}
                >
                  Stop
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white"
                      placeholder={currentPrice.toFixed(6)}
                      disabled={orderType === 'market'}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      USDT
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      OPTK
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-white font-medium">{total} USDT</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="py-1 text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
                
                <button
                  className={`w-full py-3 rounded-lg font-semibold ${
                    orderSide === 'buy'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {orderSide === 'buy' ? 'Buy OPTK' : 'Sell OPTK'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trade History */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Time</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Price</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {chartData.slice(-10).reverse().map((trade, index) => {
                const isUp = index === 0 || trade.price >= chartData[chartData.length - 2 - index].price;
                const amount = (Math.random() * 1000 + 100).toFixed(2);
                const total = (trade.price * parseFloat(amount)).toFixed(2);
                
                return (
                  <tr key={index} className="border-t border-gray-700/30 hover:bg-gray-700/20">
                    <td className="px-4 py-3 text-gray-300">{trade.time}</td>
                    <td className={`px-4 py-3 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.price.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 text-white">{amount}</td>
                    <td className="px-4 py-3 text-gray-300">${total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 shadow-lg z-10">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200" title="Zoom Out">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200" title="Zoom In">
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="h-6 border-l border-gray-600"></div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200" title="Move Left">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200" title="Move Right">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="h-6 border-l border-gray-600"></div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200" title="Reset View">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-amber-400 font-medium">Trading Disclaimer</p>
          <p className="text-amber-300/80 text-sm">
            Cryptocurrency trading involves significant risk. Past performance is not indicative of future results.
            Always do your own research before trading.
          </p>
        </div>
      </div>
    </div>
  );
}