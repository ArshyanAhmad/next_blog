"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import Link from "next/link";

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

export default function HeroBlogPosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const cachedPosts = sessionStorage.getItem("hero_blog_posts");
            if (cachedPosts) {
                setPosts(JSON.parse(cachedPosts));
                return;
            }

            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                const latestPosts = data.posts.slice(0, 4) || [];
                setPosts(latestPosts);
                sessionStorage.setItem("hero_blog_posts", JSON.stringify(latestPosts));
            } catch (err) {
                console.log("Error fetching posts:", err);
            }
        }
        fetchPosts();
    }, []);

    return (
        <BentoGrid className="max-w-6xl mx-auto md:grid-cols-3">
            {posts.map((item, i) => (
                <BentoGridItem
                    key={item.id}
                    title={item.title}
                    description={item.excerpt || item.description}
                    header={item.coverImage ? (
                        <img src={item.coverImage} className="w-full h-full object-cover rounded-xl" alt={item.title} />
                    ) : null}
                    icon={item.icon || <IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    className={
                        i === 0 ? "md:col-span-2 row-span-1" :
                            i === 1 ? "md:col-span-1 row-span-1" :
                                i === 2 ? "md:col-span-1 row-span-1" :
                                    i === 3 ? "md:col-span-2 row-span-1" :
                                        ""
                    }
                >
                    <Link href={`/blogs/${item.slug}`} />

                </BentoGridItem>
            ))}
        </BentoGrid>
    );
}
