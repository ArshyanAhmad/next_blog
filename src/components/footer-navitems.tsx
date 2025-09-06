"use client";

import { motion } from "framer-motion";
import React from "react";

export default function FooterNav() {
    const links = ["Home", "About", "Blog", "Contact"];
    const [hovered, setHovered] = React.useState<number | null>(null);

    return (
        <nav className="relative flex space-x-3 text-sm font-medium">
            {links.map((link, idx) => (
                <a
                    key={idx}
                    href="#"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative px-2 py-2 text-neutral-500 dark:text-neutral-300"
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hovered-footer" // shared layout animation
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute inset-x-0 bottom-0 h-[2px] w-2/3 mx-auto"
                        >
                            {/* Thin gradient flash underline */}
                            <div className="h-full w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-80" />
                        </motion.div>
                    )}
                    <span className="relative z-20">{link}</span>
                </a>
            ))}
        </nav>
    );
}
