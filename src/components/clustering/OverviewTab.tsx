"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { RefreshCw, Database, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { getClusteringAccuracy } from "../../lib/api/clustering";
import { AccuracyResponse } from "../../types/clustering";

interface OverviewTabProps {
  stats: {
    totalDocuments: number;
    economicsCount: number;
    entertainmentCount: number;
    politicsCount: number;
  };
  isLoading: boolean;
  isResetting: boolean;
  onReset: () => Promise<boolean>;
}

export function OverviewTab({ stats, isLoading, isResetting, onReset }: OverviewTabProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [accuracyData, setAccuracyData] = useState<AccuracyResponse | null>(null);
  const [isFetchingAccuracy, setIsFetchingAccuracy] = useState(false);

  const fetchAccuracy = async () => {
    setIsFetchingAccuracy(true);
    try {
      const data = await getClusteringAccuracy();
      setAccuracyData(data);
    } catch (error) {
      console.error("Failed to fetch accuracy", error);
    } finally {
      setIsFetchingAccuracy(false);
    }
  };

  useEffect(() => {
    fetchAccuracy();
  }, []);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-emerald-400";
    if (accuracy >= 75) return "text-green-400";
    if (accuracy >= 60) return "text-yellow-400";
    if (accuracy >= 50) return "text-orange-400";
    return "text-rose-500";
  };

  const data = [
    { name: "Economics", value: stats.economicsCount, color: "#10b981" },
    { name: "Entertainment", value: stats.entertainmentCount, color: "#a855f7" },
    { name: "Politics", value: stats.politicsCount, color: "#3b82f6" },
  ];

  const handleRetrainClick = async () => {
    const success = await onReset();
    if (success) {
      setToastMessage("Successfully collected data & retrained K-Means model.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const getPercentage = (count: number) => {
    if (stats.totalDocuments === 0) return 0;
    return ((count / stats.totalDocuments) * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-emerald-500/90 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5">
          <Database className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster Distribution */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            Cluster Distribution
          </h3>
          
          <div className="flex-1 min-h-[250px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -ml-28 md:-ml-32 lg:-ml-32">
              <span className="text-3xl font-extrabold text-white">{stats.totalDocuments}</span>
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Documents</span>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-6">Model Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Algorithm</span>
                <span className="text-slate-100 font-medium text-sm">K-Means (K=3, k-means++)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Clusters (K)</span>
                <span className="text-slate-100 font-medium text-sm">3</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Total Documents</span>
                <span className="text-slate-100 font-medium text-sm">{stats.totalDocuments}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm">Trained At</span>
                <span className="text-slate-100 font-medium text-sm">
                  {new Date().toISOString().replace('T', ' ').substring(0, 19)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4">
            <button
              onClick={handleRetrainClick}
              disabled={isResetting}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
              <span>{isResetting ? "Retraining Model..." : "Collect & Retrain"}</span>
            </button>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
              Fetches RSS feeds, stores articles per category, re-trains K-Means.
            </p>
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                {/* System Metrics */}
                Accuracy Rate
              </h3>
              <button
                onClick={fetchAccuracy}
                disabled={isFetchingAccuracy}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isFetchingAccuracy ? "animate-spin" : ""}`} />
              </button>
            </div>
            
            {accuracyData ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`text-6xl font-extrabold ${getAccuracyColor(accuracyData.accuracy)} mb-2`}>
                  {accuracyData.accuracy.toFixed(1)}%
                </div>
                <div className="text-sm font-medium text-slate-300 text-center px-4">
                  {accuracyData.assessment}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-sm text-slate-500">No accuracy data available.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Distribution Bars */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-6">Category Distribution</h3>
        
        <div className="space-y-5">
          {/* Economics */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
              <span className="text-sm font-medium text-slate-300">Economics</span>
            </div>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                style={{ width: `${getPercentage(stats.economicsCount)}%` }}
              ></div>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm font-bold text-slate-100">{stats.economicsCount}</span>
              <span className="text-xs text-slate-500 ml-1">({getPercentage(stats.economicsCount)}%)</span>
            </div>
          </div>

          {/* Entertainment */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
              <span className="text-sm font-medium text-slate-300">Entertainment</span>
            </div>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                style={{ width: `${getPercentage(stats.entertainmentCount)}%` }}
              ></div>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm font-bold text-slate-100">{stats.entertainmentCount}</span>
              <span className="text-xs text-slate-500 ml-1">({getPercentage(stats.entertainmentCount)}%)</span>
            </div>
          </div>

          {/* Politics */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
              <span className="text-sm font-medium text-slate-300">Politics</span>
            </div>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                style={{ width: `${getPercentage(stats.politicsCount)}%` }}
              ></div>
            </div>
            <div className="w-16 text-right">
              <span className="text-sm font-bold text-slate-100">{stats.politicsCount}</span>
              <span className="text-xs text-slate-500 ml-1">({getPercentage(stats.politicsCount)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
