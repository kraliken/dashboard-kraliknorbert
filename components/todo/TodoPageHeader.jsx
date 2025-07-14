
import NewTodoForm from '../forms/NewTodoForm'
import TodoSheet from '../sheets/TodoSheet'

const TodoPageHeader = ({ pageTitle = 'All Todos', sheetTitle = '', triggerLabel = '' }) => {
    return (
        <div className='flex items-center justify-between'>
            <h2 className="scroll-m-20 text-lg font-semibold uppercase">
                {pageTitle}
            </h2>
            {/* <TodoSheet
                title={sheetTitle}
                triggerLabel={triggerLabel}
            >
                <NewTodoForm />
            </TodoSheet> */}
        </div>
    )
}

export default TodoPageHeader