"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { cn } from "@/lib/utils";
import Heading from "../main-heading";
import { RainbowButton } from "../magicui/rainbow-button";
import Link from "next/link";

type Post = {
    id: string;
    title: string;
    excerpt?: string;
    description: string;
    coverImage?: string;
    slug: string;
    icon?: React.ReactNode;
    categories: { id: string; name: string }[];
};

export function BlogCategorySection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const cachedPosts = sessionStorage.getItem("blog_posts");

                if (cachedPosts) {
                    setPosts(JSON.parse(cachedPosts));
                    setLoading(false);
                    return;
                }

                const resPosts = await fetch("/api/posts");
                const postsData = await resPosts.json();
                const allPosts = postsData.posts ?? [];

                // Show only the first 6 posts
                const firstSixPosts = allPosts.slice(5, 9);

                setPosts(firstSixPosts);
                sessionStorage.setItem("blog_posts", JSON.stringify(firstSixPosts));
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto md:grid-cols-3 py-10">
                <Heading
                    h1="More Articles"
                    text="Discover blogs on programming, tools, frameworks, and trending technologies."
                />
                <div className="flex justify-center py-10">
                    <p>Loading articles...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-6xl mx-auto md:grid-cols-3 py-10">
            <Heading
                h1="More Articles"
                text="Discover blogs on programming, tools, frameworks, and trending technologies."
            />

            <BentoGrid>
                {posts.map((post) => (
                    <Link key={post.id} href={`/blogs/${post.slug}`}>
                        <BentoGridItem
                            title={post.title}
                            description={post.excerpt || post.description}
                            header={
                                post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : null
                            }
                            icon={<span />}
                        />
                    </Link>
                ))}
            </BentoGrid>

            <div className="mt-15 flex items-center justify-center">
                <Link href={"/blogs"}>
                    <RainbowButton
                        type="button"
                        variant={"outline"}
                        className={cn(
                            "rounded-full text-base font-semibold transition-all duration-300 ease-in-out select-none",
                            "flex items-center justify-center w-55 rounded-lg transform py-5 hover:-translate-y-0.5 border-2 text-white shadow-xl scale-110 animate-animatedGradient"
                        )}
                    >
                        All Blogs
                    </RainbowButton>
                </Link>
            </div>
        </section>
    );
}
