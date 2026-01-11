
import { History, ArrowUpRight } from 'lucide-react';
import { BentoCard } from './BentoCard';
import type { HNStory } from '../services/hnApi';

interface HistoricalCardProps {
  story: HNStory;
}

export const HistoricalCard = ({ story }: HistoricalCardProps) => {
  return (
    <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between border-white/5 bg-zinc-950/20 group/history" delay={0.5}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-violet-400" />
          <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Retro Link</span>
        </div>
        <div className="px-3 py-1 rounded-xl bg-violet-500/10 text-violet-400 text-[10px] font-black font-['JetBrains_Mono'] border border-violet-500/20 shadow-lg shadow-violet-500/10">
          T-ID: {story.id}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-black text-white leading-tight mb-4 group-hover/history:text-violet-400 transition-colors duration-500 line-clamp-2">
          {story?.title || 'Archive Fragment'}
        </h3>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] font-['JetBrains_Mono']">Origin: {story?.domain || 'unknown.net'}</p>
      </div>

      <div className="flex items-center gap-6 pt-8 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-1">Impact</span>
          <span className="text-lg font-black text-white tracking-tighter">{(story?.points || 0).toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-1">Threads</span>
          <span className="text-lg font-black text-white tracking-tighter">{(story?.comments || 0).toLocaleString()}</span>
        </div>
        <a 
          href={story?.url || `https://news.ycombinator.com/item?id=${story?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-violet-500 hover:text-white transition-all duration-300 cursor-pointer shadow-xl"
        >
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
      
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/5 blur-[80px] rounded-full pointer-events-none" />
    </BentoCard>
  );
};
