import Link from 'next/link';
import LiveTelemetry from '../../components/LiveTelemetry';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Executive <span className="text-amber-500">Command</span></h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em]">Mac Mini Core Active</p>
      </header>

      <main className="space-y-12">
        <LiveTelemetry />
        
        <div className="flex justify-center gap-6">
          <Link href="/" className="px-8 py-3 border border-white/10 rounded-full font-bold uppercase tracking-widest hover:border-amber-500 transition-all text-xs">
            Return to Front Desk
          </Link>
          <Link href="/admin/ledger" className="px-8 py-3 border border-white/10 rounded-full font-bold uppercase tracking-widest hover:border-amber-500 transition-all text-xs">
            View Ledger
          </Link>
        </div>
      </main>
    </div>
  );
}
