import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Trash2, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/samples';
import { SampleResume, SubmissionResponse } from '../types';

interface LiveSubmissionPortalProps {
  n8nTargetUrl: string;
  onOpenInspector: () => void;
  externalSample?: SampleResume | null;
}

export const LiveSubmissionPortal: React.FC<LiveSubmissionPortalProps> = ({
  n8nTargetUrl,
  onOpenInspector,
  externalSample
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Senior Software Engineer');
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewText, setFilePreviewText] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  // Sync external sample if selected
  React.useEffect(() => {
    if (externalSample) {
      handleLoadSample(externalSample);
    }
  }, [externalSample]);
  
  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; file?: string }>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick load sample resume
  const handleLoadSample = (sample: SampleResume) => {
    setName(sample.name);
    setEmail(sample.email);
    setSelectedRole(sample.role);
    
    // Create actual File blob from sample text
    const sampleBlob = new Blob([sample.content], { type: 'text/plain' });
    const sampleFile = new File([sampleBlob], sample.fileName, { type: 'text/plain' });
    
    setFile(sampleFile);
    setFilePreviewText(sample.content.slice(0, 300) + '...');
    setErrors({});
    setSubmissionResult(null);
    setSubmissionError(null);
  };

  // Drag and drop handlers
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File exceeds 15MB limit. Please provide a smaller document.' }));
      return;
    }

    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: undefined }));

    // Preview snippet if text/markdown
    if (selectedFile.type.includes('text') || selectedFile.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFilePreviewText(text ? text.slice(0, 300) + '...' : '');
      };
      reader.readAsText(selectedFile);
    } else {
      setFilePreviewText(`Binary document ready for n8n extraction (${selectedFile.name}, ${(selectedFile.size / 1024).toFixed(1)} KB)`);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreviewText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; file?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required by the n8n form (field-0).';
    }
    if (!email.trim()) {
      newErrors.email = 'Valid email is required by the n8n form (field-1).';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!file) {
      newErrors.file = 'Resume file document is required by the n8n form (field-2).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !file) return;

    setIsSubmitting(true);
    setSubmissionProgress(15);
    setSubmissionError(null);
    setSubmissionResult(null);

    const formData = new FormData();
    // n8n field mappings
    formData.append('field-0', name.trim());
    formData.append('field-1', email.trim());
    formData.append('field-2', file, file.name);
    // Also include standard fields for proxy server
    formData.append('name', name.trim());
    formData.append('email', email.trim());
    formData.append('resume', file, file.name);
    formData.append('customUrl', n8nTargetUrl);

    try {
      const progressTimer = setInterval(() => {
        setSubmissionProgress((prev) => {
          if (prev >= 85) {
            clearInterval(progressTimer);
            return 85;
          }
          return prev + 18;
        });
      }, 300);

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressTimer);
      setSubmissionProgress(100);

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult(data);
      } else {
        throw new Error(data.message || `Server returned HTTP ${response.status}`);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Submission failed';
      setSubmissionError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    removeFile();
    setSubmissionResult(null);
    setSubmissionError(null);
  };

  return (
    <section id="analyzer" className="py-16 sm:py-24 bg-[#0e1422] border-y border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Automated Ingestion Portal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-['Syne',sans-serif]">
            Submit Resume for n8n Evaluation
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Upload candidate credentials to trigger automated document parsing, scoring heuristics, and ATS validation through the connected n8n cloud workflow.
          </p>
        </div>

        {/* 1-Click Sample Resumes Bar */}
        <div className="mb-8 p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Test Profiles: Click to load ready-to-test candidate resumes:</span>
            </span>
            <button
              onClick={onOpenInspector}
              className="text-xs text-slate-400 hover:text-amber-400 underline underline-offset-2 transition-colors self-start sm:self-auto"
            >
              Verify Endpoint Config
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLoadSample(sample)}
                className="text-left p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/50 transition-all text-xs group"
              >
                <div className="font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>{sample.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{sample.experienceYears}y exp</span>
                </div>
                <div className="text-slate-400 text-[11px] truncate mt-0.5">{sample.role}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Submission Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {submissionResult ? (
            /* Submission Success View */
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Syne',sans-serif]">
                    Resume Successfully Dispatched to n8n Cloud
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    The n8n workflow received candidate dossier{' '}
                    <strong className="text-emerald-400 font-semibold">{submissionResult.submittedData?.fileName}</strong>{' '}
                    and initiated the automated qualification assessment pipeline.
                  </p>
                </div>
              </div>

              {/* Execution Receipt Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">Target n8n Form</div>
                  <div className="text-xs font-mono text-slate-200 mt-1 truncate" title={n8nTargetUrl}>
                    8f04bd9a-9028-4e0a-ba56
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">Candidate Email</div>
                  <div className="text-xs font-mono text-slate-200 mt-1 truncate">
                    {submissionResult.submittedData?.email}
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">HTTP Response Code</div>
                  <div className="text-xs font-mono text-emerald-400 mt-1 tabular-nums">
                    {submissionResult.statusCode || 200} OK
                  </div>
                </div>
              </div>

              {/* Workflow Pipeline Progression Checklist */}
              <div className="p-5 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  n8n Pipeline Processing Stages
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>01. Form Trigger Ingestion: Captured candidate payload and binary buffer</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>02. Document Extraction: Tokenized text, education, and career experience</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>03. AI Evaluation: Scored ATS readability, core competencies, and impact verbs</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>04. Output Delivery: Candidate evaluation report dispatched to workflow destination</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <a
                  href={n8nTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <span>Open direct n8n form view</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  <span>Submit Another Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Active Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field-0: Name */}
                <div>
                  <label htmlFor="field-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Sterling"
                    className={`w-full px-3.5 py-2.5 bg-slate-950/70 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                      errors.name
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field-1: Email */}
                <div>
                  <label htmlFor="field-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jordan.sterling@domain.com"
                    className={`w-full px-3.5 py-2.5 bg-slate-950/70 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Target Role Track */}
              <div>
                <label htmlFor="field-role" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Target Assessment Profile
                </label>
                <select
                  id="field-role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                >
                  <option value="Senior Software Engineer">Senior Software Engineer / Architect</option>
                  <option value="Principal Product Manager">Product Manager / Tech Lead</option>
                  <option value="Data & Machine Learning Specialist">AI / Machine Learning Specialist</option>
                  <option value="DevOps & Cloud Systems Engineer">DevOps & Cloud Infrastructure</option>
                  <option value="Engineering Director / Executive">Engineering Director / Executive</option>
                </select>
              </div>

              {/* Field-2: File Upload (Drag & Drop) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Upload Resume Document (PDF, Word, or TXT) <span className="text-amber-400">*</span>
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                />

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-amber-400 bg-amber-500/5'
                        : 'border-slate-700/80 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-950/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-sm font-medium text-slate-200">
                      Drop your resume here, or <span className="text-amber-400 hover:underline">browse files</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Supports PDF, DOCX, DOC, and TXT files up to 15MB
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium text-slate-100 truncate">{file.name}</div>
                        <div className="text-xs text-slate-400 font-mono tabular-nums">
                          {(file.size / 1024).toFixed(1)} KB · Ready for n8n ingestion
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {errors.file && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.file}</span>
                  </p>
                )}
              </div>

              {/* Document preview if available */}
              {filePreviewText && (
                <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-lg text-xs font-mono text-slate-400">
                  <div className="flex items-center justify-between mb-1.5 text-[11px] text-slate-400">
                    <span>Parsed Content Snippet</span>
                    <span>Ready</span>
                  </div>
                  <p className="line-clamp-3 leading-relaxed text-slate-300">
                    {filePreviewText}
                  </p>
                </div>
              )}

              {/* Submission error banner */}
              {submissionError && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-rose-200">Transmission Alert</div>
                    <p className="mt-0.5">{submissionError}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="underline hover:text-white"
                      >
                        Retry Transmission
                      </button>
                      <span>·</span>
                      <a
                        href={n8nTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        Submit Directly to Hosted n8n Form
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Payload mapped to: </span>
                  <span className="font-mono text-slate-300">field-0, field-1, field-2</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-slate-950 rounded-lg transition-all shadow-lg whitespace-nowrap ${
                    isSubmitting
                      ? 'bg-amber-400/70 cursor-not-allowed'
                      : 'bg-amber-400 hover:bg-amber-300 active:scale-[0.98] shadow-amber-400/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Transmitting ({submissionProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit to n8n Workflow</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
