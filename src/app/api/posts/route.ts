import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function generateSlug(title: string) {
    return (
        title
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "") + "-" + Date.now()
    );
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { title, content, categories, coverImage } = body;

        if (!title || !content || !categories?.length) {
            return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
        }

        const authCookie = req.cookies.get("authorization")?.value || "";
        const token = authCookie.startsWith("Bearer ") ? authCookie.slice(7) : authCookie;

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }

        const userId = decoded.userId;
        const slug = generateSlug(title);

        // Verify categories exist in database
        const existingCategories = await prisma.category.findMany({
            where: { name: { in: categories } },
        });

        if (existingCategories.length !== categories.length) {
            const existingNames = existingCategories.map(c => c.name);
            const missing = categories.filter(c => !existingNames.includes(c));
            return NextResponse.json({ success: false, message: `Categories not found: ${missing.join(", ")}` }, { status: 400 });
        }

        // Create new post with connected categories and coverImage URL
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                slug,
                excerpt: content.slice(0, 150) + "...",
                authorId: userId,
                published: true,
                coverImage,
                categories: {
                    connect: categories.map((name: string) => ({ name })),
                },
            },
            include: {
                categories: true,
                author: true,
            },
        });

        return NextResponse.json({ success: true, post: newPost, message: "Post created successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Post creation error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


// ✅ GET endpoint to fetch posts with categories
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                categories: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            posts
        });
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}


