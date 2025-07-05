import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paintbrush, Palette, Monitor, Smartphone } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasDesign?: boolean;
}

interface OptikWebDesignerGPTModalProps {
  onClose: () => void;
}

const OptikWebDesignerGPTModal: React.FC<OptikWebDesignerGPTModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🎨 Hello! I\'m OptikWebDesigner GPT, your creative AI for web design and UI/UX optimization. I can help you with design concepts, color schemes, layout optimization, brand development, and responsive design strategies. Ready to create something beautiful? ✨',
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

  const designResponses = [
    {
      content: "🌈 Color palette suggestion: For OptikCoin, I recommend a cyberpunk theme with primary cyan (#06B6D4), secondary purple (#8B5CF6), accent orange (#FB923C), and dark backgrounds (#0F172A). This creates a futuristic, trustworthy feel perfect for DeFi.",
      hasDesign: true
    },
    {
      content: "📱 Mobile-first approach: Your current layout needs optimization for mobile. Consider stacking cards vertically, increasing touch targets to 44px minimum, and reducing text size for better readability on small screens.",
      hasDesign: true
    },
    {
      content: "✨ UI enhancement: Add subtle hover animations with 0.3s transitions, implement glassmorphism with backdrop-blur-lg, and use gradient borders for interactive elements. This will create a premium, modern feel.",
      hasDesign: false
    },
    {
      content: "🎯 Brand identity: Your logo should incorporate geometric shapes representing blockchain connections. Consider a hexagonal or crystalline design in your brand colors with subtle glow effects to convey innovation.",
      hasDesign: true
    },
    {
      content: "📐 Layout optimization: Implement a 12-column grid system with 8px spacing increments. Use the golden ratio (1.618) for component proportions and ensure visual hierarchy with proper typography scale (1.2-1.5 ratio).",
      hasDesign: false
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

    // Simulate AI response with design-specific content
    setTimeout(() => {
      const response = designResponses[Math.floor(Math.random() * designResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        hasDesign: response.hasDesign
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const designPrompts = [
    "Create a color palette",
    "Optimize mobile layout",
    "Brand identity suggestions",
    "UI/UX improvements"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-pink-500/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center">
              <Paintbrush className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">OptikWebDesigner GPT</h3>
              <p className="text-gray-400 text-sm">Creative Design Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Design Prompts */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {designPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="px-3 py-1 bg-pink-500/20 text-pink-400 text-sm rounded-full border border-pink-500/30 hover:bg-pink-500/30 transition-colors"
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
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                    : 'bg-gray-700/50 text-white border border-gray-600/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.hasDesign && message.type === 'assistant' && (
                  <div className="mt-3 p-3 bg-black/30 rounded-lg border border-pink-500/30">
                    <div className="mb-2 text-pink-400 text-xs font-medium">Design Preview</div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="h-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded"></div>
                      <div className="h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded"></div>
                      <div className="h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded"></div>
                      <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Monitor className="w-3 h-3" />
                        <span>Desktop</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Palette className="w-3 h-3" />
                        <span>Colors</span>
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
                    <Paintbrush className="w-4 h-4 text-pink-400 animate-pulse" />
                    <Palette className="w-4 h-4 text-pink-400 animate-bounce" />
                  </div>
                  <span className="text-sm text-gray-400">Creating design concepts...</span>
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
                placeholder="Ask about design concepts, color schemes, layouts, branding, or UI/UX optimization..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptikWebDesignerGPTModal;