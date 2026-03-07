import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { startKarmicEngine } from './lib/automation/karmic-cron.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3001;

app.prepare().then(() => {
  // 1. Ignite the Background Cron Engine
  startKarmicEngine();

  // 2. Boot the Next.js Web Server
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> 🚀 AstraVeda Sovereign Architecture Ready on http://localhost:${PORT}`);
  });
});
