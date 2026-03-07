import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getAura } from '../../lib/utils/aura';
import { getZodiacSign } from '../../lib/utils/zodiac';
import { ZODIAC_SVGS } from '../../lib/utils/zodiac-assets';

export default function DynamicEliteProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [aura, setAura] = useState(getAura('DEFAULT'));

  useEffect(() => {
    if (id) {
      const mockData = {
        niel: { name: "Niel", role: "Elite Member", avatar: null, dob: "1990-03-25", bio: "Harnessing the stars through technology.", place: "New Delhi" },
        sharma: { name: "Acharya Sharma", role: "Master Astrologer", avatar: "https://i.pravatar.cc/150?u=sharma", dob: "1970-05-10", bio: "Deciphering karmic codes.", place: "Varanasi" }
      };
      setProfile(mockData[id] || null);
      setAura(getAura(id));
    }
  }, [id]);

  if (!profile) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-500 font-mono animate-pulse">CALIBRATING...</div>;

  const sign = getZodiacSign(profile.dob);
  const fallbackSVG = ZODIAC_SVGS[sign] || ZODIAC_SVGS.Default;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-start md:justify-center items-center py-20 px-4">
      
      {/* FULL VIEWPORT BACKGROUND GLOW */}
      <div className={`fixed inset-0 bg-gradient-radial ${aura.color} to-transparent opacity-20 blur-[120px] pointer-events-none`} />

      <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-10 md:p-16 shadow-2xl relative z-10 text-center">
        
        {/* AVATAR WRAPPER - Increased top margin to prevent clipping */}
        <div className="relative mb-12 flex justify-center mt-[-20px]">
          <div className="w-44 h-44 md:w-52 md:h-52 rounded-[3.5rem] border border-white/10 overflow-hidden bg-slate-950 flex items-center justify-center shadow-2xl">
            {profile.avatar ? (
              <img src={profile.avatar} className="w-full h-full object-cover" />
            ) : (
              <div className="w-24 h-24 text-amber-500/80 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" dangerouslySetInnerHTML={{ __html: fallbackSVG }} />
            )}
          </div>
          {/* External Pulse Glow */}
          <div className={`absolute inset-0 rounded-full ${aura.glow} opacity-20 blur-3xl -z-10 scale-125`} />
        </div>

        <div className="relative z-20">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4 leading-tight">{profile.name}</h1>
          <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8">{sign} Energy</p>
          
          <div className="w-12 h-0.5 bg-white/10 mx-auto mb-8"></div>
          
          <p className="text-slate-400 leading-relaxed text-lg font-light italic mb-12">"{profile.bio}"</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-3xl font-bold transition">Message</button>
             <button className="flex-1 bg-amber-500 text-slate-950 p-5 rounded-3xl font-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20">Book Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
