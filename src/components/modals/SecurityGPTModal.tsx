import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Shield, DollarSign } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { StripeService } from '../../services/stripeService';

const stripeService = new StripeService();

interface SecurityGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWallet: string;
  subscription: boolean;
}

export default function SecurityGPTModal({ isOpen, onClose }: SecurityGPTModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSub, setHasSub] = useState(false);

  const sendPrompt = async (prompt: string) => {
    setIsLoading(true);
    await useChatCompletion(prompt);
    setMessages(prev => [...prev, { role: 'assistant', content: "Hello!" }]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'assistant', content: 'SecurityGPT online: smart contract audits, threat detection, bot defense.' }]);
      stripeService.getCurrentSubscription().then(sub => setHasSub(!!sub));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 p-2"><X className="w-5 h-5 text-gray-400" /></button>
        <div className="flex items-center space-x-3 mb-4"><Shield className="w-6 h-6 text-yellow-400" /><h2 className="text-lg font-semibold">Security GPT · Smart Audit</h2></div>

        {!hasSub ? (
          <div className="bg-yellow-800/30 p-4 rounded mb-4">
            <p className="text-sm">Subscribe to unlock full smart contract review, threat scanning, and bot protection tools.</p>
            <button onClick={() => stripeService.createSubscription('price_monthly_security')} className="mt-2 inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
              <DollarSign className="w-4 h-4 mr-2" /> Subscribe – Security GPT
            </button>
          </div>
        ) : (
          <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${m.role === 'assistant' ? 'bg-gray-700' : 'bg-blue-600'}`}><p className="text-sm">{m.content}</p></div>
              </div>
            ))}
            {isLoading && <p className="text-gray-400 text-sm">...</p>}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input type="text" placeholder="Ask for audit tips, vulnerability scan..." className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white" value={input} onChange={e => setInput(e.target.value)} disabled={!hasSub} />
          <button onClick={() => { if (input.trim()) { setMessages(prev => [...prev, { role: 'user', content: input }]); sendPrompt(input); setInput(''); }}} disabled={!hasSub || isLoading} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded disabled:opacity-50">➤</button>
        </div>
      </div>
    </Dialog>
  );
}
