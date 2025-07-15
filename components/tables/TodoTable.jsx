import PaginationControls from "./PaginationControls"
import TodoTableBody from "./TodoTableBody"
import TodoTableHeader from "./TodoTableHeader"

const TodoTable = ({ columns, data, total, page, limit }) => {

    return (
        <div className="flex flex-col gap-4">
            <TodoTableHeader />
            <TodoTableBody columns={columns} data={data} />
            <PaginationControls total={total} page={page} limit={limit} />
        </div>
    )
}

export default TodoTable