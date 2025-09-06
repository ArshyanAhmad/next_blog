"use client";

import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Heading from "../main-heading";
import { RainbowButton } from "../magicui/rainbow-button";
import Link from "next/link";

export function BlogCategorySection() {
    // selectedCategory work as a variable
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Show all the buttons with theses categories
    const categories = ["All", "React", "TypeScript", "Node.js"];

    const allBlogItems = [
        {
            id: 1,
            category: "React",
            title: "Mastering React Hooks",
            description: "Learn the ins and outs of React Hooks for cleaner code.",
            header: (
                <img
                    src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sticky notes and planning on a desk, illustrating React Hooks learning process"
                    className="w-full h-full object-cover rounded-xl"
                />
            ),
            icon: <svg className="h-4 w-4 text-neutral-500" />,
        },
        {
            id: 2,
            category: "TypeScript",
            title: "Strong Typing with TypeScript",
            description: "TypeScript tips and tricks to enhance JavaScript projects.",
            header: (
                <img
                    src="https://refine-web.imgix.net/blog/2023-11-15-ts-satisfies/social-2.png?w=1788"
                    alt="Closeup of programming book and workspace, representing TypeScript development"
                    className="w-full h-full object-cover rounded-xl"
                />
            ),
            icon: <svg className="h-4 w-4 text-neutral-500" />,
        },
        {
            id: 3,
            category: "Node.js",
            title: "Building Scalable APIs with Node.js",
            description: "How to build fast and scalable APIs using Node.js and Express.",
            header: (
                <img
                    src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
                    alt="Modern server infrastructure, symbolizing Node.js scalability"
                    className="w-full h-full object-cover rounded-xl"
                />
            ),
            icon: <svg className="h-4 w-4 text-neutral-500" />,
        },
        {
            id: 4,
            category: "React",
            title: "React Context API Explained",
            description: "Simplify state management in React apps with the Context API.",
            header: (
                <img
                    src="https://media.licdn.com/dms/image/v2/D4D12AQEzyVzUdWGAZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697368370424?e=2147483647&v=beta&t=IZG-oBUTyyS-WvnKxY000bHsM6kL28XaVO_mCZzlgpM"
                    alt="Network lines representing Context API state flow"
                    className="w-full h-full object-cover rounded-xl"
                />
            ),
            icon: <svg className="h-4 w-4 text-neutral-500" />,
        },
    ];


    const filteredItems =
        selectedCategory === "All"
            ? allBlogItems
            : allBlogItems.filter((item) => item.category === selectedCategory);

    return (
        <section className="max-w-6xl mx-auto md:grid-cols-3 py-10">
            <Heading
                h1="Browse by Category"
                text="Select a category to see more related content"
            />

            <div className="flex flex-wrap justify-center pt-2 gap-5 mb-15">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                            "rounded-full text-base font-semibold transition-all duration-300 ease-in-out select-none",
                            "flex items-center justify-center w-32 h-12 border-2",
                            selectedCategory === category
                                ? "text-white shadow-xl scale-110 border-transparent animate-animatedGradient"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <BentoGrid>
                {filteredItems.map(({ id, title, description, header, icon }) => (
                    <BentoGridItem
                        key={id}
                        title={title}
                        description={description}
                        header={header}
                        icon={icon}
                    />
                ))}
            </BentoGrid>

            <div className="mt-15 flex items-center justify-center">
                <Link href={"/blogs"} >
                    <RainbowButton
                        type="submit"
                        variant={"outline"}
                        className={cn(
                            "rounded-full text-base font-semibold transition-all duration-300 ease-in-out select-none",
                            "flex items-center justify-center  w-55 rounded-lg transform py-5 hover:-translate-y-0.5  border-2  text-white shadow-xl scale-110 border-transparent animate-animatedGradient",
                        )}
                    >

                        All Blogs
                    </RainbowButton>
                </Link>
            </div>

        </section>
    );
}
