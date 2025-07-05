import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import Header from './components/Header';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AIChat from './components/AIChat';
import AIAnalytics from './components/AIAnalytics';
import TokenSwap from './components/TokenSwap';
import MemeCreator from './components/MemeCreator';
import TradingChart from './components/TradingChart';
import Subscription from './components/Subscription';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import Whitepaper from './components/Whitepaper';
import Roadmap from './components/Roadmap';
import Mining from './components/Mining';
import Staking from './components/Staking';
import Airdrop from './components/Airdrop';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import OptikGPTSidebar from './components/OptikGPTSidebar';
import WalletPage from './routes/WalletPage';
import WalletDownloadModal from './components/WalletDownloadModal';
import DEXLiquidity from './components/DEXLiquidity';
import JupiterDEX from './components/JupiterDEX';
// src/main.tsx or pages/_app.tsx (very top of file)
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// ...rest of your app

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPublicKey, setAdminPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email_confirmed_at) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check for admin mode via URL parameter or special key combination
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminMode(true);
    }

    // Secret key combination: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdminMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle admin login
  const handleAdminLogin = (success: boolean, publicKey: string) => {
    setIsAdminLoggedIn(success);
    setAdminPublicKey(publicKey);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'chat':
        return <AIChat />;
      case 'ai-analytics':
        return <AIAnalytics />;
      case 'swap':
        return <TokenSwap />;
      case 'creator':
        return <MemeCreator />;
      case 'chart':
        return <TradingChart />;
      case 'subscription':
        return <Subscription />;
      case 'whitepaper':
        return <Whitepaper />;
      case 'roadmap':
        return <Roadmap />;
      case 'mining':
        return <Mining />;
      case 'staking':
        return <Staking />;
      case 'airdrop':
        return <Airdrop />;
      case 'wallet':
        return <WalletPage />;
      case 'liquidity':
        return <DEXLiquidity />;
      case 'jupiter':
        return <JupiterDEX />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Auth callback route */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Wallet dedicated page */}
        <Route path="/wallet" element={<WalletPage />} />
        
        {/* Main app routes */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            {/* Admin Mode */}
            {isAdminMode ? (
              !isAdminLoggedIn ? (
                <AdminLogin onLogin={handleAdminLogin} />
              ) : (
                <AdminDashboard />
              )
            ) : (
              /* Regular User Mode */
              !isLoggedIn ? (
                <Login onLogin={setIsLoggedIn} />
              ) : (
                <>
                  <Header activeTab={activeTab} setActiveTab={setActiveTab} />
                  
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {renderActiveComponent()}
                  </main>

                  {/* OptikGPT Sidebar - Available on all pages */}
                  <OptikGPTSidebar />
                </>
              )
            )}

            {/* Background Effects - Updated with OptikCoin colors */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Admin Mode Indicator */}
            {isAdminMode && (
              <div className="fixed bottom-4 right-4 bg-red-600/20 border border-red-500/30 rounded-lg px-3 py-2">
                <p className="text-red-400 text-sm font-medium">Admin Mode Active</p>
                {isAdminLoggedIn && adminPublicKey && (
                  <p className="text-red-300 text-xs">{adminPublicKey.slice(0, 8)}...{adminPublicKey.slice(-4)}</p>
                )}
              </div>
            )}

            {/* Global Wallet Download Modal */}
            <WalletDownloadModal
              isOpen={showWalletModal}
              onClose={() => setShowWalletModal(false)}
            />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;