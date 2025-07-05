import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  usdValue: string;
  description: string;
  time: string;
  hash: string;
}

interface WalletBalance {
  balance: number;
  usdValue: number;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

export const useWalletBalance = (): WalletBalance => {
  const [balance, setBalance] = useState(12500);
  const [usdValue, setUsdValue] = useState(30625);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'receive',
      amount: '1,250 OPTIK',
      usdValue: '3,062.50',
      description: 'Received from OptikDEX',
      time: '2 hours ago',
      hash: '0x742d35...4c1A'
    },
    {
      id: '2',
      type: 'send',
      amount: '500 OPTIK',
      usdValue: '1,225.00',
      description: 'Sent to Staking Pool',
      time: '5 hours ago',
      hash: '0x8a3f21...7b9c'
    },
    {
      id: '3',
      type: 'receive',
      amount: '2,100 OPTIK',
      usdValue: '5,145.00',
      description: 'Staking Rewards',
      time: '1 day ago',
      hash: '0x9f4e12...3d8a'
    },
    {
      id: '4',
      type: 'send',
      amount: '750 OPTIK',
      usdValue: '1,837.50',
      description: 'Sent to DEX Trading',
      time: '2 days ago',
      hash: '0x1c5a78...6e2f'
    },
    {
      id: '5',
      type: 'receive',
      amount: '3,000 OPTIK',
      usdValue: '7,350.00',
      description: 'Purchase via Credit Card',
      time: '3 days ago',
      hash: '0x4b7d92...8a1c'
    }
  ];

  useEffect(() => {
    // Simulate real-time balance updates
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 100;
      setBalance(prev => Math.max(0, prev + randomChange));
      setUsdValue(prev => Math.max(0, prev + (randomChange * 2.45)));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshBalance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate small balance update
      const newBalance = balance + (Math.random() * 10);
      setBalance(newBalance);
      setUsdValue(newBalance * 2.45);
    } catch (err) {
      setError('Failed to refresh balance');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    balance,
    usdValue,
    transactions,
    isLoading,
    error
  };
};