
import { Activity } from 'lucide-react';

interface HeaderProps {
  timeframe: string;
  setTimeframe: (t: string) => void;
}

export const Header = ({ timeframe, setTimeframe }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">HN<span className="text-orange-500 text-4xl leading-none">.</span>DASHBOARD</h1>
          <p className="text-[10px] font-['JetBrains_Mono'] text-zinc-600 uppercase tracking-[0.3em] mt-1 font-bold">Black Protocol v1.0.1</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Timeframe Selector */}
        <div className="flex bg-zinc-900/50 border border-white/5 p-1 rounded-xl">
          {['1h', '24h', '7d'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                timeframe === t 
                  ? "bg-white text-black shadow-lg" 
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
