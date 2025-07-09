import TodoPageHeader from '@/components/todo/TodoPageHeader'
import React from 'react'

const WorkTodoPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <TodoPageHeader pageTitle='Work' sheetTitle='New Todo:' triggerLabel='New Todo' />
            <div>
                <p className="text-muted-foreground text-xl">
                    Table
                </p>
            </div>
        </div>
    )
}

export default WorkTodoPage