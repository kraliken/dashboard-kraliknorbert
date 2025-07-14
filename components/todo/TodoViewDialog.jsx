import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("hu-HU")
}

const TodoViewDialog = ({ todo, isOpen, onOpenChange }) => {

    const {
        title,
        description,
        category,
        status,
        created_at,
        modified_at,
        completed_at,
        deadline,
    } = todo

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    <div>
                        <span className="font-medium text-white">Description: </span>
                        {description || "-"}
                    </div>
                    <div>
                        <span className="font-medium text-white">Category: </span>
                        {category}
                    </div>
                    <div>
                        <span className="font-medium text-white">Status: </span>
                        {status}
                    </div>
                    <div>
                        <span className="font-medium text-white">Deadline: </span>
                        {formatDate(deadline)}
                    </div>
                    <div>
                        <span className="font-medium text-white">Completed: </span>
                        {formatDate(completed_at)}
                    </div>
                    <div>
                        <span className="font-medium text-white">Created: </span>
                        {formatDate(created_at)}
                    </div>
                    <div>
                        <span className="font-medium text-white">Modified: </span>
                        {formatDate(modified_at)}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TodoViewDialog