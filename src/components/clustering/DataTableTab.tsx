"use client";

import { ClusteredDocument } from "@/types/clustering";

interface DataTableTabProps {
  documents: ClusteredDocument[];
  isLoading: boolean;
}

export function DataTableTab({ documents, isLoading }: DataTableTabProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "economics": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "entertainment": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "politics": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  // Sort by _id descending (assuming MongoDB ObjectId, this puts newest items at the top)
  const sortedDocs = [...documents].sort((a, b) => b._id.localeCompare(a._id));

  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto no-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 sticky top-0 z-10 backdrop-blur-md shadow-sm">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Document Snippet</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Original Category</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Cluster</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Predicted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {sortedDocs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No documents found.
                </td>
              </tr>
            ) : (
              sortedDocs.map((doc) => (
                <tr key={doc._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-64 md:w-96 lg:w-[32rem] xl:w-[48rem] truncate text-slate-300 font-medium" title={doc.document}>
                      {doc.document}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {doc.true_category ? (
                      <span className="text-slate-400 font-medium">{doc.true_category}</span>
                    ) : (
                      <span className="text-slate-500 italic">Unknown</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                      C-{doc.cluster}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getCategoryColor(doc.predicted_category)}`}>
                      {doc.predicted_category}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
