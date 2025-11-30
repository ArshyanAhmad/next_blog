import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { categories } = await req.json(); // expects an array of strings

        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return NextResponse.json(
                { success: false, message: "Categories array required" },
                { status: 400 }
            );
        }

        const createdCategories = [];

        for (const name of categories) {
            if (!name || name.trim() === "") continue;

            // upsert ensures no duplicates
            const category = await prisma.category.upsert({
                where: { name: name.trim() },
                update: {},
                create: { name: name.trim() },
            });

            createdCategories.push(category);
        }

        return NextResponse.json({
            success: true,
            categories: createdCategories,
            message: "Categories inserted successfully",
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
