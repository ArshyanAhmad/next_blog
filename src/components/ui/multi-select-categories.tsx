"use client"

import React, { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryOption {
    value: string
    label: string
}

interface MultiSelectCategoriesProps {
    options: string[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    maxCount?: number
    disabled?: boolean
    error?: boolean
    className?: string
}

export function MultiSelectCategories({
    options,
    value,
    onChange,
    placeholder = "Search and select categories...",
    maxCount = 5,
    disabled = false,
    error = false,
    className
}: MultiSelectCategoriesProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter options based on search query
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !value.includes(option)
    )

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchQuery("")
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Handle option selection
    const handleSelect = (option: string) => {
        if (value.length < maxCount) {
            onChange([...value, option])
        }
        setSearchQuery("")
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    // Handle option removal
    const handleRemove = (option: string) => {
        onChange(value.filter(item => item !== option))
    }

    // Handle clear all
    const handleClearAll = () => {
        onChange([])
        setSearchQuery("")
    }

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            {/* Selected Categories Display */}
            <div
                className={cn(
                    "min-h-[3rem] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm cursor-pointer",
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    error && "border-destructive focus-within:ring-destructive",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Selected Category Tags */}
                    {value.map(category => (
                        <span
                            key={category}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium"
                        >
                            {category}
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(category)
                                    }}
                                    className="ml-1 hover:bg-primary/80 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </span>
                    ))}

                    {/* Search Input */}
                    <div className="flex-1 min-w-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            placeholder={value.length === 0 ? placeholder : "Add more..."}
                            disabled={disabled || value.length >= maxCount}
                            className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {value.length > 0 && !disabled && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClearAll()
                                }}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <ChevronDown className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                        )} />
                    </div>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && !disabled && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                    {/* Search Header */}
                    <div className="flex items-center gap-2 p-3 border-b">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            {filteredOptions.length} categories available
                            {value.length > 0 && ` • ${value.length}/${maxCount} selected`}
                        </span>
                    </div>

                    {/* Options List */}
                    <div className="max-h-40 overflow-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-3 text-center text-sm text-muted-foreground">
                                {searchQuery ? `No categories found matching "${searchQuery}"` : "All categories selected"}
                            </div>
                        ) : (
                            filteredOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    disabled={value.length >= maxCount}
                                    className={cn(
                                        "w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {value.includes(option) && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {value.length >= maxCount && (
                        <div className="p-2 border-t bg-muted/50">
                            <p className="text-xs text-muted-foreground text-center">
                                Maximum {maxCount} categories allowed
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
