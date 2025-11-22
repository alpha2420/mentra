"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react";
import { MENTORS } from "@/lib/data";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSocket } from "@/components/providers/SocketProvider";

type Message = {
    id: string;
    role: string;
    content: string;
    createdAt: string;
};

export default function ChatPage() {
    const { user } = useUser();
    const { socket } = useSocket();
    const [activeMentors, setActiveMentors] = useState<typeof MENTORS>([]);
    const [selectedMentor, setSelectedMentor] = useState<typeof MENTORS[0] | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch active conversations
    useEffect(() => {
        if (!user) return;

        const fetchConversations = async () => {
            try {
                const res = await fetch(`/api/conversations?userId=${user.id}`);
                if (res.ok) {
                    const mentorIds = await res.json();
                    const mentors = MENTORS.filter(m => mentorIds.includes(m.id));
                    setActiveMentors(mentors);
                    if (mentors.length > 0 && !selectedMentor) {
                        setSelectedMentor(mentors[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch conversations", error);
            }
        };

        fetchConversations();
    }, [user]);

    // Fetch messages for selected mentor
    useEffect(() => {
        if (!selectedMentor || !user) return;

        const roomId = `chat-${selectedMentor.id}-${user.id}`;

        // Join room
        if (socket) {
            socket.emit("join-room", roomId);
        }

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/messages?roomId=${roomId}`);
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };

        fetchMessages();

        // Listen for real-time messages
        if (socket) {
            const handleReceiveMessage = (data: any) => {
                setMessages(prev => {
                    const exists = prev.some(m => m.id === data.id);
                    if (exists) return prev;
                    return [...prev, {
                        id: data.id || Date.now().toString(),
                        role: data.role,
                        content: data.message || data.content,
                        createdAt: new Date().toISOString()
                    }];
                });
            };

            socket.on("receive-message", handleReceiveMessage);
            return () => {
                socket.off("receive-message", handleReceiveMessage);
            };
        }
    }, [selectedMentor, user, socket]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !selectedMentor || !user || !socket) return;

        const tempId = Date.now().toString();
        const userMsg = { id: tempId, role: 'user', content: input, createdAt: new Date().toISOString() };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        const roomId = `chat-${selectedMentor.id}-${user.id}`;

        try {
            // Save to DB
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: input,
                    role: 'user',
                    roomId,
                    userId: user.id
                })
            });

            // Emit socket event
            socket.emit("send-message", {
                roomId,
                message: input,
                role: "user",
                id: tempId
            });

            // Simulate response
            setTimeout(async () => {
                const aiId = (Date.now() + 1).toString();
                const aiContent = `Thanks for your message! I'm ${selectedMentor.name}, and I'll get back to you shortly.`;

                const aiMsg = { id: aiId, role: 'assistant', content: aiContent, createdAt: new Date().toISOString() };
                setMessages(prev => [...prev, aiMsg]);

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: aiContent,
                        role: 'assistant',
                        roomId,
                        userId: null
                    })
                });
            }, 1000);

        } catch (error) {
            console.error("Failed to send", error);
        }
    };

    if (!user) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Please log in</h2>
                    <p className="text-muted-foreground">You need to be logged in to view your messages.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background">
            {/* Sidebar */}
            <div className="w-80 border-r flex flex-col bg-muted/10">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-1 p-2">
                        {activeMentors.length === 0 ? (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                No conversations yet.
                            </div>
                        ) : (
                            activeMentors.map((mentor) => (
                                <button
                                    key={mentor.id}
                                    onClick={() => setSelectedMentor(mentor)}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selectedMentor?.id === mentor.id ? "bg-primary/10" : "hover:bg-muted"
                                        }`}
                                >
                                    <div className="relative">
                                        <Avatar>
                                            <AvatarImage src={mentor.image} />
                                            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold truncate">{mentor.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            Click to view chat
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedMentor ? (
                    <>
                        {/* Header */}
                        <div className="h-16 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={selectedMentor.image} />
                                    <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold">{selectedMentor.name}</h2>
                                    <p className="text-xs text-muted-foreground">{selectedMentor.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/room/${selectedMentor.id}-call`}><Phone className="h-5 w-5" /></Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/room/${selectedMentor.id}-video`}><Video className="h-5 w-5" /></Link>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex max-w-[70%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <Avatar className="h-8 w-8 mt-1">
                                            <AvatarImage src={m.role === 'user' ? '' : selectedMentor.image} />
                                            <AvatarFallback>{m.role === 'user' ? 'ME' : selectedMentor.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-background border rounded-tl-none'
                                                }`}>
                                                {m.content}
                                            </div>
                                            <span className="text-[10px] text-muted-foreground mt-1 block px-1">
                                                {new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-background">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-3 max-w-4xl mx-auto"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={`Message ${selectedMentor.name}...`}
                                    className="flex-1"
                                />
                                <Button type="submit" size="icon" disabled={!input.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
