import React, { useState } from 'react';
import { X, ShoppingCart, Check } from 'lucide-react';
import StripePayment from './StripePayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
}

export default function PaymentModal({ isOpen, onClose, product }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState<'payment' | 'success'>('payment');

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    setCurrentStep('success');
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
      // Refresh the page to update user access
      window.location.reload();
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Error is already handled in the StripePayment component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">
            {currentStep === 'payment' && 'Complete Purchase'}
            {currentStep === 'success' && 'Purchase Successful!'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 'payment' && (
            <div className="space-y-6">
              {/* Product Summary */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Purchase Summary</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm">one-time purchase</p>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <StripePayment
                amount={product.price}
                planType="one_time"
                productName={product.name}
                description={product.description}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          )}

          {currentStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="bg-green-600/20 p-6 rounded-full inline-flex mb-6">
                <Check className="w-16 h-16 text-green-400" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
                <p className="text-gray-400 mb-4">
                  You now have access to {product.name}!
                </p>
                <p className="text-green-400 text-sm">
                  Redirecting you to the platform in a few seconds...
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 font-medium text-sm">What's Next?</p>
                <ul className="text-green-300/80 text-sm mt-2 space-y-1">
                  <li>• Access your new AI tool immediately</li>
                  <li>• Check your email for receipt and usage guide</li>
                  <li>• Start using your new features!</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}