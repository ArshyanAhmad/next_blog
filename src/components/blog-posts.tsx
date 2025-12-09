"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heading from "@/components/main-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconClipboardCopy } from "@tabler/icons-react";

type Post = {
    id: string;
    title: string;
    excerpt?: string;
    description: string;
    coverImage?: string;
    slug: string;
    icon?: React.ReactNode;
    categories: { name: string }[];
};

type Category = {
    id: string;
    name: string;
};

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
    ref?: React.Ref<HTMLDivElement>;
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

const ITEMS_PER_PAGE = 4;

// Global cache to avoid refetching when navigating
let globalCache = {
    posts: null as Post[] | null,
    categories: null as string[] | null,
};

export default function BlogPosts() {
    const [posts, setPosts] = useState<Post[]>(globalCache.posts || []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const [categories, setCategories] = useState<string[]>(globalCache.categories || ["All"]);

    const fetchData = useCallback(async () => {
        try {
            // Only fetch if cache is empty
            if (!globalCache.posts || !globalCache.categories) {
                const res = await fetch("/api/posts", { cache: "no-store" });
                const data = await res.json();
                globalCache.posts = data.posts || [];
                setPosts(data.posts || []);

                const catRes = await fetch("/api/categories", { cache: "no-store" });
                const catData = await catRes.json();

                if (catData.success) {
                    const fetchedNames = catData.categories.map((c: Category) => c.name);
                    const allCats = ["All", ...fetchedNames];
                    globalCache.categories = allCats;
                    setCategories(allCats);
                }
            } else {
                setPosts(globalCache.posts);
                setCategories(globalCache.categories);
            }
        } catch (err) {
            console.log("Error fetching:", err);
        }
    }, []);

    // Fetch only on mount, not on every navigation
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Refetch all data (invalidate cache) - call this after creating a new post
    const refreshData = useCallback(() => {
        globalCache.posts = null;
        globalCache.categories = null;
        fetchData();
    }, [fetchData]);

    const filteredItems = selectedCategories.includes("All")
        ? posts
        : posts.filter((post) =>
            post.categories?.some((c) => selectedCategories.includes(c.name))
        );

    const visibleItems = filteredItems.slice(0, page * ITEMS_PER_PAGE);

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

    const handleCategoryClick = (category: string) => {
        if (category === "All") {
            setSelectedCategories(["All"]);
            setPage(1);
        } else {
            if (selectedCategories.includes("All")) {
                setSelectedCategories([category]);
                setPage(1);
            } else if (selectedCategories.includes(category)) {
                const newCategories = selectedCategories.filter((c) => c !== category);
                setSelectedCategories(newCategories.length === 0 ? ["All"] : newCategories);
                setPage(1);
            } else {
                setSelectedCategories([...selectedCategories, category]);
                setPage(1);
            }
        }
    };

    return (
        <div className="mt-15 max-h-screen">
            <Heading
                h1="Latest Tech Insights & Trends"
                text="Explore practical guides, expert tips, and industry news for developers of all skill levels."
            />

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

            <BentoGrid className="max-w-6xl mt-10 mx-auto md:grid-cols-3 gap-6">
                {visibleItems.map((item, i) => {
                    const isLastElement = i === visibleItems.length - 1;
                    return (
                        <Link key={item.id} href={`/blogs/${item.slug}`}>
                            <BentoGridItem
                                title={item.title}
                                description={item.excerpt || item.description}
                                header={item.coverImage ? (
                                    <img src={item.coverImage} className="w-full h-full object-cover rounded-xl" alt={item.title} />
                                ) : null}
                                icon={item.icon || <IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                                ref={isLastElement ? lastElementRef : null}
                            />
                        </Link>
                    );
                })}
            </BentoGrid>

            {loading && <div className="text-center py-4 text-gray-500">Loading more posts...</div>}
        </div>
    );
}
