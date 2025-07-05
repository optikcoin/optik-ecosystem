import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, 
  Activity, Eye, ChevronDown, BarChart2, CandlestickChart,
  RefreshCw, Maximize, Minimize, Settings, AlertCircle
} from 'lucide-react';

type ChartDatum = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function TradingChart() {
  const [selectedToken, setSelectedToken] = useState('OPTK/SOL');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('candle');
  const [chartData, setChartData] = useState<ChartDatum[]>([]);
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
  const chartContainerRef = useRef(null);

  // Extract base and quote currency from selectedToken
  const [baseCurrency, quoteCurrency] = selectedToken.split('/');

  const tokens = React.useMemo(() => [
    { pair: 'OPTK/SOL', name: 'OptikCoin', price: 0.0245, change: 5.67, volume: '$2.4M', positive: true },
    { pair: 'OPTK/USDT', name: 'OptikCoin', price: 0.0892, change: 5.67, volume: '$2.1M', positive: true },
    { pair: 'ETH/USDT', name: 'Ethereum', price: 2222.64, change: -0.23, volume: '$24.01B', positive: false },
    { pair: 'BTC/USDT', name: 'Bitcoin', price: 100697.60, change: -0.24, volume: '$29.28B', positive: false },
  ], []);

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

  // Generate sample trading data when token or timeframe changes
  useEffect(() => {
    const generateData = () => {
      const data = [];
      const basePrice = tokens.find(t => t.pair === selectedToken)?.price || 0.0245;
      let currentPrice = basePrice;

      for (let i = 0; i < 100; i++) {
        const priceChange = (Math.random() - 0.5) * 0.002;
        currentPrice += priceChange;

        const open = currentPrice;
        const close = currentPrice + (Math.random() - 0.5) * 0.001;
        const high = Math.max(open, close) + Math.random() * 0.0005;
        const low = Math.min(open, close) - Math.random() * 0.0005;
        const volume = Math.random() * 1000000;

        data.push({
          time: new Date(Date.now() - (99 - i) * 60000).toISOString(),
          open: parseFloat(open.toFixed(6)),
          high: parseFloat(high.toFixed(6)),
          low: parseFloat(low.toFixed(6)),
          close: parseFloat(close.toFixed(6)),
          volume: Math.floor(volume),
        });
      }
      return data;
    };

    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateData());
      setIsLoading(false);
    }, 800);
  }, [selectedToken, timeframe, tokens]);

  // Calculate total when price or amount changes
  useEffect(() => {
    const priceNum = parseFloat(price) || 0;
    const amountNum = parseFloat(amount) || 0;
    setTotal((priceNum * amountNum).toFixed(6));
  }, [price, amount]);

  const currentToken = tokens.find(t => t.pair === selectedToken);
  const latestPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : currentToken?.price || 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-2">{new Date(label).toLocaleString()}</p>
          <div className="space-y-1">
            <p className="text-green-400">O: {data.open?.toFixed(6)}</p>
            <p className="text-blue-400">H: {data.high?.toFixed(6)}</p>
            <p className="text-red-400">L: {data.low?.toFixed(6)}</p>
            <p className="text-white">C: {data.close?.toFixed(6)}</p>
            <p className="text-purple-400">Vol: {data.volume?.toLocaleString()}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center space-x-2 text-gray-400">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading chart data...</span>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#10B981" 
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Bar dataKey="volume" fill="#8B5CF6" />
          </BarChart>
        );
      
      default: // candlestick simulation with bars
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Bar 
              dataKey="close" 
              fill="#10B981"
            />
          </BarChart>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold">OptikTrade Pro</h1>
            </div>
            
            {/* Token Selector */}
            <div className="relative">
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="" disabled>Select Token Pair</option>
                {tokens.map(token => (
                  <option key={token.pair} value={token.pair}>
                    {token.pair} - ${token.price.toFixed(4)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Current Price Display */}
            {currentToken && (
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold">
                  ${latestPrice.toFixed(6)}
                </div>
                <div className={`flex items-center space-x-1 ${currentToken.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {currentToken.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{currentToken.positive ? '+' : ''}{currentToken.change}%</span>
                </div>
                <div className="text-gray-400 text-sm">
                  Vol: {currentToken.volume}
                </div>
              </div>
            )}
          </div>

          {/* Chart Controls */}
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    timeframe === tf 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              {chartTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id)}
                    className={`p-2 rounded transition-colors ${
                      chartType === type.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    title={type.name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            {/* Additional Controls */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowIndicators(!showIndicators)}
                className={`p-2 rounded-lg transition-colors ${
                  showIndicators ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                title="Technical Indicators"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors" title="Fullscreen">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Chart Area */}
        <div className="flex-1 flex flex-col">
          {/* Chart */}
          <div className="flex-1 p-4" ref={chartContainerRef}>
            <div className="h-full bg-gray-900/30 rounded-lg border border-gray-800">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Chart */}
          {selectedIndicators.includes('Volume') && (
            <div className="h-32 p-4 pt-0">
              <div className="h-full bg-gray-900/30 rounded-lg border border-gray-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF"
                      fontSize={10}
                      tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={10}
                      tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'}
                    />
                    <Tooltip 
                      formatter={(value) => [value.toLocaleString(), 'Volume']}
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="volume" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Trading Panel */}
        {showOrderForm && (
          <div className="w-80 border-l border-gray-800 bg-gray-900/50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Trade {selectedToken}</h3>
                <button 
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <Minimize className="w-4 h-4" />
                </button>
              </div>

              {/* Order Type Tabs */}
              <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${
                    orderType === 'limit' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${
                    orderType === 'market' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Market
                </button>
              </div>

              {/* Buy/Sell Tabs */}
              <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setOrderSide('buy')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${
                    orderSide === 'buy' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderSide('sell')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${
                    orderSide === 'sell' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Order Form */}
              <div className="space-y-4">
                {orderType === 'limit' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={latestPrice.toFixed(6)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        {quoteCurrency}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      {baseCurrency}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Total</label>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-300">
                    {total} {quoteCurrency}
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {['25%', '50%', '75%', '100%'].map(percent => (
                    <button
                      key={percent}
                      className="py-1 px-2 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
                      onClick={() => {
                        // This would calculate based on available balance
                        const mockBalance = 1000;
                        const percentage = parseInt(percent) / 100;
                        setAmount((mockBalance * percentage).toString());
                      }}
                    >
                      {percent}
                    </button>
                  ))}
                </div>

                {/* Place Order Button */}
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    orderSide === 'buy'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {orderSide === 'buy' ? 'Buy' : 'Sell'} OPTK
                </button>
              </div>

              {/* Account Balance */}
              <div className="mt-6 p-3 bg-gray-800/50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Available Balance</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">OPTK:</span>
                    <span>1,234.56</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SOL:</span>
                    <span>45.78</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Depth Panel */}
        {showDepth && (
          <div className="w-64 border-l border-gray-800 bg-gray-900/50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Order Book</h3>
                <button 
                  onClick={() => setShowDepth(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Order Book */}
              <div className="space-y-2">
                {/* Asks */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Asks</div>
                  <div className="space-y-1">
                    {Array.from({ length: 8 }, (_, i) => {
                      const price = latestPrice + (i + 1) * 0.0001;
                      const size = Math.random() * 1000;
                      return (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-red-400">{price.toFixed(6)}</span>
                          <span className="text-gray-300">{size.toFixed(0)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Spread */}
                <div className="py-2 border-y border-gray-700">
                  <div className="text-center text-xs text-gray-400">
                    Spread: 0.000012
                  </div>
                </div>

                {/* Bids */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Bids</div>
                  <div className="space-y-1">
                    {Array.from({ length: 8 }, (_, i) => {
                      const price = latestPrice - (i + 1) * 0.0001;
                      const size = Math.random() * 1000;
                      return (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-green-400">{price.toFixed(6)}</span>
                          <span className="text-gray-300">{size.toFixed(0)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Indicators Panel */}
      {showIndicators && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Technical Indicators</h3>
              <button 
                onClick={() => setShowIndicators(false)}
                className="text-gray-400 hover:text-white"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {indicators.map(indicator => (
                <label key={indicator.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedIndicators.includes(indicator.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIndicators([...selectedIndicators, indicator.id]);
                      } else {
                        setSelectedIndicators(selectedIndicators.filter(id => id !== indicator.id));
                      }
                    }}
                    className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{indicator.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowIndicators(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowIndicators(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
