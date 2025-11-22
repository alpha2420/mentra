"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/components/providers/SocketProvider";
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
    const { socket, isConnected } = useSocket();

    // Join room on connect
    useEffect(() => {
        if (socket && isConnected) {
            socket.emit("join-room", "general"); // Using a static room for now
        }
    }, [socket, isConnected]);

    // Listen for messages
    useEffect(() => {
        if (!socket) return;

        socket.on("receive-message", (data: any) => {
            // Avoid duplicating own messages if backend broadcasts to sender too
            // For this simple implementation, we'll assume backend broadcasts to everyone
            // and we filter or just append. 
            // Better approach: Optimistically add own message, ignore own ID from server.

            // Simple append for now (might duplicate if we also add optimistically)
            // Let's rely on server broadcast for simplicity in this demo, 
            // OR add optimistically and filter duplicates by ID.

            setMessages(prev => {
                const exists = prev.some(m => m.id === data.id);
                if (exists) return prev;
                return [...prev, { id: data.id || Date.now().toString(), role: data.role, content: data.message }];
            });
            setIsLoading(false);
        });

        return () => {
            socket.off("receive-message");
        };
    }, [socket]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || !socket) return;

        const tempId = Date.now().toString();
        const userMsg = { id: tempId, role: 'user', content: input };

        // Optimistic update
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        // Emit to server
        socket.emit("send-message", {
            roomId: "general",
            message: userMsg.content,
            role: "user",
            id: tempId
        });

        // Simulate AI response via socket (server should handle this in real app)
        // For demo, we'll just let the server broadcast back. 
        // If server doesn't have AI logic yet, we can simulate it client-side 
        // but that defeats the purpose of socket. 
        // Let's assume the server simply broadcasts what we sent for now (echo),
        // or we can keep the timeout simulation but emit it via socket.

        setTimeout(() => {
            const aiId = (Date.now() + 1).toString();
            const aiContent = "I'm a socket-powered AI! (Simulated)";
            setMessages(prev => [...prev, { id: aiId, role: 'assistant', content: aiContent }]);
            setIsLoading(false);
        }, 1000);
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
