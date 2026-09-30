import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const N8N_FORM_URL = process.env.N8N_FORM_URL || 'https://jyothsnagowre.app.n8n.cloud/form/8f04bd9a-9028-4e0a-ba56-7f5c2e568d2f';

// Configure multer for in-memory file buffering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API: Health check & configuration
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    targetUrl: N8N_FORM_URL,
    timestamp: new Date().toISOString()
  });
});

// API: Check connection to the n8n form endpoint
app.get('/api/test-n8n', async (_req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(N8N_FORM_URL, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeout);

    res.json({
      success: response.ok,
      status: response.status,
      targetUrl: N8N_FORM_URL,
      message: response.ok ? 'n8n Form endpoint is reachable and healthy.' : `Endpoint returned HTTP ${response.status}`
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown connection error';
    res.status(502).json({
      success: false,
      targetUrl: N8N_FORM_URL,
      message: `Unable to reach n8n form: ${message}`
    });
  }
});

// API: Proxy form submission to n8n cloud
app.post('/api/submit-resume', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const name = (req.body.name || req.body['field-0'] || '').trim();
    const email = (req.body.email || req.body['field-1'] || '').trim();
    const targetUrl = (req.body.customUrl || N8N_FORM_URL).trim();

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume document is required.'
      });
    }

    // Build standard multipart FormData matching n8n form field names:
    // field-0: Name
    // field-1: Email
    // field-2: Resume file
    const formData = new FormData();
    formData.append('field-0', name);
    formData.append('field-1', email);

    const fileBlob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype || 'application/octet-stream' });
    formData.append('field-2', fileBlob, req.file.originalname || 'resume.pdf');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const n8nResponse = await fetch(targetUrl, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const responseText = await n8nResponse.text();
    let responseJson: Record<string, unknown> | null = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // response might be HTML or simple string
    }

    if (n8nResponse.ok) {
      return res.json({
        success: true,
        statusCode: n8nResponse.status,
        message: 'Your resume has been successfully submitted to the n8n analysis workflow!',
        details: responseJson || { raw: responseText.slice(0, 300) },
        submittedData: {
          name,
          email,
          fileName: req.file.originalname,
          fileSize: req.file.size
        },
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(n8nResponse.status).json({
        success: false,
        statusCode: n8nResponse.status,
        message: `n8n responded with status code ${n8nResponse.status}`,
        details: responseJson || { raw: responseText.slice(0, 300) }
      });
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Submission failed';
    return res.status(500).json({
      success: false,
      message: `Failed to proxy submission to n8n: ${errorMsg}`
    });
  }
});

// Production or Vite Dev middleware setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
