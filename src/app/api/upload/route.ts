import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file locally in public/uploads
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        const imageUrl = `/uploads/${fileName}`;

        return NextResponse.json({ success: true, url: imageUrl });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: error.message || "File upload failed" }, { status: 500 });
    }
}
