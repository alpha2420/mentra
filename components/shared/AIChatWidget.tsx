"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: string;
    role: string;
    content: string;
};

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Poll for messages
    useEffect(() => {
        if (!isOpen) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages');
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const tempId = Date.now().toString();
        const userMsg = { id: tempId, role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Save user message
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: userMsg.content, role: 'user' })
            });

            // Simulate AI response (since we don't have a real AI backend connected yet)
            setTimeout(async () => {
                const aiContent = "That's interesting! I've saved this to your profile. How else can I help?";
                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: aiContent, role: 'assistant' })
                });
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Failed to send", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] sm:w-[400px]"
                    >
                        <Card className="shadow-2xl border-primary/10 overflow-hidden flex flex-col h-[500px]">
                            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="font-semibold">Mentra Chat</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground" onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-muted/30 space-y-4">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-background border shadow-sm rounded-bl-none'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-background border shadow-sm rounded-2xl rounded-bl-none px-4 py-2 text-sm text-muted-foreground">
                                            Typing...
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t bg-background">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex gap-2"
                                >
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-transform"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </Button>
        </div>
    );
}
