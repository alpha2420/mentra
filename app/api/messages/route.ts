import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const roomId = searchParams.get("roomId");

        if (!roomId) {
            return new NextResponse("Room ID missing", { status: 400 });
        }

        const messages = await db.message.findMany({
            where: { roomId },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, role, roomId, userId } = body;

        if (!content || !role || !roomId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const message = await db.message.create({
            data: {
                content,
                role,
                roomId,
                userId: userId || null,
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("[MESSAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
