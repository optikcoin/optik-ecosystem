import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Globe, Coins, TrendingUp, Layers } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasMetrics?: boolean;
}

interface OptikDeFiGPTModalProps {
  onClose: () => void;
}

const OptikDeFiGPTModal: React.FC<OptikDeFiGPTModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🌐 Welcome to OptikDeFi GPT! I\'m your specialized assistant for all things DeFi. I can help you with yield farming strategies, liquidity provision, protocol analysis, and DeFi education. Let\'s explore the decentralized finance ecosystem together! What would you like to learn about?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const defiResponses = [
    {
      content: "💰 Yield farming opportunity: The OPTIK-ETH pool on UniswapV3 is currently offering 24.5% APY. With current TVL at $2.1M, this presents a good risk-reward ratio. Consider providing liquidity in the $2.40-$2.60 range.",
      hasMetrics: true
    },
    {
      content: "🔄 Liquidity strategy: For maximum efficiency, split your capital across 3 protocols - 40% in stable pools (8-12% APY), 35% in blue-chip pairs (15-20% APY), and 25% in new opportunities (20-30% APY).",
      hasMetrics: true
    },
    {
      content: "📊 Protocol analysis: Compound V3 has improved capital efficiency by 40% compared to V2. The isolated pool design reduces systemic risk while maintaining competitive yields. Great for conservative DeFi strategies.",
      hasMetrics: false
    },
    {
      content: "⚡ Impermanent loss calculator: For the OPTIK-USDT pair, if OPTIK moves 20% in either direction, you'd experience approximately 2.02% impermanent loss. The current farming rewards at 18% APY offset this risk.",
      hasMetrics: true
    },
    {
      content: "🎯 DeFi education: Layer 2 solutions like Arbitrum and Optimism have reduced transaction costs by 90-95% while maintaining Ethereum security. Perfect for smaller DeFi positions and frequent rebalancing.",
      hasMetrics: false
    }
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with DeFi-specific content
    setTimeout(() => {
      const response = defiResponses[Math.floor(Math.random() * defiResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        hasMetrics: response.hasMetrics
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const defiQueries = [
    "Best yield farming strategies",
    "Analyze liquidity pools",
    "Impermanent loss calculator",
    "DeFi protocol comparison"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-purple-500/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">OptikDeFi GPT</h3>
              <p className="text-gray-400 text-sm">DeFi Strategy Specialist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DeFi Queries */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {defiQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => setInput(query)}
                className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'bg-gray-700/50 text-white border border-gray-600/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.hasMetrics && message.type === 'assistant' && (
                  <div className="mt-3 p-3 bg-black/30 rounded-lg border border-purple-500/30">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-300">APY: 24.5%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Coins className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-300">TVL: $2.1M</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Layers className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-300">Risk: Medium</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-300">Chain: Ethereum</span>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 text-white border border-gray-600/50 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <Globe className="w-4 h-4 text-purple-400 animate-spin" />
                    <Coins className="w-4 h-4 text-purple-400 animate-pulse" />
                  </div>
                  <span className="text-sm text-gray-400">Analyzing DeFi protocols...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about yield farming, liquidity strategies, protocol analysis, or DeFi education..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptikDeFiGPTModal;