import React, { useState } from 'react';
import { 
  Wallet, Download, Smartphone, Shield, Globe, Zap, 
  Star, CheckCircle, ExternalLink, Copy, AlertTriangle 
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function OptikWalletDownload() {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'features'>('desktop');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const walletFeatures = [
    { name: 'Multi-Chain Support', description: 'Solana, Ethereum, Polygon & more', icon: Globe },
    { name: 'Military-Grade Security', description: 'AES-256 encryption & biometric locks', icon: Shield },
    { name: 'AI-Powered Insights', description: 'Smart portfolio optimization & alerts', icon: Star },
    { name: 'Lightning Fast', description: 'Instant transactions & real-time updates', icon: Zap },
    { name: 'DeFi Integration', description: 'Staking, swapping & yield farming', icon: Wallet },
    { name: 'Cross-Chain Swaps', description: 'Seamless token exchanges across blockchains', icon: ExternalLink }
  ];

  const createWalletHTML = (platform: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        
        .tokens-list {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(56, 189, 248, 0.2);
        }
        
        .token-item {
            display: flex;
            justify-between;
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
            <p style="color: #94a3b8;">This is a preview of your OPTIK Wallet interface designed to match OptikDexGPT.com</p>
        </div>
        
        <div class="wallet-interface">
            <div class="balance-section">
                <div class="balance-amount">1,250.00 OPTK</div>
                <div class="balance-usd">≈ $3,125.00 USD</div>
            </div>
            
            <div class="actions">
                <button class="action-btn">
                    <span style="font-size: 24px;">📤</span>
                    Send
                </button>
                <button class="action-btn">
                    <span style="font-size: 24px;">📥</span>
                    Receive
                </button>
                <button class="action-btn">
                    <span style="font-size: 24px;">🔄</span>
                    Swap
                </button>
                <button class="action-btn">
                    <span style="font-size: 24px;">⭐</span>
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
        
        <div class="footer">
            <p>OPTIK Wallet v2.0.0 - Built by OptikDexGPT Team</p>
            <p>Secure • Fast • Feature-Rich • Designed like OptikDexGPT.com</p>
        </div>
    </div>
    
    <script>
        // Add interactivity
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
    </script>
</body>
</html>`;
  };

  const desktopDownloads = [
    { 
      platform: 'Windows', 
      fileName: 'OptikWallet-Windows.html', 
      size: '125 MB',
      requirements: 'Windows 10 or later'
    },
    { 
      platform: 'macOS', 
      fileName: 'OptikWallet-macOS.html', 
      size: '118 MB',
      requirements: 'macOS 10.15 or later'
    },
    { 
      platform: 'Linux', 
      fileName: 'OptikWallet-Linux.html', 
      size: '132 MB',
      requirements: 'Ubuntu 18.04+ or equivalent'
    }
  ];

  const mobileDownloads = [
    { 
      platform: 'Android', 
      fileName: 'OptikWallet-Android.html',
      size: '45 MB',
      requirements: 'Android 8.0+'
    },
    { 
      platform: 'iOS', 
      fileName: 'OptikWallet-iOS.html',
      size: '52 MB',
      requirements: 'iOS 13.0+'
    }
  ];

  const handleDownload = (platform: string) => {
    const walletHTML = createWalletHTML(platform);
    const fileName = `OptikWallet-${platform}.html`;
    
    // Create and download the HTML file
    const blob = new Blob([walletHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success notification
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  const copyDownloadLink = (platform: string) => {
    const text = `OPTIK Wallet ${platform} - Interactive HTML wallet interface that matches OptikDexGPT.com design`;
    navigator.clipboard.writeText(text);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img src={logo} alt="OptikCoin Logo" className="w-16 h-16" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            OPTIK Wallet
          </h1>
        </div>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          The most advanced crypto wallet for the OptikCoin ecosystem - designed to match OptikDexGPT.com
        </p>
        
        {/* Download Started Alert */}
        {downloadStarted && (
          <div className="fixed top-6 right-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 shadow-lg z-50 animate-fade-in-out">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400">Wallet interface downloaded! Open the HTML file in your browser.</p>
            </div>
          </div>
        )}
        
        {/* Copied Alert */}
        {copiedToClipboard && (
          <div className="fixed top-6 right-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 shadow-lg z-50 animate-fade-in-out">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <p className="text-blue-400">Information copied to clipboard!</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'desktop'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'mobile'
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'features'
                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Features</span>
          </button>
        </div>
      </div>

      {/* Desktop Downloads */}
      {activeTab === 'desktop' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Desktop Wallet Interface</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {desktopDownloads.map((download, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{download.platform}</h3>
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">File: {download.fileName}</p>
                    <p className="text-gray-400 text-sm">Type: Interactive HTML Interface</p>
                    <p className="text-gray-400 text-sm">Requirements: {download.requirements}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(download.platform)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => copyDownloadLink(download.platform)}
                      className="p-2 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                      title="Copy info"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Notice */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-amber-400 font-medium">Interactive Preview</p>
                <p className="text-amber-300/80 text-sm mt-1">
                  These downloads provide an interactive HTML preview of the OPTIK Wallet interface that matches the OptikDexGPT.com design. Open the HTML file in any modern browser to experience the wallet UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Downloads */}
      {activeTab === 'mobile' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Mobile Wallet Interface</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileDownloads.map((download, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{download.platform}</h3>
                    <Smartphone className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">File: {download.fileName}</p>
                    <p className="text-gray-400 text-sm">Type: Mobile-Optimized HTML</p>
                    <p className="text-gray-400 text-sm">Requirements: {download.requirements}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(download.platform)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => copyDownloadLink(download.platform)}
                      className="p-2 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                      title="Copy info"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Instructions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Mobile Setup Guide</h2>
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold text-white mb-4">Getting Started</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Download the HTML file</p>
                      <p className="text-gray-400 text-sm">Save the wallet interface file to your device</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Open in mobile browser</p>
                      <p className="text-gray-400 text-sm">Use Chrome, Safari, or Firefox for the best experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Add to home screen</p>
                      <p className="text-gray-400 text-sm">Create a shortcut for quick access to your wallet</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Experience the interface</p>
                      <p className="text-gray-400 text-sm">Explore the wallet features and OptikDexGPT-style design</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {walletFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{feature.name}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Design Philosophy */}
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Design Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Security First</h3>
                <p className="text-gray-300">Every design decision prioritizes user security and asset protection</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">User Experience</h3>
                <p className="text-gray-300">Intuitive interface that matches OptikDexGPT.com aesthetics</p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
                <p className="text-gray-300">Lightning-fast interactions with smooth animations</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download All Button */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Experience OPTIK Wallet?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Download the interactive HTML wallet interface that perfectly matches the OptikDexGPT.com design and experience the future of crypto management.
        </p>
        <button
          onClick={() => handleDownload('All-Platforms')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2 mx-auto"
        >
          <Download className="w-5 h-5" />
          <span>Download OPTIK Wallet</span>
        </button>
      </div>
    </div>
  );
}