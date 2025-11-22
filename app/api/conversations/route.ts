import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new NextResponse("User ID missing", { status: 400 });
        }

        // Find all distinct roomIds where the user has sent a message
        const messages = await db.message.findMany({
            where: {
                userId: userId
            },
            distinct: ['roomId'],
            select: {
                roomId: true
            }
        });

        // Extract mentor IDs from roomIds (format: chat-{mentorId}-{userId})
        const mentorIds = messages
            .map(m => {
                const parts = m.roomId.split('-');
                // chat is parts[0], mentorId is parts[1], userId is parts[2]
                if (parts.length >= 3 && parts[2] === userId) {
                    return parts[1];
                }
                return null;
            })
            .filter((id): id is string => id !== null);

        // Remove duplicates
        const uniqueMentorIds = Array.from(new Set(mentorIds));

        return NextResponse.json(uniqueMentorIds);
    } catch (error) {
        console.error("[CONVERSATIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
