"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export function LikeButton() {
    const [liked, setLiked] = useState(false);

    return (
        <button
            onClick={() => setLiked(!liked)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={liked ? "Unlike" : "Like"}
        >
            <Heart
                className={`h-5 w-5 ${liked ? "fill-pink-500 text-pink-500" : "text-gray-500"}`}
            />
        </button>
    );
}
