
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const BentoCard = ({ 
  children, 
  className, 
  delay = 0,
  hoverable = true 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  hoverable?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    whileHover={hoverable ? { scale: 1.005, y: -2, transition: { duration: 0.2 } } : {}}
    className={cn(
      "relative overflow-hidden rounded-4xl border border-white/10 bg-zinc-900/20 p-6 md:p-8 backdrop-blur-3xl transition-colors duration-300 hover:border-white/20 hover:bg-zinc-900/30",
      className
    )}
  >
    {children}
  </motion.div>
);
