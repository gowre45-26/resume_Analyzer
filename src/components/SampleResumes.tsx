import React, { useState } from 'react';
import { SAMPLE_RESUMES } from '../data/samples';
import { SampleResume } from '../types';
import { FileText, ArrowRight, Download, Eye, X, Check } from 'lucide-react';

interface SampleResumesProps {
  onSelectSample: (sample: SampleResume) => void;
}

export const SampleResumes: React.FC<SampleResumesProps> = ({ onSelectSample }) => {
  const [activeModal, setActiveModal] = useState<SampleResume | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (sample: SampleResume) => {
    navigator.clipboard.writeText(sample.content);
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (sample: SampleResume) => {
    const blob = new Blob([sample.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sample.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="samples" className="py-20 bg-[#0e1422] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Verification Benchmarks
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-['Syne',sans-serif]">
            Curated Candidate Profiles for Instant Testing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Select any pre-configured candidate document to immediately test document ingestion and qualification scoring through the n8n cloud endpoint.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {sample.name}
                    </h3>
                    <div className="text-xs text-amber-400 font-mono mt-0.5">{sample.role}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                    {sample.experienceYears}y exp
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sample.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Metrics & Impact
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {sample.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 shrink-0">·</span>
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveModal(sample)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="View full resume text"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(sample)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Download resume file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectSample(sample);
                    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  <span>Load & Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for previewing full sample resume */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <h3 className="text-base font-bold text-white">{activeModal.name}</h3>
                <div className="text-xs text-slate-400">{activeModal.fileName}</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-[#0a0e17]">
              {activeModal.content}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCopyText(activeModal)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedId === activeModal.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Copy Document Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectSample(activeModal);
                  setActiveModal(null);
                  document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                <span>Load into Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
