import { columns } from "@/components/tables/columns";
import TodoTable from "@/components/tables/TodoTable";
import TodoPageHeader from "@/components/todo/TodoPageHeader";
import { getTodos } from "@/lib/actions/todo.actions";
import { redirect } from "next/navigation";

const normalizeParam = (param) => {
    if (!param) return []
    return Array.isArray(param) ? param : [param]
}

const TodoPage = async ({ searchParams }) => {

    const params = await searchParams;
    const { period = '', limit = '5', page = '0' } = params

    const status = normalizeParam(params.status)
    const category = normalizeParam(params.category)

    const { items, total } = await getTodos(period, category, status, Number(limit), Number(page))

    return (
        <div className="flex flex-col gap-4 pb-4">
            <TodoPageHeader pageTitle='Todo List' sheetTitle='New Task' triggerLabel='New Task' />
            <TodoTable
                columns={columns}
                data={items}
                total={total}
                page={Number(page)}
                limit={Number(limit)}
            />
        </div>
    )
}

export default TodoPage