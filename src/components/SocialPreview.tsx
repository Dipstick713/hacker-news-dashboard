import { Activity } from 'lucide-react';

export function SocialPreview() {
  return (
    <div className="w-[1200px] h-[630px] bg-black flex flex-col items-center justify-center p-20 relative overflow-hidden font-['Inter']">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 border-[1px] border-white/10 m-10 rounded-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] mb-12 shadow-2xl">
          <Activity className="w-24 h-24 text-white" />
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter text-white uppercase italic mb-6">
          HN DASHBOARD
        </h1>
        
        <div className="h-1 w-32 bg-orange-500 mb-8" />
        
        <p className="text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
          Real-time intelligence dashboard for Hacker News. 
          AI sentiment analysis, tech trends, and community velocity.
        </p>

        <div className="mt-16 flex items-center gap-4 px-6 py-3 bg-zinc-900/50 border border-white/10 rounded-2xl">
          <p className="text-sm font-['JetBrains_Mono'] text-zinc-500 uppercase tracking-[0.4em] font-bold">
            Black Protocol v1.0.1
          </p>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-16 left-16 text-zinc-800 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest">
        01 // INTEL_FEED
      </div>
      <div className="absolute bottom-16 right-16 text-zinc-800 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest text-right">
        EST // 2026<br />SNTMNT_ANALYSIS
      </div>
    </div>
  );
}
