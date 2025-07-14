import TodoTableBody from "./TodoTableBody"
import TodoTableHeader from "./TodoTableHeader"

const TodoTable = ({ columns, data, initialStatus, initialCategory }) => {

    return (
        <div className="flex flex-col gap-4">
            <TodoTableHeader
                initialStatus={initialStatus}
                initialCategory={initialCategory}
            />
            <TodoTableBody columns={columns} data={data} />
        </div>
    )
}

export default TodoTable