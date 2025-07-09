import TodoPageHeader from '@/components/todo/TodoPageHeader'

const DevelopmentTodoPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <TodoPageHeader pageTitle='Development' sheetTitle='New Todo:' triggerLabel='New Todo' />
            <div>
                <p className="text-muted-foreground text-xl">
                    Table
                </p>
            </div>
        </div>
    )
}

export default DevelopmentTodoPage