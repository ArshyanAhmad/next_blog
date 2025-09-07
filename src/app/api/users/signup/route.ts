import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { signupInput } from "@/types/user.types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

    const prisma = new PrismaClient();

    try {

        const body = await req.json();
        const { username, email, password } = body;

        const success = signupInput.safeParse({
            username,
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

        console.log(username, "Email", email, password);

        const userExist = await prisma.user.findUnique({
            where: { email }
        })

        if (userExist) {
            return NextResponse.json({
                success: false,
                message: "User already exist with their email",
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User registration failed"
            }, { status: 500 })
        }

        const response = NextResponse.json({
            success: true,
            message: "User registered successfully",
            user
        })

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1hr" });

        response.cookies.set({
            name: "auth",
            value: `Bearer ${token}`,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return response;

    } catch (error: any) {

        console.error("Internal server error", error.message);

        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

