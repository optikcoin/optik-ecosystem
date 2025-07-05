import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Sparkles } from 'lucide-react';
import { useChatCompletion } from '../hooks/useChatCompletion';
import { StripeService } from '../../services/stripeService';

const stripeService = new StripeService();

export interface GeneralGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  userWallet: string;
  subscription: boolean;
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function GeneralGPTModal({
  isOpen,
  onClose,
  userWallet,
  subscription
}: GeneralGPTModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscriptionState, setSubscription] = useState<boolean>(subscription);

  const { chatCompletion } = useChatCompletion(); // ✅ uses the returned object

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: 'GeneralGPT online: business strategy, monetization, Web3 integration.',
        },
      ]);
      stripeService.getCurrentSubscription().then((sub: any) =>
        setSubscription(!!sub)
      );
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setIsLoading(true);

    try {
      const response: string = await chatCompletion(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'An error occurred. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <Dialog.Panel className="relative w-full max-w-md bg-gray-900 rounded-xl p-6 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h2 className="text-lg font-semibold">General GPT · OptikCoin Advisor</h2>
        </div>

        <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === 'assistant' ? 'bg-gray-700' : 'bg-blue-600'
                }`}
              >
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
            placeholder="Ask about OptikCoin business, monetization, Web3..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!subscriptionState}
          />
          <button
            onClick={handleSend}
            disabled={!subscriptionState || isLoading}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
