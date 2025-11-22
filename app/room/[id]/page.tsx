"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneOff } from "lucide-react";
import Link from "next/link";

export default function RoomPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-screen flex items-center justify-center">Loading Video Room...</div>;

    const isVideoCall = id.endsWith("-video");
    const configParams = isVideoCall
        ? "#config.startWithAudioMuted=false&config.startWithVideoMuted=false"
        : "#config.startWithAudioMuted=false&config.startWithVideoMuted=true";

    return (
        <div className="h-screen w-full flex flex-col bg-black">
            <div className="flex-1 relative">
                <iframe
                    src={`https://meet.jit.si/${id}${configParams}`}
                    className="w-full h-full border-0"
                    allow="camera; microphone; fullscreen; display-capture; autoplay"
                ></iframe>
            </div>
            <div className="h-16 bg-background/10 backdrop-blur-md flex items-center justify-center absolute bottom-0 w-full z-10">
                <Button variant="destructive" size="lg" className="rounded-full gap-2" asChild>
                    <Link href="/chat">
                        <PhoneOff className="w-5 h-5" />
                        Leave Call
                    </Link>
                </Button>
            </div>
        </div>
    );
}
