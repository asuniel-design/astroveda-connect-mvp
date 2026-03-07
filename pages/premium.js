import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AstraVedaPremium() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/subscription/status').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <div className="bg-slate-950 min-h-screen flex items-center justify-center text-amber-500 font-mono animate-pulse">SYNCING WITH THE COSMOS...</div>;

  const ritual = data.dailyRituals;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black italic tracking-tighter">ASTRAVEDA <span className="text-amber-500">ELITE</span></h1>
        <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">7-Day Free Trial</div>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative">
          <h3 className="text-amber-500 font-bold text-xs uppercase mb-4 tracking-widest">Daily Revelation</h3>
          <p className="text-2xl font-serif italic leading-relaxed text-white">"{ritual.prediction}"</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 mx-auto mb-4 shadow-[0_0_30px_rgba(79,70,229,0.3)]"></div>
          <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">Dressing Color</h3>
          <p className="text-xl font-black mt-2">{ritual.dressing.color}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col items-center justify-center">
          <div className="text-6xl font-black text-amber-500 mb-2">{ritual.numerology.luckyNumber}</div>
          <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">Lucky Number</h3>
        </div>
        
        <div className="md:col-span-2 bg-amber-500 p-8 rounded-[3rem] flex items-center justify-between shadow-xl shadow-amber-500/10">
           <div>
              <h2 className="text-slate-950 text-xl font-black uppercase tracking-tight">Need Deeper Insight?</h2>
              <p className="text-slate-900 text-sm font-medium">Consult with an AstroVeda Connect Master.</p>
           </div>
           <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform active:scale-95">BOOK NOW</button>
        </div>
      </div>
    </div>
  );
}
