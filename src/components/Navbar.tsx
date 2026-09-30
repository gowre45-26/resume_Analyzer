import React from 'react';
import { ArrowUpRight, Activity } from 'lucide-react';

interface NavbarProps {
  n8nStatus: 'online' | 'checking' | 'offline';
  onOpenInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ n8nStatus, onOpenInspector }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight text-white font-['Syne',sans-serif] hover:text-amber-400 transition-colors"
        >
          ResumeAI
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#analyzer" className="hover:text-white transition-colors">
            Live Analyzer
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors">
            Workflow Engine
          </a>
          <a href="#samples" className="hover:text-white transition-colors">
            Sample Resumes
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            n8n Cloud Nodes
          </a>
          <a href="#criteria" className="hover:text-white transition-colors">
            ATS Standards
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenInspector}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-500 hover:text-white transition-colors"
            title="Inspect n8n webhook connection"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                n8nStatus === 'online'
                  ? 'bg-emerald-400 animate-pulse'
                  : n8nStatus === 'checking'
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-rose-500'
              }`}
            />
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums">n8n Cloud</span>
          </button>

          <a
            href="#analyzer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm shadow-amber-400/20"
          >
            <span>Analyze Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
