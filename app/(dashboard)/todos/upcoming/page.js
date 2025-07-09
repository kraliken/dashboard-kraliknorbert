import TodoPageHeader from '@/components/todo/TodoPageHeader'

const UpcomingPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <TodoPageHeader pageTitle='Upcoming' sheetTitle='New Todo:' triggerLabel='New Todo' />
            <div>
                <p className="text-muted-foreground text-xl">
                    Table
                </p>
            </div>
        </div>
    )
}

export default UpcomingPage