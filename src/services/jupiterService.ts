import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { TokenInfo } from '@solana/spl-token-registry';

// Jupiter API endpoints
const JUPITER_QUOTE_API = 'https://quote-api.jup.ag/v6/quote';
const JUPITER_SWAP_API = 'https://quote-api.jup.ag/v6/swap';

// Types
export interface QuoteParams {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps: number;
  onlyDirectRoutes?: boolean;
}

export interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee: any;
  priceImpactPct: string;
  routePlan: RoutePlan[];
  contextSlot: number;
}

export interface RoutePlan {
  swapInfo: {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
  };
}

export interface SwapParams {
  quoteResponse: QuoteResponse;
  userPublicKey: string;
  wrapAndUnwrapSol?: boolean;
}

export interface SwapResponse {
  swapTransaction: string;
}

export class JupiterService {
  private connection: Connection;
  
  constructor(connection: Connection) {
    this.connection = connection;
  }
  
  /**
   * Get a quote for a swap
   */
  async getQuote(params: QuoteParams): Promise<QuoteResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('inputMint', params.inputMint);
    searchParams.append('outputMint', params.outputMint);
    searchParams.append('amount', params.amount);
    searchParams.append('slippageBps', params.slippageBps.toString());
    
    if (params.onlyDirectRoutes) {
      searchParams.append('onlyDirectRoutes', 'true');
    }
    
    const response = await fetch(`${JUPITER_QUOTE_API}?${searchParams.toString()}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get quote: ${errorText}`);
    }
    
    return await response.json();
  }
  
  /**
   * Create a swap transaction
   */
  async createSwapTransaction(params: SwapParams): Promise<Transaction | VersionedTransaction> {
    const response = await fetch(JUPITER_SWAP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quoteResponse: params.quoteResponse,
        userPublicKey: params.userPublicKey,
        wrapAndUnwrapSol: params.wrapAndUnwrapSol ?? true
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create swap transaction: ${errorText}`);
    }
    
    const { swapTransaction } = await response.json();
    
    // Deserialize the transaction
    const serializedTransaction = Buffer.from(swapTransaction, 'base64');
    
    try {
      // Try to deserialize as a versioned transaction first
      return VersionedTransaction.deserialize(serializedTransaction);
    } catch (e) {
      // If that fails, try as a legacy transaction
      return Transaction.from(serializedTransaction);
    }
  }
  
  /**
   * Fetch token list from Jupiter
   */
  async getTokenList(): Promise<TokenInfo[]> {
    const response = await fetch('https://token.jup.ag/all');
    
    if (!response.ok) {
      throw new Error('Failed to fetch token list');
    }
    
    return await response.json();
  }
  
  /**
   * Get token balances for a wallet
   */
  async getTokenBalances(walletPublicKey: PublicKey): Promise<Map<string, string>> {
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    
    const balances = new Map<string, string>();
    
    // Add token balances
    tokenAccounts.value.forEach(({ account }) => {
      const parsedInfo = account.data.parsed.info;
      const mintAddress = parsedInfo.mint;
      const balance = parsedInfo.tokenAmount.uiAmount.toString();
      balances.set(mintAddress, balance);
    });
    
    // Add SOL balance
    const solBalance = await this.connection.getBalance(walletPublicKey);
    balances.set('So11111111111111111111111111111111111111112', 
      (solBalance / 1_000_000_000).toString());
    
    return balances;
  }
}