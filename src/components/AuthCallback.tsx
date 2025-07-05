import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { CheckCircle, Loader, AlertTriangle } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'signup' || type === 'email_confirmation') {
          // Handle email confirmation
          if (accessToken && refreshToken) {
            // Set the session with the tokens
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (error) {
              console.error('Session error:', error);
              setStatus('error');
              setMessage('Failed to verify email. Please try again.');
              return;
            }

            if (data.user) {
              setStatus('success');
              setMessage('Email verified successfully! Redirecting to dashboard...');
              
              // Redirect to main app after 2 seconds
              setTimeout(() => {
                navigate('/', { replace: true });
              }, 2000);
            } else {
              setStatus('error');
              setMessage('No user found. Please try signing in again.');
            }
          } else {
            // Try to get session from URL parameters (fallback)
            const { data, error } = await supabase.auth.getSession();
            
            if (error) {
              console.error('Auth callback error:', error);
              setStatus('error');
              setMessage(error.message);
              return;
            }

            if (data.session?.user) {
              setStatus('success');
              setMessage('Email verified successfully! Redirecting to dashboard...');
              setTimeout(() => {
                navigate('/', { replace: true });
              }, 2000);
            } else {
              setStatus('error');
              setMessage('No user found. Please try signing in again.');
            }
          }
        } else {
          setStatus('error');
          setMessage('Invalid callback type.');
        }
      } catch (err: unknown) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        console.error('Auth callback unexpected error:', err);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
                <Loader className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verifying Email</h2>
              <p className="text-gray-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="bg-green-600/20 p-4 rounded-full inline-flex mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-gray-400 mb-4">{message}</p>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  Welcome to OptikCoin DEX! You can now access all platform features.
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="bg-red-600/20 p-4 rounded-full inline-flex mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-gray-400 mb-4">{message}</p>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Return to Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}