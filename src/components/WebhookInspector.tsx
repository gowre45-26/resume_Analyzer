import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Terminal, 
  Send,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface WebhookInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  n8nTargetUrl: string;
  onUpdateTargetUrl: (url: string) => void;
  n8nStatus: 'online' | 'checking' | 'offline';
  onCheckStatus: () => void;
}

export const WebhookInspector: React.FC<WebhookInspectorProps> = ({
  isOpen,
  onClose,
  n8nTargetUrl,
  onUpdateTargetUrl,
  n8nStatus,
  onCheckStatus
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [customInputUrl, setCustomInputUrl] = useState(n8nTargetUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const curlCommand = `curl -X POST "${n8nTargetUrl}" \\
  -F "field-0=Alex Chen" \\
  -F "field-1=alex.chen@example.com" \\
  -F "field-2=@resume.pdf;type=application/pdf"`;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      onUpdateTargetUrl(customInputUrl.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
      onCheckStatus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                n8n Cloud Webhook & Integration Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Direct endpoint inspection for jyothsnagowre.app.n8n.cloud
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Status Bar */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  n8nStatus === 'online'
                    ? 'bg-emerald-400'
                    : n8nStatus === 'checking'
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-rose-500'
                }`}
              />
              <div>
                <div className="font-semibold text-slate-200">
                  {n8nStatus === 'online'
                    ? 'Endpoint Healthy & Connected (HTTP 200)'
                    : n8nStatus === 'checking'
                    ? 'Checking Connection...'
                    : 'Endpoint Unreachable or Offline'}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Target: {n8nTargetUrl}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCheckStatus}
                disabled={n8nStatus === 'checking'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${n8nStatus === 'checking' ? 'animate-spin' : ''}`} />
                <span>Ping Endpoint</span>
              </button>
              <a
                href={n8nTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Form Schema Documentation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Registered n8n Form Fields</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                <div className="font-mono text-amber-400 font-semibold">field-0</div>
                <div className="text-slate-200 font-medium mt-0.5">Candidate Name</div>
                <div className="text-[11px] text-slate-400 mt-1">Type: text (Required)</div>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                <div className="font-mono text-amber-400 font-semibold">field-1</div>
                <div className="text-slate-200 font-medium mt-0.5">Candidate Email</div>
                <div className="text-[11px] text-slate-400 mt-1">Type: email (Required)</div>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                <div className="font-mono text-amber-400 font-semibold">field-2</div>
                <div className="text-slate-200 font-medium mt-0.5">Upload Resume</div>
                <div className="text-[11px] text-slate-400 mt-1">Type: file (PDF/Word/TXT)</div>
              </div>
            </div>
          </div>

          {/* cURL Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Direct cURL Terminal Test Command
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(curlCommand, 'curl')}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
              >
                {copiedSection === 'curl' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy cURL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 bg-[#070a10] border border-slate-800 rounded-xl font-mono text-[11px] text-amber-300 overflow-x-auto leading-relaxed">
              {curlCommand}
            </pre>
          </div>

          {/* Config URL override */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Configure n8n Webhook / Form URL</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Default is pre-configured to your provided n8n URL. You can change it if you create a new n8n workflow or update the form UUID.
            </p>
            <form onSubmit={handleSaveUrl} className="flex gap-2">
              <input
                type="url"
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                placeholder="https://...app.n8n.cloud/form/..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs transition-colors shrink-0"
              >
                Update URL
              </button>
            </form>
            {savedSuccess && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Webhook target URL updated successfully!</span>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Powered by n8n Cloud Workflow Orchestration
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
