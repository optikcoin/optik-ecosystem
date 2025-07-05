import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { JupiterProvider as JupiterReactProvider } from '@jup-ag/react-hook';
import { Connection } from '@solana/web3.js';

// Create context for Jupiter-related state and functions
interface JupiterContextType {
  connection: Connection | null;
}

const JupiterContext = createContext<JupiterContextType>({
  connection: null,
});

export const useJupiterContext = () => useContext(JupiterContext);

interface JupiterProviderProps {
  children: React.ReactNode;
}

export const JupiterProvider: React.FC<JupiterProviderProps> = ({ children }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [jupiterConnection, setJupiterConnection] = useState<Connection | null>(null);

  // Initialize connection when component mounts
  useEffect(() => {
    if (connection) {
      setJupiterConnection(connection);
    }
  }, [connection]);

  // Provide Jupiter context values
  const contextValue: JupiterContextType = {
    connection: jupiterConnection,
  };

  return (
    <JupiterContext.Provider value={contextValue}>
      <JupiterReactProvider
        connection={connection}
        userPublicKey={publicKey || undefined}
        // Optional cluster parameter - defaults to "mainnet-beta"
        cluster="mainnet-beta"
      >
        {children}
      </JupiterReactProvider>
    </JupiterContext.Provider>
  );
};