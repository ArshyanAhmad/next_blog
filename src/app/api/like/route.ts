import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { userId, postId } = await request.json();

        // Check if user already liked this post
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: { userId, postId },
            },
        });

        if (existingLike) {
            // Remove like
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ liked: false, message: "Like removed" });
        } else {
            // Add like
            await prisma.like.create({
                data: { userId, postId },
            });
            return NextResponse.json({ liked: true, message: "Like added" });
        }
    } catch (error: any) {
        console.error("Error handling like:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const userId = searchParams.get("userId");

    if (!postId) {
        return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    if (userId) {
        const liked = await prisma.like.findUnique({
            where: { userId_postId: { userId, postId } },
        });
        return NextResponse.json({ liked: !!liked });
    }

    const likeCount = await prisma.like.count({
        where: { postId },
    });

    return NextResponse.json({ likeCount });
}
