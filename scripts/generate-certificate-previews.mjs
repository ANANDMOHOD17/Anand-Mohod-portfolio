import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const previewsDir = path.join(rootDir, 'public', 'certificates', 'previews');
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

const certs = [
  { id: 'career-essentials-in-generative-ai', file: 'career-essentials-in-generative-ai.pdf' },
  { id: 'intro-to-generative-ai-studio', file: 'introduction-to-generative-ai-studio.pdf' },
  { id: 'ibm-craft-precise-prompts', file: 'ibm-craft-precise-prompts-for-ai-models.pdf' },
  { id: 'ibm-ai-fundamentals', file: 'ibm-artificial-intelligence-fundamentals.pdf' },
  { id: 'tcs-ion-ai-foundation', file: 'tcs-ion-career-edge-ai-foundation.pdf' },
  { id: 'deloitte-data-analytics-simulation', file: 'deloitte-data-analytics-job-simulation.pdf' },
  { id: 'isro-antariksh-hackathon-2026', file: 'bharatiya-antariksh-hackathon-2026.pdf' },
  { id: 'ibm-project-management', file: 'ibm-project-management-fundamentals.pdf' },
  { id: 'ibm-career-management', file: 'ibm-career-management-essentials.pdf' }
];

let chromeProcess = null;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3888');

  if (url.pathname === '/pdf.min.js') {
    const filePath = path.join(rootDir, 'node_modules', 'pdfjs-dist', 'build', 'pdf.min.js');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (url.pathname === '/pdf.worker.min.js') {
    const filePath = path.join(rootDir, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (url.pathname.startsWith('/certificates/')) {
    const fileName = path.basename(url.pathname);
    const filePath = path.join(rootDir, 'public', 'certificates', fileName);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  if (url.pathname === '/save' && req.method === 'POST') {
    const id = url.searchParams.get('id');
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const base64Data = body.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const outPath = path.join(previewsDir, `${id}.png`);
      fs.writeFileSync(outPath, buffer);
      console.log(`[Rendered] Saved preview for ${id} (${buffer.length} bytes)`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  if (url.pathname === '/done') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ done: true }));
    console.log('All certificate previews successfully generated!');
    setTimeout(() => {
      if (chromeProcess) chromeProcess.kill();
      server.close();
      process.exit(0);
    }, 500);
    return;
  }

  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>PDF Renderer</title>
  <script src="/pdf.min.js"></script>
</head>
<body>
  <h2>Rendering Previews...</h2>
  <canvas id="c"></canvas>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    const certs = ${JSON.stringify(certs)};

    async function run() {
      for (const cert of certs) {
        try {
          console.log('Rendering', cert.id);
          const loadingTask = pdfjsLib.getDocument('/certificates/' + cert.file);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1 });
          const targetWidth = 1600;
          const scale = targetWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });
          const canvas = document.getElementById('c');
          canvas.width = Math.round(scaledViewport.width);
          canvas.height = Math.round(scaledViewport.height);
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
          const dataUrl = canvas.toDataURL('image/png', 0.95);
          await fetch('/save?id=' + cert.id, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: dataUrl
          });
        } catch (err) {
          console.error('Failed to render', cert.id, err);
        }
      }
      await fetch('/done');
    }
    run();
  </script>
</body>
</html>`);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(3888, () => {
  console.log('Preview generation server running at http://localhost:3888');
  const chromePath = 'C:\\Program Files\\Google\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browserBin = fs.existsSync(chromePath) ? chromePath : edgePath;

  chromeProcess = spawn(browserBin, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3888'
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Failed to start browser:', err);
  });
});
