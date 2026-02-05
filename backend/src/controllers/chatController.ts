import { Request, Response } from 'express';
import { notionService } from '../services/notion.service';
import { geminiService } from '../services/gemini.service';

class ChatController {
    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { question } = req.body;

            if (!question) {
                res.status(400).json({ error: 'A pergunta é obrigatória.' });
                return;
            }

            // 1. Buscar contexto no Notion
            const notionPages = await notionService.searchNotion(question);

            // 2. Preparar contexto para o LLM
            let context = '';
            const sources = [];

            if (notionPages.length === 0) {
                context = 'Nenhuma informação relevante encontrada no Notion sobre este tópico.';
            } else {
                context = notionPages.map(page => `
---
Título: ${page.title}
Conteúdo:
${page.content}
---
`).join('\n');

                sources.push(...notionPages.map(p => ({ title: p.title, url: p.url })));
            }

            // 3. Gerar resposta com Gemini
            const answer = await geminiService.generateResponse(question, context);

            // 4. Retornar resposta
            res.json({
                answer,
                sources
            });

        } catch (error) {
            console.error('Erro no ChatController:', error);
            res.status(500).json({ error: 'Erro interno ao processar sua solicitação.' });
        }
    }
}

export const chatController = new ChatController();
