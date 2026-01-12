
import { motion } from "framer-motion";
import { Hash, TrendingUp, TrendingDown } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { cn } from "../utils/cn";

interface Topic {
  name: string;
  trend: string;
}

interface TechStackProps {
  topics: Topic[];
}

export const TechStack = ({ topics }: TechStackProps) => {
  return (
    <BentoCard className="md:col-span-2 md:row-span-2 border-white/5 bg-zinc-950/20" delay={0.4}>
      <div className="flex items-center gap-3 mb-8">
        <Hash className="w-5 h-5 text-emerald-500" />
        <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Tech Density</span>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-hidden">
        {(topics.length > 0 ? topics : [{name: 'Syncing', trend: '...'}, {name: 'Syncing', trend: '...'}]).slice(0, 4).map((topic, i) => {
          const isUp = topic.trend === 'up' || topic.trend.startsWith('+');
          const isDown = topic.trend === 'down' || topic.trend.startsWith('-');
          
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col gap-2 transition-colors overflow-hidden"
            >
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight truncate">{topic.name}</span>
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-lg",
                  isUp ? "text-emerald-400 bg-emerald-500/10" : 
                  isDown ? "text-rose-400 bg-rose-500/10" : 
                  "text-zinc-500 bg-zinc-500/10"
                )}>
                  {topic.trend.toUpperCase()}
                </span>
                {isUp ? <TrendingUp size={14} className="text-emerald-400" /> : 
                 isDown ? <TrendingDown size={14} className="text-rose-400" /> : 
                 <div className="w-3 h-0.5 bg-zinc-700" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </BentoCard>
  );
};
