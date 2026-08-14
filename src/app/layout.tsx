import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coventry Publications Vertical Search Engine",
  description: "Search engine for Coventry Publications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50">
        {children}
        <footer className="w-full py-6 mt-auto border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-400">
              Developed by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide drop-shadow-sm">Sanjiv Shrestha</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
