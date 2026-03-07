import { useEffect, useState } from 'react';

export default function MarketingTicker() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/ticker');
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Failed to fetch ticker messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicker();
  }, []);

  if (loading) return null;
  if (messages.length === 0) return null;

  return (
    <div className="w-full bg-gold/10 border-b border-gold/20 overflow-hidden">
      <div className="relative flex items-center py-2">
        {/* Scrolling container */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {messages.concat(messages).map((msg, idx) => (
            <span key={idx} className="mx-8 flex items-center">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                {msg}
              </span>
              <span className="mx-4 text-gold/50">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}