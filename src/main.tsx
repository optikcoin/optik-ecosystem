import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletProviderWrapper } from './components/WalletProviderWrapper';
import { JupiterProvider } from './components/JupiterProvider';

// Register service worker for PWA support (skip in development)
if ('serviceWorker' in navigator && !window.location.hostname.includes('stackblitz') && !window.location.hostname.includes('webcontainer')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/wallet-sw-register.js')
      .then(registration => {
        console.log('OPTIK Wallet PWA registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('OPTIK Wallet PWA registration failed:', error);
      });
  });
} else {
  console.log('Service Worker registration skipped in development environment');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProviderWrapper>
      <JupiterProvider>
        <App />
      </JupiterProvider>
    </WalletProviderWrapper>
  </StrictMode>
);