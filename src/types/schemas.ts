import { z } from "zod"

export const articleSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
    content: z.string()
        .min(1, "Content is required")
        .min(10, "Content must be at least 10 characters"),
    categories: z.array(z.string())
        .min(1, "Please select at least one category")
        .max(5, "Maximum 5 categories allowed")
})

export type ArticleFormData = z.infer<typeof articleSchema>
