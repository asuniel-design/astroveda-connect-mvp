import { useState, useEffect } from 'react';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({ totalUsers: 0, revenue: 0, pending: 0 });
  const [recentSyncs, setRecentSyncs] = useState([]);

  useEffect(() => {
    // Logic: In production, fetch from /api/v1/admin/stats
    setStats({ totalUsers: 124, revenue: 45200, pending: 12 });
    setRecentSyncs([
      { email: 'niel@example.com', star: 'Rohini', status: 'FULFILLED' },
      { email: 'founder@tech.co', star: 'Ashwini', status: 'PENDING' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Sovereign Admin</h1>
            <p className="text-amber-500 font-bold text-xs tracking-[0.5em] mt-2">Local Mac Mini Control: Active</p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-slate-500 text-[10px] font-bold uppercase">Total Revenue</p>
              <p className="text-3xl font-black">${stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Total Identity Syncs</p>
            <p className="text-4xl font-black">{stats.totalUsers}</p>
          </div>
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Pending Fulfillment</p>
            <p className="text-4xl font-black text-amber-500">{stats.pending}</p>
          </div>
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Engine Uptime</p>
            <p className="text-4xl font-black text-green-500">99.9%</p>
          </div>
        </div>

        <section className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <th className="p-6">Executive Email</th>
                <th className="p-6">Nakshathram</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentSyncs.map((sync, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  <td className="p-6 font-bold">{sync.email}</td>
                  <td className="p-6 text-amber-500 italic">{sync.star}</td>
                  <td className="p-6 text-xs font-black uppercase">{sync.status}</td>
                  <td className="p-6 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full hover:bg-amber-500 hover:text-black transition">Trigger Re-Run</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
