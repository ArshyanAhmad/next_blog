import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "mx-auto grid max-w-8xl grid-cols-1 gap-4 md:auto-rows-min md:grid-cols-3", className,
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    children
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    children?: React.ReactNode
}) => {
    return (
        <div
            className={cn(
                "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                className,
            )}
        >
            <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden">
                {header}
            </div>
            <div className="transition duration-200 group-hover/bento:translate-x-2">
                {icon}

                <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
                    {title}
                </div>

                <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
                    {description}
                </div>

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
};
