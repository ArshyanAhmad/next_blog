"use client";

import React, { useState, useRef, useCallback } from "react";
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heading from "@/components/main-heading";
import { Button } from "@/components/ui/button";

// Updated full list of blog posts with consistent categories
const allItems = [
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
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "React",
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
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "React",
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
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "Python",
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
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "Python",
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
    {
        title: "Next.js Routing: Static and Dynamic Pages Explained",
        category: "Rust",
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
    // You can duplicate or add more posts with relevant categories as needed
];

const ITEMS_PER_PAGE = 4;

export default function BlogPosts() {

    const categories = [
        "All",
        "React",
        "TypeScript",
        "Node.js",
        "JavaScript",
        "Python",
        "Go",
        "Rust",
        "DevOps",
        "Cloud",
        "Frontend",
        "Backend",
        "Tech News",
        "Next.js",
    ];

    // State for selected categories, default to 'All'
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    // Filter posts based on selected categories; show all if 'All' selected
    const filteredItems = selectedCategories.includes("All")
        ? allItems
        : allItems.filter((post) => selectedCategories.includes(post.category));

    // Posts visible per pagination page
    const visibleItems = filteredItems.slice(0, page * ITEMS_PER_PAGE);

    // Infinite scroll to load more items
    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, visibleItems]
    );

    const loadMoreItems = () => {
        if (loading) return;
        if (page * ITEMS_PER_PAGE >= filteredItems.length) return;
        setLoading(true);
        setTimeout(() => {
            setPage(page + 1);
            setLoading(false);
        }, 700);
    };

    // Handle category toggling on button click
    const handleCategoryClick = (category: string) => {
        if (category === "All") {
            // Clicking 'All' resets any other filters
            setSelectedCategories(["All"]);
            setPage(1);
        } else {
            if (selectedCategories.includes("All")) {
                // Remove 'All' and select the clicked category
                setSelectedCategories([category]);
                setPage(1);
            } else if (selectedCategories.includes(category)) {
                // Deselect category; if none left, revert to 'All'
                const newCategories = selectedCategories.filter((c) => c !== category);
                setSelectedCategories(newCategories.length === 0 ? ["All"] : newCategories);
                setPage(1);
            } else {
                // Add a new category to selection
                setSelectedCategories([...selectedCategories, category]);
                setPage(1);
            }
        }
    };

    return (
        <div className="mt-15 max-h-screen ">
            <Heading
                h1="Latest Tech Insights & Trends"
                text="Explore practical guides, expert tips, and industry news for developers of all skill levels."
            />

            {/* Category Buttons */}
            <div className="flex items-center justify-center m-auto w-4xl flex-wrap gap-5 mb-10">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        size="lg"
                        className={cn(
                            "cursor-pointer transition",
                            selectedCategories.includes(category) &&
                            "bg-blue-600 text-white dark:bg-blue-400 dark:text-black"
                        )}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Blog Posts Grid */}
            <BentoGrid className="max-w-6xl mt-10 mx-auto  md:grid-cols-3 gap-6">
                {visibleItems.map((item, i) => {
                    const isLastElement = i === visibleItems.length - 1;
                    return (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={""}
                            ref={isLastElement ? lastElementRef : null} // Attach observer to last item
                        />
                    );
                })}
            </BentoGrid>

            {loading && <div className="text-center py-4 text-gray-500">Loading more posts...</div>}
        </div>
    );
}

type BentoGridProps = {
    className?: string;
    children?: React.ReactNode;
};

export const BentoGrid = ({ className, children }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "mx-auto grid max-w-8xl grid-cols-1 gap-4 md:auto-rows-min md:grid-cols-3",
                className
            )}
        >
            {children}
        </div>
    );
};

type BentoGridItemProps = {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
};

export const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
    ({ className, title, description, header, icon }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                    className
                )}
            >
                <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden">{header}</div>
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                    {icon}
                    <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">{title}</div>
                    <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">{description}</div>
                    <div className="flex items-center justify-between pt-5">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-semibold text-gray-600">Ryan Dev</span>
                            <span className="text-[13px] font-semibold text-gray-500">Aug 17, 2025</span>
                        </div>
                        <div>
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-blue-600 font-medium">
                                Technology
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

BentoGridItem.displayName = "BentoGridItem";
