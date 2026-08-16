"use client";

import { useState, useCallback, useEffect } from "react";
import { ClusteredDocument, ClusterResponse } from "../types/clustering";
import { getDocs, resetCluster, clusterText } from "../lib/api/clustering";

export function useClustering() {
  const [documents, setDocuments] = useState<ClusteredDocument[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoadingDocs(true);
    setError(null);
    try {
      const response = await getDocs();
      if (response.status === "success" || response.data) {
        setDocuments(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch documents");
    } finally {
      setIsLoadingDocs(false);
    }
  }, []);

  const handleReset = async () => {
    setIsResetting(true);
    setError(null);
    try {
      await resetCluster();
      await fetchDocuments();
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to reset clusters");
      return false;
    } finally {
      setIsResetting(false);
    }
  };

  const handleClassify = async (text: string): Promise<ClusterResponse | null> => {
    setIsClassifying(true);
    setError(null);
    try {
      const response = await clusterText({ text });
      return response;
    } catch (err: any) {
      setError(err.message || "Failed to classify text");
      return null;
    } finally {
      setIsClassifying(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const stats = {
    totalDocuments: documents.length,
    economicsCount: documents.filter(d => d.predicted_category === "Economics" || d.cluster === 0).length,
    entertainmentCount: documents.filter(d => d.predicted_category === "Entertainment" || d.cluster === 1).length,
    politicsCount: documents.filter(d => d.predicted_category === "Politics" || d.cluster === 2).length,
  };

  return {
    documents,
    isLoadingDocs,
    isResetting,
    isClassifying,
    error,
    stats,
    handleReset,
    handleClassify,
    fetchDocuments
  };
}
