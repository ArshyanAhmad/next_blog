// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

type BlogSlugPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
    const { slug } = await params;

    if (!slug) return notFound();

    const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true, categories: true },
    });

    if (!post) return notFound();

    return (
        <main className="max-w-3xl mx-auto pt-16 pb-28 px-4">
            <h1 className="text-4xl font-bold mb-5">{post.title}</h1>

            {post.coverImage && (
                <div className="w-full rounded-xl overflow-hidden shadow-md mb-10">
                    <Image
                        src={post.coverImage || "/fallback.jpg"}
                        width={1200}
                        height={600}
                        alt={post.title}
                        className="object-cover w-full h-[400px]"
                        priority
                        fetchPriority="high"
                    />
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={post.author?.image || "/default-avatar.png"} />
                        <AvatarFallback className="capitalize font-bold">{post.author?.name?.[0] || "A"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold transform-stroke capitalize">{post.author?.name || "Unknown Author"}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {post.categories.map((cat) => (
                        <span
                            key={cat.id}
                            className="rounded  bg-gray-500 px-2 py-0.5 text-xs text-white"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>


            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </main>
    );
}
