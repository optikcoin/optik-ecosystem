import React, { useState } from 'react';
import { Lock, Crown, Zap, ArrowRight } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function SubscriptionGate({ feature, children, fallback }: SubscriptionGateProps) {
  const { subscription, hasAccess } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (hasAccess(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getRequiredPlan = () => {
    const featureRequirements = {
      'token_creation': 'ultimate_bundle',
      'website_builder': 'ultimate_bundle',
      'viral_gpt': 'ultimate_bundle',
      'social_media_posts': 'ultimate_bundle',
      'advanced_llm': 'ultimate_bundle',
      'promotion_gpt': 'ultimate_bundle',
      'ai_chat': 'pro_creator',
      'advanced_analytics': 'pro_creator',
      'priority_support': 'pro_creator',
      'anti_bot_protection': 'pro_creator'
    };

    return featureRequirements[feature as keyof typeof featureRequirements] || 'pro_creator';
  };

  const requiredPlan = getRequiredPlan();
  const planNames = {
    'pro_creator': 'Pro Creator',
    'ultimate_bundle': 'Ultimate Bundle'
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
        <div className="bg-purple-600/20 p-4 rounded-full inline-flex mb-6">
          <Lock className="w-12 h-12 text-purple-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">Premium Feature</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          This feature requires a {planNames[requiredPlan as keyof typeof planNames]} subscription. 
          Upgrade now to unlock this and many other premium features.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            {requiredPlan === 'ultimate_bundle' ? (
              <Zap className="w-5 h-5" />
            ) : (
              <Crown className="w-5 h-5" />
            )}
            <span className="font-medium">
              {planNames[requiredPlan as keyof typeof planNames]} Required
            </span>
          </div>
          
          <div className="text-sm text-gray-400">
            Current plan: <span className="capitalize">{subscription.subscriptionTier}</span>
          </div>
        </div>

        <button
          onClick={() => setShowUpgradeModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-purple-500/25"
        >
          <span>Upgrade Now</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-gray-500 text-xs mt-4">
          Cancel anytime • 30-day money-back guarantee
        </p>
      </div>

      <SubscriptionModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        selectedPlan={requiredPlan as any}
      />
    </>
  );
}