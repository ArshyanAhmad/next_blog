// app/signup/layout.tsx
import { TopNavbar } from "@/components/navbar";
import React from "react";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" >
            <body>
                <nav className="fixed left-0 top-0 w-full z-[99]">
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-lg dark:bg-neutral-900/60"></div>
                    <TopNavbar />
                </nav>
                {children}
            </body>
        </html>
    );
}
