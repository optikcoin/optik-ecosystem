import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Zap, Shield, TrendingUp, Coins, Settings, Trash2, Download, Copy, RefreshCw } from 'lucide-react';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  botType?: string;
  tokens?: number;
  cost?: number;
}

const OPTIK_BOTS = {
  general: {
    name: 'OptikGeneral GPT',
    role: 'General AI Assistant',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    specialFeatures: ['General Knowledge', 'Research', 'Writing', 'Analysis']
  },
  trading: {
    name: 'OptikTrading GPT',
    role: 'Crypto Trading Specialist',
    model: 'gpt-4',
    temperature: 0.3,
    maxTokens: 2000,
    specialFeatures: ['Market Analysis', 'Trading Signals', 'Risk Assessment', 'Portfolio Optimization']
  },
  security: {
    name: 'OptikSecure GPT',
    role: 'Security & Audit Specialist',
    model: 'gpt-4',
    temperature: 0.2,
    maxTokens: 2000,
    specialFeatures: ['Security Audits', 'Vulnerability Detection', 'Smart Contract Review', 'Risk Analysis']
  },
  meme: {
    name: 'OptikMeme GPT',
    role: 'Viral Content Creator',
    model: 'gpt-4',
    temperature: 0.9,
    maxTokens: 2000,
    specialFeatures: ['Meme Generation', 'Social Content', 'Viral Strategies', 'Community Building']
  },
  defi: {
    name: 'OptikDeFi GPT',
    role: 'DeFi Strategy Specialist',
    model: 'gpt-4',
    temperature: 0.4,
    maxTokens: 2000,
    specialFeatures: ['Yield Optimization', 'Protocol Analysis', 'Liquidity Strategies', 'DeFi Education']
  }
};

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedBot, setSelectedBot] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(`chat-${Date.now()}`);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your ${OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name}. ${OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].role} at your service! How can I help you today? 🚀`,
      timestamp: new Date(),
      botType: selectedBot
    };
    setMessages([welcomeMessage]);
  }, [selectedBot]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      botType: selectedBot
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponses = [
        "I understand your question. Let me provide you with a comprehensive analysis based on the latest information available.",
        "That's an interesting topic! Here's what I know about it and some additional insights that might be helpful.",
        "Great question! I'll break this down into key points to make it easier to understand.",
        "Based on current data and research, here's my analysis of the situation you've described.",
        "I can help you with that. Let me provide some detailed information and recommendations."
      ];

      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
        botType: selectedBot,
        tokens: Math.floor(Math.random() * 500) + 100,
        cost: Math.random() * 0.05 + 0.01
      };

      setMessages(prev => [...prev, response]);
      
      // Update usage stats
      if (response.cost) setTotalCost(prev => prev + response.cost!);
      if (response.tokens) setTotalTokens(prev => prev + response.tokens!);

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again. 🔧',
        timestamp: new Date(),
        botType: selectedBot
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setTotalCost(0);
    setTotalTokens(0);
  };

  const exportChat = () => {
    const chatData = {
      bot: OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name,
      timestamp: new Date().toISOString(),
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp
      }))
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optik-chat-${selectedBot}-${Date.now()}.json`;
    a.click();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getBotIcon = (botType: string) => {
    switch (botType) {
      case 'trading': return TrendingUp;
      case 'security': return Shield;
      case 'meme': return Sparkles;
      case 'defi': return Coins;
      default: return Bot;
    }
  };

  const getBotColor = (botType: string) => {
    switch (botType) {
      case 'trading': return 'text-green-400 bg-green-600/20';
      case 'security': return 'text-red-400 bg-red-600/20';
      case 'meme': return 'text-purple-400 bg-purple-600/20';
      case 'defi': return 'text-blue-400 bg-blue-600/20';
      default: return 'text-cyan-400 bg-cyan-600/20';
    }
  };

  const suggestedPrompts = {
    general: [
      "Explain how OptikCoin works",
      "What are the benefits of OPTK tokens?",
      "How do I get started with crypto?",
      "What is DeFi and why should I care?"
    ],
    trading: [
      "Analyze current market trends",
      "What's a good risk management strategy?",
      "How do I read trading charts?",
      "Explain technical indicators"
    ],
    security: [
      "How do I secure my crypto wallet?",
      "What are common crypto scams?",
      "Is this smart contract safe?",
      "Best practices for DeFi safety"
    ],
    meme: [
      "Generate viral meme coin ideas",
      "How to build a strong community?",
      "What makes a meme coin successful?",
      "Create a marketing strategy"
    ],
    defi: [
      "Best yield farming strategies",
      "Explain impermanent loss",
      "How to evaluate DeFi protocols",
      "Optimize my DeFi portfolio"
    ]
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Chat Assistant
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Chat with specialized AI assistants for trading, security, memes, and more.
          </p>
          
          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/gpt" variant="primary" size="lg">
              All AI Models
            </CTAButton>
            <CTAButton to="/analytics" variant="outline" size="lg">
              AI Analytics
            </CTAButton>
          </div>
        </div>

        {/* API Key Warning */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-amber-400 font-medium">Demo Mode</p>
              <p className="text-amber-300/80 text-sm">
                This is a demo version. Connect your OpenAI API key for full functionality.
              </p>
            </div>
          </div>
        </div>

        {/* Bot Selection */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Choose Your OPTIK AI Assistant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(OPTIK_BOTS).map(([key, bot]) => {
              const Icon = getBotIcon(key);
              const isSelected = selectedBot === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBot(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? `${getBotColor(key)} border-current`
                      : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${isSelected ? '' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-sm mb-1">{bot.name}</h3>
                  <p className="text-xs opacity-80">{bot.role}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {bot.specialFeatures.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-black/20 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gray-700/30 p-4 border-b border-gray-600/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getBotColor(selectedBot)}`}>
                {React.createElement(getBotIcon(selectedBot), { className: "w-5 h-5" })}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name}</h3>
                <p className="text-gray-400 text-sm">{OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right text-sm">
                <p className="text-gray-400">Tokens: {totalTokens.toLocaleString()}</p>
                <p className="text-gray-400">Cost: ${totalCost.toFixed(4)}</p>
              </div>
              <CTAButton
                onClick={exportChat}
                variant="outline"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                className="!p-2"
              >
                <span className="sr-only">Export</span>
              </CTAButton>
              <CTAButton
                onClick={clearChat}
                variant="outline"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                className="!p-2"
              >
                <span className="sr-only">Clear</span>
              </CTAButton>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/30'
                    : `${getBotColor(message.botType || selectedBot)} border border-current/30`
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-blue-400" />
                  ) : (
                    React.createElement(getBotIcon(message.botType || selectedBot), { className: "w-4 h-4" })
                  )}
                </div>
                
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl max-w-xs lg:max-w-2xl relative group ${
                    message.role === 'user'
                      ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30'
                      : 'bg-gray-700/50 text-gray-100 border border-gray-600/30'
                  }`}>
                    <div className="prose prose-sm prose-invert max-w-none">
                      {message.content.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                    
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-gray-600/50 hover:bg-gray-500/50 rounded transition-all duration-200"
                        title="Copy message"
                      >
                        <Copy className="w-3 h-3 text-gray-300" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.tokens && (
                      <span>{message.tokens} tokens • ${message.cost?.toFixed(4)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getBotColor(selectedBot)} border border-current/30`}>
                  {React.createElement(getBotIcon(selectedBot), { className: "w-4 h-4" })}
                </div>
                <div className="bg-gray-700/50 text-gray-100 border border-gray-600/30 p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-4 border-t border-gray-600/30 bg-gray-700/20">
            <p className="text-gray-400 text-sm mb-3">Suggested prompts for {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name}:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedPrompts[selectedBot as keyof typeof suggestedPrompts]?.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(prompt)}
                  className="px-3 py-1 bg-gray-600/30 hover:bg-gray-500/50 text-gray-300 hover:text-white rounded-full text-sm border border-gray-500/30 transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                placeholder={`Ask ${OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name} anything...`}
                className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                disabled={isLoading}
              />
              <CTAButton
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                variant="primary"
                size="md"
                icon={isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                className="!p-3"
              >
                <span className="sr-only">Send</span>
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Bot Features */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].name} Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-cyan-400 font-medium mb-2">Specialized Capabilities</h4>
              <ul className="space-y-1">
                {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].specialFeatures.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-center">
                    <Zap className="w-3 h-3 text-cyan-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-medium mb-2">Model Information</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Model: {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].model}</p>
                <p>Temperature: {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].temperature}</p>
                <p>Max Tokens: {OPTIK_BOTS[selectedBot as keyof typeof OPTIK_BOTS].maxTokens.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}