"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClusterResponse } from "@/types/clustering";
import { SearchCode, TrendingUp, Film, Landmark } from "lucide-react";

interface ClassifyTabProps {
  isClassifying: boolean;
  onClassify: (text: string) => Promise<ClusterResponse | null>;
}

const CLASSIFY_OPTIONS = [
  "Spain won FIFA World Cup 2026",
  "The animated musical became a cultural phenomenon, dominating music charts and merchandise sales.",
  "Social media platforms updated policies regarding political advertisement verification.",
  "The new tax reform package aims to boost domestic manufacturing and exports.",
];

export function ClassifyTab({ isClassifying, onClassify }: ClassifyTabProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ClusterResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await onClassify(text);
    setResult(res);
  };

  const getCategoryConfig = (category: string) => {
    switch (category.toLowerCase()) {
      case "economics": return { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/50" };
      case "entertainment": return { icon: Film, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/50" };
      case "politics": return { icon: Landmark, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/50" };
      default: return { icon: SearchCode, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/50" };
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="flex items-center gap-3 mb-2">
          <SearchCode className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">Classify a Document</h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base mb-6">
          Enter any text — the K-Means model will classify it into Economics, Entertainment, or Politics.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl blur opacity-50 group-focus-within:opacity-100 transition duration-500"></div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste article text here..."
              className="relative w-full h-40 md:h-48 p-4 rounded-xl bg-slate-950/80 border border-slate-700/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 text-slate-100 placeholder-slate-500 outline-none transition-all duration-300 resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Try an example:</span>
            <div className="flex flex-col gap-2">
              {CLASSIFY_OPTIONS.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setText(option)}
                  className="text-left text-sm px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 rounded-lg text-slate-300 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isClassifying || !text.trim()}
            className="w-full sm:w-auto mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isClassifying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Classifying...</span>
              </>
            ) : (
              <span>Classify Text</span>
            )}
          </button>
        </form>
      </div>

      <div className="w-full">
        <AnimatePresence>
          {result && result.data && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
            >
              {(() => {
                const config = getCategoryConfig(result.data.predicted_category);
                const Icon = config.icon;

                return (
                  <div className={`p-6 rounded-2xl border ${config.bg} ${config.border} backdrop-blur-md shadow-lg relative overflow-hidden group`}>
                    {/* Subtle glow effect behind the result card based on category */}
                    <div className={`absolute top-1/2 right-0 p-24 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-20 ${config.bg}`}></div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-slate-900 shadow-inner border border-slate-800 ${config.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-extrabold tracking-tight ${config.color}`}>
                          {result.data.predicted_category}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                          <span>Cluster: {result.data.cluster}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                          <span>Method: k-means</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/50">
                      <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                        <span>Confidence</span>
                        <span>~99.9%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "99.9%" }}
                          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${config.color.replace('text-', 'bg-')}`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
