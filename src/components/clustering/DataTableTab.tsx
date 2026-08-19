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
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 sticky top-0 z-10 backdrop-blur-md shadow-sm hidden md:table-header-group">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold tracking-wider">Document Snippet</th>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold tracking-wider">Original Category</th>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold tracking-wider">Cluster</th>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold tracking-wider">Predicted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 block md:table-row-group">
            {sortedDocs.length === 0 ? (
              <tr className="block md:table-row">
                <td colSpan={4} className="px-4 md:px-6 py-8 text-center text-slate-400 block md:table-cell">
                  No documents found.
                </td>
              </tr>
            ) : (
              sortedDocs.map((doc) => (
                <tr key={doc._id} className="hover:bg-slate-800/30 transition-colors block md:table-row p-4 md:p-0">
                  <td className="block md:table-cell px-2 md:px-6 py-3 md:py-4">
                    <span className="md:hidden text-[10px] font-semibold text-slate-500 uppercase block mb-1.5 tracking-wider">Document Snippet</span>
                    <div className="w-full md:w-64 lg:w-[32rem] xl:w-[48rem] whitespace-normal md:whitespace-nowrap md:truncate text-slate-300 font-medium leading-relaxed" title={doc.document}>
                      {doc.document}
                    </div>
                  </td>
                  <td className="flex md:table-cell items-center px-2 md:px-6 py-2 md:py-4">
                    <span className="md:hidden text-[10px] font-semibold text-slate-500 uppercase inline-block w-32 shrink-0 tracking-wider">Original Category</span>
                    {doc.true_category ? (
                      <span className="text-slate-400 font-medium">{doc.true_category}</span>
                    ) : (
                      <span className="text-slate-500 italic">Unknown</span>
                    )}
                  </td>
                  <td className="flex md:table-cell items-center px-2 md:px-6 py-2 md:py-4">
                    <span className="md:hidden text-[10px] font-semibold text-slate-500 uppercase inline-block w-32 shrink-0 tracking-wider">Cluster</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                      C-{doc.cluster}
                    </span>
                  </td>
                  <td className="flex md:table-cell items-center px-2 md:px-6 py-2 md:py-4">
                    <span className="md:hidden text-[10px] font-semibold text-slate-500 uppercase inline-block w-32 shrink-0 tracking-wider">Predicted</span>
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
