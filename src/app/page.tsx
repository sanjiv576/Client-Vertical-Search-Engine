"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-12 mb-32">
        {/* Animated Glow Effect Behind Title */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg blur-2xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-4xl md:text-6xl lg:text-8xl font-extrabold text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-lg p-2 leading-tight">
            Coventry Publications<br />
            <span className="text-2xl md:text-4xl lg:text-6xl">Vertical Search Engine</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="w-full px-4 md:px-0 md:w-3/4 lg:w-full lg:max-w-2xl relative group">
          {/* Subtle glow behind search bar */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
            </div>
            <input
              type="text"
              autoFocus
              className="w-full pl-16 pr-8 py-5 rounded-full bg-slate-900/90 border border-slate-700/50 focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-500/20 text-md text-slate-100 placeholder-slate-500 outline-none transition-all duration-300 shadow-xl backdrop-blur-md"
              placeholder="Search academic papers, authors, journals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-full transition-colors duration-300 flex items-center shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:shadow-[0_0_25px_rgba(8,145,178,0.7)]"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400 mt-8 max-w-4xl">
          {[
            "Published by author Whelan, M.",
            "Research paper published in 2026",
            "In: Pilot and Feasibility Studies",
            "Cross-sectional study",
            "Evaluation of The Green House Whole Family Support Model",
            "A cross-cultural study on the career counseling service ecosystem: implications for higher education marketing"
          ].map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                router.push(`/search?q=${encodeURIComponent(suggestion)}`);
              }}
              title={suggestion}
              className="px-4 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800 transition-all text-left max-w-full md:max-w-xl truncate shadow-sm hover:shadow-md min-h-[44px]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
