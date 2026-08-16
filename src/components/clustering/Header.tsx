"use client";

import { motion } from "framer-motion";
import { TrendingUp, Film, Landmark } from "lucide-react";

interface HeaderProps {
  stats: {
    totalDocuments: number;
    economicsCount: number;
    entertainmentCount: number;
    politicsCount: number;
  };
}

export function Header({ stats }: HeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 shadow-inner backdrop-blur-sm"
      >
        <span className="text-xs font-bold tracking-widest text-slate-400">
          K-MEANS CLUSTERING · K = 3
        </span>
      </motion.div>

      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 drop-shadow-lg"
        >
          News Document Clustering
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 font-medium"
        >
          Automatic classification into Economics · Entertainment · Politics
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-6"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-slate-300">Economics</span>
          <span className="text-sm font-bold text-emerald-400 ml-1">{stats.economicsCount}</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <Film className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-slate-300">Entertainment</span>
          <span className="text-sm font-bold text-purple-400 ml-1">{stats.entertainmentCount}</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Landmark className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-slate-300">Politics</span>
          <span className="text-sm font-bold text-blue-400 ml-1">{stats.politicsCount}</span>
        </div>
      </motion.div>
    </div>
  );
}
