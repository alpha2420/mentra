"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/components/providers/SocketProvider";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Send, Video, Calendar as CalendarIcon, Clock } from "lucide-react";
import { MENTORS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

type Message = {
    id: string;
    role: string;
    content: string;
};

export default function MessagePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const mentor = MENTORS.find((m) => m.id === id);
    const { user } = useUser();

    if (!mentor) {
        notFound();
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | undefined>();
    const [isScheduled, setIsScheduled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { socket, isConnected } = useSocket();

    // Join room
    useEffect(() => {
        if (socket && isConnected && user) {
            socket.emit("join-room", `chat-${id}-${user.id}`);
        }
    }, [socket, isConnected, id, user]);

    // Fetch initial data
    useEffect(() => {
        if (!user) return;

        // Fetch messages
        fetch(`/api/messages?roomId=chat-${id}-${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                }
            });

        // Fetch meeting status
        if (user) {
            fetch(`/api/meetings?userId=${user.id}&mentorId=${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setIsScheduled(true);
                        setDate(new Date(data.date));
                        setTime(data.time);
                    }
                });
        }
    }, [id, user]);

    // Listen for messages
    useEffect(() => {
        if (!socket) return;

        const handleReceiveMessage = (data: any) => {
            setMessages(prev => {
                const exists = prev.some(m => m.id === data.id);
                if (exists) return prev;
                return [...prev, { id: data.id || Date.now().toString(), role: data.role, content: data.message || data.content }];
            });
        };

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
        };
    }, [socket]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !socket) return;

        if (!user) {
            alert("Please log in to send messages.");
            return;
        }

        const tempId = Date.now().toString();
        const userMsg = { id: tempId, role: 'user', content: input };

        setMessages(prev => [...prev, userMsg]);
        setInput("");

        const roomId = `chat-${id}-${user.id}`;

        // Save to DB
        await fetch('/api/messages', {
            method: 'POST',
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

        // Simulate mentor response
        setTimeout(async () => {
            const aiId = (Date.now() + 1).toString();
            const aiContent = "Thanks for reaching out! I'd love to help. Please schedule a time that works for you.";

            const aiMsg = { id: aiId, role: 'assistant', content: aiContent };
            setMessages(prev => [...prev, aiMsg]);

            // Save AI response to DB
            await fetch('/api/messages', {
                method: 'POST',
                body: JSON.stringify({
                    content: aiContent,
                    role: 'assistant',
                    roomId,
                    userId: null
                })
            });
        }, 1000);
    };

    const handleSchedule = async () => {
        if (!user) {
            alert("Please log in to schedule a meeting.");
            return;
        }

        if (date && time) {
            setIsScheduled(true);
            // Save meeting to DB
            await fetch('/api/meetings', {
                method: 'POST',
                body: JSON.stringify({
                    date,
                    time,
                    userId: user.id,
                    mentorId: id
                })
            });

            // Send system message about scheduling
            const sysId = Date.now().toString();
            const sysMsg = `Meeting scheduled for ${date.toDateString()} at ${time}`;
            const sysMsgObj = { id: sysId, role: 'system', content: sysMsg };

            setMessages(prev => [...prev, sysMsgObj]);

            const roomId = `chat-${id}-${user.id}`;

            // Save system message
            await fetch('/api/messages', {
                method: 'POST',
                body: JSON.stringify({
                    content: sysMsg,
                    role: 'system',
                    roomId,
                    userId: null
                })
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)]">
            <div className="grid lg:grid-cols-[1fr_350px] gap-6 h-full">
                {/* Chat Area */}
                <Card className="flex flex-col h-full overflow-hidden border-primary/10 shadow-lg">
                    <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="font-semibold">{mentor.name}</h2>
                                <p className="text-xs text-muted-foreground">{mentor.role}</p>
                            </div>
                        </div>
                        {isScheduled && (
                            <Button size="sm" className="gap-2" asChild>
                                <Link href={`/room/${mentor.id}-session`}>
                                    <Video className="w-4 h-4" />
                                    Start Video Call
                                </Link>
                            </Button>
                        )}
                    </div>

                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-background">
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : m.role === 'system'
                                        ? 'bg-muted text-muted-foreground text-center w-full'
                                        : 'bg-muted/50 border shadow-sm rounded-bl-none'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t bg-muted/10">
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
                            <Button type="submit" size="icon" disabled={!input.trim()}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </Card>

                {/* Scheduling Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6 border-primary/10 shadow-lg h-full overflow-y-auto">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" />
                            Schedule Meeting
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Select Date</label>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Select Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((t) => (
                                        <Button
                                            key={t}
                                            variant={time === t ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTime(t)}
                                            className="w-full"
                                        >
                                            {t}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleSchedule}
                                disabled={!date || !time || isScheduled}
                            >
                                {isScheduled ? "Meeting Scheduled" : "Confirm Schedule"}
                            </Button>

                            {isScheduled && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                                    <p className="font-medium">Meeting Confirmed!</p>
                                    <p>Date: {date?.toDateString()}</p>
                                    <p>Time: {time}</p>
                                    <p className="mt-2 text-xs">You can start the video call from the chat header at the scheduled time.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
