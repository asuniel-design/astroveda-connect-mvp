import { useState, useEffect } from 'react';

export default function DynamicProfile({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Dynamically fetch the profile based on the logged-in ID
    fetch(`/api/user/profile?id=${userId}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [userId]);

  if (!profile) return <div className="p-10 text-amber-500">Loading Celestial Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-8 mb-10">
          <img src={profile.avatar} className="w-32 h-32 rounded-3xl border-4 border-amber-500 shadow-lg" alt="Profile" />
          <div>
            <h1 className="text-4xl font-black italic">{profile.name}</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest">{profile.role}</p>
            {profile.isVerified && <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded-full border border-emerald-500/20">VERIFIED MASTER</span>}
          </div>
        </div>

        {profile.role === 'astrologer' ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xs text-slate-500 uppercase font-bold mb-2">Consultation Rate</h3>
              <p className="text-2xl font-mono text-emerald-400">${profile.rate}/min</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xs text-slate-500 uppercase font-bold mb-2">Global Standing</h3>
              <p className="text-2xl font-mono text-amber-500">⭐ {profile.rating}</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800">
             <h3 className="text-amber-500 font-bold text-xs uppercase mb-4">Birth Details</h3>
             <p className="text-lg">Born: {profile.dob} at {profile.time}</p>
             <p className="text-slate-400 mt-2">Location: {profile.place}</p>
          </div>
        )}
      </div>
    </div>
  );
}
