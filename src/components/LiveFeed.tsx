
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { BentoCard } from './BentoCard';

interface LiveFeedProps {
  stories: any[];
}

export const LiveFeed = ({ stories }: LiveFeedProps) => {
  return (
    <BentoCard className="md:col-span-2 md:row-span-3 flex flex-col border-white/5 bg-zinc-950/20 shadow-inner" delay={0.2}>
      <div className="flex items-center justify-between mb-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
          <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Live Wavefront</span>
        </div>
        <LayoutGrid className="w-4 h-4 text-zinc-700" />
      </div>
      
      <div className="space-y-3 overflow-y-auto pr-2 flex-1 scrollbar-hide min-h-0">
        <AnimatePresence>
          {stories.map((story, i) => (
            <motion.div 
              key={story.id} 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group flex flex-col p-6 hover:bg-white/5 rounded-3xl border border-transparent hover:border-white/5 transition-all cursor-pointer"
            >
              <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors mb-4 leading-relaxed line-clamp-2">
                {story.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/10">{story.points}P</span>
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{story.time}</span>
                </div>
                <span className="text-[9px] font-['JetBrains_Mono'] text-zinc-700 font-bold uppercase tracking-tighter">@{story.author}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </BentoCard>
  );
};
