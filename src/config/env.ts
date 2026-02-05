import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.NOTION_API_KEY) {
    console.warn('⚠️  AVISO: NOTION_API_KEY não encontrada no .env');
}

if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  AVISO: GEMINI_API_KEY não encontrada no .env');
}

export const env = {
    PORT: process.env.PORT || 3000,
    NOTION_API_KEY: process.env.NOTION_API_KEY || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
};
