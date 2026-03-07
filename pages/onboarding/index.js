import { useState } from 'react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', place: '', star: '', time: '', reason: ''
  });

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <header className="mb-10">
          <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Step {step} of 3</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Identity Sync</h1>
        </header>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <input 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-amber-500 outline-none" 
              placeholder="Executive Email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-amber-500 outline-none" 
              placeholder="Place of Birth" 
              onChange={(e) => setFormData({...formData, place: e.target.value})}
            />
            <button onClick={nextStep} className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest hover:bg-amber-500 transition">Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
            <input 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-amber-500 outline-none" 
              placeholder="Nakshathram (Birth Star)" 
              onChange={(e) => setFormData({...formData, star: e.target.value})}
            />
            <textarea 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-amber-500 outline-none h-32" 
              placeholder="Strategic Reason for Checking (e.g. Q3 Expansion)" 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
            <button onClick={nextStep} className="w-full bg-amber-500 text-slate-950 py-5 rounded-full font-black uppercase tracking-widest hover:bg-amber-400 transition">Lock Fate →</button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
            <h2 className="text-xl font-bold italic text-slate-300">"Your Sovereign Intelligence is ready for activation."</h2>
            <div className="grid grid-cols-1 gap-4">
              <button className="bg-indigo-600 py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">Pay via Razorpay (INR)</button>
              <button className="bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Pay via Stripe (USD)</button>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Immediate API Key Generation Upon Payment</p>
          </div>
        )}
      </div>
    </div>
  );
}
