import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Database } from 'lucide-react';
import heroImage from '../assets/images/resume_analyzer_hero_1790759378274.jpg';

interface HeroProps {
  n8nTargetUrl: string;
  onOpenInspector: () => void;
}

export const Hero: React.FC<HeroProps> = ({ n8nTargetUrl, onOpenInspector }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle radial glow background */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-amber-500/10 via-sky-500/5 to-transparent blur-3xl -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wide uppercase">
              <span>n8n Cloud Workflow Ingestion</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise ATS Diagnostics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Syne',sans-serif] text-balance leading-[1.08]">
              Automate Resume Screening with Precision Workflow Intelligence.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connect applicant documents directly into live cloud automation pipelines. Extract text, benchmark competencies against market thresholds, detect layout friction, and route evaluated dossiers straight to hiring systems.
            </p>

            {/* Unboxed metadata tags */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Cold-Start Webhook</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>ATS Formatting Audit</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multi-Format Ingestion</span>
              </span>
            </div>

            {/* CTA action cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#analyzer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenInspector}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-500 hover:text-white transition-all whitespace-nowrap"
              >
                <span>Inspect n8n Form Webhook</span>
              </button>
            </div>

            {/* Live endpoint reassurance */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2 font-mono truncate max-w-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-500">Live Endpoint:</span>
              <span className="truncate text-slate-300 underline decoration-slate-600 underline-offset-2">
                {n8nTargetUrl}
              </span>
            </div>
          </div>

          {/* Right Column: Dominant Focal Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-black/80 bg-slate-900/60 group">
              <img
                src={heroImage}
                alt="Executive desk with laptop evaluating structured candidate resume analytics"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div 
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-black/20"
              />

              {/* Inset verified badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0e1422]/90 backdrop-blur-md rounded-xl border border-slate-700/80 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">Active Workflow Trigger</div>
                    <div className="text-slate-400 font-mono text-[11px]">POST FormData · field-0, field-1, field-2</div>
                  </div>
                </div>
                <div className="text-right font-mono text-emerald-400 font-medium tabular-nums">
                  200 OK
                </div>
              </div>
            </div>

            {/* Proof metrics row directly adjacent */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-center">
                <div className="text-lg font-bold text-white font-mono tabular-nums">100%</div>
                <div className="text-[11px] text-slate-400">Valid Ingestion</div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-center">
                <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">&lt; 3.0s</div>
                <div className="text-[11px] text-slate-400">Pipeline Ingest</div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-center">
                <div className="text-lg font-bold text-sky-400 font-mono tabular-nums">40+</div>
                <div className="text-[11px] text-slate-400">ATS Vectors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
