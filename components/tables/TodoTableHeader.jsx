"use client"

import { useRouter, useSearchParams } from "next/navigation"
import TodoSheet from '../sheets/TodoSheet'
import NewTodoForm from '../forms/NewTodoForm'
import TodoTableFacetedFilter from './TodoTableFacetedFilter'
import { Briefcase, CheckCircle, Code, HelpCircle, Timer, UserLock, X } from "lucide-react"
import { Button } from "../ui/button"

const TodoTableHeader = ({ initialStatus = [], initialCategory = [] }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const statusParams = searchParams.getAll("status")
    const categoryParams = searchParams.getAll("category")

    const updateUrlParams = (key, values) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(key)
        values.forEach((val) => {
            if (val) params.append(key, val)
        })
        router.push(`?${params.toString()}`)
    }

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("status")
        params.delete("category")
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex items-start sm:items-center justify-between py-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <TodoTableFacetedFilter
                    title="Status"
                    selectedValues={statusParams}
                    options={[
                        { label: "Backlog", value: "backlog", icon: HelpCircle },
                        { label: "Progress", value: "progress", icon: Timer },
                        { label: "Done", value: "done", icon: CheckCircle }
                    ]}
                    onChange={(values) => {
                        updateUrlParams("status", values)
                    }}
                />
                <TodoTableFacetedFilter
                    title="Category"
                    selectedValues={categoryParams}
                    options={[
                        { label: "Personal", value: "personal", icon: UserLock },
                        { label: "Work", value: "work", icon: Briefcase },
                        { label: "Development", value: "development", icon: Code }
                    ]}
                    onChange={(values) => {
                        updateUrlParams("category", values)
                    }}
                />

                {(statusParams.length > 0 || categoryParams.length) > 0 && <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className='flex items-center'
                >
                    Reset
                    <X />
                </Button>}
            </div>

            <TodoSheet
                title="New Task"
                triggerLabel='New Task'
            >
                <NewTodoForm />
            </TodoSheet>
        </div>
    )
}

export default TodoTableHeader