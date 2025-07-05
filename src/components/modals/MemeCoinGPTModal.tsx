import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Sparkles, DollarSign } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { stripeService } from '../../services/stripeService';

const stripeService = new StripeService();

interface MemeCoinGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWallet: string;
  subscription: boolean;
}


export default function MemeCreatorGPTModal({ isOpen, onClose }: MemeCoinGPTModalProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed] = useState(false);

  const chatCompletion = useChatCompletion('meme');

  const sendPrompt = async (prompt: string) => {
    setIsLoading(true);
    const reply = await chatCompletion(prompt);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'assistant', content: 'MemeCreatorGPT ready: Solana CLI interaction, Anchor contract templates, trending ideas!' }]);
      stripeService.createSubscription('price_monthly_xxx')
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 p-2"><X className="w-5 h-5 text-gray-400"/></button>
        <div className="flex items-center space-x-3 mb-4"><Sparkles className="w-6 h-6 text-pink-400"/><h2 className="text-lg font-semibold">MemeCreator GPT · Viral Launchpad</h2></div>

        {!subscribed ? (
          <div className="bg-pink-800/30 p-4 rounded mb-4">
            <p className="text-sm">Subscribe to unlock Solana CLI deployment, Anchor contract audit, viral trend scanning.</p>
            <button onClick={() => stripeService.createSubscription('price_monthly_meme')} className="mt-2 inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded">
              <DollarSign className="w-4 h-4 mr-2"/> Subscribe – Meme GPT
            </button>
          </div>
        ) : (
          <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role==='assistant'?'justify-start':'justify-end'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${m.role==='assistant'?'bg-gray-700':'bg-blue-600'}`}><p className="text-sm">{m.content}</p></div>
              </div>
            ))}
            {isLoading && <p className="text-gray-400 text-sm">...</p>}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input type="text" placeholder="e.g., generate Anchor template + airdrop strategy..." className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white" value={input} onChange={e => setInput(e.target.value)} disabled={!subscribed}/>
          <button onClick={() => { if(input.trim()) { setMessages(prev => [...prev, { role:'user', content: input }]); sendPrompt(input); setInput(''); }}} disabled={!subscribed||isLoading} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded disabled:opacity-50">➤</button>
        </div>
      </div>
    </Dialog>
  );
}
