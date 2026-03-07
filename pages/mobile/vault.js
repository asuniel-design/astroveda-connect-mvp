import { useState, useEffect } from 'react';
import { getAura } from '../../lib/utils/aura';

export default function MobileVault() {
  const [unlocked, setUnlocked] = useState(false);
  const [manuscript, setManuscript] = useState(null);
  const aura = getAura('niel');

  const simulateUnlock = () => {
    setUnlocked(true);
    // Fetching the latest DeepSeek-V3 manuscript from the Sovereign Vault
    setManuscript({
      title: "The Rohini Strategy",
      excerpt: "Your 6:00 AM analysis indicates peak market resonance in Dubai today..."
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className={`fixed inset-0 bg-gradient-to-b ${aura.color} to-black opacity-20 pointer-events-none`} />
      
      {!unlocked ? (
        <div className="h-screen flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-8 animate-pulse">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Sovereign Vault</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-12">Authorized: Niel Only</p>
          <button 
            onClick={simulateUnlock}
            className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest active:scale-95 transition"
          >
            Biometric Unlock
          </button>
        </div>
      ) : (
        <div className="pt-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em]">Mobile Sync Active</p>
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">The Brief</h1>
            </div>
          </header>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl mb-6">
            <h2 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">DeepSeek-V3 Intelligence</h2>
            <h3 className="text-2xl font-bold mb-4">{manuscript.title}</h3>
            <p className="text-lg text-slate-300 italic leading-relaxed">"{manuscript.excerpt}"</p>
          </div>

          <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Open Full 1,000-Word Manuscript
          </button>
        </div>
      )}
    </div>
  );
}
