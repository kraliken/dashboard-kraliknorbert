export const dynamic = "force-dynamic";

import TodoPageHeader from "@/components/todo/TodoPageHeader";
import TodoTable from "@/components/todo/TodoTable";


const TodoPage = async ({ searchParams }) => {

    const { period = '', category = '' } = await searchParams;

    const validPeriod = typeof period === 'string' ? period.trim() : '';
    const validCategory = typeof category === 'string' ? category.trim() : '';

    return (
        <div>
            <TodoPageHeader pageTitle={`${validCategory ? validCategory : validPeriod ? validPeriod : 'All Todos'}`} sheetTitle='New Task' triggerLabel='New Task' />
            <TodoTable period={validPeriod} category={validCategory} />
        </div>
    )
}

export default TodoPage