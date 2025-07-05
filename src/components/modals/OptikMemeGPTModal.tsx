import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile, Image, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasImage?: boolean;
}

interface OptikMemeGPTModalProps {
  onClose: () => void;
}

const OptikMemeGPTModal: React.FC<OptikMemeGPTModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hey there! 😄 I\'m OptikMeme GPT, your creative AI for viral content! I can help you create memes, craft social media posts, develop viral strategies, and build community engagement. Ready to make some magic? 🚀',
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

  const memeResponses = [
    "🔥 Here's a viral meme idea: 'When you buy the dip but it keeps dipping' with the classic Drake pointing meme format! Perfect for crypto Twitter! 📈",
    "💡 Trending meme concept: 'POV: You're explaining DeFi to your parents' - we could use the confused math lady meme or the this is fine dog! 😂",
    "🚀 Social strategy: Create a series of 'OptikCoin vs Traditional Banking' memes using the Chad vs Virgin format. This will resonate with the crypto community! 💪",
    "✨ Viral content idea: Turn the 'Distracted Boyfriend' meme into 'Me looking at OptikCoin while holding other cryptos' - instant engagement! 💎",
    "🎯 Community building tip: Start a weekly 'Meme Monday' contest where users create OptikCoin memes for rewards. This drives organic engagement! 🏆"
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

    // Simulate AI response with meme-specific content
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: memeResponses[Math.floor(Math.random() * memeResponses.length)],
        timestamp: new Date(),
        hasImage: Math.random() > 0.5
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Create a viral OptikCoin meme",
    "Social media strategy",
    "Trending meme formats",
    "Community engagement ideas"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-yellow-500/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
              <Smile className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">OptikMeme GPT</h3>
              <p className="text-gray-400 text-sm">Viral Content Creator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
              >
                {prompt}
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
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                    : 'bg-gray-700/50 text-white border border-gray-600/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.hasImage && message.type === 'assistant' && (
                  <div className="mt-3 p-3 bg-black/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Image className="w-4 h-4" />
                      <span className="text-xs">Meme template generated</span>
                    </div>
                    <div className="mt-2 w-full h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-yellow-400 text-xs">Meme Preview</p>
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
                    <Smile className="w-4 h-4 text-yellow-400 animate-bounce" />
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </div>
                  <span className="text-sm text-gray-400">Creating viral content...</span>
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
                placeholder="Let's create some viral content! Ask me about memes, social strategies, or community engagement..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptikMemeGPTModal;