import { Button } from '../ui/button'
import { Download } from 'lucide-react'

const ReportPageHeader = ({ pageTitle = 'Daily Report', btnAction, triggerLabel = '' }) => {
    return (
        <div className='flex items-center justify-between'>
            <h2 className="scroll-m-20 text-lg font-semibold uppercase">
                {pageTitle}
            </h2>
            <Button size='sm'>
                <Download className="w-4 h-4 mr-0 sm:mr-1" />
                <span className='hidden sm:inline'>{triggerLabel}</span>
            </Button>
        </div>
    )
}

export default ReportPageHeader