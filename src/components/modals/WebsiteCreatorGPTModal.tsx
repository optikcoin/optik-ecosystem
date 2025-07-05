import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Globe, Monitor } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { StripeService } from '../../services/stripeService';

const stripeService = new StripeService();

interface WebsiteCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: boolean;
}

export default function WebsiteCreatorGPTModal({ isOpen, onClose }: WebsiteCreatorModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'assistant', content: 'WebsiteGPT here: generate a full viral site — futuristic templates, domain suggestion, deployable Solana claim portal & OptikCoin pairing.' }]);
      stripeService.getCurrentSubscription().then(sub => setSubscription(!!sub));
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: 'user', content: input }]);
    setIsLoading(true);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4"><X className="w-5 h-5 text-gray-400"/></button>
        <div className="flex items-center space-x-3 mb-4">
          <Monitor className="w-6 h-6 text-teal-400"/>
          <h2 className="text-lg font-semibold">Website Generator GPT · Futuristic Launch Sites</h2>
        </div>

        {!subscription && (
          <div className="bg-teal-900/30 p-4 rounded mb-4">
            <p className="text-sm">Subscribe to access full site generation: templates, hosting, domain, OptikCoin integration, and Solana faucet pages.</p>
            <button onClick={async () => window.location.href = await stripeService.createCheckoutSession('price_monthly_website')} className="mt-2 inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded">
              <Globe className="w-4 h-4 mr-2"/> Subscribe – Website Generator
            </button>
          </div>
        )}

        <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role==='assistant'?'justify-start':'justify-end'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role==='assistant'?'bg-gray-700':'bg-teal-700'}`}>
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
            placeholder="Request futuristic template, domain, deploy script..."
            disabled={!subscription}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={handleSend} disabled={!subscription || isLoading} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded disabled:opacity-50">
            ➤
          </button>
        </div>
      </div>
    </Dialog>
  );
}
