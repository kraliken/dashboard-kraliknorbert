'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

const SortableHeader = ({ label, field }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentSort = searchParams.get('sort')
    const currentOrder = searchParams.get('order') || 'asc'
    const isActive = currentSort === field

    const newOrder = isActive && currentOrder === 'asc' ? 'desc' : 'asc'

    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString())

        // ✅ mindig csak az aktuális oszlopra szűrjünk
        params.set('sort', field)
        params.set('order', newOrder)
        router.push(`?${params.toString()}`)
    }

    const icon = !isActive
        ? ArrowUpDown
        : currentOrder === 'asc'
            ? ArrowUp
            : ArrowDown

    const Icon = icon

    return (
        <Button variant="ghost" onClick={handleClick}>
            {label}
            <Icon className="ml-2 h-4 w-4" />
        </Button>
    )
}

export default SortableHeader
