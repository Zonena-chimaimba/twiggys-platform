import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import publicRoutes from './routes/publicRoutes';

const app = express();

// Security headers
app.use(helmet());

// Request logging (skip in test)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Allow the API config to accept either 3001 or 3002 (legacy Vagrant port / new localhost)
const corsOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
  .filter(Boolean) as string[];

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());

// Admin routes
app.use('/api/admin', userRoutes);

// Public routes
app.use('/api', publicRoutes);

export default app;