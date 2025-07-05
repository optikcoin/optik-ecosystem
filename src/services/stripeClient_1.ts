import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  console.warn('Missing Stripe publishable key. Stripe functionality will be limited.')
}

export const stripePromise = loadStripe(stripePublishableKey || '')

export interface PaymentIntentData {
  client_secret: string
  payment_intent_id: string
}

export interface SubscriptionData {
  subscription_id: string
  status: string
  client_secret?: string
}

// Payment processing utilities
export const processPayment = async (
  clientSecret: string,
  paymentMethod: any,
  billingDetails?: any
) => {
  const stripe = await stripePromise
  if (!stripe) {
    throw new Error('Stripe not initialized')
  }

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod,
    ...(billingDetails && { billing_details: billingDetails })
  })

  if (error) {
    throw new Error(error.message)
  }

  return paymentIntent
}

export const processSubscription = async (
  clientSecret: string,
  paymentMethod: any,
  billingDetails?: any
) => {
  const stripe = await stripePromise
  if (!stripe) {
    throw new Error('Stripe not initialized')
  }

  const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
    payment_method: paymentMethod,
    ...(billingDetails && { billing_details: billingDetails })
  })

  if (error) {
    throw new Error(error.message)
  }

  return setupIntent
}

export const createPaymentMethod = async (cardElement: any, billingDetails: any) => {
  const stripe = await stripePromise
  if (!stripe) {
    throw new Error('Stripe not initialized')
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: billingDetails
  })

  if (error) {
    throw new Error(error.message)
  }

  return paymentMethod
}

// Price formatting utilities
export const formatPrice = (amount: number, currency = 'usd') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount)
}

export const formatSubscriptionPrice = (amount: number, interval: string, currency = 'usd') => {
  const formattedAmount = formatPrice(amount, currency)
  return `${formattedAmount}/${interval}`
}

// Plan configurations
export const SUBSCRIPTION_PLANS = {
  pro_creator: {
    name: 'Pro Creator',
    price: 49.99,
    interval: 'month',
    features: [
      'Unlimited AI assistance',
      'Advanced trading analytics',
      'Anti-bot protection tools',
      'Smart contract templates',
      'Priority customer support',
      'Advanced chart features',
      'Portfolio tracking',
      'Market alerts'
    ]
  },
  ultimate_bundle: {
    name: 'Ultimate Creator Bundle',
    price: 799.99,
    interval: 'one-time',
    monthlyPrice: 99.99,
    features: [
      'Everything in Pro Creator',
      'Token creation & deployment',
      'Minimum liquidity funding',
      'OPTK backing support',
      'Optik Website Builder AI',
      'Optik Viral GPT marketing',
      'Viral Social Media Posts',
      'Advanced LLM trading analysis',
      'Meme Coin Promotion GPT',
      'Launch marketing boost',
      'Dedicated launch support',
      'Post-launch monitoring',
      'Ongoing monthly AI access'
    ]
  }
}

export const ONE_TIME_PURCHASES = {
  website_builder: {
    name: 'Optik Website Builder AI',
    price: 99.99,
    description: 'AI-powered website creation for your meme coin project'
  },
  viral_gpt: {
    name: 'Optik Viral GPT',
    price: 99.99,
    description: 'Advanced viral marketing strategies and campaign planning'
  },
  social_media_posts: {
    name: 'Viral Social Media Posts',
    price: 99.99,
    description: 'AI-generated viral content for all major social platforms'
  },
  advanced_llm: {
    name: 'Optik GPT Advanced LLM',
    price: 99.99,
    description: 'Predictive trading analysis and advanced market strategies'
  },
  promotion_gpt: {
    name: 'Meme Coin Promotion GPT',
    price: 99.99,
    description: 'Comprehensive promotion and community building tools'
  }
}