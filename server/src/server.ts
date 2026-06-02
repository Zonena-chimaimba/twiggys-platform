// env.ts MUST be the first import — it calls dotenv.config() before
// PrismaClient or any other module that reads process.env is loaded.
import './env.ts';

import app from './app.js';
import { prisma } from './lib/prisma.ts';

const PORT = process.env.PORT || 3002;

// Eagerly connect Prisma so the first user request isn't slow
prisma.$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });
