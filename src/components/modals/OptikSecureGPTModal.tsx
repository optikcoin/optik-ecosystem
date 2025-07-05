import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high';
}

interface OptikSecureGPTModalProps {
  onClose: () => void;
}

const OptikSecureGPTModal: React.FC<OptikSecureGPTModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🔒 Welcome to OptikSecure GPT! I\'m your dedicated security specialist. I can help you with vulnerability assessments, smart contract audits, security best practices, and risk analysis. Your security is my priority. How can I help protect your assets today?',
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

  const securityResponses = [
    {
      content: "🛡️ Security audit complete: I've identified 3 potential vulnerabilities in your smart contract. The most critical is a reentrancy risk in the withdrawal function. I recommend implementing the checks-effects-interactions pattern.",
      severity: 'high' as const
    },
    {
      content: "✅ Your wallet setup looks secure! You're using hardware wallet integration and proper key management. Consider enabling transaction confirmations for amounts above $1000.",
      severity: 'low' as const
    },
    {
      content: "⚠️ Medium risk detected: Your DeFi interactions show exposure to experimental protocols. Consider diversifying across more established platforms and limiting exposure to <10% of portfolio.",
      severity: 'medium' as const
    },
    {
      content: "🔐 Security recommendation: Enable 2FA on all exchange accounts, use unique passwords, and consider a dedicated device for crypto activities. Your current setup has good practices but can be enhanced.",
      severity: 'low' as const
    },
    {
      content: "🚨 High priority: Detected potential phishing attempt in recent transaction history. Always verify contract addresses and use official links. I'll provide you with verified contract addresses.",
      severity: 'high' as const
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

    // Simulate AI response with security-specific content
    setTimeout(() => {
      const response = securityResponses[Math.floor(Math.random() * securityResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        severity: response.severity
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const securityChecks = [
    "Audit my smart contract",
    "Check wallet security",
    "Analyze transaction risks",
    "Security best practices"
  ];

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-600/50';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-red-500/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">OptikSecure GPT</h3>
              <p className="text-gray-400 text-sm">Security & Audit Specialist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Checks */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {securityChecks.map((check, index) => (
              <button
                key={index}
                onClick={() => setInput(check)}
                className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                {check}
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
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : `bg-gray-700/50 text-white border ${getSeverityColor(message.severity)}`
                }`}
              >
                {message.type === 'assistant' && message.severity && (
                  <div className="flex items-center space-x-2 mb-2">
                    {getSeverityIcon(message.severity)}
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {message.severity} Priority
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
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
                    <Shield className="w-4 h-4 text-red-400 animate-pulse" />
                    <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  </div>
                  <span className="text-sm text-gray-400">Running security analysis...</span>
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
                placeholder="Ask about security audits, vulnerability assessments, or best practices..."
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptikSecureGPTModal;