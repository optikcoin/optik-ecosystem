import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  EyeOff,
  Eye,
  Loader,
  Smartphone
} from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean, publicKey: string) => void;
}

function downloadWalletKeypair(secretKey: number[], filename = 'optik-wallet-keypair.json') {
  const blob = new Blob([JSON.stringify(secretKey)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [step, setStep] = useState<'credentials' | '2fa' | 'kyc'>('credentials');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    fullName: '',
    country: '',
    idNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ADMIN_EMAIL = 'admin@optikcoin.com';
  const ADMIN_PASSWORD = 'OptikAdmin2025!';
  const [generatedCode, setGeneratedCode] = useState('');
  const generate2FACode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      const code = generate2FACode();
      setGeneratedCode(code);
      setSuccess(`2FA Code generated: ${code}`);
      setStep('2fa');
    } else {
      setError('Invalid admin credentials. Please check your email and password.');
    }
    setIsLoading(false);
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    if (formData.twoFactorCode === generatedCode) {
      setSuccess('2FA verification successful! Please complete KYC verification.');
      setStep('kyc');
    } else {
      setError('Invalid 2FA code. Please enter the correct code.');
    }
    setIsLoading(false);
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // Mock KYC verification - in real app this would call an API
      if (formData.fullName && formData.country && formData.idNumber) {
        // Generate wallet keypair
        const keypair = Keypair.generate();
        const secretKey = Array.from(keypair.secretKey);
        const publicKey = keypair.publicKey.toBase58();

        // Download wallet file
        downloadWalletKeypair(secretKey);

        // Store admin session
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        localStorage.setItem('adminPublicKey', publicKey);

        // Call onLogin callback
        onLogin(true, publicKey);

        setSuccess('KYC verification successful! Admin wallet generated and downloaded.');
      } else {
        throw new Error('Please fill in all required KYC fields.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'KYC verification failed. Please try again.');
      } else {
        setError('KYC verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Shield className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-gray-400 text-sm mt-2">Secure access to OptikCoin administration</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
              <input 
                type="email" 
                placeholder="admin@optikcoin.com" 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                value={formData.email} 
                onChange={e => handleInputChange('email', e.target.value)} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter admin password" 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 pr-10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                value={formData.password} 
                onChange={e => handleInputChange('password', e.target.value)} 
                required 
                disabled={isLoading}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Continue to 2FA</span>
              )}
            </button>
            
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                Demo credentials: admin@optikcoin.com / OptikAdmin2025!
              </p>
            </div>
          </form>
        )}

        {step === '2fa' && (
          <form onSubmit={handle2FASubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Smartphone className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
              <p className="text-gray-400 text-sm mt-2">Enter the 6-digit code from your authenticator app</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">2FA Code</label>
              <input 
                type="text" 
                maxLength={6} 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white text-center text-2xl tracking-widest rounded-lg placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                placeholder="000000"
                value={formData.twoFactorCode} 
                onChange={e => handleInputChange('twoFactorCode', e.target.value.replace(/\D/g, ''))} 
                required 
                disabled={isLoading}
              />
              {generatedCode && (
                <p className="text-center text-sm text-green-400 mt-2">
                  Demo code: <span className="font-mono font-bold">{generatedCode}</span>
                </p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={() => setStep('credentials')}
                className="flex-1 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 py-3 rounded-lg font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify & Continue</span>
                )}
              </button>
            </div>
          </form>
        )}

        {step === 'kyc' && (
          <form onSubmit={handleKYCSubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Shield className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">KYC Verification</h2>
              <p className="text-gray-400 text-sm mt-2">Complete identity verification to generate your admin wallet</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                value={formData.fullName} 
                onChange={e => handleInputChange('fullName', e.target.value)} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
              <input 
                type="text" 
                placeholder="United States" 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                value={formData.country} 
                onChange={e => handleInputChange('country', e.target.value)} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Government ID Number</label>
              <input 
                type="text" 
                placeholder="123-45-6789" 
                className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20" 
                value={formData.idNumber} 
                onChange={e => handleInputChange('idNumber', e.target.value)} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={() => setStep('2fa')}
                className="flex-1 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 py-3 rounded-lg font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Verifying KYC...</span>
                  </>
                ) : (
                  <span>Complete & Download Wallet</span>
                )}
              </button>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Note:</strong> Upon successful verification, your admin wallet keypair will be automatically downloaded. Keep this file secure as it contains your private keys.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}