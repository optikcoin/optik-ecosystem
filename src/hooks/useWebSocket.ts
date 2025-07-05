import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
}

interface WebSocketData {
  type: string;
  payload: any;
  timestamp: number;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    url = import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
    autoConnect = true,
    reconnection = true,
    reconnectionAttempts = 5,
    reconnectionDelay = 1000,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const listenersRef = useRef<Map<string, (data: any) => void>>(new Map());

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [url, autoConnect]);

  const connect = () => {
    if (socketRef.current?.connected) return;

    try {
      socketRef.current = io(url, {
        reconnection,
        reconnectionAttempts,
        reconnectionDelay,
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        setError(null);
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
      });

      socketRef.current.on('connect_error', (err) => {
        setError(err.message);
        setIsConnected(false);
      });

      // Set up existing listeners
      listenersRef.current.forEach((callback, event) => {
        socketRef.current?.on(event, callback);
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  };

  const subscribe = (event: string, callback: (data: any) => void) => {
    listenersRef.current.set(event, callback);
    
    if (socketRef.current?.connected) {
      socketRef.current.on(event, callback);
    }

    return () => {
      listenersRef.current.delete(event);
      if (socketRef.current) {
        socketRef.current.off(event, callback);
      }
    };
  };

  const emit = (event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      setError('Socket not connected');
    }
  };

  // Predefined subscriptions for common events
  const subscribeToTrades = (callback: (trade: any) => void) =>
    subscribe('trade', callback);

  const subscribeToOrderbook = (pair: string, callback: (orderbook: any) => void) =>
    subscribe(`orderbook:${pair}`, callback);

  const subscribeToPrices = (callback: (prices: any) => void) =>
    subscribe('prices', callback);

  const subscribeToWalletUpdates = (callback: (update: any) => void) =>
    subscribe('wallet:update', callback);

  const subscribeToMiningUpdates = (callback: (update: any) => void) =>
    subscribe('mining:update', callback);

  const subscribeToSecurityAlerts = (callback: (alert: any) => void) =>
    subscribe('security:alert', callback);

  return {
    isConnected,
    lastMessage,
    error,
    connect,
    disconnect,
    subscribe,
    emit,
    subscribeToTrades,
    subscribeToOrderbook,
    subscribeToPrices,
    subscribeToWalletUpdates,
    subscribeToMiningUpdates,
    subscribeToSecurityAlerts,
  };
};