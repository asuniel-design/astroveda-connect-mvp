import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/currency';
import MarketingTicker from '../components/MarketingTicker';

export default function AstroVedaHome() {
  const [birthData, setBirthData] = useState({ date: '', time: '', city: '' });

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center">
      <MarketingTicker />
      {/* Premium Header */}
      <header className="w-full max-w-6xl mx-auto py-8 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Placeholder for Task 2.1 Logo */}
          <div className="w-10 h-10 border border-[#BFA15C] rounded flex items-center justify-center text-[#BFA15C] font-serif text-xl italic">A</div>
          <span className="font-serif text-2xl tracking-wide text-gray-900">AstroVeda <span className="text-[#BFA15C] italic">Connect</span></span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-gray-500">
          <Link href="#horoscope" className="hover:text-[#BFA15C] transition">Daily Horoscope</Link>
          <Link href="#consult" className="hover:text-[#BFA15C] transition">Experts</Link>
          <Link href="/dashboard" className="text-[#BFA15C]">Partner Login</Link>
        </nav>
      </header>

      {/* Hero Section (Task 2.2 Hero Asset Placeholder) */}
      <main className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-serif leading-tight text-gray-900">
            Ancient Wisdom for the <br/>
            <span className="text-[#BFA15C] italic">Modern Journey.</span>
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-md leading-relaxed">
            Discover your path with real-time Vedic astrology. Generate your precise natal chart and connect with verified experts instantly.
          </p>
          
          {/* User Onboarding Flow: Birth Details */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4 max-w-md">
            <h3 className="font-serif text-xl text-gray-800 border-b border-[#BFA15C]/30 pb-2 inline-block">Generate Your Chart</h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <input type="date" className="p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#BFA15C] transition" />
              <input type="time" className="p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#BFA15C] transition" />
            </div>
            <input type="text" placeholder="City & Country of Birth" className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#BFA15C] transition" />
            <button className="w-full bg-[#BFA15C] text-white py-3 rounded tracking-widest uppercase text-xs font-semibold hover:bg-[#a68a4a] transition shimmer-gold">
              Reveal Ephemeris Data
            </button>
          </div>
        </div>

        {/* Hero Visual Asset */}
        <div className="relative h-[500px] w-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
          {/* Placeholder for Task 2.2 Mandala */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
             <div className="w-96 h-96 border-[0.5px] border-[#BFA15C] rounded-full flex items-center justify-center">
                <div className="w-64 h-64 border-[0.5px] border-[#BFA15C] rotate-45"></div>
             </div>
          </div>
          <p className="text-gray-400 font-serif italic relative z-10">[ Hero Mandala Asset: workspace/assets/ ]</p>
        </div>
      </main>

      {/* Connect with Astrologer Section */}
      <section id="consult" className="w-full bg-white py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-serif text-gray-900">Connect with an Expert</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consultant Card 1 */}
            <div className="flex bg-white/40 backdrop-blur-lg rounded-xl overflow-hidden border border-gold/20 text-left hover:shadow-md transition">
              <div className="w-1/3 bg-gray-200 flex items-center justify-center text-xs text-gray-400 font-serif text-center p-4">
                [ US Home Office Asset 1 ]
              </div>
              <div className="p-6 w-2/3 flex flex-col justify-center">
                <h4 className="font-serif text-xl text-gray-900">Dr. Alisha Rao</h4>
                <p className="text-xs text-[#BFA15C] uppercase tracking-widest mb-4">Vedic Astrologer</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">Specializing in career trajectories and relationship compatibility using traditional Parashari techniques.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-serif text-gray-900">{formatCurrency(49)}</span>
                  <span className="text-xs text-gray-500">per session</span>
                </div>
                <button className="text-xs font-semibold tracking-widest border-b border-gray-900 pb-1 w-fit hover:text-[#BFA15C] hover:border-[#BFA15C] transition shimmer-gold">
                  Start Consultation
                </button>
              </div>
            </div>

            {/* Consultant Card 2 */}
            <div className="flex bg-white/40 backdrop-blur-lg rounded-xl overflow-hidden border border-gold/20 text-left hover:shadow-md transition">
              <div className="w-1/3 bg-gray-200 flex items-center justify-center text-xs text-gray-400 font-serif text-center p-4">
                [ US Home Office Asset 2 ]
              </div>
              <div className="p-6 w-2/3 flex flex-col justify-center">
                <h4 className="font-serif text-xl text-gray-900">Marcus Vance</h4>
                <p className="text-xs text-[#BFA15C] uppercase tracking-widest mb-4">Tarot & Ephemeris</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">Combining Swiss Ephemeris data with intuitive readings from a serene, modern perspective.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-serif text-gray-900">{formatCurrency(59)}</span>
                  <span className="text-xs text-gray-500">per session</span>
                </div>
                <button className="text-xs font-semibold tracking-widest border-b border-gray-900 pb-1 w-fit hover:text-[#BFA15C] hover:border-[#BFA15C] transition shimmer-gold">
                  Start Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
