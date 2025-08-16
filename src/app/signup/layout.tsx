// app/signup/layout.tsx
import React from "react";

export default function SignupLayout({
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
