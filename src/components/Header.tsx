
import { Search, Activity } from 'lucide-react';
import { cn } from '../utils/cn';

interface HeaderProps {
  timeframe: string;
  setTimeframe: (t: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

export const Header = ({ timeframe, setTimeframe, search, setSearch }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">HN<span className="text-orange-500 text-4xl leading-none">.</span>RADAR</h1>
          <p className="text-[10px] font-['JetBrains_Mono'] text-zinc-600 uppercase tracking-[0.3em] mt-1 font-bold">Black Protocol v1.0.1</p>
        </div>
      </div>

      <div className="flex items-center flex-1 max-w-xl bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-3xl p-1 shadow-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text"
            placeholder="Probe the feed..."
            className="w-full bg-transparent py-4 pl-14 pr-4 focus:outline-none font-medium text-white placeholder:text-zinc-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="hidden sm:flex items-center gap-1 pr-1">
          {['1h', '24h', '1w'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={cn(
                "px-6 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider",
                timeframe === t 
                  ? "bg-white text-black shadow-xl scale-105" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
