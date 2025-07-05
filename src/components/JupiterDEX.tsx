import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useJupiter } from '@jup-ag/react-hook';
import { PublicKey } from '@solana/web3.js';
import { ArrowUpDown, RefreshCw, Settings, AlertCircle, ChevronDown, Zap, Info, ExternalLink } from 'lucide-react';
import Decimal from 'decimal.js';

// Token list with common Solana tokens
const TOKENS = [
  { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112', decimals: 9, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
  { symbol: 'USDC', name: 'USD Coin', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
  { symbol: 'USDT', name: 'Tether', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png' },
  { symbol: 'BONK', name: 'Bonk', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png' },
  { symbol: 'OPTK', name: 'OptikCoin', mint: 'OPTK1234567890123456789012345678901234567890', decimals: 9, logoURI: 'https://via.placeholder.com/40/0891b2/FFFFFF?text=OC' },
];

export default function JupiterDEX() {
  const { connected, publicKey, signTransaction } = useWallet();
  const { setVisible } = useWalletModal();
  
  // Token selection state
  const [inputToken, setInputToken] = useState(TOKENS[0]); // Default to SOL
  const [outputToken, setOutputToken] = useState(TOKENS[1]); // Default to USDC
  const [inputAmount, setInputAmount] = useState('');
  const [slippage, setSlippage] = useState(1); // 1% default slippage
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  // Format the input amount to the correct decimal places for Jupiter
  const formattedInputAmount = inputAmount 
    ? new Decimal(inputAmount).mul(new Decimal(10).pow(inputToken.decimals)).toString() 
    : '0';

  // Jupiter hook for quote and swap
  const {
    exchange,
    quoteResponseMeta,
    loading: jupiterLoading,
    error,
    refresh,
    lastRefreshTimestamp
  } = useJupiter({
    amount: formattedInputAmount, // Raw input amount (adjusted for decimals)
    inputMint: new PublicKey(inputToken.mint),
    outputMint: new PublicKey(outputToken.mint),
    slippageBps: slippage * 100, // Convert percentage to basis points
    debounceTime: 250,
  });

  // Swap tokens positions
  const handleSwapTokens = () => {
    const temp = inputToken;
    setInputToken(outputToken);
    setOutputToken(temp);
    setInputAmount('');
  };

  // Handle the actual swap transaction
  const handleSwap = async () => {
    if (!connected || !publicKey || !signTransaction || !quoteResponseMeta || !inputAmount) {
      if (!connected) {
        setVisible(true); // Open wallet modal if not connected
      }
      return;
    }

    setIsSwapping(true);
    setSwapStatus('loading');
    setStatusMessage('Preparing transaction...');

    try {
      setStatusMessage('Executing swap...');
      const swapResult = await exchange();
      
      if ('error' in swapResult) {
        throw new Error(swapResult.error);
      }
      
      setSwapStatus('success');
      setStatusMessage('Swap completed successfully!');
      setInputAmount('');
      
      // Reset after a few seconds
      setTimeout(() => {
        setSwapStatus('idle');
        setStatusMessage('');
      }, 5000);
    } catch (err: any) {
      console.error('Swap failed:', err);
      setSwapStatus('error');
      setStatusMessage(`Swap failed: ${err.message || 'Unknown error'}`);
      
      // Reset after a few seconds
      setTimeout(() => {
        setSwapStatus('idle');
        setStatusMessage('');
      }, 5000);
    } finally {
      setIsSwapping(false);
    }
  };

  // Format output amount for display
  const getOutputAmount = () => {
    if (!quoteResponseMeta || !quoteResponseMeta.outAmount) return '0';
    
    return new Decimal(quoteResponseMeta.outAmount)
      .div(new Decimal(10).pow(outputToken.decimals))
      .toFixed(outputToken.decimals)
      .replace(/\.?0+$/, '');
  };

  // Calculate price impact
  const getPriceImpact = () => {
    if (!quoteResponseMeta || !quoteResponseMeta.priceImpactPct) return '0';
    
    const impact = parseFloat(quoteResponseMeta.priceImpactPct) * 100;
    return impact.toFixed(2);
  };

  // Get route info
  const getRouteInfo = () => {
    if (!quoteResponseMeta || !quoteResponseMeta.routePlan) return [];
    
    return quoteResponseMeta.routePlan;
  };

  // Format price
  const getPrice = () => {
    if (!inputAmount || !quoteResponseMeta || !quoteResponseMeta.outAmount) return '0';
    
    const inAmount = new Decimal(formattedInputAmount);
    const outAmount = new Decimal(quoteResponseMeta.outAmount);
    
    if (inAmount.isZero()) return '0';
    
    const price = outAmount.div(inAmount)
      .mul(new Decimal(10).pow(inputToken.decimals))
      .div(new Decimal(10).pow(outputToken.decimals));
    
    return price.toFixed(6);
  };

  // Last refreshed time
  const getLastRefreshed = () => {
    if (!lastRefreshTimestamp) return 'Not yet refreshed';
    
    const date = new Date(lastRefreshTimestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Jupiter DEX</h2>
          <div className="flex space-x-2">
            <button 
              onClick={refresh} 
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
              title="Refresh quotes"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${jupiterLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
              title="Settings"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <h3 className="text-white font-medium mb-3">Swap Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slippage Tolerance (%)</label>
                <div className="flex space-x-2">
                  {[0.1, 0.5, 1, 2].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        slippage === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white text-sm"
                    min="0.1"
                    max="50"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* From Token */}
        <div className="space-y-4">
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">From</span>
              {connected && (
                <span className="text-gray-400 text-sm">
                  Balance: 0.00
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="0.0"
                value={inputAmount}
                onChange={(e) => {
                  // Only allow numbers and decimals
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  if (value === '.' || (value.match(/\./g) || []).length <= 1) {
                    setInputAmount(value);
                  }
                }}
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
              />
              <div className="relative">
                <button
                  onClick={() => document.getElementById('inputTokenSelector')?.classList.toggle('hidden')}
                  className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-500/50 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  {inputToken.logoURI && (
                    <img src={inputToken.logoURI} alt={inputToken.symbol} className="w-5 h-5 rounded-full" />
                  )}
                  <span className="text-white">{inputToken.symbol}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* Input Token Selector Dropdown */}
                <div id="inputTokenSelector" className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 hidden">
                  <div className="p-2">
                    <div className="text-sm text-gray-400 mb-2">Select Token</div>
                    <div className="max-h-60 overflow-y-auto">
                      {TOKENS.map((token) => (
                        <button
                          key={token.mint}
                          onClick={() => {
                            setInputToken(token);
                            document.getElementById('inputTokenSelector')?.classList.add('hidden');
                            // If same as output token, swap them
                            if (token.mint === outputToken.mint) {
                              setOutputToken(inputToken);
                            }
                          }}
                          className={`w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
                            token.mint === inputToken.mint ? 'bg-gray-700' : ''
                          }`}
                          disabled={token.mint === outputToken.mint}
                        >
                          {token.logoURI && (
                            <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
                          )}
                          <div className="text-left">
                            <div className="text-white">{token.symbol}</div>
                            <div className="text-gray-400 text-xs">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 z-10">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-gray-700/50 hover:bg-blue-600/20 border border-gray-600/50 hover:border-blue-500/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">To (Estimated)</span>
              {connected && (
                <span className="text-gray-400 text-sm">
                  Balance: 0.00
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="0.0"
                value={getOutputAmount()}
                readOnly
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
              />
              <div className="relative">
                <button
                  onClick={() => document.getElementById('outputTokenSelector')?.classList.toggle('hidden')}
                  className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-500/50 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  {outputToken.logoURI && (
                    <img src={outputToken.logoURI} alt={outputToken.symbol} className="w-5 h-5 rounded-full" />
                  )}
                  <span className="text-white">{outputToken.symbol}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* Output Token Selector Dropdown */}
                <div id="outputTokenSelector" className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 hidden">
                  <div className="p-2">
                    <div className="text-sm text-gray-400 mb-2">Select Token</div>
                    <div className="max-h-60 overflow-y-auto">
                      {TOKENS.map((token) => (
                        <button
                          key={token.mint}
                          onClick={() => {
                            setOutputToken(token);
                            document.getElementById('outputTokenSelector')?.classList.add('hidden');
                            // If same as input token, swap them
                            if (token.mint === inputToken.mint) {
                              setInputToken(outputToken);
                            }
                          }}
                          className={`w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
                            token.mint === outputToken.mint ? 'bg-gray-700' : ''
                          }`}
                          disabled={token.mint === inputToken.mint}
                        >
                          {token.logoURI && (
                            <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
                          )}
                          <div className="text-left">
                            <div className="text-white">{token.symbol}</div>
                            <div className="text-gray-400 text-xs">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {quoteResponseMeta && inputAmount && (
          <div className="mt-4 p-4 bg-gray-700/20 rounded-lg border border-gray-600/20">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Rate</span>
                <span>1 {inputToken.symbol} ≈ {getPrice()} {outputToken.symbol}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Price Impact</span>
                <span className={`${parseFloat(getPriceImpact()) > 5 ? 'text-red-400' : 'text-green-400'}`}>
                  {getPriceImpact()}%
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Route</span>
                <span className="flex items-center">
                  <span className="text-blue-400">{getRouteInfo().length} hop(s)</span>
                  <Info className="w-3 h-3 text-gray-400 ml-1" />
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Slippage</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Last Updated</span>
                <span>{getLastRefreshed()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error.toString()}</p>
          </div>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
            swapStatus === 'loading' ? 'bg-blue-500/10 border border-blue-500/20' :
            swapStatus === 'success' ? 'bg-green-500/10 border border-green-500/20' :
            'bg-red-500/10 border border-red-500/20'
          }`}>
            {swapStatus === 'loading' && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
            {swapStatus === 'success' && <Zap className="w-4 h-4 text-green-400" />}
            {swapStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
            <p className={`text-sm ${
              swapStatus === 'loading' ? 'text-blue-400' :
              swapStatus === 'success' ? 'text-green-400' :
              'text-red-400'
            }`}>{statusMessage}</p>
          </div>
        )}

        {/* Swap Button */}
        <button 
          onClick={handleSwap}
          disabled={!connected || !inputAmount || jupiterLoading || isSwapping || !quoteResponseMeta}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25"
        >
          {!connected ? (
            <span>Connect Wallet</span>
          ) : isSwapping ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Swapping...</span>
            </>
          ) : !inputAmount ? (
            <span>Enter an amount</span>
          ) : jupiterLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading quote...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Swap</span>
            </>
          )}
        </button>

        {/* Jupiter Attribution */}
        <div className="mt-4 text-center">
          <a 
            href="https://jup.ag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-gray-400 hover:text-gray-300"
          >
            Powered by Jupiter <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}