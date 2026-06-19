import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';
import { initDb } from './db/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Initialize Database
    await initDb();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/chat', chatRoutes);

    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found.' });
    });

    app.listen(PORT, () => {
      console.log(`DinoChat Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
