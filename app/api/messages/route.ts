import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Mock User ID for demo purposes
const DEMO_USER_ID = "demo-user-123";

export async function GET() {
    try {
        // Ensure demo user exists
        let user = await db.user.findUnique({ where: { email: "demo@example.com" } });
        if (!user) {
            user = await db.user.create({
                data: {
                    id: DEMO_USER_ID,
                    email: "demo@example.com",
                    name: "Demo User",
                    password: "demo-password-not-used", // Dummy password for demo user
                }
            });
        }

        const messages = await db.message.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'asc' }
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("Messages GET error:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { content, role } = await req.json();

        // Ensure demo user exists
        let user = await db.user.findUnique({ where: { email: "demo@example.com" } });
        if (!user) {
            user = await db.user.create({
                data: {
                    id: DEMO_USER_ID,
                    email: "demo@example.com",
                    name: "Demo User",
                    password: "demo-password-not-used",
                }
            });
        }

        const message = await db.message.create({
            data: {
                content,
                role, // 'user' or 'assistant'
                userId: user.id
            }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("Messages POST error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
