// app/signup/layout.tsx
import React from "react";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>
                {children}
            </body>
        </html>
    );
}
