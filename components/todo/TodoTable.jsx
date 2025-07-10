import { getTodos } from "@/lib/actions/todo.actions"


const TodoTable = async ({ period, category }) => {

    const todos = await getTodos(period, category)

    return (
        <div>
            <p>{todos?.length}</p>
        </div>
    )
}

export default TodoTable