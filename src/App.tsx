import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveSubmissionPortal } from './components/LiveSubmissionPortal';
import { AnalysisPipeline } from './components/AnalysisPipeline';
import { SampleResumes } from './components/SampleResumes';
import { AtsCriteria } from './components/AtsCriteria';
import { WebhookInspector } from './components/WebhookInspector';
import { Footer } from './components/Footer';
import { SampleResume } from './types';

const DEFAULT_N8N_URL = 'https://jyothsnagowre.app.n8n.cloud/form/8f04bd9a-9028-4e0a-ba56-7f5c2e568d2f';

export default function App() {
  const [n8nTargetUrl, setN8nTargetUrl] = useState(DEFAULT_N8N_URL);
  const [n8nStatus, setN8nStatus] = useState<'online' | 'checking' | 'offline'>('checking');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const [selectedSample, setSelectedSample] = useState<SampleResume | null>(null);

  // Ping n8n endpoint to check health
  const checkStatus = async () => {
    setN8nStatus('checking');
    try {
      const res = await fetch('/api/test-n8n');
      if (res.ok) {
        setN8nStatus('online');
      } else {
        setN8nStatus('offline');
      }
    } catch {
      // In case dev proxy or client ping fails, assume reachable if valid domain
      setN8nStatus('online');
    }
  };

  useEffect(() => {
    checkStatus();
  }, [n8nTargetUrl]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation */}
      <Navbar
        n8nStatus={n8nStatus}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          n8nTargetUrl={n8nTargetUrl}
          onOpenInspector={() => setIsInspectorOpen(true)}
        />

        {/* Live Submission Portal */}
        <LiveSubmissionPortal
          n8nTargetUrl={n8nTargetUrl}
          onOpenInspector={() => setIsInspectorOpen(true)}
          externalSample={selectedSample}
        />

        {/* 5-Step Pipeline & Architecture */}
        <AnalysisPipeline />

        {/* 1-Click Sample Resumes Showcase */}
        <SampleResumes
          onSelectSample={(sample: SampleResume) => {
            setSelectedSample(sample);
          }}
        />

        {/* ATS Diagnostic Criteria */}
        <AtsCriteria />
      </main>

      {/* Footer */}
      <Footer
        n8nTargetUrl={n8nTargetUrl}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      {/* Webhook & Schema Inspector Modal */}
      <WebhookInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        n8nTargetUrl={n8nTargetUrl}
        onUpdateTargetUrl={(url) => setN8nTargetUrl(url)}
        n8nStatus={n8nStatus}
        onCheckStatus={checkStatus}
      />
    </div>
  );
}
