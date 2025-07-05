import React, { useState } from 'react';
import { 
  X, Wallet, Download, Smartphone, Shield, Globe, Zap, 
  Star, CheckCircle, ExternalLink, Copy, AlertTriangle 
} from 'lucide-react';

interface WalletDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletDownloadModal({ isOpen, onClose }: WalletDownloadModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'android' | 'ios'>('windows');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  if (!isOpen) return null;

  const createWalletHTML = (platform: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OPTIK Wallet - ${platform}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            margin-bottom: 30px;
            border: 1px solid rgba(56, 189, 248, 0.3);
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
        }
        
        .title {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #06b6d4, #3b82f6, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #94a3b8;
            font-size: 1.2rem;
        }
        
        .wallet-interface {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(56, 189, 248, 0.2);
            backdrop-filter: blur(10px);
            margin-bottom: 30px;
        }
        
        .balance-section {
            text-align: center;
            padding: 30px;
            background: rgba(6, 182, 212, 0.1);
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid rgba(6, 182, 212, 0.3);
        }
        
        .balance-amount {
            font-size: 3rem;
            font-weight: bold;
            color: #06b6d4;
            margin-bottom: 10px;
        }
        
        .balance-usd {
            color: #94a3b8;
            font-size: 1.2rem;
        }
        
        .actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .action-btn {
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border: none;
            padding: 20px;
            border-radius: 15px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
        }
        
        .action-icon {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
        
        .tokens-list {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(56, 189, 248, 0.2);
        }
        
        .token-item {
            display: flex;
            justify-content: between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid rgba(56, 189, 248, 0.1);
            transition: all 0.3s ease;
        }
        
        .token-item:hover {
            background: rgba(6, 182, 212, 0.1);
            border-radius: 10px;
        }
        
        .token-info {
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 1;
        }
        
        .token-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        }
        
        .token-details h4 {
            color: white;
            margin-bottom: 5px;
        }
        
        .token-details p {
            color: #94a3b8;
            font-size: 0.9rem;
        }
        
        .token-balance {
            text-align: right;
        }
        
        .token-amount {
            color: white;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .token-value {
            color: #94a3b8;
            font-size: 0.9rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .feature-card {
            background: rgba(30, 41, 59, 0.6);
            padding: 25px;
            border-radius: 15px;
            border: 1px solid rgba(56, 189, 248, 0.2);
            text-align: center;
        }
        
        .feature-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border-radius: 50%;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .feature-title {
            color: white;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .feature-desc {
            color: #94a3b8;
            font-size: 0.9rem;
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            color: #64748b;
            border-top: 1px solid rgba(56, 189, 248, 0.1);
            margin-top: 40px;
        }
        
        .download-info {
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .platform-badge {
            display: inline-block;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }
            
            .balance-amount {
                font-size: 2rem;
            }
            
            .actions {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">OW</div>
            <h1 class="title">OPTIK Wallet</h1>
            <p class="subtitle">AI-Powered Crypto Wallet for the OptikCoin Ecosystem</p>
        </div>
        
        <div class="download-info">
            <div class="platform-badge">${platform} Version</div>
            <h3 style="color: #06b6d4; margin-bottom: 10px;">Welcome to OPTIK Wallet!</h3>
            <p style="color: #94a3b8;">This is a preview of your OPTIK Wallet interface. The actual wallet application is currently in development.</p>
        </div>
        
        <div class="wallet-interface">
            <div class="balance-section">
                <div class="balance-amount">1,250.00 OPTK</div>
                <div class="balance-usd">≈ $3,125.00 USD</div>
            </div>
            
            <div class="actions">
                <button class="action-btn">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    Send
                </button>
                <button class="action-btn">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Receive
                </button>
                <button class="action-btn">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Swap
                </button>
                <button class="action-btn">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Stake
                </button>
            </div>
            
            <div class="tokens-list">
                <h3 style="color: white; margin-bottom: 20px;">Your Tokens</h3>
                
                <div class="token-item">
                    <div class="token-info">
                        <div class="token-icon">O</div>
                        <div class="token-details">
                            <h4>OptikCoin</h4>
                            <p>OPTK</p>
                        </div>
                    </div>
                    <div class="token-balance">
                        <div class="token-amount">1,250.00</div>
                        <div class="token-value">$3,125.00</div>
                    </div>
                </div>
                
                <div class="token-item">
                    <div class="token-info">
                        <div class="token-icon">S</div>
                        <div class="token-details">
                            <h4>Solana</h4>
                            <p>SOL</p>
                        </div>
                    </div>
                    <div class="token-balance">
                        <div class="token-amount">12.45</div>
                        <div class="token-value">$1,220.25</div>
                    </div>
                </div>
                
                <div class="token-item">
                    <div class="token-info">
                        <div class="token-icon">U</div>
                        <div class="token-details">
                            <h4>USD Coin</h4>
                            <p>USDC</p>
                        </div>
                    </div>
                    <div class="token-balance">
                        <div class="token-amount">500.00</div>
                        <div class="token-value">$500.00</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                </div>
                <div class="feature-title">Military-Grade Security</div>
                <div class="feature-desc">AES-256 encryption & biometric authentication</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                    </svg>
                </div>
                <div class="feature-title">Lightning Fast</div>
                <div class="feature-desc">Instant transactions & real-time updates</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="feature-title">Multi-Chain Support</div>
                <div class="feature-desc">Solana, Ethereum, Polygon & more</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <div class="feature-title">AI-Powered Insights</div>
                <div class="feature-desc">Smart portfolio optimization & alerts</div>
            </div>
        </div>
        
        <div class="footer">
            <p>OPTIK Wallet v2.0.0 - Built by OptikDexGPT Team</p>
            <p>Secure • Fast • Feature-Rich</p>
        </div>
    </div>
    
    <script>
        // Add some interactivity
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                }, 150);
            });
        });
        
        document.querySelectorAll('.token-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.background = 'rgba(6, 182, 212, 0.2)';
                setTimeout(() => {
                    this.style.background = '';
                }, 300);
            });
        });
        
        // Simulate real-time price updates
        setInterval(() => {
            const tokenValues = document.querySelectorAll('.token-value');
            tokenValues.forEach(value => {
                const currentValue = parseFloat(value.textContent.replace('$', '').replace(',', ''));
                const change = (Math.random() - 0.5) * 0.02;
                const newValue = currentValue * (1 + change);
                value.textContent = '$' + newValue.toFixed(2);
            });
        }, 5000);
    </script>
</body>
</html>`;
  };

  const platforms = {
    windows: {
      name: 'Windows',
      fileName: 'OptikWallet-Setup-2.0.0.html',
      size: '125 MB',
      requirements: 'Windows 10 or later',
      steps: [
        'Download OptikWallet-Setup-2.0.0.html',
        'Open the file in your browser',
        'Bookmark for easy access',
        'Create desktop shortcut',
        'Start using your wallet interface'
      ]
    },
    mac: {
      name: 'macOS',
      fileName: 'OptikWallet-2.0.0.html',
      size: '118 MB',
      requirements: 'macOS 10.15 or later',
      steps: [
        'Download OptikWallet-2.0.0.html',
        'Open the file in Safari or Chrome',
        'Add to Dock for quick access',
        'Enable full-screen mode',
        'Start using your wallet interface'
      ]
    },
    android: {
      name: 'Android',
      fileName: 'OptikWallet-Mobile.html',
      size: '45 MB',
      requirements: 'Android 8.0+',
      store: 'Direct Download',
      steps: [
        'Download OptikWallet-Mobile.html',
        'Open in Chrome or Firefox',
        'Add to home screen',
        'Enable notifications',
        'Start using your mobile wallet'
      ]
    },
    ios: {
      name: 'iOS',
      fileName: 'OptikWallet-iOS.html',
      size: '52 MB',
      requirements: 'iOS 13.0+',
      store: 'Direct Download',
      steps: [
        'Download OptikWallet-iOS.html',
        'Open in Safari',
        'Add to home screen',
        'Enable full-screen mode',
        'Start using your mobile wallet'
      ]
    }
  };

  const handleDownload = () => {
    const platform = platforms[selectedPlatform];
    const walletHTML = createWalletHTML(platform.name);
    
    // Create and download the HTML file
    const blob = new Blob([walletHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = platform.fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success notification
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  const copyDownloadLink = () => {
    const demoText = `OPTIK Wallet ${platforms[selectedPlatform].name} - Download the HTML file and open in your browser for a preview of the wallet interface.`;
    navigator.clipboard.writeText(demoText);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">Download OPTIK Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Platform Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(Object.keys(platforms) as Array<keyof typeof platforms>).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedPlatform === platform
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                    : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50 text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  {platform === 'windows' || platform === 'mac' ? (
                    <Download className="w-8 h-8 mb-2" />
                  ) : (
                    <Smartphone className="w-8 h-8 mb-2" />
                  )}
                  <span>{platforms[platform].name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Platform Details */}
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{platforms[selectedPlatform].name}</h3>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">File:</span> {platforms[selectedPlatform].fileName}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">Type:</span> Interactive HTML Wallet Interface
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">Requirements:</span> {platforms[selectedPlatform].requirements}
                  </p>
                  {(selectedPlatform === 'android' || selectedPlatform === 'ios') && (
                    <p className="text-gray-300 text-sm">
                      <span className="text-gray-400">Access:</span> {platforms[selectedPlatform].store}
                    </p>
                  )}
                </div>
              </div>
              {selectedPlatform === 'windows' || selectedPlatform === 'mac' ? (
                <Download className="w-12 h-12 text-blue-400" />
              ) : (
                <Smartphone className="w-12 h-12 text-green-400" />
              )}
            </div>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Setup Steps:</h4>
              <ol className="space-y-2">
                {platforms[selectedPlatform].steps.map((step, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download OPTIK Wallet</span>
              </button>
              <button
                onClick={copyDownloadLink}
                className="p-3 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                title="Copy info"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>

            {downloadStarted && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">Wallet interface downloaded! Open the HTML file in your browser to see the OPTIK Wallet UI.</p>
              </div>
            )}

            {copiedToClipboard && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-blue-400 text-sm">Information copied to clipboard!</p>
              </div>
            )}
          </div>

          {/* Preview Notice */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-amber-400 font-medium">Preview Version</p>
                <p className="text-amber-300/80 text-sm mt-1">
                  This downloads an interactive HTML preview of the OPTIK Wallet interface. The full native application is currently in development and will be available soon.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Wallet Features Preview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Globe, text: 'Multi-chain support' },
                { icon: Shield, text: 'Military-grade security' },
                { icon: Star, text: 'AI-powered insights' },
                { icon: Zap, text: 'Lightning fast transactions' },
                { icon: Wallet, text: 'DeFi integration' },
                { icon: CheckCircle, text: 'Cross-chain swaps' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium">Secure & Trusted</p>
                <p className="text-green-300/80 text-sm mt-1">
                  OPTIK Wallet uses industry-leading security standards to keep your assets safe. This preview showcases the user interface design and features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}