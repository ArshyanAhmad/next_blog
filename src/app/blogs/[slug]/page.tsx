"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { PrismaClient } from "@/generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Metadata } from "next";

const prisma = new PrismaClient();

// Optional: SEO metadata
async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true, categories: true },
    });

    if (!post) return { title: "Blog Not Found" };

    return {
        title: post.title,
        description: post.excerpt || post.content.slice(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.slice(0, 160),
        },
    };
}

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: true, categories: true },
    });

    if (!post) return notFound();

    return (
        <main className="max-w-3xl mx-auto pt-16 pb-28 px-4 text-gray-800 dark:text-gray-200">
            {/* Blog Heading */}
            <h1 className="text-4xl font-bold tracking-tight leading-snug mb-5">{post.title}</h1>

            {/* Cover Image */}
            {post.coverImage && (
                <section className="w-full rounded-xl overflow-hidden shadow-md mb-10">
                    <Image
                        src={post.coverImage}
                        width={1200}
                        height={600}
                        alt={post.title}
                        className="object-cover w-full h-[400px]"
                        priority
                    />
                </section>
            )}

            {/* Blog Summary */}
            {post.excerpt && (
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-12">
                    {post.excerpt}
                </p>
            )}

            {/* Author + Categories */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={post.author.image || "/default-avatar.png"} />
                        <AvatarFallback>{post.author.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{post.author.name || "Unknown Author"}</p>
                        <p className="text-[13px] text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {post.categories.map((cat) => (
                        <span
                            key={cat.id}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-blue-600 font-medium"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Full Blog Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </main>
    );
}
