import { useState, useCallback } from 'react';

interface VerificationResult {
  success: boolean;
  verificationId: string;
  timestamp: Date;
  telegramUsername?: string;
}

interface TelegramVerificationHook {
  isVerifying: boolean;
  verificationResult: VerificationResult | null;
  startVerification: (amount: number, currency: string, telegramUsername: string) => Promise<VerificationResult>;
  checkVerificationStatus: (verificationId: string) => Promise<boolean>;
  resetVerification: () => void;
}

export const useTelegramVerification = (): TelegramVerificationHook => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const startVerification = useCallback(async (
    amount: number, 
    currency: string, 
    telegramUsername: string
  ): Promise<VerificationResult> => {
    setIsVerifying(true);
    
    try {
      // In a real implementation, this would call your backend API
      // which would communicate with your Telegram bot
      const response = await fetch('/api/telegram/start-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          telegramUsername,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start verification');
      }

      const data = await response.json();
      
      const result: VerificationResult = {
        success: data.success,
        verificationId: data.verificationId,
        timestamp: new Date(),
        telegramUsername,
      };

      setVerificationResult(result);
      return result;
    } catch (error) {
      console.error('Telegram verification error:', error);
      
      const result: VerificationResult = {
        success: false,
        verificationId: '',
        timestamp: new Date(),
        telegramUsername,
      };

      setVerificationResult(result);
      return result;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const checkVerificationStatus = useCallback(async (verificationId: string): Promise<boolean> => {
    try {
      // Check verification status with your backend
      const response = await fetch(`/api/telegram/check-verification/${verificationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.verified === true;
    } catch (error) {
      console.error('Error checking verification status:', error);
      return false;
    }
  }, []);

  const resetVerification = useCallback(() => {
    setIsVerifying(false);
    setVerificationResult(null);
  }, []);

  return {
    isVerifying,
    verificationResult,
    startVerification,
    checkVerificationStatus,
    resetVerification,
  };
};