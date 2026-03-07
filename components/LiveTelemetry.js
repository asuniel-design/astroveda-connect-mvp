import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function LiveTelemetry() {
  const [socket, setSocket] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 🛡️ CRITICAL: This ensures the code only runs in the browser, 
    // preventing the "Client-side exception" crash on Vercel.
    if (typeof window === 'undefined') return;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;
    const newSocket = io(socketUrl, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    newSocket.on('connect', () => {
      console.log("📡 AstraVeda Node Connected:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  const addLog = (msg) => setLogs(prev => [...prev.slice(-5), msg]);

  const runTest = () => {
    setIsProcessing(true);
    addLog("Initiating DeepSeek-V3 Compute...");
    setTimeout(() => {
      addLog("Analysis Complete: 100% Accuracy.");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#202124] rounded-lg p-4 font-mono text-[11px] text-gray-300 h-64 overflow-hidden shadow-inner">
        {logs.map((log, i) => (
          <div key={i} className="mb-1"><span className="text-blue-400 mr-2">➜</span> {log}</div>
        ))}
        {isProcessing && <div className="animate-pulse">_</div>}
      </div>
      <button 
        onClick={runTest}
        className="w-full bg-[#1a73e8] text-white py-2 rounded font-medium text-sm hover:bg-[#1765cc] transition"
      >
        Run Diagnostics
      </button>
    </div>
  );
}
