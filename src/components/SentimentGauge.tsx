
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { cn } from "../utils/cn";

interface SentimentItem {
  label: string;
  value: number;
  color: string;
}

interface SentimentGaugeProps {
  sentiment: SentimentItem[];
}

export const SentimentGauge = ({ sentiment }: SentimentGaugeProps) => {
  return (
    <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between border-white/5 bg-zinc-950/20" delay={0.3}>
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Activity className="w-5 h-5 text-blue-500" />
          <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Social Bias</span>
        </div>
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Market Sentiment</span>
              <span className="text-4xl font-black text-white uppercase tracking-tighter italic">Skeptical</span>
            </div>
            <span className="text-5xl font-['JetBrains_Mono'] font-bold text-zinc-400 tracking-tighter">70<span className="text-xl">%</span></span>
          </div>
          <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden flex p-0.5 border border-white/5">
            {sentiment.map((s, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className={cn("h-full rounded-full transition-all duration-1000", s.color)}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em] leading-loose">
        Synthesizing... Verified clusters: 1.4k
      </p>
    </BentoCard>
  );
};
