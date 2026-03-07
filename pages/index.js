import { useState } from 'react';
import LiveTelemetry from '../components/LiveTelemetry';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Google Cloud Style */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">A</div>
          <span className="text-[#5f6368] font-medium text-lg">AstraVeda</span>
        </div>
        <nav className="p-4 space-y-2">
          {['Dashboard', 'Matchmaker', 'API Explorer', 'Billing', 'Settings'].map((item) => (
            <div key={item} className={`p-2 rounded-md text-sm cursor-pointer ${item === 'Dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl text-gray-800">Sovereign Architecture Overview</h1>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Mac Mini Node: Online</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Revenue', value: '$12,500', sub: 'Last 30 days' },
              { label: 'Active API Keys', value: '24', sub: 'Sovereign Tier' },
              { label: 'DeepSeek Queries', value: '1,402', sub: '99.9% Success Rate' }
            ].map((stat) => (
              <div key={stat.label} className="google-card p-6">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                <h2 className="text-3xl font-light text-gray-900">{stat.value}</h2>
                <p className="text-xs text-blue-600 mt-2">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Core Engine Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="google-card p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700">Real-Time AI Telemetry</h3>
              </div>
              <div className="p-6">
                <LiveTelemetry />
              </div>
            </div>

            <div className="google-card p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700">Visual Engine Preview</h3>
              </div>
              <div className="p-6 flex flex-col items-center">
                <div className="w-full h-80 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                   <img src="/api/v1/kundali/visual?key=9fc8130a7fd3f183daa916b43db8fb7e42c4477c62a1670ad263389ad7554a38&asc=Taurus" className="max-h-full" />
                </div>
                <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">Download SVG Asset</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
