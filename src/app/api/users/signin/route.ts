import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { signinInput } from "@/types/user.types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

    const prisma = new PrismaClient();

    try {
        const body = await req.json();
        const { email, password } = body;

        const success = signinInput.safeParse({
            email,
            password
        })

        if (!success.success) {
            const errorMessage = success.error.issues.map(err => err.message).join(", ") || "Invalid credentials"

            return NextResponse.json({
                success: false,
                message: errorMessage
            }, { status: 400 })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Email is not registered"
            }, { status: 400 })
        }

        const isMatch = await bcrypt.compare(password, user?.password);

        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Password didn't matched"
            }, { status: 400 })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1hr" });

        const response = NextResponse.json({
            success: true,
            message: "Login successfully",
            user: user
        }, { status: 200 });

        response.cookies.set({
            name: "authorization",
            value: `Bearer ${token}`,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        })

        return response;

    } catch (error: any) {

        console.error("Internal server error", error.message);

        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

