export interface CandidateSubmission {
  name: string;
  email: string;
  file: File | null;
  fileName?: string;
  fileSize?: number;
  roleTarget?: string;
}

export interface SubmissionResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  timestamp?: string;
  details?: Record<string, unknown>;
  submittedData?: {
    name: string;
    email: string;
    fileName: string;
    fileSize: number;
  };
}

export interface SampleResume {
  id: string;
  name: string;
  email: string;
  role: string;
  experienceYears: number;
  fileName: string;
  content: string;
  summary: string;
  highlights: string[];
}

export interface PreflightMetric {
  title: string;
  status: 'passed' | 'warning' | 'info';
  score: number;
  description: string;
}
