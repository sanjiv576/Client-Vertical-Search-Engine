"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Layout } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white font-bold text-lg">IR</span>
              </div>
              <span className="font-bold text-lg text-slate-100 hidden sm:block tracking-tight">
                IR Research - <span className="text-slate-400">ST7071CEM</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === "/" || pathname === "/search"
                    ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Vertical Search</span>
              </Link>
              
              <Link
                href="/clustering"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === "/clustering"
                    ? "bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">News Clustering</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <span className="text-xs font-medium text-slate-300">Coventry University</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
