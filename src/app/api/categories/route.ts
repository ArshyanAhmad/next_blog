import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        posts: true // Count how many posts use this category
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        console.log("Categories fetched:", categories.length);
        return NextResponse.json({ success: true, categories });

    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

// ✅ Optional: POST endpoint to create new categories
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({
                success: false,
                message: "Category name is required"
            }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: { name }
        });

        return NextResponse.json({
            success: true,
            category,
            message: "Category created successfully"
        });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({
                success: false,
                message: "Category already exists"
            }, { status: 400 });
        }

        console.error("Error creating category:", error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
