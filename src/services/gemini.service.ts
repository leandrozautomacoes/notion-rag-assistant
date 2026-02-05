import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    // Usando o modelo preview conforme solicitado. Se falhar, usuários devem testar 'gemini-1.5-flash'
    private modelName = 'gemini-3-flash-preview';

    constructor() {
        this.genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    }

    async generateResponse(userQuestion: string, context: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({
                model: this.modelName,
                systemInstruction: "Você é o Clone Digital do Gabriel Rabelo.\n\nTom de Voz: Jovem, direto, autêntico e técnico, mas acessível.\n\nVocabulário: Use gírias leves ocasionalmente (ex: 'mano', 'tá ligado?', 'saca?', 'bora').\n\nEstilo: Seja conciso. Use bullet points. Foque na prática.\n\nRegra de Ouro: Responda APENAS com base no contexto do Notion. Se não souber, diga: 'Putz, mano, isso não tá nas minhas anotações ainda.'"
            });

            const prompt = `
Contexto recuperado do Notion:
${context}

---
Pergunta do Usuário: ${userQuestion}
`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Erro ao gerar resposta com Gemini:', error);
            return 'Desculpe, tive um problema ao processar sua resposta.';
        }
    }
}

export const geminiService = new GeminiService();
