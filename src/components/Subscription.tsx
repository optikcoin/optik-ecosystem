import React, { useState } from 'react';
import { Crown, Shield, Zap, TrendingUp, Bot, Star, Check, X, CreditCard } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import SubscriptionModal from './SubscriptionModal';
import PaymentModal from './PaymentModal';

export default function Subscription() {
  const { subscription, loading } = useSubscription();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: '$0',
      period: 'forever',
      description: 'Basic access to OptikCoinGPT',
      features: [
        'Limited AI chat (10 messages/day)',
        'Basic market analytics',
        'Token swap (with fees)',
        'Community access',
      ],
      limitations: [
        'No meme coin creation',
        'No advanced trading tools',
        'No priority support',
        'Limited chart features',
      ],
      buttonText: subscription?.subscriptionTier === 'free' ? 'Current Plan' : 'Downgrade',
      buttonClass: subscription?.subscriptionTier === 'free' 
        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
        : 'bg-gray-600/20 hover:bg-gray-600/30 text-gray-400',
      icon: Star,
      popular: false,
      disabled: subscription?.subscriptionTier === 'free'
    },
    {
      id: 'pro_creator',
      name: 'Pro Creator',
      price: '$19.99',
      period: 'per month',
      description: 'Access to all specialized GPTs',
      features: [
        'Unlimited AI assistance',
        'All 7 specialized GPT assistants',
        'Advanced trading analytics',
        'Anti-bot protection tools',
        'Smart contract templates',
        'Priority customer support',
        'Advanced chart features',
        'Portfolio tracking',
        'Market alerts',
      ],
      limitations: [],
      buttonText: subscription?.subscriptionTier === 'pro_creator' ? 'Current Plan' : 'Subscribe Now',
      buttonClass: subscription?.subscriptionTier === 'pro_creator'
        ? 'bg-blue-600 text-white cursor-not-allowed'
        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
      icon: Crown,
      popular: true,
      disabled: subscription?.subscriptionTier === 'pro_creator'
    },
    {
      id: 'ultimate_bundle',
      name: 'Meme Coin Creator',
      price: '$499.99',
      period: 'one-time',
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
        'Post-launch monitoring',
      ],
      limitations: [],
      buttonText: subscription?.subscriptionTier === 'ultimate_bundle' ? 'Current Plan' : 'Get Started',
      buttonClass: subscription?.subscriptionTier === 'ultimate_bundle'
        ? 'bg-purple-600 text-white cursor-not-allowed'
        : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white',
      icon: Zap,
      popular: false,
      disabled: subscription?.subscriptionTier === 'ultimate_bundle'
    },
  ];

  const oneTimePurchases = [
    {
      id: 'website_builder',
      name: 'Optik Website Builder AI',
      price: 19.99,
      description: 'AI-powered website creation for your meme coin project',
      icon: '🌐'
    },
    {
      id: 'viral_gpt',
      name: 'Optik Viral GPT',
      price: 19.99,
      description: 'Advanced viral marketing strategies and campaign planning',
      icon: '🚀'
    },
    {
      id: 'social_media_posts',
      name: 'Viral Social Media Posts',
      price: 19.99,
      description: 'AI-generated viral content for all major social platforms',
      icon: '📱'
    },
    {
      id: 'advanced_llm',
      name: 'Optik GPT Advanced LLM',
      price: 19.99,
      description: 'Predictive trading analysis and advanced market strategies',
      icon: '🧠'
    },
    {
      id: 'promotion_gpt',
      name: 'Meme Coin Promotion GPT',
      price: 19.99,
      description: 'Comprehensive promotion and community building tools',
      icon: '📢'
    },
    {
      id: 'trading_gpt',
      name: 'Optik Trading Pro',
      price: 19.99,
      description: 'Advanced trading analysis and market insights',
      icon: '📈'
    },
    {
      id: 'security_gpt',
      name: 'Optik Security Guard',
      price: 19.99,
      description: 'Blockchain security analysis and protection',
      icon: '🛡️'
    }
  ];

  const allGptsBundlePrice = 100.00;

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Anti-Bot Protection',
      description: 'Advanced algorithms to detect and prevent malicious sniping bots',
    },
    {
      icon: TrendingUp,
      title: 'Smart Contract Auditing',
      description: 'Automated security checks for your smart contracts',
    },
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Real-time detection of pump and dump schemes',
    },
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free' || plans.find(p => p.id === planId)?.disabled) {
      return;
    }
    
    if (planId === 'pro_creator' || planId === 'ultimate_bundle') {
      setShowSubscriptionModal(true);
    }
  };

  const handleProductPurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleAllGptsPurchase = () => {
    setSelectedProduct({
      id: 'all_gpts_bundle',
      name: 'All GPT Assistants Bundle',
      price: allGptsBundlePrice,
      description: 'Access to all 7 specialized AI assistants at a discounted price'
    });
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">OptikCoin</span> Plan
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From free exploration to professional meme coin creation with AI-powered tools, we have the perfect plan for your crypto journey.
        </p>
        
        {/* Current Subscription Status */}
        {subscription?.isSubscribed && (
          <div className="mt-6 inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium">
              Currently subscribed to {subscription.subscriptionTier.replace('_', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'border-gray-700/50 hover:border-gray-600/50'
              } ${plan.disabled ? 'opacity-75' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  plan.popular ? 'bg-blue-600/20' : 'bg-gray-700/50'
                }`}>
                  <Icon className={`w-8 h-8 ${plan.popular ? 'text-blue-400' : 'text-gray-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Features Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 font-medium mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonClass}`}
                disabled={plan.disabled}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* All GPTs Bundle */}
      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">All GPT Assistants Bundle</h2>
            <p className="text-purple-300 mb-4">Get access to all 7 specialized AI assistants at a discounted price</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {oneTimePurchases.map((product, index) => (
                <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {product.icon} {product.name.split(' ').pop()}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Save over 30% compared to individual purchases</p>
          </div>
          <div className="text-center md:text-right">
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">${allGptsBundlePrice.toFixed(2)}</span>
              <span className="text-gray-400 ml-2">one-time</span>
            </div>
            <button
              onClick={handleAllGptsPurchase}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              Get All GPTs
            </button>
          </div>
        </div>
      </div>

      {/* Individual AI Tools */}
      {subscription?.subscriptionTier !== 'ultimate_bundle' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Individual AI Assistants</h2>
          <p className="text-gray-400 mb-6">
            Purchase individual AI-powered assistants without a subscription. Each specialized GPT costs just $19.99.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {oneTimePurchases.map((product) => (
              <div key={product.id} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{product.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-green-400">${product.price.toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => handleProductPurchase(product)}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Purchase</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Features */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Advanced Security & Protection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPTK Benefits */}
      <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">OPTK Token Benefits</h2>
          <p className="text-gray-300">Exclusive advantages for OPTK holders</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-600/20 p-3 rounded-lg inline-flex mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Liquidity Backing</h3>
            <p className="text-gray-400 text-sm">OPTK reserves support your token launches</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600/20 p-3 rounded-lg inline-flex mb-3">
              <Crown className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Premium Features</h3>
            <p className="text-gray-400 text-sm">Exclusive access to advanced tools</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-3 rounded-lg inline-flex mb-3">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Reduced Fees</h3>
            <p className="text-gray-400 text-sm">Lower transaction costs for holders</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-600/20 p-3 rounded-lg inline-flex mb-3">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Early Access</h3>
            <p className="text-gray-400 text-sm">First access to new features and launches</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-2">What's included in the Meme Coin Creator package?</h3>
            <p className="text-gray-400">
              The Meme Coin Creator package includes token creation, smart contract deployment, Optik matched liquidity funding, 
              OPTK backing support, and all seven AI-powered tools for marketing, promotion, and community building.
            </p>
          </div>
          
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-2">How does anti-bot protection work?</h3>
            <p className="text-gray-400">
              Our AI-powered system analyzes trading patterns, wallet behaviors, and transaction timing to 
              identify and prevent malicious bot activities that could harm your token's launch.
            </p>
          </div>
          
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-gray-400">
              Yes, you can upgrade to Pro Creator at any time for $19.99/month to access all specialized GPT assistants. 
              The Meme Coin Creator package is a one-time purchase that includes all the tools needed for token creation.
            </p>
          </div>
          
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-2">What's the difference between individual GPTs and the bundle?</h3>
            <p className="text-gray-400">
              Individual GPT assistants cost $19.99 each and provide specialized AI help in one area. The All GPT Assistants Bundle gives you access to all 7 specialized GPTs for just $100, saving you over 30%.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />

      {selectedProduct && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
}