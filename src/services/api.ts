import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
  },
  
  // Wallet
  wallet: {
    balance: '/wallet/balance',
    transactions: '/wallet/transactions',
    send: '/wallet/send',
    receive: '/wallet/receive',
    stake: '/wallet/stake',
    unstake: '/wallet/unstake',
  },
  
  // Trading
  trading: {
    pairs: '/trading/pairs',
    orderbook: '/trading/orderbook',
    trades: '/trading/trades',
    orders: '/trading/orders',
    history: '/trading/history',
  },
  
  // GPT
  gpt: {
    chat: '/gpt/chat',
    models: '/gpt/models',
    conversations: '/gpt/conversations',
    usage: '/gpt/usage',
  },
  
  // Mining
  mining: {
    stats: '/mining/stats',
    pools: '/mining/pools',
    rewards: '/mining/rewards',
    start: '/mining/start',
    stop: '/mining/stop',
  },
  
  // Analytics
  analytics: {
    portfolio: '/analytics/portfolio',
    market: '/analytics/market',
    performance: '/analytics/performance',
    trends: '/analytics/trends',
  },
  
  // Security
  security: {
    audit: '/security/audit',
    alerts: '/security/alerts',
    settings: '/security/settings',
    reports: '/security/reports',
  },
  
  // Meme Creator
  memeCreator: {
    create: '/meme-creator/create',
    deploy: '/meme-creator/deploy',
    templates: '/meme-creator/templates',
    history: '/meme-creator/history',
  },
};

// API service functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post(endpoints.auth.login, credentials),
  
  register: (userData: { email: string; password: string; name: string }) =>
    apiClient.post(endpoints.auth.register, userData),
  
  logout: () => apiClient.post(endpoints.auth.logout),
  
  refreshToken: () => apiClient.post(endpoints.auth.refresh),
  
  verifyEmail: (token: string) =>
    apiClient.post(endpoints.auth.verify, { token }),
};

export const walletAPI = {
  getBalance: () => apiClient.get(endpoints.wallet.balance),
  
  getTransactions: (params?: { page?: number; limit?: number }) =>
    apiClient.get(endpoints.wallet.transactions, { params }),
  
  sendTokens: (data: { to: string; amount: number; token: string }) =>
    apiClient.post(endpoints.wallet.send, data),
  
  stakeTokens: (data: { amount: number; duration: number }) =>
    apiClient.post(endpoints.wallet.stake, data),
  
  unstakeTokens: (stakeId: string) =>
    apiClient.post(endpoints.wallet.unstake, { stakeId }),
};

export const tradingAPI = {
  getTradingPairs: () => apiClient.get(endpoints.trading.pairs),
  
  getOrderbook: (pair: string) =>
    apiClient.get(`${endpoints.trading.orderbook}/${pair}`),
  
  placeBuyOrder: (data: { pair: string; amount: number; price: number }) =>
    apiClient.post(endpoints.trading.orders, { ...data, type: 'buy' }),
  
  placeSellOrder: (data: { pair: string; amount: number; price: number }) =>
    apiClient.post(endpoints.trading.orders, { ...data, type: 'sell' }),
  
  getTradeHistory: (params?: { pair?: string; limit?: number }) =>
    apiClient.get(endpoints.trading.history, { params }),
};

export const gptAPI = {
  sendMessage: (data: { message: string; model: string; conversationId?: string }) =>
    apiClient.post(endpoints.gpt.chat, data),
  
  getModels: () => apiClient.get(endpoints.gpt.models),
  
  getConversations: () => apiClient.get(endpoints.gpt.conversations),
  
  getUsage: () => apiClient.get(endpoints.gpt.usage),
};

export const miningAPI = {
  getStats: () => apiClient.get(endpoints.mining.stats),
  
  getPools: () => apiClient.get(endpoints.mining.pools),
  
  startMining: (poolId: string) =>
    apiClient.post(endpoints.mining.start, { poolId }),
  
  stopMining: () => apiClient.post(endpoints.mining.stop),
  
  getRewards: () => apiClient.get(endpoints.mining.rewards),
};

export const analyticsAPI = {
  getPortfolioAnalytics: () => apiClient.get(endpoints.analytics.portfolio),
  
  getMarketAnalytics: (params?: { timeframe?: string }) =>
    apiClient.get(endpoints.analytics.market, { params }),
  
  getPerformanceMetrics: () => apiClient.get(endpoints.analytics.performance),
  
  getTrends: () => apiClient.get(endpoints.analytics.trends),
};

export const securityAPI = {
  runAudit: () => apiClient.post(endpoints.security.audit),
  
  getAlerts: () => apiClient.get(endpoints.security.alerts),
  
  updateSettings: (settings: any) =>
    apiClient.put(endpoints.security.settings, settings),
  
  getReports: () => apiClient.get(endpoints.security.reports),
};

export const memeCreatorAPI = {
  createToken: (data: {
    name: string;
    symbol: string;
    description: string;
    totalSupply: number;
    decimals: number;
    image?: File;
  }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
    return apiClient.post(endpoints.memeCreator.create, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  deployToken: (tokenId: string) =>
    apiClient.post(endpoints.memeCreator.deploy, { tokenId }),
  
  getTemplates: () => apiClient.get(endpoints.memeCreator.templates),
  
  getHistory: () => apiClient.get(endpoints.memeCreator.history),
};