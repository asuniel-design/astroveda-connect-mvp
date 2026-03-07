import { useState } from 'react';

export default function ExecutiveLedger() {
  const [reportType, setReportType] = useState('Monthly');
  
  const transactions = [
    { id: 'TXN-001', date: '2026-03-05', gateway: 'Stripe', amount: '$500.00', status: 'Settled' },
    { id: 'TXN-002', date: '2026-03-05', gateway: 'Razorpay', amount: '₹42,000', status: 'Settled' },
    { id: 'TXN-003', date: '2026-03-04', gateway: 'Stripe', amount: '$1,200.00', status: 'Settled' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Executive Ledger</h1>
            <p className="text-amber-500 font-bold text-xs tracking-[0.5em] mt-2 italic">AstraVeda Financial Sovereignty</p>
          </div>
          <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-amber-500 transition shadow-xl">
            Export PDF/CSV
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Stripe Vault (USD)</h2>
            <p className="text-5xl font-black italic">$1,700.00</p>
          </div>
          <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Razorpay Vault (INR)</h2>
            <p className="text-5xl font-black italic">₹42,000</p>
          </div>
        </div>

        <section className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <th className="p-6">Transaction ID</th>
                <th className="p-6">Date</th>
                <th className="p-6">Gateway</th>
                <th className="p-6">Amount</th>
                <th className="p-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-6 font-mono text-slate-400">{t.id}</td>
                  <td className="p-6 font-bold">{t.date}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${t.gateway === 'Stripe' ? 'bg-blue-500/10 text-blue-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                      {t.gateway}
                    </span>
                  </td>
                  <td className="p-6 font-black text-amber-500">{t.amount}</td>
                  <td className="p-6 text-right font-bold text-green-500">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
