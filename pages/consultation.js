import { useState, useEffect } from 'react';
import { getAura } from '../lib/utils/aura';

export default function ConsultationRoom({ userId = 'niel' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [aura] = useState(getAura(userId));
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsTyping(true);

    // This will call your /api/v1/prediction endpoint in the next step
    setTimeout(() => {
      const aiMsg = { 
        role: 'ai', 
        text: "The stars suggest a massive shift in your 10th house. DeepSeek logic confirms a Raja Yoga formation. How do you feel about taking a leadership role this month?" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 relative overflow-hidden flex flex-col">
      {/* Dynamic Background Aura */}
      <div className={`absolute inset-0 bg-gradient-radial ${aura.color} to-transparent opacity-20 blur-[120px] pointer-events-none`} />

      <header className="max-w-4xl mx-auto w-full flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-xl font-black italic tracking-tighter text-amber-500 uppercase">Consultation Live</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Encrypted Oracle Link</span>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 shadow-2xl overflow-y-auto mb-6 relative z-10 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-[2rem] ${m.role === 'user' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800/50 border border-white/10 text-slate-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-amber-500/50 text-[10px] font-bold animate-pulse uppercase tracking-[0.3em]">The Oracle is deciphering your transit...</div>}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="relative group">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask the stars anything..." 
            className="w-full bg-slate-900 border border-white/10 rounded-3xl p-6 pr-20 focus:outline-none focus:border-amber-500/50 transition-all text-lg"
          />
          <button 
            onClick={sendMessage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 px-6 py-2 rounded-2xl font-black uppercase text-xs hover:bg-amber-400 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
