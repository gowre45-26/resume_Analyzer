import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  n8nTargetUrl: string;
  onOpenInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({ n8nTargetUrl, onOpenInspector }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090d14] text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-lg font-bold text-white font-['Syne',sans-serif]">
              ResumeAI
            </span>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              Automated resume intelligence and candidate screening orchestrations powered by n8n cloud workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#analyzer" className="hover:text-white transition-colors">
              Live Analyzer
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              Pipeline Stages
            </a>
            <a href="#samples" className="hover:text-white transition-colors">
              Sample Resumes
            </a>
            <a href="#criteria" className="hover:text-white transition-colors">
              ATS Criteria
            </a>
            <button
              onClick={onOpenInspector}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              n8n Inspector
            </button>
          </div>
        </div>

        {/* Unboxed metadata row with typographic separators */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span>Automated with n8n Cloud</span>
            <span aria-hidden="true">·</span>
            <span>Document Ingestion Endpoint</span>
            <span aria-hidden="true">·</span>
            <a 
              href={n8nTargetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 underline underline-offset-2"
            >
              <span>View Source Form</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            Form UUID: 8f04bd9a-9028-4e0a-ba56-7f5c2e568d2f
          </div>
        </div>
      </div>
    </footer>
  );
};
