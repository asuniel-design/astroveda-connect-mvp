import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdvancedMarketplace() {
  const [experts, setExperts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/experts/list')
      .then(res => res.json())
      .then(data => setExperts(data.experts));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <header className="max-w-6xl mx-auto mb-16">
        <h1 className="text-3xl font-black text-amber-400 italic uppercase">AstroVeda Connect</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {experts.map((astro) => (
          <div key={astro.id} className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-6 text-center shadow-2xl">
            <img src={astro.image} className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-slate-700" />
            <h3 className="text-2xl font-bold mb-4">{astro.name}</h3>
            <button 
              onClick={() => router.push(`/profile/${astro.id}`)} 
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-amber-400 transition-all">
                VIEW PROFILE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
