# Notion RAG Assistant

Este projeto é um assistente inteligente que utiliza RAG (Retrieval-Augmented Generation) para conversar com seus documentos do Notion usando a API do Google Gemini.

## 🚀 Tecnologias

- **Frontend**: React, Vite, TailwindCSS (na pasta `frontend`)
- **Backend**: Express, TypeScript (na pasta `backend`)
- **IA**: Google Gemini API
- **Banco de Dados/Fonte**: Notion API

## 📂 Estrutura do Projeto (Monorepo)

O projeto está organizado em workspaces:

- `backend/`: Código do servidor (Express API).
- `frontend/`: Código da interface (React App).
- `api/`: Ponto de entrada para Serverless Functions (Vercel).

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js (v18+)
- Conta no Notion e Chave de Integração
- Conta no Google AI Studio e API Key

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/notion-rag-assistant.git
   cd notion-rag-assistant
   ```

2. **Instale as dependências:**
   Na raiz do projeto, execute:
   ```bash
   npm install
   ```
   Isso instalará as dependências tanto do frontend quanto do backend.

3. **Configuração de Variáveis de Ambiente:**

   Crie um arquivo `.env` na pasta `backend/` com suas chaves:
   ```env
   PORT=3000
   NOTION_API_KEY=sua_chave_notion
   GEMINI_API_KEY=sua_chave_gemini
   ```

   Para o frontend, crie `frontend/.env.development` se necessário (já configurado para localhost).

4. **Rodar Localmente:**
   Na raiz do projeto:
   ```bash
   npm run dev
   ```
   Isso iniciará o Frontend e o Backend simultaneamente.
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## ☁️ Deploy na Vercel

O projeto está configurado para deploy fácil na Vercel.

1. Faça o push para o GitHub.
2. Importe o projeto na Vercel.
3. Configure as **Environment Variables** nas configurações do projeto na Vercel:
   - `NOTION_API_KEY`
   - `GEMINI_API_KEY`
4. O build e deploy devem ocorrer automaticamente.

---
Desenvolvido com ❤️
