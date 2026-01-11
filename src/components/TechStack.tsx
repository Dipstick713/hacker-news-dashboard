
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
      <div className="grid grid-cols-2 gap-3">
        {topics.map((topic, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="p-5 bg-white/2 border border-white/5 rounded-3xl flex flex-col gap-2 transition-colors"
          >
            <span className="text-xs font-black text-zinc-100 uppercase tracking-tight">{topic.name}</span>
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-[9px] font-black px-2 py-0.5 rounded-lg",
                topic.trend.startsWith("+") ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
              )}>
                {topic.trend}
              </span>
              {topic.trend.startsWith("+") ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-rose-500" />}
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};
