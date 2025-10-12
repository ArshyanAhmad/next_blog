"use client"

import { useState, useEffect } from 'react'

interface Category {
    id: number
    name: string
}

interface UseCategoriesReturn {
    categories: string[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useCategories(): UseCategoriesReturn {
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCategories = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/categories')
            const data = await response.json()

            if (data.success) {
                // Extract category names from the response
                const categoryNames = data.categories.map((cat: Category) => cat.name)
                setCategories(categoryNames)
            } else {
                setError(data.message || 'Failed to fetch categories')
            }
        } catch (err) {
            console.error('Error fetching categories:', err)
            setError('Failed to fetch categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const refetch = () => {
        fetchCategories()
    }

    return { categories, loading, error, refetch }
}
