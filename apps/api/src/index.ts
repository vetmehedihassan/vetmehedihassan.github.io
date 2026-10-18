import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './config/env';
import { connectToDatabase } from './config/mongodb.config';

async function main() {
  await connectToDatabase();

  serve({ fetch: app.fetch, port: env.port }, (info) => {
    console.log(`API listening on http://localhost:${info.port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start API:', err);
  process.exit(1);
});
