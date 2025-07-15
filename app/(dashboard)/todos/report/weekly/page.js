import { columns } from '@/components/tables/columns'
import TodoTableBody from '@/components/tables/TodoTableBody'
import ExportReport from '@/components/todo/ExportReport'
import ReportPageHeader from '@/components/todo/ReportPageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getWeeklyTodos } from '@/lib/actions/todo.actions'


const WeeklyTodoReportPage = async () => {

    const { done_weekly, due_weekly } = await getWeeklyTodos()

    return (
        <div className='flex flex-col gap-2'>
            <ReportPageHeader pageTitle='Weekly Report' triggerLabel='Export' />
            <div className='flex gap-2'>
                <Tabs defaultValue="due" className="flex-1">
                    <div className='flex items-center justify-between'>
                        <TabsList className='w-[350px]'>
                            <TabsTrigger value="due">Due</TabsTrigger>
                            <TabsTrigger value="done">Done</TabsTrigger>
                        </TabsList>
                        <div>
                            <ExportReport title="Export" type="weekly" />
                        </div>
                    </div>
                    <TabsContent value="due">
                        <TodoTableBody columns={columns} data={due_weekly} />
                    </TabsContent>
                    <TabsContent value="done">
                        <TodoTableBody columns={columns} data={done_weekly} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default WeeklyTodoReportPage