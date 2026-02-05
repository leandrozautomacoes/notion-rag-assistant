import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', router);

// Root route for basic health check on Vercel
app.get('/', (req, res) => {
    res.send('Notion RAG Assistant Backend is running!');
});

// Error Handler (Deve ser o último middleware)
app.use(errorHandler);

export { app };
