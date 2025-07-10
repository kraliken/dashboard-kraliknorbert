import { columns } from "@/components/tables/columns";
import TodoTable from "@/components/tables/TodoTable";
import TodoPageHeader from "@/components/todo/TodoPageHeader";
import { getTodos } from "@/lib/actions/todo.actions";


const TodoPage = async ({ searchParams }) => {

    const { period = '', category = '' } = await searchParams;

    const validPeriod = typeof period === 'string' ? period.trim() : '';
    const validCategory = typeof category === 'string' ? category.trim() : '';

    const todos = await getTodos(period, category)

    console.log(todos);

    return (
        <div className="flex flex-col gap-4">
            <TodoPageHeader pageTitle={`${validCategory ? validCategory : validPeriod ? validPeriod : 'All Todos'}`} sheetTitle='New Task' triggerLabel='New Task' />
            <TodoTable columns={columns} data={todos} />
        </div>
    )
}

export default TodoPage