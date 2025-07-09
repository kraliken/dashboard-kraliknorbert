import ReportPageHeader from '@/components/todo/ReportPageHeader'


const WeeklyTodoReportPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <ReportPageHeader pageTitle='Weekly Report' triggerLabel='Export' />
            <div>
                <p className="text-muted-foreground text-xl">
                    Table
                </p>
            </div>
        </div>
    )
}

export default WeeklyTodoReportPage