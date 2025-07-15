import { columns } from "@/components/tables/columns";
import TodoTable from "@/components/tables/TodoTable";
import TodoTableSkeleton from "@/components/tables/TodoTableSkeleton ";
import TodoPageHeader from "@/components/todo/TodoPageHeader";
import { getTodos } from "@/lib/actions/todo.actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const normalizeParam = (param) => {
    if (!param) return []
    return Array.isArray(param) ? param : [param]
}

const TodoPage = async ({ searchParams }) => {

    const params = await searchParams;
    const { period = '', limit = '5', page = '1' } = params

    const status = normalizeParam(params.status)
    const category = normalizeParam(params.category)

    const { items, total } = await getTodos(period, category, status, Number(limit), Number(page))

    const maxPage = Math.ceil(total / Number(limit))
    const currentPage = Number(page)

    if (currentPage > maxPage && maxPage > 0) {
        // Őrizd meg a többi paramétereket, csak a page-t változtasd meg
        const newParams = new URLSearchParams()
        if (period) newParams.set('period', period)
        if (params.status) {
            const statusArray = normalizeParam(params.status)
            statusArray.forEach(s => newParams.append('status', s))
        }
        if (params.category) {
            const categoryArray = normalizeParam(params.category)
            categoryArray.forEach(c => newParams.append('category', c))
        }
        newParams.set('limit', limit)
        newParams.set('page', '1')

        redirect(`/todos?${newParams.toString()}`)
    }

    return (
        <div className="flex flex-col gap-4 pb-4">
            <TodoPageHeader pageTitle='Todo List' sheetTitle='New Task' triggerLabel='New Task' />
            <TodoTable
                columns={columns}
                data={items}
                total={total}
                page={currentPage}
                limit={Number(limit)}
            />
        </div>
    )
}

export default TodoPage