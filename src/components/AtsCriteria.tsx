import React from 'react';
import { CheckCircle2, XCircle, Award, Target, FileSearch, TrendingUp } from 'lucide-react';

export const AtsCriteria: React.FC = () => {
  const criteria = [
    {
      title: 'Structural ATS Readability',
      icon: FileSearch,
      desc: 'ATS parsers strip complex graphic columns, text boxes, and nested tables. The workflow scans for linear hierarchy and standard header tokens.',
      positive: 'Standard sections (Experience, Education, Skills), single-column hierarchy, bulleted lists.',
      negative: 'Nested multi-column tables, rasterized image resumes, icons embedded in header dates.'
    },
    {
      title: 'Metric-Driven Impact Scoring',
      icon: TrendingUp,
      desc: 'Top-tier candidates substantiate every achievement with numerical benchmarks. The analyzer tracks quantified percentages, dollar values, and timelines.',
      positive: 'Increased pipeline velocity by 38% in 6 months; optimized AWS spend by $120,000.',
      negative: 'Vague statements like "Responsible for improving system speed and helping teammates."'
    },
    {
      title: 'Contextual Keyword Density',
      icon: Target,
      desc: 'Evaluates role-specific terminology in natural linguistic context rather than artificial keyword stuffing.',
      positive: 'Semantic depth across architecture, design patterns, testing frameworks, and tooling.',
      negative: 'Hidden white-text keywords or isolated bullet lists without contextual demonstration.'
    },
    {
      title: 'Executive Scope & Leadership Verbs',
      icon: Award,
      desc: 'Differentiates operational task execution from strategic ownership and cross-functional leadership.',
      positive: 'Spearheaded, architected, orchestrated, negotiated, mentored, delivered.',
      negative: 'Assisted with, participated in, worked on, handled daily tasks.'
    }
  ];

  return (
    <section id="criteria" className="py-20 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Evaluation Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-['Syne',sans-serif]">
            ATS Diagnostic Criteria & Screening Standards
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Learn the exact heuristics the automated workflow evaluates when calculating candidate viability and resume readability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-start gap-2 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-400 font-semibold">Recommended:</strong> {item.positive}</span>
                  </div>
                  <div className="flex items-start gap-2 text-rose-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong className="text-rose-400 font-semibold">Avoid:</strong> {item.negative}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
