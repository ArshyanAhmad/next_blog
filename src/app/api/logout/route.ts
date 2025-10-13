// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        // ✅ Properly clear the cookie using `.delete()`
        response.cookies.delete("authorization");

        return response;
    } catch (error) {
        console.error("Logout error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to logout" },
            { status: 500 }
        );
    }
}
