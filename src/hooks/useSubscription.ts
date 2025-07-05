import { useState, useEffect } from 'react';

export interface SubscriptionData {
  isSubscribed: boolean;
  subscriptionTier: 'free' | 'pro_creator' | 'ultimate_bundle';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isSubscribed: false,
    subscriptionTier: 'free',
    subscriptionStatus: 'inactive'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock subscription data for demo
    setSubscription({
      isSubscribed: false,
      subscriptionTier: 'free',
      subscriptionStatus: 'inactive'
    });
    setLoading(false);
  }, []);

  const hasAccess = (feature: string): boolean => {
    if (!subscription.isSubscribed) return false;

    const featureAccess = {
      'ai_chat': ['pro_creator', 'ultimate_bundle'],
      'token_creation': ['ultimate_bundle'],
      'advanced_analytics': ['pro_creator', 'ultimate_bundle'],
      'website_builder': ['ultimate_bundle'],
      'viral_gpt': ['ultimate_bundle'],
      'social_media_posts': ['ultimate_bundle'],
      'advanced_llm': ['ultimate_bundle'],
      'promotion_gpt': ['ultimate_bundle'],
      'priority_support': ['pro_creator', 'ultimate_bundle'],
      'anti_bot_protection': ['pro_creator', 'ultimate_bundle']
    };

    const allowedTiers = featureAccess[feature as keyof typeof featureAccess];
    return allowedTiers ? allowedTiers.includes(subscription.subscriptionTier) : false;
  };

  const canUpgrade = (): boolean => {
    return subscription.subscriptionTier === 'free' || subscription.subscriptionTier === 'pro_creator';
  };

  const getUpgradeOptions = () => {
    if (subscription.subscriptionTier === 'free') {
      return ['pro_creator', 'ultimate_bundle'];
    }
    if (subscription.subscriptionTier === 'pro_creator') {
      return ['ultimate_bundle'];
    }
    return [];
  };

  return {
    subscription,
    loading,
    error,
    hasAccess,
    canUpgrade,
    getUpgradeOptions,
    refetch: () => {}
  };
};