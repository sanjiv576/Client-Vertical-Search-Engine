"use client";

import { LayoutGrid, Network, FileText, SearchCode } from "lucide-react";
import { motion } from "framer-motion";

type TabOption = "Overview" | "Clusters" | "Classify";

interface TabsProps {
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
}

const TABS = [
  { id: "Overview", label: "Overview", icon: LayoutGrid, color: "text-purple-400" },
  { id: "Clusters", label: "Clusters", icon: Network, color: "text-blue-400" },
  { id: "Classify", label: "Classify", icon: SearchCode, color: "text-emerald-400" },
] as const;

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex justify-start border-b border-slate-800/50 mb-8 overflow-x-auto no-scrollbar relative">
      <div className="flex space-x-2 pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabOption)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-t-lg transition-colors duration-200 ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : ""}`} />
              <span className="font-semibold text-sm">{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
