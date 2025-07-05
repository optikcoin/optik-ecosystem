import { useState, useEffect, useRef } from 'react';
import { optikAI, OPTIK_BOTS, ChatMessage } from '../services/openai';

export default function OptikGPTSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedBot, setSelectedBot] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(`sidebar-chat-${Date.now()}`);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const [unlockedBots, setUnlockedBots] = useState<string[]>(['general']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial welcome message when bot changes
    const welcomeMessage: ChatMessage = {
      id: `welcome-${selectedBot}`,
      role: 'assistant',
      content: `Hello! I'm ${OPTIK_BOTS[selectedBot].name}. ${OPTIK_BOTS[selectedBot].role} at your service! How can I help you today? 🚀`,
      timestamp: new Date(),
      botType: selectedBot
    };
    setMessages([welcomeMessage]);
  }, [selectedBot]);

  // Load unlocked bots from localStorage
  useEffect(() => {
    const savedUnlockedBots = localStorage.getItem('unlockedBots');
    if (savedUnlockedBots) {
      try {
        const parsedBots = JSON.parse(savedUnlockedBots);
        if (Array.isArray(parsedBots)) {
          setUnlockedBots(parsedBots);
        }
      } catch (error) {
        console.error('Error parsing unlocked bots:', error);
      }
    }
  }, []);

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
      const userContext = {
        walletConnected: true,
        currentPage: 'OptikDexGPT Platform',
        subscriptionTier: 'Pro Creator'
      };

      const response = await optikAI.chat(
        inputMessage,
        selectedBot,
        conversationId,
        userContext
      );

      setMessages(prev => [...prev, response]);
      
      if (response.cost) setTotalCost(prev => prev + response.cost);
      if (response.tokens) setTotalTokens(prev => prev + response.tokens);

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please check your OpenAI API key and try again. 🔧',
        timestamp: new Date(),
        botType: selectedBot
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    optikAI.clearConversation(conversationId);
    setMessages([]);
    setTotalCost(0);
    setTotalTokens(0);
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: `welcome-${selectedBot}-${Date.now()}`,
      role: 'assistant',
      content: `Hello! I'm ${OPTIK_BOTS[selectedBot].name}. ${OPTIK_BOTS[selectedBot].role} at your service! How can I help you today? 🚀`,
      timestamp: new Date(),
      botType: selectedBot
    };
    setMessages([welcomeMessage]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportChat = () => {
    const chatData = {
      bot: OPTIK_BOTS[selectedBot].name,
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
    a.download = `optikgpt-chat-${selectedBot}-${Date.now()}.json`;
    a.click();
  };

  const getBotIcon = (botType: string) => {
    switch (botType) {
      case 'trading': return '📈';
      case 'security': return '🛡️';
      case 'meme': return '🚀';
      case 'defi': return '💎';
      default: return '🤖';
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

  const quickPrompts = {
    general: [
      "What is OptikCoin?",
      "How do I get started?",
      "Explain DeFi basics",
      "Show me trading tips"
    ],
    trading: [
      "Analyze current market",
      "Risk management tips",
      "Technical indicators",
      "Portfolio strategy"
    ],
    security: [
      "Wallet security tips",
      "Detect scam tokens",
      "Smart contract risks",
      "Best practices"
    ],
    meme: [
      "Viral token ideas",
      "Marketing strategies",
      "Community building",
      "Launch planning"
    ],
    defi: [
      "Yield farming guide",
      "Liquidity strategies",
      "Protocol comparison",
      "Risk assessment"
    ]
  };

  const isBotLocked = (botType: string) => {
    return botType !== 'general' && !unlockedBots.includes(botType);
  };

  const handleBotSelection = (botType: string) => {
    if (isBotLocked(botType)) {
      setShowPaymentModal(true);
    } else {
      setSelectedBot(botType);
    }
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => someFunction(), 1000);
      setPaymentStatus('success');
      
      // Add the bot to unlocked bots
      const newUnlockedBots = [...unlockedBots, selectedBot];
      setUnlockedBots(newUnlockedBots);
      
      // Save to localStorage
      localStorage.setItem('unlockedBots', JSON.stringify(newUnlockedBots));
      
      // Close modal after a delay
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStatus('pending');
      }, 2000);
  };

  const handlePaymentError = () => {
    setPaymentStatus('error');
    setTimeout(() => {
      setPaymentStatus('pending');
    }, 3000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <MessageSquare className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          AI
        </div>
        <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          OptikGPT Assistant
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed left-6 z-50 transition-all duration-300 ${
      isMinimized ? 'bottom-6' : 'bottom-6 top-6'
    }`}>
      <div className={`bg-gray-900/95 backdrop-blur-md border border-cyan-700/30 rounded-xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[calc(100vh-3rem)]'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-700/30">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getBotColor(selectedBot)}`}>
              <span className="text-lg">{getBotIcon(selectedBot)}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">OptikGPT</h3>
              <p className="text-cyan-400 text-xs">{OPTIK_BOTS[selectedBot].name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4 text-gray-400" /> : <Minimize2 className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Bot Selector */}
            <div className="p-3 border-b border-cyan-700/30">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(OPTIK_BOTS).map(([key, bot]) => {
                  const isLocked = isBotLocked(key);
                  const isSelected = selectedBot === key;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleBotSelection(key)}
                      className={`p-2 rounded-lg text-left transition-all duration-200 relative ${
                        isSelected
                          ? `${getBotColor(key)} border border-current/30`
                          : 'bg-gray-800/50 border border-gray-600/50 hover:border-gray-500/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getBotIcon(key)}</span>
                        <div>
                          <p className={`text-xs font-medium ${isSelected ? '' : 'text-gray-300'}`}>
                            {bot.name.split(' ').slice(-1)[0]}
                          </p>
                          {isLocked && (
                            <div className="flex items-center space-x-1">
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span className="text-amber-400 text-xs">$19.99</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : `${getBotColor(message.botType)} border border-current/30`
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-3 h-3 text-blue-400" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-xl max-w-xs relative group ${
                      message.role === 'user'
                        ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30'
                        : 'bg-gray-800/50 text-gray-100 border border-gray-600/30'
                    }`}>
                      <div className="text-sm leading-relaxed">
                        {message.content.split('\n').map((line, idx) => (
                          <p key={idx} className="mb-1 last:mb-0">{line}</p>
                        ))}
                      </div>
                      
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 bg-gray-600/50 hover:bg-gray-500/50 rounded transition-all duration-200"
                          title="Copy message"
                        >
                          <Copy className="w-3 h-3 text-gray-300" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.tokens && (
                        <span>{message.tokens} tokens</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-2">
                  <div className={`p-1.5 rounded-lg ${getBotColor(selectedBot)} border border-current/30`}>
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-gray-800/50 text-gray-100 border border-gray-600/30 p-3 rounded-xl">
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

            {/* Quick Prompts */}
            <div className="p-3 border-t border-cyan-700/30">
              <div className="flex flex-wrap gap-1 mb-3">
                {quickPrompts[selectedBot as keyof typeof quickPrompts]?.slice(0, 2).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputMessage(prompt)}
                    className="px-2 py-1 bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded text-xs border border-gray-600/30 transition-all duration-200"
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
                  placeholder={`Ask ${OPTIK_BOTS[selectedBot].name}...`}
                  className="flex-1 bg-gray-800/50 border border-gray-600/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                  disabled={isLoading || !import.meta.env.VITE_OPENAI_API_KEY}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim() || !import.meta.env.VITE_OPENAI_API_KEY}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all duration-200"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-cyan-700/30 bg-gray-800/30">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-3">
                  <span>Tokens: {totalTokens.toLocaleString()}</span>
                  <span>Cost: ${totalCost.toFixed(4)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportChat}
                    className="p-1 hover:bg-gray-600/50 rounded transition-all duration-200"
                    title="Export Chat"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <button
                    onClick={clearChat}
                    className="p-1 hover:bg-gray-600/50 rounded transition-all duration-200"
                    title="Clear Chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-400 text-sm">OptikGPT</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-400">
              {messages.length} messages
            </div>
          </div>
        )}
      </div>

      {/* API Key Warning */}
      {!import.meta.env.VITE_OPENAI_API_KEY && !isMinimized && (
        <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-amber-400 font-medium text-xs">API Key Required</p>
              <p className="text-amber-300/80 text-xs">
                Add OpenAI API key to enable AI features
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-purple-600/20 p-4 rounded-full inline-flex mb-4">
                <Lock className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Unlock {OPTIK_BOTS[selectedBot].name}</h2>
              <p className="text-gray-400">Get access to advanced AI capabilities for your crypto journey</p>
            </div>

            {paymentStatus === 'pending' && (
              <>
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-white font-medium">{OPTIK_BOTS[selectedBot].name}</p>
                      <p className="text-gray-400 text-sm">{OPTIK_BOTS[selectedBot].role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-400">$19.99</p>
                      <p className="text-purple-300/80 text-xs">one-time purchase</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">Unlimited access to {OPTIK_BOTS[selectedBot].name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">Advanced {selectedBot} insights</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">Powered by GPT-4 technology</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">Lifetime access</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Purchase for $19.99</span>
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePaymentError()}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Restore Purchases
                  </button>
                </div>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
                <p className="text-gray-400">Please wait while we process your payment...</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <div className="bg-green-600/20 p-6 rounded-full inline-flex mb-6">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400 mb-4">
                  You now have access to {OPTIK_BOTS[selectedBot].name}!
                </p>
                <p className="text-green-400 text-sm">
                  Unlocking your new AI assistant...
                </p>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="text-center py-8">
                <div className="bg-red-600/20 p-6 rounded-full inline-flex mb-6">
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payment Failed</h3>
                <p className="text-gray-400 mb-6">There was an issue processing your payment. Please try again.</p>
                <button
                  onClick={() => setPaymentStatus('pending')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}