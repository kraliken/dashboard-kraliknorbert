'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

const DeadlineHeader = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentSort = searchParams.get('sort')
    const currentOrder = searchParams.get('order') || 'asc'
    const isActive = currentSort === 'deadline'

    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc'

    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', 'deadline')
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
            Due Date
            <Icon className="ml-2 h-4 w-4" />
        </Button>
    )
}

export default DeadlineHeader
