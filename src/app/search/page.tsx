"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, User, SearchX, Telescope, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import type { RankingResponse } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [queryInput, setQueryInput] = useState(initialQuery);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [results, setResults] = useState<RankingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const RESULTS_PER_PAGE = 10;

  const BASE_URL = "https://assignment-cu-publications-vse-api.onrender.com";
  const LOCAL_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchResults = async () => {
      if (!currentQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setResults([]);
      setError(null);
      setCurrentPage(1); // Reset page on new search

      const startTime = performance.now();

      try {
        const response = await fetch("https://assignment-cu-publications-vse-api.onrender.com/search/", {
        // const response = await fetch("http://localhost:8000/search/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: currentQuery.trim() }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setResults([]);
      } finally {
        const endTime = performance.now();
        setTimeTaken(Number(((endTime - startTime) / 1000).toFixed(2)));
        setLoading(false);
      }
    };

    fetchResults();
    setQueryInput(currentQuery); // Sync input with query in url if it changed
  }, [currentQuery]);

  useEffect(() => {
    // If URL query changes (back/forward navigation), update search
    const urlQuery = searchParams.get("q") || "";
    if (urlQuery !== currentQuery) {
      setCurrentQuery(urlQuery);
    }
  }, [searchParams, currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim() && queryInput.trim() !== currentQuery) {
      setResults([]); // Clear results immediately on new search
      router.push(`/search?q=${encodeURIComponent(queryInput.trim())}`);
      setCurrentQuery(queryInput.trim());
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-950 text-slate-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Small Logo */}
          <div
            className="cursor-pointer shrink-0"
            onClick={() => router.push('/')}
          >
            <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
              Coventry VSE
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 w-full max-w-2xl relative flex items-center group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-24 py-3 rounded-full text-md bg-slate-800/80 border border-slate-700/50 focus:border-cyan-500/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-full shadow-[0_0_10px_rgba(8,145,178,0.3)] transition-all active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 animate-pulse">Searching documents...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <p className="text-xl">{error}</p>
          </div>
        ) : currentQuery && results.length > 0 ? (
          <div className="space-y-6">
            {/* Metadata */}
            <p className="text-slate-400 text-sm mb-6 border-b border-slate-800/50 pb-4">
              {results.length} results for <span className="font-semibold text-slate-200">'{currentQuery}'</span> {timeTaken !== null && `(${timeTaken} seconds)`}
            </p>

            {/* Results List */}
            <div className="space-y-6">
              {paginatedResults.map((result, index) => {
                const globalIndex = (currentPage - 1) * RESULTS_PER_PAGE + index + 1;
                const scorePercentage = (result.score * 100).toFixed(2);

                return (
                  <div key={globalIndex} className="group p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden">
                    {/* Rank Badge */}
                    <div className="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 border border-slate-700">
                      #{globalIndex}
                    </div>

                    <div className="ml-12 space-y-3">
                      {/* Title */}
                      <h2 className="text-lg md:text-xl font-bold leading-snug">
                        {result.title_link ? (
                          <a href={result.title_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-cyan-300 hover:underline decoration-cyan-500/30 transition-colors">
                            {result.title}
                          </a>
                        ) : (
                          <span className="text-slate-200">{result.title}</span>
                        )}
                      </h2>

                      {/* Authors */}
                      {result.authors && result.authors.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          {result.authors.map((author, i) => (
                            author.link ? (
                              <a
                                key={i}
                                href={author.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] md:min-h-0 md:px-2.5 md:py-1 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/60 hover:border-cyan-600/60 hover:text-cyan-200 transition-all shadow-sm"
                              >
                                <User className="w-3.5 h-3.5 text-cyan-500" />
                                {author.name}
                              </a>
                            ) : (
                              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] md:min-h-0 md:px-2.5 md:py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>{author.name}</span>
                              </span>
                            )
                          ))}
                        </div>
                      )}

                      {/* Metadata Row */}
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 text-xs text-slate-400">
                        {result.publish_date && (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                            {result.publish_date}
                          </span>
                        )}
                        {result.journal_name && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {result.journal_name}
                          </span>
                        )}
                        {result.journal_volume && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Vol {result.journal_volume}
                          </span>
                        )}
                        {result.number_of_pages && (
                          <span className="text-slate-500">{result.number_of_pages} pages</span>
                        )}
                      </div>

                      {/* Score Bar */}
                      <div className="pt-4 flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider shrink-0">Score</span>
                        <div className="flex-1 min-w-[100px] h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            style={{ width: `${Math.max(1, result.score * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/50">
                          {Number(result.score).toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="hidden md:flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show a window of pages around currentPage
                    let pageNum = currentPage;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentPage === pageNum
                          ? "bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.4)] border border-cyan-500"
                          : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <div className="md:hidden flex items-center px-4 text-sm font-medium text-slate-300">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : currentQuery ? (
          // View C: Empty State
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center mt-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative p-6 bg-slate-900/80 rounded-full border border-slate-800 shadow-xl">
                <Telescope className="w-48 h-48 md:w-64 md:h-64 text-cyan-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-200 mb-2">
              No results found
            </h2>
            <p className="text-slate-400 mb-8 max-w-md break-words text-center px-4 sm:px-0">
              Your search - <span className="text-white font-semibold break-all">{currentQuery}</span> - did not match any documents.
            </p>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-left shadow-lg">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <SearchX className="w-4 h-4 text-slate-500" />
                Search Suggestions:
              </h3>
              <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-full flex items-center justify-center bg-slate-950"><div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin"></div></div>}>
      <SearchContent />
    </Suspense>
  );
}
