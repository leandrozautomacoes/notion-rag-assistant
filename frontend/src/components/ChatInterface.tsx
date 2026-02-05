import { useRef, useEffect } from 'react';
import { AIInput } from './ui/AIInput';
import { MessageBubble } from './ui/MessageBubble';
import { useChat } from '@/hooks/useChat';

export function ChatInterface() {
    const { messages, isLoading, sendMessage } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full relative z-20">

            {/* Scrollable Area - Full Width to fix scrollbar position */}
            <div className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 opacity-80">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Pergunte ao meu Segundo Cérebro 🧠</h2>
                            <p className="text-lg text-zinc-400">Acesse 7 anos de conhecimento em segundos.</p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <MessageBubble
                                key={msg.id}
                                role={msg.role}
                                content={msg.content}
                                sources={msg.sources}
                            />
                        ))
                    )}

                    {isLoading && (
                        <div className="flex items-center gap-2 text-zinc-500 text-sm ml-12">
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-100" />
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-200" />
                            <span>Pensando...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area - Full Width Background */}
            <div className="w-full py-6 pt-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="max-w-4xl mx-auto px-4">
                    <AIInput onSend={sendMessage} disabled={isLoading} />
                </div>
            </div>

        </div>
    );
}
