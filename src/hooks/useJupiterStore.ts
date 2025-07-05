import { create } from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';
import { TokenInfo } from '@solana/spl-token-registry';

interface JupiterStore {
  // Connection
  connection: Connection | null;
  setConnection: (connection: Connection) => void;
  
  // Token lists
  tokenMap: Map<string, TokenInfo>;
  tokensList: TokenInfo[];
  loadingTokens: boolean;
  fetchTokens: () => Promise<void>;
  
  // User balances
  userTokenBalances: Map<string, string>;
  loadingBalances: boolean;
  fetchBalances: (publicKey: PublicKey) => Promise<void>;
  
  // Recent transactions
  recentTransactions: any[];
  addTransaction: (tx: any) => void;
}

export const useJupiterStore = create<JupiterStore>((set, get) => ({
  // Connection
  connection: null,
  setConnection: (connection) => set({ connection }),
  
  // Token lists
  tokenMap: new Map(),
  tokensList: [],
  loadingTokens: false,
  fetchTokens: async () => {
    const { loadingTokens } = get();
    if (loadingTokens) return;
    
    set({ loadingTokens: true });
    try {
      // Fetch from Jupiter API
      const response = await fetch('https://token.jup.ag/all');
      const tokens = await response.json();
      
      // Create map for quick lookups
      const tokenMap = new Map();
      tokens.forEach((token: TokenInfo) => {
        tokenMap.set(token.address, token);
      });
      
      set({ 
        tokenMap,
        tokensList: tokens,
        loadingTokens: false
      });
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
      set({ loadingTokens: false });
    }
  },
  
  // User balances
  userTokenBalances: new Map(),
  loadingBalances: false,
  fetchBalances: async (publicKey) => {
    const { connection, loadingBalances } = get();
    if (loadingBalances || !connection) return;
    
    set({ loadingBalances: true });
    try {
      // This is a simplified version - in a real app you'd use getTokenAccountsByOwner
      // and parse the data properly
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );
      
      const balances = new Map();
      tokenAccounts.value.forEach(({ account }) => {
        const parsedInfo = account.data.parsed.info;
        const mintAddress = parsedInfo.mint;
        const balance = parsedInfo.tokenAmount.uiAmount.toString();
        balances.set(mintAddress, balance);
      });
      
      // Add SOL balance
      const solBalance = await connection.getBalance(publicKey);
      balances.set('So11111111111111111111111111111111111111112', 
        (solBalance / 1_000_000_000).toString());
      
      set({ 
        userTokenBalances: balances,
        loadingBalances: false
      });
    } catch (error) {
      console.error('Failed to fetch balances:', error);
      set({ loadingBalances: false });
    }
  },
  
  // Recent transactions
  recentTransactions: [],
  addTransaction: (tx) => set(state => ({ 
    recentTransactions: [tx, ...state.recentTransactions].slice(0, 10)
  })),
}));