import { useState } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: { title: string; url: string }[];
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string) => {
        // 1. Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // 2. Call API
            const apiBase = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${apiBase}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: content }),
            });

            const data = await response.json();

            // 3. Add AI Message
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.answer || "Desculpe, não consegui processar a resposta.",
                sources: data.sources || []
            };

            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Erro de conexão com o servidor. Verifique se o backend está rodando."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        sendMessage
    };
}
