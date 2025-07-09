import React from 'react'
import TodoSheet from '../sheets/TodoSheet'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

const TodoPageHeader = ({ pageTitle = 'Upcoming Todos', btnAction, sheetTitle = '', triggerLabel = '' }) => {
    return (
        <div className='flex items-center justify-between'>
            <h2 className="scroll-m-20 text-lg font-semibold uppercase">
                {pageTitle}
            </h2>
            <TodoSheet
                title={sheetTitle}
                triggerLabel={triggerLabel}
            >
            </TodoSheet>
        </div>
    )
}

export default TodoPageHeader