import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";


export function BlogGrid() {
    return (
        <BentoGrid className="max-w-6xl mx-auto md:grid-cols-3">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={
                        i === 0 ? "md:col-span-2 row-span-1" :
                            i === 1 ? "md:col-span-1 row-span-1" :
                                i === 2 ? "md:col-span-1 row-span-1" :
                                    i === 3 ? "md:col-span-2 row-span-1" :
                                        ""
                    }
                />
            ))}
        </BentoGrid>

    );
}


const items = [
    {
        title: "Building Performant Web Apps with React",
        category: "React",
        description: "Learn effective strategies and hooks for optimizing performance in your React applications.",
        header: (
            <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                alt="Code on computer monitor, representing React web development"
                className="w-full h-full object-cover rounded-xl"
            />
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Type Safety in Large Projects: Why TypeScript Wins",
        category: "TypeScript",
        description: "Discover how TypeScript helps prevent bugs and brings scalable type safety to complex codebases.",
        header: (
            <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                alt="Laptop with JavaScript code editor, symbolizing TypeScript"
                className="w-full h-full object-cover rounded-xl"
            />
        ),
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Building RESTful APIs with Node.js",
        category: "Node.js",
        description: "Step-by-step guide to creating robust RESTful APIs using Node.js and Express.",
        header: (
            <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                alt="Terminal window with Node.js code"
                className="w-full h-full object-cover rounded-xl"
            />
        ),
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "Next.js",
        description: "Master routing in Next.js, from basic static pages to advanced dynamic routes and API endpoints.",
        header: (
            <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
                alt="Abstract routing concept with intersection roads"
                className="w-full h-full object-cover rounded-xl"
            />
        ),
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
];
