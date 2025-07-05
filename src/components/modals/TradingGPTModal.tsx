import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, TrendingUp, DollarSign } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { StripeService } from '../../services/stripeService';
import { fetchMarketData } from '../../services/marketService';

const stripeService = new StripeService();
interface TradingGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWallet: string;
  subscription: boolean;
}

export default function TradingGPTModal({ isOpen, onClose }: TradingGPTModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<boolean>(false);
  const [liveData, setLiveData] = useState<{ price: number; change: number } | null>(null);

  const chatCompletion = useChatCompletion('trading');
  
  const web3 = require("@solana/web3.js");
(async () => {
  const solana = new web3.Connection("https://clean-still-scion.solana-mainnet.quiknode.pro/32f291ce34f1f15fcf75a4b74c2da1e2273ed0cd/");
  console.log(await solana.getSlot());
})();

  const checkSubscription = async () => {
    const sub = await stripeService.getCurrentSubscription();
    setSubscription(!!sub);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'assistant', content: 'TradingGPT here: live market insights, predictive signals, and revenue strategies.' }]);
      checkSubscription();

      const fetchLoop = async () => {
        const data = await fetchMarketData('OPTK'); // custom service
        setLiveData({
          price: data.price,
          change: data.priceChange ?? 0, // fallback to 0 if priceChange is missing
        });
      };
      fetchLoop();
      const timer = setInterval(fetchLoop, 30_000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);


  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 p-2"><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>

        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h2 className="text-lg font-semibold">Trading GPT · Market Intelligence</h2>
        </div>

        {liveData && (
          <div className="bg-green-900/30 rounded-lg p-3 mb-4 flex justify-between">
            <span>OPTK Price: ${liveData.price.toFixed(4)}</span>
            <span className={liveData.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {liveData.change >= 0 ? '▲' : '▼'} {Math.abs(liveData.change).toFixed(2)}%
            </span>
          </div>
        )}

        {!subscription && (
          <div className="bg-blue-700/30 p-4 rounded mb-4">
            <p className="text-sm">Subscribe to unlock live charts, predictive trades, and on-chain analytics.</p>
            <button onClick={() => stripeService.createSubscription('price_monthly_trader')} className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              <DollarSign className="w-4 h-4 mr-2" /> Subscribe – Trader Plan
            </button>
          </div>
        )}

        <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === 'assistant' ? 'bg-gray-700' : 'bg-blue-600'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && <p className="text-gray-400 text-sm">...</p>}
        </div>


        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white"
            placeholder="Ask for price forecasts, trading suggestions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!subscription}
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && input.trim() && subscription) {
                setIsLoading(true);
                setMessages(prev => [...prev, { role: 'user', content: input }]);
                const response = await chatCompletion(input);
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setInput('');
                setIsLoading(false);
              }
            }}
          />
          {!subscription ? (
            <button
              onClick={async () => {
                const sessionUrl = await stripeService.createCheckoutSession('price_monthly_trader');
                window.location.href = sessionUrl;
              }}
              className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              <DollarSign className="w-4 h-4 mr-2" /> Subscribe – Trader Plan
            </button>
          ) : (
            <button
              onClick={async () => {
                if (input.trim()) {
                  setIsLoading(true);
                  setMessages(prev => [...prev, { role: 'user', content: input }]);
                  const response = await chatCompletion(input);
                  setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                  setInput('');
                  setIsLoading(false);
                }
              }}
              className="mt-2 inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              disabled={isLoading || !input.trim()}
                >
                  Send
                </button>
              )}
            </div>
          </div>
          </Dialog>
  );
}
