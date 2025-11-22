import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const mentorId = searchParams.get("mentorId");

        if (!userId || !mentorId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const meeting = await db.meeting.findFirst({
            where: {
                userId,
                mentorId,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(meeting);
    } catch (error) {
        console.error("[MEETINGS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, time, userId, mentorId } = body;

        if (!date || !time || !userId || !mentorId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const meeting = await db.meeting.create({
            data: {
                date: new Date(date),
                time,
                userId,
                mentorId,
            },
        });

        return NextResponse.json(meeting);
    } catch (error) {
        console.error("[MEETINGS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
