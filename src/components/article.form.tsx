"use client"

import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MultiSelectCategories } from "@/components/ui/multi-select-categories"
import { useCategories } from "@/hooks/useCategories"
import { articleSchema, type ArticleFormData } from "@/types/schemas"
import {
    FileText,
    Tag,
    PenTool,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Image as ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ArticleForm() {
    const [isPending, startTransition] = useTransition()
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const { categories, loading: categoriesLoading, error: categoriesError, refetch } = useCategories()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            content: "",
            categories: [],
        },
        mode: "onChange",
    })

    const selectedCategories = watch("categories")
    const onSubmit = (data: ArticleFormData) => {
        startTransition(async () => {
            setSubmitMessage(null)

            try {
                // ⭐ FETCH RANDOM TECH IMAGE FROM UNSPLASH OFFICIAL API
                const res = await fetch(
                    `https://api.unsplash.com/photos/random?query=programming&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
                )

                const imgData = await res.json()
                const imageUrl = imgData?.urls?.regular || ""  // fallback

                console.log("Unsplash Image Used:", imageUrl)

                // ⭐ Submit post with Unsplash image
                const response = await fetch("/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        title: data.title,
                        content: data.content,
                        categories: selectedCategories,
                        coverImage: imageUrl,
                    }),
                })

                const result = await response.json()
                if (result.success) {
                    setSubmitMessage({ type: "success", text: result.message || "Article published successfully!" })
                    reset()
                } else {
                    setSubmitMessage({ type: "error", text: result.message || "Failed to publish article" })
                }

            } catch (error) {
                console.error("Error publishing article:", error)
                setSubmitMessage({ type: "error", text: "Network error. Please try again." })
            }
        })
    }


    if (categoriesLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-lg text-muted-foreground">Loading categories...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (categoriesError) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-4">
                        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Failed to Load Categories</h3>
                            <p className="text-muted-foreground">{categoriesError}</p>
                            <Button onClick={refetch} variant="outline">
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Create New Article</h1>
                <p className="text-muted-foreground">Share your knowledge with a professional, well-structured article</p>
            </div>

            {submitMessage && (
                <div
                    className={cn(
                        "p-4 rounded-lg border flex items-center gap-3",
                        submitMessage.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                    )}
                >
                    {submitMessage.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span>{submitMessage.text}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Title */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <Label htmlFor="title" className="text-lg font-semibold">Article Title</Label>
                    </div>
                    <div className="space-y-2">
                        <Input id="title" {...register("title")} placeholder="Enter a compelling title..." className={cn("text-lg h-12", errors.title && "border-destructive focus-visible:ring-destructive")} />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                </div>

                {/* Featured Image (INFO ONLY, NO INPUT) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Featured Image</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        A random tech-themed image from Unsplash will be used automatically.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <PenTool className="h-5 w-5 text-primary" />
                        <Label htmlFor="content" className="text-lg font-semibold">Article Content</Label>
                    </div>
                    <div className="space-y-2">
                        <Textarea id="content" {...register("content")} placeholder="Write your article here..." className={cn("min-h-[200px]", errors.content && "border-destructive focus-visible:ring-destructive")} />
                        {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Categories</Label>
                        <span className="text-sm text-muted-foreground">({selectedCategories.length}/5 selected)</span>
                    </div>
                    <MultiSelectCategories options={categories} value={selectedCategories} onChange={categories => setValue("categories", categories, { shouldValidate: true })} placeholder="Search and select categories..." maxCount={5} error={!!errors.categories} />
                    {errors.categories && <p className="text-sm text-destructive">{errors.categories.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                    <Button type="button" variant="outline" className="flex-1" disabled={isPending} onClick={() => reset()}>
                        Clear Form
                    </Button>
                    <Button type="submit" disabled={!isValid || isPending || selectedCategories.length === 0} className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" />
                                Publish Article
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}


/*

Access key : Z80Xj2rkl0ZL4eRdz7AndfhrZa5IdS-3vIG7_BPOUCw
Secret Key : Bn4brfq3TGaaxpSsJgGFUeE0oiPwX7pwdt-RSnmrmRw

53593882-b944137b994529a155719b69d
*/