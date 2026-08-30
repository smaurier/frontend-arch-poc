import type { Connect, ViteDevServer } from 'vite';
import { trucks, startMockUpdates, type Truck } from '../mocks/trucks-data';

/**
 * Dev-only SSE endpoint. In production, this middleware is not registered.
 * Streams truck updates every 2s. Provides /api/snapshot for resync on
 * reconnect.
 */
export function applySseMiddleware(server: ViteDevServer): void {
  const started = { value: false };

  const sseHandler: Connect.NextHandleFunction = (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('retry: 2000\n\n');

    if (!started.value) {
      started.value = true;
      startMockUpdates(2000);
    }

    const timer = setInterval(() => {
      const payload = JSON.stringify(trucks.value);
      res.write(`event: trucks\n`);
      res.write(`data: ${payload}\n\n`);
    }, 2000);

    req.on('close', () => {
      clearInterval(timer);
    });
  };

  const snapshotHandler: Connect.NextHandleFunction = (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(trucks.value satisfies Truck[]));
  };

  server.middlewares.use('/api/events', sseHandler);
  server.middlewares.use('/api/snapshot', snapshotHandler);
}
