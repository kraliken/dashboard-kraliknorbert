import { Skeleton } from "@/components/ui/skeleton"

const TodoTableSkeleton = ({ rows = 5 }) => {
    return (
        <div className="space-y-4">
            {/* Filter/Header area */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                {/* Table header */}
                <div className="border-b bg-muted/50 p-4">
                    <div className="grid grid-cols-6 gap-4">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                {/* Table body */}
                <div className="divide-y">
                    {Array.from({ length: rows }).map((_, i) => (
                        <div key={i} className="p-4">
                            <div className="grid grid-cols-6 gap-4 items-center">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-4 w-16" />
                                <div className="flex gap-1">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </div>
        </div>
    )
}

export default TodoTableSkeleton