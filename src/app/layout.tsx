import { Poppins, Roboto_Mono, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// Fonts
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heading",
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Zenith Blog | Insights, Guides & Tutorials",
    template: "%s | Zenith Blog",
  },
  description:
    "Zenith is your go-to blog for web development, programming tips, and tech insights. Stay updated with tutorials, guides, and industry trends.",
  keywords: [
    "blog",
    "web development",
    "JavaScript",
    "Next.js",
    "React",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "frontend",
    "backend",
  ],
  creator: "Fozo Team",
  publisher: "Zenith",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${poppins.variable} ${robotoMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
