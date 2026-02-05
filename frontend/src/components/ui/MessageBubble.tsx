import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User, Bot, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Source {
    title: string;
    url: string;
}

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    sources?: Source[];
}

export function MessageBubble({ role, content, sources }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex w-full gap-4 mb-6",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                isUser ? "bg-zinc-700" : "bg-violet-600"
            )}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className={cn(
                "max-w-[80%] rounded-2xl p-4 text-base leading-relaxed",
                isUser
                    ? "bg-zinc-800 text-white rounded-tr-sm"
                    : "text-zinc-100 bg-transparent pl-0 pt-1" // AI message blends with bg more
            )}>
                {isUser ? (
                    <p>{content}</p>
                ) : (
                    <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}

                {/* Sources Section */}
                {!isUser && sources && sources.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <p className="w-full text-xs font-semibold text-zinc-500 mb-1 uppercase tracking-wider">Fontes Usadas:</p>
                        {sources.map((source, idx) => (
                            <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 rounded-md text-xs text-zinc-400 hover:text-violet-300 transition-colors"
                            >
                                <span className="truncate max-w-[150px]">{source.title}</span>
                                <ExternalLink size={10} />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
