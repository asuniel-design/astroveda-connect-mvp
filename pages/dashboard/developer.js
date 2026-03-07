import { useState } from 'react';

export default function GlobalRevenueConsole() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 flex justify-between items-center">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">Revenue Hub</h1>
          <div className="flex gap-4">
            <span className="bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase border border-blue-500/20">Stripe Active</span>
            <span className="bg-indigo-500/10 text-indigo-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase border border-indigo-500/20">Razorpay Active</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* STRIPE CARD */}
          <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-4">Global (USD)</p>
            <p className="text-5xl font-black">$12,450.00</p>
            <div className="mt-8 h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-[70%]" />
            </div>
          </div>

          {/* RAZORPAY CARD */}
          <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-4">Regional (INR)</p>
            <p className="text-5xl font-black">₹8,45,000</p>
            <div className="mt-8 h-1 w-full bg-indigo-500/20 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 w-[85%]" />
            </div>
          </div>
        </div>
        
        <p className="mt-12 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.5em]">
          All transactions processed via local Mac Mini Sovereign Bridge
        </p>
      </div>
    </div>
  );
}
