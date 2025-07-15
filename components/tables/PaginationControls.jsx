'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import PaginationSelect from "./PaginationSelect"


const PaginationControls = ({ total, page = 1, limit = 5 }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const totalPages = Math.max(Math.ceil(total / limit), 1)

    const updateParams = (newPage, newLimit = limit) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        params.set('limit', newLimit.toString())
        router.push(`?${params.toString()}`)
    }

    const handleLimitChange = (value) => {
        const newLimit = parseInt(value, 10)
        updateParams(1, newLimit)
    }

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <PaginationSelect selectedValues={limit.toString()} onChange={handleLimitChange} />
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => updateParams(1)}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateParams(page - 1)}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateParams(page + 1)}
                        disabled={page >= totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => updateParams(totalPages)}
                        disabled={page >= totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PaginationControls