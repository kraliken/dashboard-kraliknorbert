import { columns } from "@/components/tables/columns";
import TodoTable from "@/components/tables/TodoTable";
import TodoPageHeader from "@/components/todo/TodoPageHeader";
import { getTodos } from "@/lib/actions/todo.actions";

const normalizeParam = (param) => {
    if (!param) return []
    return Array.isArray(param) ? param : [param]
}

const TodoPage = async ({ searchParams }) => {

    const params = await searchParams;
    const { period = '' } = params

    const status = normalizeParam(params.status)
    const category = normalizeParam(params.category)

    const todos = await getTodos(period, category, status)

    return (
        <div className="flex flex-col gap-4 pb-4">
            <TodoPageHeader pageTitle='Todo List' sheetTitle='New Task' triggerLabel='New Task' />
            <TodoTable
                columns={columns}
                data={todos}
                initialStatus={status}
                initialCategory={category}
            />
        </div>
    )
}

export default TodoPage