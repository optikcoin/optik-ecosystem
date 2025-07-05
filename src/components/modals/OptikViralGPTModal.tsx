import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Zap, TrendingUp, Users, Target } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasMetrics?: boolean;
}

interface OptikViralGPTModalProps {
  onClose: () => void;
}

const OptikViralGPTModal: React.FC<OptikViralGPTModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '⚡ Hey there! I\'m OptikViral GPT, your marketing powerhouse for viral content creation! I specialize in social media optimization, engagement strategies, viral campaigns, and community growth. Ready to make OptikCoin go viral? Let\'s create some buzz! 🚀',
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

  const viralResponses = [
    {
      content: "🔥 Viral campaign idea: Launch #OptikToTheMoon challenge on TikTok! Users create 15-second videos showing their crypto portfolio growth. Estimated reach: 2.5M impressions, 15% engagement rate. Best posting time: 7-9 PM EST.",
      hasMetrics: true
    },
    {
      content: "📱 Twitter strategy: Thread series 'DeFi Explained in 5 Tweets' posted Tuesdays 2 PM EST. Each thread should include: hook tweet, problem, solution, OptikCoin benefits, call-to-action. Expected: 500+ retweets per thread.",
      hasMetrics: true
    },
    {
      content: "💡 Influencer partnership: Collaborate with crypto YouTubers (50K-200K subs). Provide exclusive access to OptikGPT beta. ROI: 25:1 based on conversion rates. Focus on educational content rather than pure shilling.",
      hasMetrics: false
    },
    {
      content: "🎯 Reddit marketing: Create valuable posts in r/CryptoCurrency, r/DeFi, r/ethtrader. Share technical analysis, not promotional content. Aim for 1000+ upvotes. Best times: Weekdays 8-10 AM EST.",
      hasMetrics: true
    },
    {
      content: "🌟 Community event: Host weekly 'OptikCoin Office Hours' on Twitter Spaces. Discuss market trends, answer questions, showcase new features. Typical attendance: 500-1500 listeners, 20% convert to followers.",
      hasMetrics: true
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

    // Simulate AI response with viral marketing content
    setTimeout(() => {
      const response = viralResponses[Math.floor(Math.random() * viralResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        hasMetrics: response.hasMetrics
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const viralStrategies = [
    "Create viral campaign",
    "Social media strategy",
    "Influencer partnerships",
    "Community growth tactics"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-cyan-500/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">OptikViral GPT</h3>
              <p className="text-gray-400 text-sm">Viral Marketing Specialist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viral Strategies */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {viralStrategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => setInput(strategy)}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
              >
                {strategy}
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
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-gray-700/50 text-white border border-gray-600/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.hasMetrics && message.type === 'assistant' && (
                  <div className="mt-3 p-3 bg-black/30 rounded-lg border border-cyan-500/30">
                    <div className="mb-2 text-cyan-400 text-xs font-medium">Campaign Metrics</div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-cyan-400" />
                        <span className="text-gray-300">Reach: 2.5M</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-cyan-400" />
                        <span className="text-gray-300">Engagement: 15%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3 text-cyan-400" />
                        <span className="text-gray-300">Conversion: 3.2%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span className="text-gray-300">ROI: 25:1</span>
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
                    <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <TrendingUp className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>
                  <span className="text-sm text-gray-400">Crafting viral strategy...</span>
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
                placeholder="Ask about viral campaigns, social media strategies, influencer partnerships, or growth tactics..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptikViralGPTModal;