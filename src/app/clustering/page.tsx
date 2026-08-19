"use client";

import { useState, useEffect } from "react";
import { useClustering } from "@/hooks/useClustering";
import { Header } from "@/components/clustering/Header";
import { Tabs } from "@/components/clustering/Tabs";
import { OverviewTab } from "@/components/clustering/OverviewTab";
import { DataTableTab } from "@/components/clustering/DataTableTab";
import { ClassifyTab } from "@/components/clustering/ClassifyTab";
import { motion, AnimatePresence } from "framer-motion";

export default function ClusteringPage() {
  const {
    documents,
    isLoadingDocs,
    isResetting,
    isClassifying,
    stats,
    handleReset,
    handleClassify,
    fetchDocuments
  } = useClustering();

  const [activeTab, setActiveTab] = useState<"Overview" | "Clusters" | "Classify">("Overview");

  useEffect(() => {
    if (activeTab === "Clusters") {
      fetchDocuments();
    }
  }, [activeTab, fetchDocuments]);

  return (
    <main className="flex-1 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header stats={stats} />
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="Overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <OverviewTab 
                  stats={stats} 
                  isLoading={isLoadingDocs} 
                  isResetting={isResetting} 
                  onReset={handleReset} 
                />
              </motion.div>
            )}

            {activeTab === "Clusters" && (
              <motion.div
                key="DataTable"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <DataTableTab documents={documents} isLoading={isLoadingDocs} />
              </motion.div>
            )}

            {activeTab === "Classify" && (
              <motion.div
                key="Classify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ClassifyTab 
                  isClassifying={isClassifying} 
                  onClassify={handleClassify} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
