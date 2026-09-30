import React from 'react';
import { 
  Cpu, 
  FileText, 
  SlidersHorizontal, 
  Workflow, 
  Mail, 
  Layers
} from 'lucide-react';
import showcaseImage from '../assets/images/resume_workflow_insights_1790759392436.jpg';

export const AnalysisPipeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Cloud Form Trigger & Ingestion',
      icon: Workflow,
      desc: 'Listens on the dedicated n8n cloud webhook. Instantly accepts candidate metadata and binary resume payload without cold starts.',
      details: 'Payload Schema: field-0 (Name) · field-1 (Email) · field-2 (Document Buffer)'
    },
    {
      num: '02',
      title: 'Document Decomposition & OCR',
      icon: FileText,
      desc: 'Converts unstructured PDF, Word, and text documents into structured AST JSON arrays. Separates work chronology, certifications, and skill clusters.',
      details: 'Extracts 100% text without losing tabular layout or bulleted metric relations'
    },
    {
      num: '03',
      title: 'LLM Scoring & ATS Compatibility Engine',
      icon: Cpu,
      desc: 'Applies deep semantic parsing against target job competencies, measuring keyword density, action-verb impact, and seniority fit.',
      details: 'Analyzes quantifiable achievements (e.g. revenue, latency, team size, scale)'
    },
    {
      num: '04',
      title: 'Heuristic Routing & Decision Matrix',
      icon: SlidersHorizontal,
      desc: 'Branches downstream actions based on match scores. High-match candidates trigger interview scheduling; developing candidates receive actionable feedback.',
      details: 'Automated pass-through filtering calibrated to role-specific requirements'
    },
    {
      num: '05',
      title: 'Candidate Digest & Recruiter Notification',
      icon: Mail,
      desc: 'Generates polished diagnostic evaluation reports and logs candidates into Google Sheets, Airtable, or ATS platforms with automated email dispatch.',
      details: 'Dispatches candidate notifications and synchronization webhooks in real-time'
    }
  ];

  return (
    <section id="pipeline" className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Workflow Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Autonomous Orchestration
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-['Syne',sans-serif] text-balance">
              How the n8n Cloud Pipeline Analyzes Every Candidate Resume.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Every document submitted through the webhook triggers an event-driven automation sequence designed to eliminate manual screening bottlenecks while providing rigorous, unbiased evaluation.
            </p>

            <div className="space-y-4 pt-2">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 font-mono text-xs font-bold shrink-0">
                        {step.num}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-100">{step.title}</h3>
                          <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                        <div className="text-[11px] font-mono text-slate-400 pt-1">
                          {step.details}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Showcase & Diagram */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
              <img
                src={showcaseImage}
                alt="Executive reviewing analytical candidate dossiers"
                className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div 
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-black/30"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0e1422]/90 backdrop-blur-md rounded-xl border border-slate-700/80 text-xs">
                <div className="flex items-center justify-between text-slate-200 font-semibold mb-1">
                  <span>n8n Workflow Node Graph</span>
                  <span className="text-amber-400 font-mono text-[11px]">Webhook Trigger Active</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Direct connection established to instance <span className="font-mono text-slate-300">jyothsnagowre.app.n8n.cloud</span>
                </p>
              </div>
            </div>

            {/* Visual Node Diagram */}
            <div id="architecture" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>n8n Pipeline Architecture</span>
                </div>
                <div className="text-xs text-emerald-400 font-mono">Live Webhook</div>
              </div>

              {/* Node connectors visual */}
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-slate-200">1. Form Node (Trigger)</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">8f04bd9a-9028-4e0a</span>
                </div>

                <div className="flex justify-center -my-1 text-slate-600">↓</div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="text-slate-200">2. Extract Binary to Text</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">PDF/Docx Parser</span>
                </div>

                <div className="flex justify-center -my-1 text-slate-600">↓</div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-slate-200">3. AI Resume Analyzer Agent</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">LLM Evaluator</span>
                </div>

                <div className="flex justify-center -my-1 text-slate-600">↓</div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-200">4. Dispatch Candidate Dossier</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Email / DB Storage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
