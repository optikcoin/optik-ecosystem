import React, { useState, useEffect } from 'react';
import { MessageCircle, Shield, CheckCircle, AlertTriangle, Loader, X, Copy, ExternalLink } from 'lucide-react';
import CTAButton from './CTAButton';

interface TelegramVerificationProps {
  onVerificationComplete: (verified: boolean, verificationId: string) => void;
  onClose: () => void;
  amount: number;
  currency: string;
}

const TelegramVerification: React.FC<TelegramVerificationProps> = ({
  onVerificationComplete,
  onClose,
  amount,
  currency
}) => {
  const [step, setStep] = useState<'instructions' | 'waiting' | 'verified' | 'failed'>('instructions');
  const [verificationCode, setVerificationCode] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [verificationId] = useState(`VER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Telegram bot details
  const TELEGRAM_BOT_USERNAME = 'OptikCoinVerifyBot';
  const TELEGRAM_BOT_LINK = `https://t.me/${TELEGRAM_BOT_USERNAME}`;

  useEffect(() => {
    if (step === 'waiting' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && step === 'waiting') {
      setStep('failed');
    }
  }, [step, timeRemaining]);

  useEffect(() => {
    // Generate verification code when component mounts
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setVerificationCode(code);
  }, []);

  const handleStartVerification = () => {
    if (!telegramUsername.trim()) {
      alert('Please enter your Telegram username');
      return;
    }
    
    setStep('waiting');
    
    // Simulate verification process
    // In real implementation, this would communicate with your Telegram bot
    setTimeout(() => {
      // Simulate successful verification (80% success rate for demo)
      if (Math.random() > 0.2) {
        setStep('verified');
        onVerificationComplete(true, verificationId);
      } else {
        setStep('failed');
        onVerificationComplete(false, verificationId);
      }
    }, 10000); // 10 seconds for demo
  };

  const copyVerificationCode = () => {
    navigator.clipboard.writeText(verificationCode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#0F1113]/95 to-[#0F1113]/98 backdrop-blur-lg border border-[#007BFF]/20 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#007BFF]/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#007BFF] to-[#00D1FF] rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#F1F3F5]">Telegram Verification</h3>
              <p className="text-[#A9B2BC] text-sm">Secure payment verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#A9B2BC] hover:text-[#F1F3F5] transition-colors p-2 hover:bg-[#007BFF]/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Summary */}
          <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-4 mb-6">
            <h4 className="text-[#F1F3F5] font-semibold mb-2">Payment Details</h4>
            <div className="flex justify-between items-center">
              <span className="text-[#A9B2BC]">Amount:</span>
              <span className="text-[#F1F3F5] font-bold text-lg">${amount.toFixed(2)} {currency}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[#A9B2BC]">Verification ID:</span>
              <span className="text-[#007BFF] font-mono text-sm">{verificationId}</span>
            </div>
          </div>

          {/* Step Content */}
          {step === 'instructions' && (
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="w-16 h-16 text-[#007BFF] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#F1F3F5] mb-2">Credit Card Verification Required</h4>
                <p className="text-[#A9B2BC] text-sm">
                  For security and compliance, we need to verify your payment method via our Telegram bot.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F1F3F5] mb-2">
                    Your Telegram Username
                  </label>
                  <input
                    type="text"
                    placeholder="@yourusername"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="w-full bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-xl px-4 py-3 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                  />
                </div>

                <div className="bg-[#007BFF]/5 border border-[#007BFF]/10 rounded-xl p-4">
                  <h5 className="text-[#F1F3F5] font-semibold mb-2">Verification Steps:</h5>
                  <ol className="text-[#A9B2BC] text-sm space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#007BFF] font-bold">1.</span>
                      <span>Open Telegram and start a chat with our verification bot</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#007BFF] font-bold">2.</span>
                      <span>Send your verification code to the bot</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#007BFF] font-bold">3.</span>
                      <span>Follow the bot's instructions to verify your credit card</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#007BFF] font-bold">4.</span>
                      <span>Return here once verification is complete</span>
                    </li>
                  </ol>
                </div>

                <div className="flex space-x-3">
                  <CTAButton
                    href={TELEGRAM_BOT_LINK}
                    external
                    variant="primary"
                    size="md"
                    className="flex-1"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Open Telegram Bot
                  </CTAButton>
                  <CTAButton
                    onClick={handleStartVerification}
                    variant="outline"
                    size="md"
                    className="flex-1"
                    disabled={!telegramUsername.trim()}
                  >
                    Start Verification
                  </CTAButton>
                </div>
              </div>
            </div>
          )}

          {step === 'waiting' && (
            <div className="space-y-6 text-center">
              <div>
                <Loader className="w-16 h-16 text-[#007BFF] mx-auto mb-4 animate-spin" />
                <h4 className="text-xl font-bold text-[#F1F3F5] mb-2">Waiting for Verification</h4>
                <p className="text-[#A9B2BC] text-sm mb-4">
                  Please complete the verification process in Telegram
                </p>
                <div className="text-2xl font-bold text-[#007BFF] mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-[#A9B2BC] text-xs">Time remaining</p>
              </div>

              <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#F1F3F5] font-semibold">Verification Code:</span>
                  <button
                    onClick={copyVerificationCode}
                    className="text-[#007BFF] hover:text-[#00D1FF] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-2xl font-mono font-bold text-[#007BFF] text-center bg-[#0F1113]/50 rounded-lg py-3">
                  {verificationCode}
                </div>
                <p className="text-[#A9B2BC] text-xs mt-2 text-center">
                  Send this code to @{TELEGRAM_BOT_USERNAME}
                </p>
              </div>

              <div className="space-y-2">
                <CTAButton
                  href={TELEGRAM_BOT_LINK}
                  external
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Open Telegram Bot
                </CTAButton>
                <button
                  onClick={onClose}
                  className="w-full text-[#A9B2BC] hover:text-[#F1F3F5] text-sm transition-colors"
                >
                  Cancel Verification
                </button>
              </div>
            </div>
          )}

          {step === 'verified' && (
            <div className="space-y-6 text-center">
              <div>
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#F1F3F5] mb-2">Verification Successful!</h4>
                <p className="text-[#A9B2BC] text-sm">
                  Your credit card has been verified. You can now proceed with your payment.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Verification Complete</span>
                </div>
                <p className="text-green-300/80 text-sm">
                  Verification ID: {verificationId}
                </p>
              </div>

              <CTAButton
                onClick={() => onVerificationComplete(true, verificationId)}
                variant="primary"
                size="lg"
                className="w-full"
                icon={<CheckCircle className="w-5 h-5" />}
              >
                Continue to Payment
              </CTAButton>
            </div>
          )}

          {step === 'failed' && (
            <div className="space-y-6 text-center">
              <div>
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#F1F3F5] mb-2">Verification Failed</h4>
                <p className="text-[#A9B2BC] text-sm">
                  We couldn't verify your credit card. Please try again or contact support.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Verification Failed</span>
                </div>
                <p className="text-red-300/80 text-sm">
                  Please check your information and try again
                </p>
              </div>

              <div className="flex space-x-3">
                <CTAButton
                  onClick={() => setStep('instructions')}
                  variant="outline"
                  size="md"
                  className="flex-1"
                >
                  Try Again
                </CTAButton>
                <CTAButton
                  onClick={onClose}
                  variant="secondary"
                  size="md"
                  className="flex-1"
                >
                  Cancel
                </CTAButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramVerification;