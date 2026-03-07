import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

/**
 * Socket.io hook for real‑time features in AstroVeda Connect
 * Uses NEXT_PUBLIC_SOCKET_URL environment variable
 * Emits and listens for astrologer status events
 */
export function useSocket() {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [astrologerStatus, setAstrologerStatus] = useState({});

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!socketUrl) {
      console.error('NEXT_PUBLIC_SOCKET_URL is not defined');
      return;
    }

    // Initialize socket
    socketRef.current = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Listen for astrologer status updates
    socketRef.current.on('astrologer:online', (data) => {
      console.log('Astrologer online:', data);
      setAstrologerStatus(prev => ({
        ...prev,
        [data.astrologerId]: 'online',
      }));
    });

    socketRef.current.on('astrologer:offline', (data) => {
      console.log('Astrologer offline:', data);
      setAstrologerStatus(prev => ({
        ...prev,
        [data.astrologerId]: 'offline',
      }));
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  /**
   * Emit astrologer status change (online/offline)
   * @param {string} astrologerId - UUID of astrologer
   * @param {boolean} online - true for online, false for offline
   */
  const emitAstrologerStatus = (astrologerId, online) => {
    if (!socketRef.current || !isConnected) {
      console.error('Socket not connected');
      return;
    }
    const event = online ? 'astrologer:online' : 'astrologer:offline';
    socketRef.current.emit(event, { astrologerId, timestamp: Date.now() });
  };

  return {
    isConnected,
    astrologerStatus,
    emitAstrologerStatus,
  };
}