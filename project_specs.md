# PROJECT SPECIFICATIONS: Notion RAG Assistant (Marketing Edition)

## 1. 🎯 VISÃO GERAL
Criar um Chatbot de IA "Fullstack" que atua como um especialista em Marketing. O sistema utiliza **RAG (Retrieval-Augmented Generation)** para buscar informações em tempo real dentro do meu Notion pessoal (especificamente sobre Marketing) e gerar respostas contextualizadas usando o **Google Gemini 3.0 Flash**.

**Objetivo:** Permitir que eu "converse" com minhas anotações de marketing para criar estratégias, copy e campanhas baseadas no meu próprio conhecimento acumulado.

---

## 2. 🛠️ TECH STACK (Mandatório)

### Frontend
- **Framework:** React + Vite + TypeScript
- **Estilização:** Tailwind CSS
- **Ícones:** Lucide React
- **Componentes Especiais (21st.dev):**
  - Background: `The Infinite Grid` (por Shadway) - Estilo Cyberpunk/Dark.
  - Input: `AI Input` (por Erikx) - Com animações suaves.
- **Estado:** React Hooks (useState, useEffect, useRef).

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **Clients:**
  - `@notionhq/client` (Para buscar dados)
  - `@google/generative-ai` (Para gerar respostas)

### Infraestrutura
- **Environment:** `.env` para gestão de chaves.
- **Database:** NENHUM (Stateless). O estado vive na sessão do navegador e na busca em tempo real.

---

## 3. ⚙️ ARQUITETURA E FLUXO DE DADOS

1.  **User Input:** Usuário digita uma pergunta na interface (ex: "Como estruturar uma VSL?").
2.  **Retrieval (Notion):** Backend recebe a pergunta e usa a Notion Search API para encontrar as 3 páginas mais relevantes contendo termos da pergunta.
3.  **Context Construction:** Backend extrai o texto dessas 3 páginas e monta um bloco de texto (Contexto).
4.  **Augmented Generation (Gemini):** Backend envia para o Gemini:
    *   System Prompt (Personalidade + Regras)
    *   Contexto do Notion
    *   Pergunta do Usuário
5.  **Response:** Gemini responde.
6.  **UI Display:** Frontend exibe a resposta com efeito de digitação e lista as "Fontes" (páginas do Notion usadas) abaixo da resposta.

---

## 4. 🧠 REGRAS DE NEGÓCIO & PROMPTING

### System Prompt (Personalidade)
A IA deve agir como o **"Marketing Brain do Gabriel"**.
- **Tom:** Direto, estratégico, focado em conversão e growth.
- **Restrição:** Deve responder BASEADO ESTRITAMENTE no contexto fornecido. Se a resposta não estiver nas notas, deve dizer: *"Não encontrei essa estratégia nas suas anotações de marketing."*
- **Formatação:** Use Markdown para listas, negrito e tópicos.

### Tratamento do Notion
- O sistema deve buscar páginas, ler o conteúdo dos blocos (parágrafos, listas) e concatenar em uma string limpa para o LLM.

---

## 5. 🎨 UI/UX DESIGN (Dark Mode Only)

- **Cores:**
  - Background: `#050505` (Quase preto absoluto).
  - Primary (User): `#8b5cf6` (Violeta Neon).
  - Secondary (AI): `#1f2937` (Cinza Carvão).
  - Text: `#f3f4f6` (Branco gelo).
  - Accents: Bordas sutis com brilho roxo.

- **Layout:**
  - Header minimalista com status "Online".
  - Área de chat centralizada (max-width: 800px).
  - Input fixo no rodapé com efeito de "glow" quando ativo.
  - **Feature Visual:** Abaixo de cada resposta da IA, exibir um pequeno card "📚 Fontes:" com os títulos das páginas do Notion clicáveis.

---

## 6. 🚀 PLANO DE DESENVOLVIMENTO (Fases)

### FASE 1: Backend Foundation
1.  Setup do servidor Express com TypeScript.
2.  Configuração do `NotionClient` e `GoogleGenerativeAI`.
3.  Criação da rota `POST /api/chat`.
4.  Implementação da lógica de busca no Notion (`searchNotion`).
5.  Implementação da geração de resposta (`generateResponse`).

### FASE 2: Frontend Core
1.  Setup Vite + React + Tailwind.
2.  Instalação de ícones e dependências.
3.  Criação da estrutura de layout (Main Container).
4.  Implementação do componente `InfiniteGrid` para o fundo.

### FASE 3: Chat Interface & Logic
1.  Criação do componente `MessageBubble` (com suporte a Markdown).
2.  Adaptação do componente `AIInput`.
3.  Integração com a API (fetch + loading states).
4.  Implementação do efeito de digitação (Typewriter).
5.  Visualização das Fontes (Sources).

---

## 7. 🔑 VARIÁVEIS DE AMBIENTE NECESSÁRIAS
```env
PORT=3000
NOTION_API_KEY=secret_...
GEMINI_API_KEY=AIza...