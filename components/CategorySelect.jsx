'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const categories = ['work', 'personal', 'development']

const CategorySelect = ({ category }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    // const currentCategory = searchParams.get('category') || ''

    const handleCategoryChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set('category', value)
        router.replace(`?${params.toString()}`)
    }

    return (
        <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Válassz kategóriát" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategorySelect
