import React, { useState } from 'react';
import { X, Crown, Zap, Check, CreditCard } from 'lucide-react';
import StripePayment from './StripePayment';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: 'pro_creator' | 'ultimate_bundle';
}

export default function SubscriptionModal({ isOpen, onClose, selectedPlan = 'pro_creator' }: SubscriptionModalProps) {
  const [currentStep, setCurrentStep] = useState<'plan' | 'payment' | 'success'>('plan');
  const [selectedPlanType, setSelectedPlanType] = useState(selectedPlan);

  const plans = {
    pro_creator: {
      name: 'Pro Creator',
      price: 19.99,
      interval: 'month',
      description: 'Access to all specialized GPT assistants',
      features: [
        'Unlimited AI assistance',
        'All specialized GPT assistants',
        'Advanced trading analytics',
        'Anti-bot protection tools',
        'Smart contract templates',
        'Priority customer support',
        'Advanced chart features',
        'Portfolio tracking',
        'Market alerts'
      ],
      color: 'blue'
    },
    ultimate_bundle: {
      name: 'Meme Coin Creator',
      price: 499.99,
      interval: 'one-time',
      description: 'Complete token launch with Optik matched liquidity',
      features: [
        'Everything in Pro Creator',
        'Token creation & deployment',
        'Optik matched liquidity funding',
        'OPTK backing support',
        'Optik Website Builder AI',
        'Optik Viral GPT marketing',
        'Viral Social Media Posts',
        'Advanced LLM trading analysis',
        'Meme Coin Promotion GPT',
        'Launch marketing boost',
        'Dedicated launch support',
        'Post-launch monitoring'
      ],
      color: 'purple'
    }
  };

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    setCurrentStep('success');
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
      // Refresh the page to update subscription status
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
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">
            {currentStep === 'plan' && 'Choose Your Plan'}
            {currentStep === 'payment' && 'Complete Payment'}
            {currentStep === 'success' && 'Payment Successful!'}
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
          {currentStep === 'plan' && (
            <div className="space-y-6">
              {/* Plan Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(plans).map(([key, plan]) => {
                  const isSelected = selectedPlanType === key;
                  const Icon = key === 'ultimate_bundle' ? Zap : Crown;
                  
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPlanType(key as any)}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? `border-${plan.color}-500/50 bg-${plan.color}-600/10`
                          : 'border-gray-600/30 hover:border-gray-500/50 bg-gray-700/30'
                      }`}
                    >
                      {key === 'pro_creator' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </div>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className={`inline-flex p-3 rounded-lg mb-4 ${
                          isSelected ? `bg-${plan.color}-600/20` : 'bg-gray-600/20'
                        }`}>
                          <Icon className={`w-8 h-8 ${
                            isSelected ? `text-${plan.color}-400` : 'text-gray-400'
                          }`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</span>
                          <span className="text-gray-400 ml-2">
                            {plan.interval === 'one-time' ? 'one-time' : `/${plan.interval}`}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{plan.description}</p>
                      </div>

                      <div className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep('payment')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Continue to Payment</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div className="space-y-6">
              {/* Selected Plan Summary */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{plans[selectedPlanType].name}</p>
                    <p className="text-gray-400 text-sm">{plans[selectedPlanType].description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${plans[selectedPlanType].price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {plans[selectedPlanType].interval === 'one-time' ? 'one-time' : `/${plans[selectedPlanType].interval}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <StripePayment
                planType={selectedPlanType}
                productName={plans[selectedPlanType].name}
                description={plans[selectedPlanType].description}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              {/* Back Button */}
              <div className="flex justify-start">
                <button
                  onClick={() => setCurrentStep('plan')}
                  className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Back to Plans
                </button>
              </div>
            </div>
          )}

          {currentStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="bg-green-600/20 p-6 rounded-full inline-flex mb-6">
                <Check className="w-16 h-16 text-green-400" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400 mb-4">
                  Welcome to {plans[selectedPlanType].name}! Your subscription is now active.
                </p>
                <p className="text-green-400 text-sm">
                  Redirecting you to the platform in a few seconds...
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 font-medium text-sm">What's Next?</p>
                <ul className="text-green-300/80 text-sm mt-2 space-y-1">
                  <li>• Access all premium features immediately</li>
                  <li>• Check your email for receipt and welcome guide</li>
                  <li>• Start creating your first meme coin!</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}