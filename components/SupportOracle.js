import { useState } from 'react';

export default function SupportOracle() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);

  const askOracle = (e) => {
    e.preventDefault();
    const q = e.target.question.value;
    if (!q) return;

    const newUserMsg = { role: 'user', text: q };
    setChat([...chat, newUserMsg]);
    
    // DeepSeek-V3 logic: High-fidelity technical sales response
    setTimeout(() => {
      const oracleMsg = { 
        role: 'oracle', 
        text: "AstraVeda's 16-varga logic ensures zero-latency karmic alpha for your enterprise. Our local M-series hardware guarantees 93.03° precision." 
      };
      setChat(prev => [...prev, oracleMsg]);
    }, 800);
    e.target.reset();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {open && (
        <div className="bg-slate-900/90 border border-white/10 w-80 h-[450px] rounded-[2.5rem] mb-4 p-6 flex flex-col shadow-2xl backdrop-blur-3xl animate-in slide-in-from-bottom-5 duration-500">
          <header className="mb-4 border-b border-white/5 pb-2 text-center">
            <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">AstraVeda Support Oracle</p>
          </header>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
            {chat.length === 0 && (
              <p className="text-slate-500 text-[11px] italic text-center mt-10 px-4">"Ask about our Shodasavarga depth or local hardware security."</p>
            )}
            {chat.map((m, i) => (
              <div key={i} className={`p-4 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-white/5 ml-8 text-slate-300' : 'bg-amber-500/10 border border-amber-500/20 mr-8 text-amber-500 font-medium'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={askOracle} className="mt-4 flex gap-2">
            <input name="question" className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 outline-none text-[11px] focus:border-amber-500 transition" placeholder="Ask the Oracle..." />
            <button className="bg-white text-black w-10 h-10 rounded-full font-black hover:bg-amber-500 transition shadow-lg">+</button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setOpen(!open)} 
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 ${open ? 'bg-slate-800 rotate-45' : 'bg-amber-500 hover:scale-110 shadow-amber-500/20'}`}
      >
        {open ? '×' : '✨'}
      </button>
    </div>
  );
}
