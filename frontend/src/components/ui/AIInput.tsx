import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AIInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function AIInput({ onSend, disabled }: AIInputProps) {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !disabled) {
            onSend(value);
            setValue('');
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Glow Effect */}
            <motion.div
                animate={{
                    opacity: isFocused ? 1 : 0,
                    scale: isFocused ? 1.02 : 1,
                }}
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg -z-10"
            />

            <form onSubmit={handleSubmit} className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="pl-4 text-violet-500">
                    <Sparkles size={20} />
                </div>

                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    placeholder="Pergunte ao seu Marketing Brain..."
                    className="w-full px-4 py-4 bg-transparent text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={!value.trim() || disabled}
                    className={cn(
                        "p-3 mr-2 rounded-lg transition-all",
                        value.trim() && !disabled
                            ? "bg-violet-600 text-white hover:bg-violet-700"
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    )}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
