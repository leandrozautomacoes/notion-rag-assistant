import { Router, Request, Response } from 'express';
import { chatController } from './controllers/chatController';

const router = Router();

// Health Check
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas da API
router.post('/chat', (req, res) => chatController.handle(req, res));

export { router };
