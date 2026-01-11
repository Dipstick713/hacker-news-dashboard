
import { motion } from 'framer-motion';
import { Flame, TrendingUp, MessageSquare, ArrowUpRight } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { SmoothSparkline } from './SmoothSparkline';

interface VelocityCardProps {
  story: any;
}

export const VelocityCard = ({ story }: VelocityCardProps) => {
  return (
    <BentoCard className="md:col-span-4 md:row-span-3 flex flex-col group bg-zinc-900/10 border-white/5" delay={0.1}>
      {/* Background Icon */}
      <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
        <Flame className="w-96 h-96 text-orange-500 rotate-12 blur-md" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full overflow-hidden">
        {/* Badge Row */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-6 shrink-0"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <Flame className="w-3.5 h-3.5 fill-current" /> High Velocity
          </div>
          <div className="h-px w-12 bg-zinc-800" />
          <div className="text-[10px] font-['JetBrains_Mono'] text-zinc-500 uppercase tracking-widest font-black">
            Priority Cluster
          </div>
        </motion.div>
        
        {/* Content Area - Fixed Underflow */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-8 group-hover:tracking-tight transition-all duration-500 line-clamp-2 lg:line-clamp-3">
            {story.title}
          </h2>

          <div className="flex flex-wrap items-center gap-8 md:gap-12 text-zinc-400">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Momentum</span>
              <div className="flex items-center gap-3 text-2xl md:text-3xl font-black text-white">
                <TrendingUp className="w-6 h-6 text-orange-500" /> {story.points}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Feedback</span>
              <div className="flex items-center gap-3 text-2xl md:text-3xl font-black text-white">
                <MessageSquare className="w-6 h-6 text-blue-500" /> {story.comments}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Delta</span>
              <div className="flex items-center gap-3 text-2xl md:text-3xl font-['JetBrains_Mono'] font-bold text-orange-500">
                +{story.velocity}<span className="text-xs opacity-50 px-1 font-sans">pts/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Trajectory - Fixed layout */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-end justify-between gap-6 shrink-0">
           <div className="w-full md:w-2/3">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Live Analysis Flow</p>
                <span className="text-[10px] font-['JetBrains_Mono'] text-emerald-500 tracking-tighter font-bold">+12% Volatility</span>
              </div>
              <SmoothSparkline data={story.history || []} />
           </div>
           <button className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-2xl">
              Extract <ArrowUpRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
    </BentoCard>
  );
};
