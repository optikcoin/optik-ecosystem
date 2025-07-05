import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ChartBar, Shuffle } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { StripeService } from '../../services/stripeService';

const stripeService = new StripeService();

interface DeFiGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWallet: string;
  subscription: boolean;
}

export default function GeneralGPTModal({ isOpen, onClose, userWallet, subscription }: DeFiGPTModalProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(subscription);
  const chatRef = useRef<HTMLDivElement>(null);

  const chatCompletion = useChatCompletion('deFi');

  useEffect(() => {
    if (isOpen) {
      const saved = sessionStorage.getItem('defiGPTMessages');
      setMessages(
        saved ? JSON.parse(saved) : [
          {
            role: 'assistant',
            content: 'OptikDeFiGPT is online: Yield farming strategies, liquidity pool modeling, revenue optimization & token pair suggestions ready for action.',
          },
        ]
      );

      stripeService
        .getCurrentSubscription()
        .then((sub: any) => setCurrentSubscription(!!sub?.status))
        .catch((err) => {
          console.error('Subscription check failed:', err);
          setCurrentSubscription(false);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    sessionStorage.setItem('defiGPTMessages', JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setIsLoading(true);

    try {
      const resp = await chatCompletion(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: resp }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleSubscribe = async () => {
    try {
      const sessionUrl = await stripeService.checkout('price_monthly_defi');
      window.location.href = sessionUrl;
    } catch (err) {
      console.error('Subscription failed:', err);
      alert('There was an issue with the subscription process. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4" aria-label="Close dialog">
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <div className="flex items-center space-x-3 mb-4">
          <ChartBar className="w-6 h-6 text-cyan-400" />
          <h2 className="text-lg font-semibold">DeFi GPT · Yield & Pool Strategies</h2>
        </div>

        {!currentSubscription && (
          <div className="bg-cyan-900/30 p-4 rounded mb-4">
            <p className="text-sm">Subscribe to unlock yield farming calculators, liquidity pair analytics, and ROI forecasting tools.</p>
            <button
              onClick={handleSubscribe}
              className="mt-2 inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded"
            >
              <Shuffle className="w-4 h-4 mr-2" /> Subscribe – DeFi Plan
            </button>
          </div>
        )}

        <div ref={chatRef} className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === 'assistant' ? 'bg-gray-700' : 'bg-cyan-700'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && <p className="text-gray-400 text-sm italic animate-pulse">Generating insights...</p>}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white"
            placeholder="Ask about yield farming, pool sizing, ROI projections..."
            disabled={!currentSubscription}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!currentSubscription || isLoading}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </Dialog>
  );
}
